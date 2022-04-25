'use strict'

angular.module('serinaApp').component('advancedSettings', {
  controller: function AdvancedSettings ($rootScope, $i18next, DataAccessor, Toast) {

    this.toggleCustomTranslationsPathStatus = function (customTranslationsPathEnabled) {
      $rootScope.settings.customTranslationsPathEnabled = customTranslationsPathEnabled;
      $rootScope.saveSettings()

      if ($rootScope.settings.customTranslationsPathEnabled && $rootScope.settings.customTranslationsPath)
      {
        this.setCustomTranslationPathOnApi($rootScope.settings.customTranslationsPath)
      } else {
        this.setCustomTranslationPathOnApi('-1')
      }
    }

    this.saveCustomTranslationsPath = function (customTranslationsPath)
    {
      $rootScope.settings.customTranslationsPath = customTranslationsPath
      $rootScope.saveSettings()

      this.setCustomTranslationPathOnApi($rootScope.settings.customTranslationsPath)
    }

    this.setCustomTranslationPathOnApi = function (customTranslationsPath)
    {
      DataAccessor.setCustomTranslationPathOnApi(customTranslationsPath).then(function () {
        console.log('Custom path is successfully settled')
      }, function (response) {
        Toast.showCustomToast('error', $i18next.t('commons.toast.customTranslationsPath.fail'), 'fail')
        console.error('Unable to set custom translation path "' + customTranslationsPath + '"', response)
      })
    }

  },
  templateUrl: 'views/settings/advanced-settings.html'
})
