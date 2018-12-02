<?php

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Branchzero\QQCaptcha\Listener;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    function (Dispatcher $events, BusDispatcher $bus) {
        $events->subscribe(Listener\AddValidatorRule::class);
        $events->subscribe(Listener\AddApiAttributes::class);

        $bus->pipeThrough(['Branchzero\QQCaptcha\Validate']);
    }
];
