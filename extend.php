<?php

namespace Branchzero\QQCaptcha;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Locales(__DIR__ . '/locale')),
    function (Dispatcher $events, Application $app) {
        $events->subscribe(Listener\AddValidatorRule::class);
        $events->subscribe(Listener\AddApiAttributes::class);
        //assume to be a bug in flarum?
        $app[BusDispatcher::class] = $app[BusDispatcher::class]->pipeThrough(['Branchzero\\QQCaptcha\\Validate']);
    }
];
