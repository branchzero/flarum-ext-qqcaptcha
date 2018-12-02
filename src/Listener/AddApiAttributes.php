<?php

namespace Branchzero\QQCaptcha\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class AddApiAttributes {
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event) {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['qqcaptchaAid'] = $this->settings->get('flarum-ext-qqcaptcha.aid');
        }
    }
}
