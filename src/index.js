import i18next from 'i18next'

if (!i18next.isInitialized) {
    i18next.init({
        resources: undefined,

        lng: 'en',
        fallbackLng: {
            pt_BR: 'pt',
            ar_IQ: 'ar',
            ar_SD: 'ar',
            zh_CN: 'zh',
            default: 'en',
        },

        debug: false,
        ns: ['translation'],
        defaultNS: 'translation',
        fallbackNS: false,
        nsSeparator: false,

        returnEmptyString: false,
        returnObjects: false,

        keySeparator: false,
        react: {
            wait: true,
        },
    })
}

export default i18next
