module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e){t.exports=flarum.core.compat.app},function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["components/SignUpModal"]},,,,function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(1),c=n(2),u=n.n(c);a.a.initializers.add("branchzero-qqcaptcha",function(){var t=function(){return void 0!==window.TencentCaptcha},e=m.prop(),n=m.prop(),r=m.prop();Object(o.extend)(u.a.prototype,"config",function(){var o=this,c=a.a.forum.attribute("qqcaptchaAid");if(c){var u=function(){if(!o.$(".qqcaptcha").length){var t=o.$('[type="submit"]'),u=$('<div class="Form-group qqcaptcha">').insertBefore(t.parent())[0];if(u&&!$(u).data("qqcaptcha-rendred")){var i=a.a.translator.translations["core.forum.sign_up.submit_button"],p=$('<button id="TencentCaptcha" type="button" class="Button Button--primary Button--block" title="'+i+'"><span class="Button-label">'+i+"</span></button>");t.hide(),$(u).append(p);var l=new TencentCaptcha(document.getElementById("TencentCaptcha"),{aid:c,callback:function(r){e(r.ticket),n(r.randstr),t.click()}});r(l),$(u).data("qqcaptcha-rendred",!0),m.redraw()}}};t()?u():$.getScript("https://ssl.captcha.qq.com/TCaptcha.js",function(){var e=0,n=setInterval(function(){++e,t()&&(clearInterval(n),u()),e>100&&clearInterval(n)},100)})}}),Object(o.extend)(u.a.prototype,"logIn",function(){this.$(".qqcaptcha").remove()}),Object(o.extend)(u.a.prototype,"submitData",function(t){var r=t;return r["qqcaptcha-ticket"]=e(),r["qqcaptcha-randstr"]=n(),r}),Object(o.extend)(u.a.prototype,"onerror",function(){t()&&r().destroy()})})}]);
//# sourceMappingURL=forum.js.map