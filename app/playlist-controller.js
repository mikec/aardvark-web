aardvarkweb.PlaylistCtrl = ['$routeParams', 'API', 'PlaylistMaker', 'Rdio',
function($routeParams, API, PlaylistMaker, Rdio) {

    var $this = this;
    this.handle = $routeParams.handle;
    this.Rdio = Rdio;
    this.PlaylistMaker = PlaylistMaker;
    this.twitterUser = null;
    this.loading = true;

    API.getTwitterUser(this.handle)
        .then(function(twitterUser) {
            $this.loading = false;
            $this.twitterUser = twitterUser;

            PlaylistMaker.getPlaylist(twitterUser.artistKeys);
        });

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);