aardvarkweb.API = function() {

    var apiRoot;

    this.setApiRoot = function(_apiRoot) {
        apiRoot = _apiRoot;
    };

    this.$get = ['$http', function($http) {

        function API() {}

        API.prototype.getTwitterUser = function(twitterHandle) {
            return railsGet('/' + twitterHandle);
        };

        function railsGet(url) {
            return $http.get(apiRoot + url)
                        .then(function(resp) {
                            var usr = resp.data.twitter_user;

                            usr.artistKeys = usr.songs.map(function(s) {
                                var segs = s.rdio_id.split(':');
                                return segs[segs.length - 1];
                            });

                            return usr;
                        });
        }

        return new API();

    }];

};

aardvarkweb.provider('API', aardvarkweb.API);