aardvarkweb.API = function() {

    var apiRoot;

    this.setApiRoot = function(_apiRoot) {
        apiRoot = _apiRoot;
    };

    this.$get = ['$http', function($http) {

        function API() {}

        API.prototype.getArtistsForHandle = function(twitterHandle) {
            return railsGet('/' + twitterHandle);
        };

        function railsGet(url) {
            return $http.get(apiRoot + url)
                        .then(function(resp) {
                            return resp.data;
                        });
        }

        return new API();

    }];

};

aardvarkweb.provider('API', aardvarkweb.API);