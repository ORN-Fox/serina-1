'use strict'

angular.module('serinaApp').component('basicSettings', {
  controller: function BasicSettingsCtrl ($rootScope) {

    this.displayFormat = [
      { label: 'card', icon: 'view_agenda' },
      { label: 'list', icon: 'list' }
    ]

    this.changeDisplayFormat = function (format) {
      $rootScope.settings.selectedDisplayFormat = format
      $rootScope.saveSettings()
    }

    this.languages = [
      { code: 'en-US' },
      { code: 'es-ES' },
      { code: 'fr-FR' }
    ]

    this.changeLocaleOfApplication = function (language) {
      if (language != $rootScope.settings.locale) {
        $rootScope.settings.locale = language
        $rootScope.saveSettings()
        window.i18next.init({
          debug: false,
          lng: $rootScope.settings.locale,
          fallbackLng: '',
          backend: {
            loadPath: '../app/locales/' + $rootScope.settings.locale + '.json'
          },
          useCookie: false,
          useLocalStorage: false,
          initImmediate: false
        }, function (err) {
          if (err) { console.error('Unable to load translation', err) }
          console.log('Translation loaded')
        })
      }
    }

    this.changeKeepLanguagesEdit = function (keepLanguagesEdit) {
      $rootScope.settings.keepLanguagesEdit = keepLanguagesEdit
      $rootScope.saveSettings()
    }

  },
  templateUrl: 'views/settings/basic-settings.html'
})
