## About

d2-i18n contains a default configuration set on top of [i18next library](https://www.i18next.com)

- [API](https://www.i18next.com/api.html)
- [Interpolation](https://www.i18next.com/interpolation.html)
- [Frameworks](https://www.i18next.com/supported-frameworks.html)

## Installation
```bash
yarn add @dhis2/d2-i18n @dhis2/d2-i18n-generate @dhis2/d2-i18n-extract
```

## package.json
Under **scripts** section,
- Add commands *extract-pot*, *localize*
- Prepend *localize* command to *prestart* and *build* steps

```js
"extract-pot": "d2-i18n-extract -p src/ -o i18n/",
"localize": "yarn extract-pot && d2-i18n-generate -n NAMESPACE -p ./i18n/ -o ./src/locales/"
"prestart": "yarn localize && d2-manifest package.json ./public/manifest.webapp",
"build": "yarn localize && node scripts/build.js"
```

## In App Code
On dev/build phase *src/locales* directory would be created. It will contain necessary setup for internationalization, date/time, calendar etc. It is auto-generated, so please don't update it, any changes to it will be lost.

At the top of *src/index.js* (assuming it's the main entry point to your App). Add the following,

```js
import './locales'
```

### Changing User Locale
Create a function *changeLocale* and *isLangRTL* as below. You should call this function in App loading phase.

```js
function isLangRTL(code) {
    const langs = ['ar', 'fa', 'ur']
    const prefixed = langs.map(c => `${c}-`)
    return langs.includes(code) || prefixed.filter(c => code.startsWith(c)).length > 0
}

function changeLocale(userSettings) {
    const locale = userSettings.keyUiLocale
    i18n.changeLanguage(locale)
    document.body.setAttribute('dir', isLangRTL('rtl') ? 'rtl' : 'ltr')
}
```

### Translations
String passed into i18n.t will translate text

```js
import i18n from '@dhis2/d2-i18n'
i18n.t('translation string');
```

## .gitignore
Append directory *src/locales* at the end. Because on dev/build phase *src/locales* is auto-generated.

## Upgrade
__yarn__
```bash
yarn upgrade --scope @dhis2
```

## .travis.yml
In *.travis.yml* before build/deploy step add `yarn localize`

## RTL CSS / Right to Left Styles
Include postcss-rtl plugin as follows inside your webpack.config.*dev/prod*.js

```js
require('postcss-cssnext'),
require('postcss-rtl'),
require('postcss-flexbugs-fixes'),
```

## Commit Hooks
```bash
$>  yarn add i18next husky@next prettier
```

```
"prettify": "prettier \"src/**/*.{js,jsx,json,css}\" --write",
```

Add pre-commit hook to extract _en.pot_ file. It will extract translation strings from _src/_ directory with file extensions _*.js, *.jx_. On finish it place _en.pot_ file inside _i18n/en.pot_ directory

```json
"husky": {
      "hooks": {
          "pre-commit": "yarn extract-pot && yarn prettify && CI=true yarn test && git add -A ."
      }
  }
```

**Note**
We don't use _react-i18next_ because handling cursor in editor with the mixing of ASCII and RTL characters is very messy. ASCII characters move the cursor to one end of the line while RTL characters take cursor to the opposite end. Additionally using variables in RTL language strings doesn't work as the first sequence of _{{_ might be entered correctly but the next sequence of _}}_ simply flows in the opposite direction making it impossible to translate.
