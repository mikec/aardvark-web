aardvarkweb.SearchCtrl = ['API', function(API) {

    var $this = this;
    this.twitterUsers = [];

    API.getTwitterUsers()
        .then(function(users) {
            $this.twitterUsers = users;
        });

}];

aardvarkweb.controller('SearchCtrl', aardvarkweb.SearchCtrl);