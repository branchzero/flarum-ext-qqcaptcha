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
    public function __construct(RecaptchaValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle($command, $next)
    {
        if ($command instanceof RegisterUser) {
            $this->validator->assertValid([
                'g-recaptcha-response' => array_get($command->data, 'attributes.g-recaptcha-response')
            ]);
        }
        return $next($command);
    }
}
