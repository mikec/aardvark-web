aardvarkweb.PlaylistCtrl = ['$routeParams', 'API',
function($routeParams, API) {

    this.handle = $routeParams.handle;

    this.artists = API.getArtistsForHandle(this.handle);

}];

aardvarkweb.controller('PlaylistCtrl', aardvarkweb.PlaylistCtrl);