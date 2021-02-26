## Purpose

Provides internationization support for d2 frontend Apps.

-   i18n
-   Date/Time
-   Calendar
-   Monitoring translations [documentation](https://github.com/dhis2/d2-i18n-monitor), [website](https://dhis2.github.io/d2-i18n-monitor/#/)

## Installation

```bash
yarn add @dhis2/d2-i18n
```

## Extracting and generating locale strings

Extraction and generation are performed automatically by the `build` and `start` commands of [@dhis2/cli-app-scripts](https://platform.dhis2.nu). Optionally, they can be run independent of the build as well:

```sh
yarn d2-app-scripts i18n extract
yarn d2-app-scripts i18n generate
```

## In App Code

On dev/build phase _src/locales_ directory would be created. It will contain necessary setup for internationalization, date/time, calendar etc. It is auto-generated, so please don't update it, any changes to it will be lost.

At the top of _src/index.js_ (assuming it's the main entry point to your App). Add the following,

```js
import './locales'
```

### Changing User Locale

Create a function _changeLocale_ and _isLangRTL_ as below. You should call this function in App loading phase.

```js
function isLangRTL(code) {
    const langs = ['ar', 'fa', 'ur']
    const prefixed = langs.map(c => `${c}-`)
    return (
        langs.includes(code) ||
        prefixed.filter(c => code.startsWith(c)).length > 0
    )
}

function changeLocale(locale) {
    moment.locale(locale)
    i18n.changeLanguage(locale)
    document.documentElement.setAttribute(
        'dir',
        isLangRTL(locale) ? 'rtl' : 'ltr'
    )
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
i18n.t('hello world', {
    context: 'a customary string to welcome a new born developer',
})
```

_extract-pot_ will automatically generate _msgctxt_ field before _msgid_ in the en.pot file, giving translators a better context for translations.

```
msgctxt "a customary string to welcome a new born developer"
msgid "hello world"
msgstr ""
```

## .gitignore

Append directory _src/locales_ at the end. Because on dev/build phase _src/locales_ is auto-generated.

## Upgrade

**yarn**

```bash
yarn upgrade --scope @dhis2
```

## .travis.yml

In _.travis.yml_ before build/deploy step add `yarn localize`

## Notes

-   We don't use _react-i18next_ because handling cursor in text editor when ASCII and RTL characters are mixed is impossible to edit. Some ASCII characters move the cursor to one end of the line while RTL characters take cursor to the opposite end. Using variables in RTL language strings do not work because the first _{{_ might be entered correctly when translating but when we go to type the ending sequence _}}_ the cursor ends up in the wrong place making it impossible to translate.

## Report an issue

The issue tracker can be found in [DHIS2 JIRA](https://jira.dhis2.org)
under the [LIBS](https://jira.dhis2.org/projects/LIBS) project.

Deep links:

-   [Bug](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10006&components=11013)
-   [Feature](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10300&components=11013)
-   [Task](https://jira.dhis2.org/secure/CreateIssueDetails!init.jspa?pid=10700&issuetype=10003&components=11013)
