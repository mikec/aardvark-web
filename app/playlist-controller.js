aardvarkweb.PlaylistCtrl = ['$routeParams', 'API', 'PlaylistMaker', 'Rdio',
function($routeParams, API, PlaylistMaker, Rdio) {

    var $this = this;
    this.handle = $routeParams.handle;
    this.Rdio = Rdio;
    this.twitterUser = null;
    this.loading = true;
    this.playlist = [];

    API.getTwitterUser(this.handle)
        .then(function(twitterUser) {
            $this.loading = false;
            $this.twitterUser = twitterUser;

            PlaylistMaker.getPlaylist(twitterUser.artistKeys)
                .then(function(playlist) {
                    $this.playlist = playlist;
                });
        });

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);