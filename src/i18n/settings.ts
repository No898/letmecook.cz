export const fallbackLng = 'cs';
export const languages = [fallbackLng, 'en', 'vi', 'zh-TW'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        // debug: true, // Povolte pro ladění
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
} 