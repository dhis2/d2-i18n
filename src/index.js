import i18next from 'i18next'

if (!i18next.isInitialized) {
    i18next.init({
        resources: undefined,

        lng: 'en',
        fallbackLng: 'en',

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
