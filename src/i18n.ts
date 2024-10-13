import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        weather: {
            city: 'City',
            date: 'Date',
            temperature: 'Temperature',
            description: 'Description',
            forecast: '5-Day Forecast',
            like: 'Like',
            delete: 'Delete',
        },
    },
    uk: {
        weather: {
            city: 'Місто',
            date: 'Дата',
            temperature: 'Температура',
            description: 'Опис',
            forecast: 'Прогноз на 5 днів',
            like: 'Лайк',
            delete: 'Видалити',
        },
    },
};

const i18n = createI18n({
    // locale: 'en',
    // fallbackLocale: 'uk',
    locale: 'uk',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
