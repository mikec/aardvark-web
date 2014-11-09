/**
 * App controller.
 */
aardvarkweb.AppCtrl = ['$scope', 'Rdio', function($scope, Rdio) {

    this.Rdio = Rdio;

    this.rdioAuth = function() {
        Rdio.authenticate();
    };

}];

aardvarkweb.controller('AppCtrl', aardvarkweb.AppCtrl);