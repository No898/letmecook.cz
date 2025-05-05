import { createInstance, i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions, defaultNS, fallbackLng, languages } from './settings';

const initI18next = async (locale: string, namespaces: string | readonly string[] = defaultNS): Promise<i18n> => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) =>
            import(`../../public/locales/${language}/${namespace}.json`)
        ))
        .init(getOptions(locale, namespaces));
    return i18nInstance;
};

// Cache pro inicializované instance (optimalizace pro stejný request/render)
// Klíč je kombinace locale a namespaces
const i18nInstancesCache: { [key: string]: Promise<i18n> } = {};

export async function getTranslations(
    locale: string,
    namespaces: string | readonly string[] = defaultNS
): Promise<{ t: i18n['t'], i18n: i18n }> {
    // Normalizace locale a namespaces pro klíč cache
    const currentLocale = languages.includes(locale) ? locale : fallbackLng;
    const nsArray = Array.isArray(namespaces) ? namespaces : [namespaces];
    const cacheKey = `${currentLocale}-${nsArray.sort().join('+')}`;

    if (!i18nInstancesCache[cacheKey]) {
        // Pokud promise v cache neexistuje, vytvoříme ji
        i18nInstancesCache[cacheKey] = initI18next(currentLocale, nsArray);
    }

    // Vrátíme výsledek promise (buď nově vytvořené, nebo již existující)
    const i18nInstance = await i18nInstancesCache[cacheKey];

    return {
        t: i18nInstance.t,
        i18n: i18nInstance, // Vrátíme i instanci pro případné pokročilejší použití (např. formátování)
    };
}

export type TFunction = i18n['t']; 