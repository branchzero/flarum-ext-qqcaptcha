<?php

namespace Branchzero\QQCaptcha\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Foundation\Event\Validating;
use Flarum\User\UserValidator;
use Flarum\User\Command\RegisterUser;
use Flarum\Settings\SettingsRepositoryInterface;
use Branchzero\QQCaptcha\QQCaptchaValidator;

class AddValidatorRule {
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    protected $aid;
    protected $secretKey;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->aid = $this->settings->get('flarum-ext-qqcaptcha.aid');
        $this->secretKey = $this->settings->get('flarum-ext-qqcaptcha.secret_key');
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Validating::class, [$this, 'addRule']);
    }

    public function addRule(Validating $event) {

        if (!empty($this->aid) && !empty($this->secretKey)) {
            if ($event->type instanceof QQCaptchaValidator) {
                $event->validator->addExtension(
                    'qqcaptcha',
                    function($attribute, $value, $parameters) use ($event) {
                        return $this->verify(
                            $value,
                            array_get($event->validator->getData(), 'qqcaptcha-randstr')
                        );
                    }
                );
            }
        }
    }

    private function verify($ticket, $randStr)
    {
        $result = $this->fetch('https://ssl.captcha.qq.com/ticket/verify', [
            'aid' => $this->aid,
            'AppSecretKey' => $this->secretKey,
            'Ticket' => $ticket,
            'Randstr' => $randStr,
            'UserIP' => array_get($_SERVER, 'REMOTE_ADDR', '127.0.0.1')
        ]);

        if (empty($result) || !isset($result['response'])) {
            return false;
        }
        if ($result['response'] == 1) {
            return true;
        }

        return false;
    }

    function fetch($url, $data = [], $rawHeaders = [], $isJson = true, $returnHeader = false)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, $returnHeader ? 1 : 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        if (!empty($rawHeaders)) {
            $headers = [];
            foreach ($rawHeaders as $k => $v) {
                $headers[] = $k . ': ' . $v;
            }
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        if (!empty($data)) {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            if (is_array($data)) {
                if (isset($rawHeaders['Content-Type']) && $rawHeaders['Content-Type'] == 'application/json') {
                    $postData = json_encode($data);
                } else {
                    $postData = http_build_query($data);
                }
            } else {
                $postData = $data;
            }

            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        }
        $result = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $time = curl_getinfo($ch, CURLINFO_TOTAL_TIME);
        curl_close($ch);

        if (!empty($result)) {
            return $isJson ? json_decode($result, true) : $result;
        }

        return $isJson ? [] : '';
    }
}
