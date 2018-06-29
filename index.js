var i18next = require('i18next')

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
  }
});

module.exports = i18next
