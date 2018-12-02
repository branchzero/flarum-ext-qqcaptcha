<?php

namespace Branchzero\QQCaptcha;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\Command\RegisterUser;
use Branchzero\QQCaptcha\Listener;

class Validate
{
    /**
     * @var UserValidator
     */
    protected $validator;

    /**
     * @param UserValidator $validator
     */
    public function __construct(QQCaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle($command, $next)
    {
        if ($command instanceof RegisterUser) {
            $this->validator->assertValid([
                'qqcaptcha-ticket' => array_get($command->data, 'attributes.qqcaptcha-ticket')
            ]);
        }
        return $next($command);
    }
}
