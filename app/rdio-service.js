aardvarkweb.Rdio = ['$rootScope', '$q', function($rootScope, $q) {

    var $this;

    function Rdio() {
        $this = this;
        this.ready = false;
        this.userName = null;
        this.authenticated = false;

        R.ready(function() {
            $this.ready = true;
            updateAuthStatus();
            $rootScope.$broadcast('Rdio:ready');
            $rootScope.$apply();
        });
    }

    Rdio.prototype.ready = function(fn) {
        return execWhenReady(fn);
    };

    Rdio.prototype.authenticate = function() {
        return execWhenReady(function() {
            authenticate();
        });
    };

    Rdio.prototype.play = function(trackKey) {
        return execWhenReady(function() {
            R.player.play({ source: trackKey });
        });
    };

    Rdio.prototype.get = function(keys) {
        return execWhenReady(function() {
            return get(keys);
        });
    };

    Rdio.prototype.getArtists = function(artistKeys) {
        return execWhenReady(function() {
            return get(
                artistKeys
                ,JSON.stringify([
                    {"field": "*", "exclude": true},
                    {"field": "name"},
                    {"field": "key"},
                    {"field": "type"},
                    {"field": "topSongsKey"}
                ])
            );
        });
    };

    Rdio.prototype.getTopSongStations = function(stationKeys) {
        stationKeys = stationKeys.splice(0, 3);
        return execWhenReady(function() {
            return get(
                stationKeys
                , JSON.stringify([
                    {"field": "*", "exclude": true},
                    {"field": "artistName"},
                    {
                        "field": "tracks",
                        /*"start": 0,
                        "count": 1,
                        "sort": "playCount",*/
                        "extras": [
                            {"field": "*", "exclude": true},
                            {"field": "name"},
                            {"field": "artist"},
                            {"field": "key"},
                            {"field": "playCount"},
                            {"field": "icon400"}
                        ]
                    }
                ])
            );
        });
    };

    function execWhenReady(fn) {
        var def = $q.defer();
        if($this.ready) {
            execFn();
        } else {
            $rootScope.$on('Rdio:ready', function() {
                execFn();
            });
        }

        function execFn() {
            var promise = fn();
            if(promise) {
                promise.then(function(result) {
                    def.resolve(result);
                }, function(err) {
                    def.reject(err);
                });
            } else {
                def.resolve();
            }
        }

        return def.promise;
    }

    function authenticate() {
        R.authenticate(function(authed) {
            if(authed) {
                $this.authenticated = true;
                $this.userName = getUsername();
                $rootScope.$apply();
            }
        });
    }

    function get(keys, extras) {

        var reqContent = {
            keys: keys.join(',')
        };

        if(extras) {
            reqContent.extras = extras;
        }

        return request(reqContent).then(function(resp) {
            var items = [];
            for(var i in resp.result) {
                items.push(resp.result[i]);
            }
            return items;
        });
    }

    function request(content) {

        var def = $q.defer();

        R.request({
            method: 'get',
            content: content,
            success: function(resp) {
                def.resolve(resp);
                $rootScope.$apply();
            },
            error: function(err) {
                def.reject(err);
                $rootScope.$apply();
            }
        });

        return def.promise;

    }

    function updateAuthStatus() {
        $this.authenticated = R.authenticated();
        $this.userName = getUsername();
    }

    function getUsername() {
        return R.currentUser.get('firstName') + ' ' + R.currentUser.get('lastName');
    }

    return new Rdio();

}];

aardvarkweb.factory('Rdio', aardvarkweb.Rdio);