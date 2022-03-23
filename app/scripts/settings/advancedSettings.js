'use strict'

angular.module('serinaApp').component('advancedSettings', {
  controller: function AdvancedSettings ($rootScope) {

    this.toggleCustomTranslationsPathStatus = function (customTranslationsPathEnabled) {
      $rootScope.settings.customTranslationsPathEnabled = customTranslationsPathEnabled;
      $rootScope.saveSettings()
    }

    this.saveCustomTranslationsPath = function (customTranslationsPath)
    {
      $root.settings.customTranslationsPath = customTranslationsPath
      $rootScope.saveSettings()
    }

  },
  templateUrl: 'views/settings/advanced-settings.html'
})
