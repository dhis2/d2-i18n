
## About


It has default configuration related to DHIS2 project. Upon import i18n is an abstraction on top of [i18next library](https://www.i18next.com)

- [API](https://www.i18next.com/api.html)
- [Interpolation](https://www.i18next.com/interpolation.html)
- [Frameworks](https://www.i18next.com/supported-frameworks.html)

## Install

```bash
npm install --save d2-i18n
```


## Example
```js
import i18n from 'd2-i18n'

import enResources from './i18n/resources/en'
import urResources from './i18n/resources/ur'

// add all languages necessary
i18n.addResources('en', 'translations-app', enResources)
i18n.addResources('ur', 'translations-app', urResources)

i18n.setDefaultNamespace('translations-app')

i18n.changeLanguage('en')
i18n.t('translation string')      // translation string

i18n.changeLanguage('ur')
i18n.t('translation string')      // سٹرنگ کا ترجمعہ
```


## Import
```js
import i18n from 'd2-i18n'
```

## Add Language

```js
i18n.addResources(lng, ns, resources)
```

where,


**lng:** refers to the language e.g. *en*, *no* etc.

**ns:** Each frontend app will be namespaced. So we don't run into translation conflicts across apps.

**resources:** set of key value pairs representing a javascript object.

To set the correct namespace in translation resources, the following format will be adopted.

```json
"resources": {
  "en": {
    "frontend-app-name": {
      "translation string": "translation string"
    }
  },
  "ur": {
    "frontend-app-name": {
      "translation string": "سٹرنگ کا ترجمعہ"
    }
  }
}
```


## Set Namespace

```
i18n.setDefaultNamespace(ns)
```

for e.g. *translations-app* the ns value would be *translations-app*


## Change/Set Language

will set the current language for frontend app.

```js
i18n.changeLanguage(lng)
```


## In Code
String passed into i18n.t will translate text w.r.t. current language set.

```js
i18n.t('translation string');
```
