aardvarkweb.config(
    ['APIProvider', 'PlaylistMakerProvider', '$httpProvider',
        '$routeProvider', '$locationProvider',
    function(APIProvider, PlaylistMakerProvider, $httpProvider,
        $routeProvider, $locationProvider) {

    $httpProvider.defaults.headers.common['Content-Type'] =
           'application/json';

    APIProvider.setApiRoot(window.CONFIG.aardvarkServerUrl);

    PlaylistMakerProvider.setSongLimit(15);

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