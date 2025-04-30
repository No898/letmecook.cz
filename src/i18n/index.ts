import { createInstance, i18n as I18nInstanceType } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions, defaultNS } from './settings'

export const initI18nextInstance = async (lng: string, ns: string | string[]): Promise<I18nInstanceType> => {
    const i18nInstance = createInstance()
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
        .init(getOptions(lng, Array.isArray(ns) ? ns[0] : ns || defaultNS))
    return i18nInstance
}

export type TFunction = I18nInstanceType['t']; 