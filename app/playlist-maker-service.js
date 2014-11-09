aardvarkweb.PlaylistMaker = ['$rootScope', '$q', 'Rdio', function($rootScope, $q, Rdio) {

    function PlaylistMaker() {}

    PlaylistMaker.prototype.getPlaylist = function(artistKeys) {

        return Rdio.getArtists(artistKeys)
                .then(function(artists) {
                    var songKeys = artists.map(function(a) {
                        return a.topSongsKey;
                    });
                    return Rdio.getTopSongs(songKeys);
                })
                .then(function(topSongs) {
                    var songs = [];
                    for(var i in topSongs) {
                        var t = topSongs[i];
                        if(t.tracks && t.tracks.length > 0) {
                            songs.push(t.tracks[0]);
                        }
                    }
                    return songs;
                });

    };

    return new PlaylistMaker();

}];

aardvarkweb.factory('PlaylistMaker', aardvarkweb.PlaylistMaker);