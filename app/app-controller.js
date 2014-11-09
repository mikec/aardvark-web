/**
 * App controller.
 */
aardvarkweb.AppCtrl = ['$scope', function($scope) {

    var $this = this;

    this.song = null;
    this.rdioReady = false;
    this.authed = false;
    this.rdioUserName = null;

    this.rdioAuth = function() {
        R.authenticate(function(nowAuthenticated) {
            $scope.$apply(function() {
                $this.rdioUserName = getUsername();
            });
        });
    };

    R.ready(function() {
        $this.rdioReady = true;
        $this.authed = R.authenticated();
        if ($this.authed) {
            $this.rdioUserName = getUsername();
        }
        $scope.$apply();
    });

    function getUsername() {
        return R.currentUser.get('firstName') + ' ' + R.currentUser.get('lastName');
    }

}];

aardvarkweb.controller('AppCtrl', aardvarkweb.AppCtrl);