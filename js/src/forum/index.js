import app from 'flarum/app';
import { extend } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';

app.initializers.add('branchzero-qqcaptcha', () => {
  const isAvail = () => typeof TencentCaptcha !== 'undefined';
  const qqcaptchaTicketValue = m.prop();
  const qqcaptchaRandstrValue = m.prop();
  const qqcaptchaID = m.prop();

  function load() {
    const aid = app.forum.attribute('qqcaptchaAid');

    if (!key) return;

    const render = () => {
      if (this.$('.qqcaptcha').length) return;

      const el = $('<div class="Form-group qqcaptcha">')
        .insertBefore(this.$('[type="submit"]').parent())[0];

      if (el && !$(el).data('qqcaptcha-rendred')) {
        qqcaptchaID(new TencentCaptcha(el, {
          aid: aid,
          callback: res => {
            qqcaptchaTicketValue(res.ticket);
            qqcaptchaRandstrValue(res.randstr);
          },
        }));
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
      TencentCaptcha.reset(qqcaptchaID());
    }
  });
});
