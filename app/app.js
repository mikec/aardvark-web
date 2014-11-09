aardvarkweb.config(['APIProvider', '$httpProvider', '$routeProvider', '$locationProvider',
function(APIProvider, $httpProvider, $routeProvider, $locationProvider) {

    $httpProvider.defaults.headers.common['Content-Type'] =
           'application/json';

    APIProvider.setApiRoot('http://localhost:3000');

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'search.html',
        controller: 'SearchCtrl',
        controllerAs: 'ctrl'
    });

    $routeProvider.when('/:handle', {
        templateUrl: 'playlist.html',
        controller: 'PlaylistCtrl',
        controllerAs: 'ctrl'
    });

}]);

aardvarkweb.run(function() { });