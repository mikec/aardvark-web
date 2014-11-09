aardvarkweb.PlaylistCtrl = ['$routeParams', 'API',
function($routeParams, API) {

    var $this = this;
    this.handle = $routeParams.handle;
    this.twitterUser = null;
    this.loading = true;

    API.getTwitterUser(this.handle)
        .then(function(twitterUser) {
            $this.loading = false;
            $this.twitterUser = twitterUser;
        });

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);