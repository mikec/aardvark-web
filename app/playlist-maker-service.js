aardvarkweb.PlaylistMaker = ['$rootScope', '$q', function($rootScope, $q) {

    function PlaylistMaker() {}

    PlaylistMaker.prototype.getPlaylist = function(artistIds) {

        var def = $q.defer();

        R.request({
            method: 'get',
            content: {
                keys: artistIds.join(',')
            },
            success: function(resp) {
                var songs = [];
                for(var i in resp.result) {
                    songs.push(resp.result[i]);
                }
                def.resolve(songs);
            },
            error: function(err) {
                def.reject(err);
            }
        });

        return def.promise;

    };

    return new PlaylistMaker();

}];

aardvarkweb.factory('PlaylistMaker', aardvarkweb.PlaylistMaker);