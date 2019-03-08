## Purpose

Provides internationization support for d2 frontend Apps.

- i18n
- Date/Time
- Calendar
- Monitoring translations [documentation](https://github.com/dhis2/d2-i18n-monitor), [website](https://dhis2.github.io/d2-i18n-monitor/#/)

## Installation
```bash
yarn add @dhis2/d2-i18n @dhis2/d2-i18n-generate @dhis2/d2-i18n-extract husky@next
```

## package.json
Under **scripts** section, add commands *extract-pot* and *localize*
```js
"extract-pot": "d2-i18n-extract -p src/ -o i18n/",
"localize": "yarn extract-pot && d2-i18n-generate -n NAMESPACE -p ./i18n/ -o ./src/locales/",
```

Prepend *localize* command to *prestart* and *build* steps
```js
"prestart": "yarn localize && d2-manifest package.json ./public/manifest.webapp",
"build": "yarn localize && node scripts/build.js",
```

### Commit Hooks

Add the __"husky"__ section adjacent to the __"scripts"__ section.

```json
"husky": {
      "hooks": {
            "pre-commit": "yarn extract-pot && CI=true yarn test && git add ./i18n/"
      }
}
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

function changeLocale(locale) {
      moment.locale(locale)
      i18n.changeLanguage(locale)
      document.documentElement.setAttribute('dir', isLangRTL(locale) ? 'rtl' : 'ltr')
}
```

### Translations
Pass strings to be translated into _i18n.t_ function as below.

```js
import i18n from '@dhis2/d2-i18n'
i18n.t('translation string')
```

#### Context
Pass _context_ property on second arg. to i18n.t
```js
i18n.t('hello world', { context: 'a customary string to welcome a new born developer'})
```

_extract-pot_ will automatically generate _msgctxt_ field before _msgid_ in the en.pot file, giving translators a better context for translations.
```
msgctxt "a customary string to welcome a new born developer"
msgid "hello world"
msgstr ""
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

## Notes
- We don't use _react-i18next_ because handling cursor in text editor when ASCII and RTL characters are mixed is impossible to edit. Some ASCII characters move the cursor to one end of the line while RTL characters take cursor to the opposite end. Using variables in RTL language strings do not work because the first _{{_ might be entered correctly when translating but when we go to type the ending sequence _}}_ the cursor ends up in the wrong place making it impossible to translate.
