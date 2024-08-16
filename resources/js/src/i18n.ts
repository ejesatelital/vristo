import { createI18n } from 'vue-i18n';
// @ts-ignore
import messages from '@intlify/vite-plugin-vue-i18n/messages';

export default createI18n({
    legacy: false,
    allowComposition: true,
    locale: 'en',
    globalInjection: true,
    fallbackLocale: 'en',
    messages,
});
