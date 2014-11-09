aardvarkweb.API = function() {

    var apiRoot;

    this.setApiRoot = function(_apiRoot) {
        apiRoot = _apiRoot;
    };

    this.$get = ['$http', function($http) {

        function API() {}

        API.prototype.getTwitterUser = function(twitterHandle) {
            return railsGet('/' + twitterHandle)
                    .then(function(resp) {
                            var usr = resp.data.twitter_user;

                            usr.image_url = usr.image_url
                                                .replace('_normal', '_400x400');

                            usr.artistKeys = usr.songs.map(function(s) {
                                var segs = s.rdio_id.split(':');
                                return segs[segs.length - 1];
                            });

                            return usr;
                        });
        };

        API.prototype.getTwitterUsers = function() {
            return railsGet('/').then(function(resp) {
                            var users = resp.data.twitter_users;

                            for(var i in users) {
                                var u = users[i];
                                u.image_url = u.image_url
                                                .replace('_normal', '_400x400');
                            }

                            return users;
                        });
        };

        function railsGet(url) {
            return $http.get(apiRoot + url);
        }

        return new API();

    }];

};

aardvarkweb.provider('API', aardvarkweb.API);