'use strict'

angular.module('serinaApp').directive('listLanguagesForPreview', function ($log, $timeout, $rootScope, DataAccessor, Upload) {
  return {
    restrict: 'E',
    templateUrl: 'views/preview/list-languages-for-preview.html',
    link: function (scope) {

      var recoverListLanguagesForPreview = function () {
        DataAccessor.getLanguages().then(function (response) {
          scope.listLanguages = response.data
        }, function (response) {
          console.error('Unable to retrieve languages list', response)
        })
      }

      scope.previewLanguage = function (languageCode) {
        scope.selectedLanguage = languageCode
        DataAccessor.openLanguage(languageCode).then(function (response) {
          scope.previewJson = response.data
        }, function (response) {
          $log.error('Unable to preview language ' + languageCode, response)
        })
      }

      scope.upload = function (files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i]
            if (!file.$error) {
              Upload.upload({
                url: $rootScope.endPoint + '/language/import',
                method: 'POST',
                data: {
                  file: file
                }
              }).then(function () {
                console.debug('the file has been successfully imported');
              }, null, function (evt) {
                console.debug('Event', evt);
              })
            }
          }
        }
      }


      recoverListLanguagesForPreview()

      scope.$watch('files', function () {
        scope.upload(scope.files)
      })

    }
  }
})
