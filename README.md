# Usage


It has default configuration related to Dhis2 project. Upon import i18n is an abstraction on top of [i18next library](https://www.i18next.com)

- [API](https://www.i18next.com/api.html)
- [Interpolation](https://www.i18next.com/interpolation.html)
- [Frameworks](https://www.i18next.com/supported-frameworks.html)


## Import
```js
import i18n from 'dhis2-i81n'
```

## Add Language

```
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
i18next.setDefaultNamespace(ns)
```

for e.g. *translations-app* the ns value would be *translations-app*


## Change/Set Language

will set the current language for frontend app.

```js
i18next.changeLanguage(lng)
```
