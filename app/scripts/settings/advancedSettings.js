'use strict'

angular.module('serinaApp').component('advancedSettings', {
  controller: function AdvancedSettings ($rootScope, $i18next, DataAccessor, Toast) {

    this.toggleCustomTranslationsPathStatus = function (customTranslationsPathEnabled) {
      $rootScope.settings.customTranslationsPathEnabled = customTranslationsPathEnabled;
      $rootScope.saveSettings()

      this.updateAdvancedSettings()
    }

    this.saveCustomTranslationsPath = function (customTranslationsPath) {
      $rootScope.settings.customTranslationsPath = customTranslationsPath
      $rootScope.saveSettings()
      
      this.updateAdvancedSettings()
    }

    this.toggleSortAscJson = function (enableSortAscJson) {
      $rootScope.settings.enableSortAscJson = enableSortAscJson
      $rootScope.saveSettings()

      this.updateAdvancedSettings()
    }

    this.updateAdvancedSettings = function () {
      var customTranslationsPath = $rootScope.settings.customTranslationsPathEnabled && $rootScope.settings.customTranslationsPath ? $rootScope.settings.customTranslationsPath : '-1'
      DataAccessor.updateAdvancedSettings(customTranslationsPath, $rootScope.settings.enableSortAscJson).then(function () {
        console.log('Advanced settings is successfully settled')
      }, function (response) {
        Toast.showCustomToast('error', $i18next.t('commons.toast.advancedSettings.fail'), 'fail')
        console.error('Unable to set advanced settings', response)
      })
    }

  },
  templateUrl: 'views/settings/advanced-settings.html'
})
