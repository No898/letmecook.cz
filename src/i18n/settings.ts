export const fallbackLng = 'cs';
export const languages = [fallbackLng, 'en', 'vi', 'zh-TW'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns: string | readonly string[] = defaultNS) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS: defaultNS,
        ns: ns,
    };
} 