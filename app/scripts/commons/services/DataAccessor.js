'use strict'

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getLanguages: function () {
      return $http.get($rootScope.endPoint + '/languages')
    },

    openLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/language/' + language + '/open')
    },

    downloadLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/language/' + language + '/download')
    },

    addLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/language/' + language + '/create')
    },

    deleteLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/language/' + language + '/delete')
    },

    addGroup: function (groupName, languages, levels) {
      return $http.post($rootScope.endPoint + '/group/add', { groupName: groupName, languages: languages, levels: levels })
    },

    majGroup: function (groupName, languages, levels, originalGroupName) {
      return $http.post($rootScope.endPoint + '/group/update', { groupName: groupName, languages: languages, levels: levels, originalGroupName: originalGroupName })
    },

    deleteGroup: function (groupName, languages, levels) {
      return $http.post($rootScope.endPoint + '/group/delete', { groupName: groupName, languages: languages, levels: levels })
    },

    addTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/add', { languages: languages, levels: levels, translation: translation })
    },

    majTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/update', { languages: languages, levels: levels, translation: translation })
    },

    deleteTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/delete', { languages: languages, levels: levels, translation: translation })
    },

    setCustomTranslationPathOnApi: function (customTranslationsPath) {
      return $http.post($rootScope.endPoint + '/settings/set-custom-translation-path', { customTranslationsPath: customTranslationsPath })
    }

  }
})
