import app from 'flarum/app';

import QQCaptchaSettingsModal from './QQCaptchaSettingsModal';

app.initializers.add('branchzero-qqcaptcha', () => {
  app.extensionSettings['branchzero-qqcaptcha'] = () => app.modal.show(new QQCaptchaSettingsModal());
});
