'use strict'

angular.module('serinaApp').directive('toolbar', function ($timeout, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'views/commons/directives/toolbar.html',
    link: function (scope) {

      scope.searchOpen = false;
      scope.search = null

      var clearMatchingElements = function () {
        scope.matchingElements = []
      }

      scope.initiateSearch = function () {
        scope.search = ''
        clearMatchingElements()
        scope.searchOpen = true
        $timeout(function () {
          document.getElementById('search-input').focus()
        }, 50)
      }

      scope.showPreSearchBar = function () {
        return scope.search === null
      }

      scope.endSearch = function () {
        scope.search = null
        clearMatchingElements()
        document.getElementById('search-input').blur()
        scope.currentMatchingElement = 0
        scope.searchOpen = false;
      }

      scope.searchKey = function () {
        if (scope.search !== '') {
          var inputKeys = document.querySelectorAll('translation md-card .key')
          scope.matchingElements = []
          scope.currentMatchingElement = 0
          for (var iterator = 0; iterator < inputKeys.length; iterator++) {
            if (inputKeys[iterator].value.toLowerCase().indexOf(scope.search.toLowerCase()) !== -1) {
              scope.matchingElements.push(inputKeys[iterator])
            }
          }

          if (scope.matchingElements.length === 0) {
            scope.endSearch()
          } else {
            scope.matchingElements[0].focus()
          }
        }
      }

      scope.navigateBetweenMatchingElements = function (sign) {
        if (sign === '-' || sign === '+') {
          if (sign === '-') {
            scope.currentMatchingElement--
            if (scope.currentMatchingElement < 0) {
              scope.currentMatchingElement = scope.matchingElements.length - 1
            }
          } else if (sign === '+') {
            scope.currentMatchingElement++
            if (scope.currentMatchingElement > scope.matchingElements.length - 1) {
              scope.currentMatchingElement = 0
            }
          }
          scope.matchingElements[scope.currentMatchingElement].focus()
        }
      }

      Mousetrap.bindGlobal('ctrl+f', function (e) {
        if (e.preventDefault) {
          e.preventDefault()
        }
        if ($rootScope.breadcrumb[0].href !== '/hub' && $rootScope.breadcrumb[0].href !== '/preview' && $rootScope.breadcrumb[0].href !== '/settings') {
          if (scope.searchOpen) {
            scope.$apply(function () {
              scope.endSearch()
            })
          } else {
            scope.$apply(function () {
              scope.initiateSearch()
            })
          }
        }
      })

      Mousetrap.bindGlobal('ctrl+up', function () {
        if (scope.matchingElements) {
          scope.navigateBetweenMatchingElements('-')
        }
      })

      Mousetrap.bindGlobal('ctrl+down', function () {
        if (scope.matchingElements) {
          scope.navigateBetweenMatchingElements('+')
        }
      })

    }
  }
})
