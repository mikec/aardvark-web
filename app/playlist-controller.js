aardvarkweb.PlaylistCtrl = ['$routeParams', 'API', 'PlaylistMaker',
function($routeParams, API, PlaylistMaker) {

    var $this = this;
    this.handle = $routeParams.handle;
    this.twitterUser = null;
    this.loading = true;
    this.playlist = [];

    API.getTwitterUser(this.handle)
        .then(function(twitterUser) {
            $this.loading = false;
            $this.twitterUser = twitterUser;

            PlaylistMaker.getPlaylist(['r48259', 'r2291142'])
                .then(function(playlist) {
                    console.log(playlist);
                    $this.playlist = playlist;
                });
        });

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);