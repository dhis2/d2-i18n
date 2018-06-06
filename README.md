## About

d2-i18n contains a default configuration set on top of [i18next library](https://www.i18next.com)

- [API](https://www.i18next.com/api.html)
- [Interpolation](https://www.i18next.com/interpolation.html)
- [Frameworks](https://www.i18next.com/supported-frameworks.html)

## Installation

Use either yarn or npm depending on project configuration.

__yarn__
```bash
yarn add @dhis2/d2-i18n @dhis2/d2-i18n-generate @dhis2/d2-i18n-extract
```

__npm__
```bash
npm install --save @dhis2/d2-i18n @dhis2/d2-i18n-generate @dhis2/d2-i18n-extract
```

## package.json
// TODO

## In App Code
On dev/build phase *src/locales* directory would be created. It will contain necessary setup for internationalization, date/time, calendar etc. It is auto-generated, so please don't update it, any changes to it will be lost.

At the top of *src/index.js* (assuming it's the main entry point to your App). Add the following,

```js
import { config, getUserSettings } from 'd2/lib/d2';
```

### Change Locale
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


4. RTL CSS
5. Integration
6. Date/Time
7. Build / Travis



## RTL CSS / Right to Left Styles
Include postcss-rtl plugin as follows inside your webpack.config.*dev/prod*.js

```js
require('postcss-cssnext'),
require('postcss-rtl'),
require('postcss-flexbugs-fixes'),
```

**Note**

We don't use _react-i18next_ because handling cursor in editor with the mixing of ASCII and RTL characters is very messy. ASCII characters move the cursor to one end of the line while RTL characters take cursor to the opposite end. Additionally using variables in RTL language strings doesn't work as the first sequence of _{{_ might be entered correctly but the next sequence of _}}_ simply flows in the opposite direction making it impossible to translate.


## Integration

```bash
$>  yarn add i18next husky@next prettier
```

- *d2-i18n-extract* is used to extract translation strings.
- *d2-i18n-generate* is used to generate localization files for frontend project. Currently is limited to loading language _translations_. But in future it can extended to manage date/time/calendar settings for a particular locale.
- *husky*: to add pre-commit hooks, to _auto-generate_ en.pot file.

If you run into package update problems with any _d2-_ packages. Please use `npm update package-name` which should update _package-lock.json_ file and install the required updates.


### In App's package.json

#### Generate en.pot

Inside *scripts* section, add the *extract-pot* command below. It will use

```
"extract-pot": "d2-i18n-extract -p src/ -o i18n/",
```

add prettify command inside scripts.

```
"prettify": "prettier \"src/**/*.{js,jsx,json,css}\" --write",
```

Add pre-commit hook to extract _en.pot_ file. It will extract translation strings from _src/_ directory with file extensions _*.js, *.jx_. On finish it place _en.pot_ file inside _i18n/en.pot_ directory

```json
"husky": {
      "hooks": {
          "pre-commit": "npm run extract-pot && npm run prettify && CI=true npm run test && git add -A ."
      }
  }
```

#### Generate localization files

Inside *scripts* section, add the *localize* command below.

```json
"localize": "npm run extract-pot && d2-i18n-generate -n NAMESPACE -p ./i18n/ -o ./src/locales/"
```

We default on en.pot file so there will not be an _en.po_ file.

- It will pick all _po or pot_ files from  _./i18n/_ directory. Filename would be used as a language code.
- i18next compatible translations would be output into _./src/locales/_
- Specify *NAMESPACE* so translation strings from different package's don't collide across app switching in UI.

##### On prestart / start / build

Because localization or translations files inside our repo's will be auto-generated so they are not part of our code base. Only en.pot and language related .po files are part of our code base.

Therefore, you must generate the localization before they are needed anywhere, for e.g. in *development* or *production*. To generate them for _build/prestart_ you must prepend the *localize* command as below inside the _scripts_ section of _package.json_.

```js
"prestart": "npm run localize && d2-manifest package.json ./public/manifest.webapp",
"build": "npm run localize && node scripts/build.js"
```

### Date/Time

_d2-i18n-generate_ will generate _locales/index.js_. In _locales/index.js_ we import date/time configuration for only the languages localized to the particular app.

**Example**

If our _dhis-example-app_ is localized to support languages, Swedish and Urdu. Then generated _locales/index.js_ will only import moment language support for Swedish and Urdu. Benefit of using [moment](https://momentjs.com/) is it's supported across javascript frameworks and libraries.

Inside your _index.js_ or _App.js_ where you initialize your _App_. You must import *locales* for example,
```js
import './locales'
```

#### Localizing Date/Time

Fetch current user _lang/locale_ from server and set using _moment.locale_

**Example**
```js
import moment from 'moment'
moment.locale(USER_LANG)
```

### Travis .travis.yml

Before build/deploy part add the `npm run localize` so that localization files are available otherwise code will not work.
