var i18next = require('i18next')

i18next.init({
  resources: undefined,

  lng: undefined,
  fallbackLng: undefined,

  debug: false,
  ns: ['translation'],
  defaultNS: 'translation',
  fallbackNS: false,

  returnEmptyString: true,
  returnObjects: false,

  keySeparator: false,
  react: {
    wait: true,
  }
});

module.exports = i18next