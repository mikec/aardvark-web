aardvarkweb.API = function() {

    var apiRoot;

    this.setApiRoot = function(_apiRoot) {
        apiRoot = _apiRoot;
    };

    this.$get = ['$http', function($http) {

        function API() {}

        API.prototype.getArtists = function() {
            return railsGet('/songs/1');
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