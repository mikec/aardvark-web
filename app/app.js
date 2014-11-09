aardvarkweb.config(['APIProvider', '$httpProvider',
function(APIProvider, $httpProvider) {

    $httpProvider.defaults.headers.common['Content-Type'] =
           'application/json';

    APIProvider.setApiRoot('http://localhost:3000');

}]);

aardvarkweb.run(function() { });