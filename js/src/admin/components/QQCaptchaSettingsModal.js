import SettingsModal from 'flarum/components/SettingsModal';

export default class QQCaptchaSettingsModal extends SettingsModal {
  className() {
    return 'QQCaptchaSettingsModal Modal--small';
  }

  title() {
    return '防水墙设置';
  }

  form() {
    return [
      <div className="Form-group">
        <label>
          Aid
        </label>
        <input className="FormControl" bidi={this.setting('flarum-ext-qqcaptcha.aid')} />
      </div>,
      <div className="Form-group">
        <label>
          AppSecretKey
        </label>
        <input className="FormControl" bidi={this.setting('flarum-ext-qqcaptcha.secret_key')} />
      </div>,
    ];
  }
}
