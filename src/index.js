import i18next from 'i18next'

if (!i18next.isInitialized) {
    i18next.init({
        resources: undefined,

        lng: 'en',
        fallbackLng: {
            ar_IQ: ['ar'],
            ar_EG: ['ar'],
            ar_SD: ['ar'],
            es_419: ['es'],
            pt_BR: ['pt'],
            uz_Cyrl: ['uz_UZ_Cyrl'],
            uz_Latn: ['uz_UZ_Latn'],
            zh_CN: ['zh'],
            default: ['en'],
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
