aardvarkweb.PlaylistMaker = ['$rootScope', 'Rdio', function($rootScope, Rdio) {

    var $this;
    var stationLoadingQueue = [];
    var stationKeys = [];

    function PlaylistMaker() {
        $this = this;
        this.loading = false;
        this.percentLoaded = 0;
        this.songs = [];
    }

    PlaylistMaker.prototype.getPlaylist = function(artistKeys) {

        this.songs = [];
        this.loading = true;
        this.percentLoaded = 0;
        stationLoadingQueue = [];
        stationKeys = [];

        Rdio.getArtists(artistKeys)
                .then(function(artists) {
                    stationKeys = artists.map(function(a) {
                        return a.topSongsKey;
                    });
                    stationLoadingQueue.push.apply(stationLoadingQueue, stationKeys);
                    loadNextQueuedStation();
                });

    };

    function loadNextQueuedStation() {
        if(stationLoadingQueue.length > 0) {
            updatePercentLoaded();
            var stationKey = stationLoadingQueue.shift();
            Rdio.getTopSongStations([stationKey])
                .then(function(stations) {
                    for(var i in stations) {
                        var t = stations[i];
                        if(t.tracks && t.tracks.length > 0) {
                            $this.songs.push(t.tracks[0]);
                        }
                    }
                    loadNextQueuedStation();
                });
        } else {
            $this.loading = false;
        }
    }

    function updatePercentLoaded() {
        var tot = stationKeys.length;
        var done = tot - stationLoadingQueue.length;
        $this.percentLoaded = Math.round((done / tot)*100);
    }

    return new PlaylistMaker();

}];

aardvarkweb.factory('PlaylistMaker', aardvarkweb.PlaylistMaker);