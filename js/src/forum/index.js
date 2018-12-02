import app from 'flarum/app';
import { extend } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';

app.initializers.add('branchzero-qqcaptcha', () => {
  const isAvail = () => typeof window.TencentCaptcha !== 'undefined';
  const qqcaptchaTicketValue = m.prop();
  const qqcaptchaRandstrValue = m.prop();
  const qqcaptchaID = m.prop();

  function load() {
    const aid = app.forum.attribute('qqcaptchaAid');

    if (!aid) return;

    const render = () => {
      if (this.$('.qqcaptcha').length) return;

      const register_btn = this.$('[type="submit"]');
      const el = $('<div class="Form-group qqcaptcha">')
        .insertBefore(register_btn.parent())[0];
      
      if (el && !$(el).data('qqcaptcha-rendred')) {
        const register_btn_title = app.translator.translations['core.forum.sign_up.submit_button'];
        const fake_btn = $('<button id="TencentCaptcha" type="button" class="Button Button--primary Button--block" title="' + register_btn_title + '"><span class="Button-label">' + register_btn_title + '</span></button>');
        register_btn.hide();
        $(el).append(fake_btn);
        const obj = new TencentCaptcha(document.getElementById('TencentCaptcha'), {
          aid: aid,
          callback: res => {
            qqcaptchaTicketValue(res.ticket);
            qqcaptchaRandstrValue(res.randstr);
            register_btn.click();
          },
        });
        qqcaptchaID(obj);
        $(el).data('qqcaptcha-rendred', true);
        m.redraw();
      }
    };

    if (isAvail()) {
      render();
    } else {
      $.getScript(
        `https://ssl.captcha.qq.com/TCaptcha.js`,
        () => {
          let attemps = 0;
          const interval = setInterval(() => {
            ++attemps;
            if (isAvail()) {
              clearInterval(interval);
              render();
            }
            if (attemps > 100) {
              clearInterval(interval);
            }
          }, 100);
        }
      );
    }
  }
  extend(SignUpModal.prototype, 'config', load);

  function clean() {
    this.$('.qqcaptcha').remove();
  }
  extend(SignUpModal.prototype, 'logIn', clean);

  extend(SignUpModal.prototype, 'submitData', function (data) {
    const newData = data;
    newData['qqcaptcha-ticket'] = qqcaptchaTicketValue();
    newData['qqcaptcha-randstr'] = qqcaptchaRandstrValue();
    return newData;
  });

  extend(SignUpModal.prototype, 'onerror', function () {
    if (isAvail()) {
      qqcaptchaID().destroy();
    }
  });
});
