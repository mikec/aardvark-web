aardvarkweb.SearchCtrl = ['API', '$scope', '$location',
function(API, $scope, $location) {

    var $this = this;
    this.twitterUsers = [];

    this.search = function () {
      $location.path($scope.searchText);
    };

    API.getTwitterUsers()
        .then(function(users) {
            $this.twitterUsers = users;
        });

}];

aardvarkweb.controller('SearchCtrl', aardvarkweb.SearchCtrl);
