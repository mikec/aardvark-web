aardvarkweb.PlaylistCtrl = ['$routeParams', '$rootScope', 'API', 'PlaylistMaker', 'Rdio',
function($routeParams, $rootScope, API, PlaylistMaker, Rdio) {

    var $this = this;
    this.handle = $routeParams.handle;
    this.Rdio = Rdio;
    this.PlaylistMaker = PlaylistMaker;
    this.twitterUser = null;
    this.loading = true;
    this.playingTrackKey = null;
    this.playState = null;

    API.getTwitterUser(this.handle)
        .then(function(twitterUser) {
            $this.loading = false;
            $this.twitterUser = twitterUser;

            PlaylistMaker.getPlaylist(twitterUser.artistKeys);
        });

    $rootScope.$on('Rdio:change:playingTrack', function(event, track) {
        if(track) {
            $this.playingTrackKey = track.attributes.key;
        }
    });

    $rootScope.$on('Rdio:change:playState', function(event, playState) {
        $this.playState = playState == R.player.PLAYSTATE_PAUSED ? 'paused' :
                            (playState == R.player.PLAYSTATE_PLAYING ? 'playing' :
                                (playState == R.player.PLAYSTATE_STOPPED ? 'stopped' : null));
    });

    this.playTrack = function(key) {
        if(key != this.playingTrackKey) {
            Rdio.play(key);
        } else {
            Rdio.togglePause();
        }
    };

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);