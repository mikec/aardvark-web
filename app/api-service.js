aardvarkweb.API = function() {

    function API() {}

    API.prototype.doSomething = function() {
        //
    };

    return new API();

};

aardvarkweb.factory('API', aardvarkweb.API);