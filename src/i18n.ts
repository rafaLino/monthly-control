import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import { format, Locale } from 'date-fns';
import { enUS, ptBR, es } from 'date-fns/locale';
import { capitalize } from './lib/utils';

const locales: Record<string, Locale> = { en: enUS, br: ptBR, es: es };
const currencies: Record<string, { locale: string, currency: string }> = {
    br: {
        locale: 'pt-br',
        currency: 'BRL'
    }, en: {
        locale: 'en-US',
        currency: 'USD'
    },
    es: {
        locale: 'es-ES',
        currency: 'EUR'
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'br',
        debug: false,
        returnNull: false,
        supportedLngs: ['br', 'en', 'es'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

i18n.services.formatter?.add('DATE_FORMAT', (value, lng, { context }) => {
    return format(value, context?.format ?? 'MMMM y', { locale: locales[lng ?? 'en'] });
});

i18n.services.formatter?.addCached('CURRENCY_FORMAT', (lng) => {
    const currencyFormat = currencies[lng ?? 'en'];
    const formatter = new Intl.NumberFormat(currencyFormat.locale, { style: 'currency', currency: currencyFormat.currency });
    return (value) => {
        if (!value && value !== 0) return '';
        return formatter.format(value);
    };
});

i18n.services.formatter?.add('PERCENTAGE_FORMAT', (value) => {
    if (!value) return '0.00%';
    return (value * 100).toFixed(2) + '%';
});

i18n.services.formatter?.add('capitalize', (value) => {
    return capitalize(value);
});

export default i18n;