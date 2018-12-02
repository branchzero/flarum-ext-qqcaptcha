import app from 'flarum/app';

import QQCaptchaSettingsModal from './components/QQCaptchaSettingsModal';

app.initializers.add('branchzero-qqcaptcha', () => {
  app.extensionSettings['branchzero-qqcaptcha'] = () => app.modal.show(new QQCaptchaSettingsModal());
});

// Expose compat API
import qqCaptchaCompat from './compat';
import { compat } from '@flarum/core/admin';

Object.assign(compat, qqCaptchaCompat);
