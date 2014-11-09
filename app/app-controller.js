/**
 * App controller.
 */
aardvarkweb.AppCtrl = ['API', '$scope', function(API, $scope) {

    var $this = this;

    this.song = null;
    this.rdioReady = false;
    this.authed = false;
    this.rdioUserName = null;

    this.rdioAuth = function() {
        R.authenticate(function(nowAuthenticated) {
            $this.rdioUserName = getUsername();
            $scope.$apply();
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

    API.getArtists()
        .then(function(resp) {
            $this.song = resp.song;
        });

    function getUsername() {
        return R.currentUser.get('firstName') + ' ' + R.currentUser.get('lastName');
    }

}];

aardvarkweb.controller('AppCtrl', aardvarkweb.AppCtrl);