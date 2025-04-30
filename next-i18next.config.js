// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
    i18n: {
        defaultLocale: 'cs', // Váš výchozí jazyk
        locales: ['cs', 'en', 'vi', 'zh-TW'], // Seznam podporovaných jazyků
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',

    reloadOnPrerender: process.env.NODE_ENV === 'development',
    // Pokud máte další nastavení, můžete je přidat sem
}; 