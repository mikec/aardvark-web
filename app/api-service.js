aardvarkweb.API = function() {

    var apiRoot;

    this.setApiRoot = function(_apiRoot) {
        apiRoot = _apiRoot;
    };

    this.$get = ['$http', function($http) {

        function API() {}

        API.prototype.getTwitterUser = function(twitterHandle) {
            return railsGet('/twitter_users/' + twitterHandle);
        };

        function railsGet(url) {
            return $http.get(apiRoot + url)
                        .then(function(resp) {
                            return resp.data.twitter_user;
                        });
        }

        return new API();

    }];

};

aardvarkweb.provider('API', aardvarkweb.API);