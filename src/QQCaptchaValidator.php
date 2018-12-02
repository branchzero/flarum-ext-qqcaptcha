<?php

namespace Branchzero\QQCaptcha;

use Flarum\Foundation\AbstractValidator;

class QQCaptchaValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'qqcaptcha-ticket' => [
            'required',
            'qqcaptcha',
        ],
        'qqcaptcha-randstr' => [
            'required'
        ]
    ];
}
