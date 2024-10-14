import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        header: {
            home: 'Home',
            favorite: 'Favorite',
        },
    },
    uk: {
        header: {
            home: 'Головна',
            favorite: 'Улюблене',
        },
    },
};

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'uk',
    messages,
});
// <h1> {{ $t('weather.city') }}</h1>
export default i18n;
