
## About

d2-i18n contains a default configuration set on top of [i18next library](https://www.i18next.com)

- [API](https://www.i18next.com/api.html)
- [Interpolation](https://www.i18next.com/interpolation.html)
- [Frameworks](https://www.i18next.com/supported-frameworks.html)

## Install

```bash
yarn add d2-i18n
```

### Usage (Import and Change Language)

Include locales inside the top of your **index.js**

#### Import
```js
import i18n from './locales';
import { config, getUserSettings } from 'd2/lib/d2';
```

#### Set Language

i18n configuration function

```js
const configI18n = userSettings => {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale && uiLocale !== 'en') {
        config.i18n.sources.add(`./i18n/i18n_module_${uiLocale}.properties`);
    }

    config.i18n.sources.add('./i18n/i18n_module_en.properties');
    i18n.changeLanguage(uiLocale);
};
```

inside App initialization,

```
getUserSettings()
    .then(configI18n)
    .then(() => {
        ReactDOM.render(
            <!-- D2UIApp Rendering Code --->,
            document.getElementById('root')
        );
    });
```

## Upgrade

```bash
yarn upgrade d2-i18n
```

## RTL CSS / Right to Left Styles
Include postcss-rtl plugin as follows inside your webpack.config.*dev/prod*.js

```js
require('postcss-cssnext'),
require('postcss-rtl'),
require('postcss-flexbugs-fixes'),
```

Add **dir="ltr"** to *index.html* file. When switching to RTL language set **dir="rtl"**. Your CSS will automatically present it self in RTL format.


## In Code
String passed into i18n.t will translate text w.r.t. current language set.

```js
i18n.t('translation string');
```

**Note**

We don't use _react-i18next_ because handling cursor in editor with the mixing of ASCII and RTL characters is very messy. ASCII characters move the cursor to one end of the line while RTL characters take cursor to the opposite end. Additionally using variables in RTL language strings doesn't work as the first sequence of _{{_ might be entered correctly but the next sequence of _}}_ simply flows in the opposite direction making it impossible to translate.


## Integration

```bash
$>  yarn add i18next d2-i18n-extract d2-i18n-generate husky@next prettier
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

### Travis .travis.yml

Before build/deploy part add the `npm run localize` so that localization files are available otherwise code will not work.
