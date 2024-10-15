// src/i18n.js
import { createI18n } from 'vue-i18n';
import { getCitiesByLocale } from '@/data/cities'; // Импортируем функцию для получения городов

const messages = {
    en: {
        header: {
            home: 'Home',
            favorite: 'Favorite',
        },
        weather: {
            placeholder: 'Enter city...',
        },
    },
    uk: {
        header: {
            home: 'Головна',
            favorite: 'Улюблене',
        },
        weather: {
            placeholder: 'Напишить місто...',
        },
    },
};

const i18n = createI18n({
    locale: 'en', // Начальная язык
    fallbackLocale: 'uk',
    messages,
});

export default i18n;
