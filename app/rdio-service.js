aardvarkweb.Rdio = ['$rootScope', function($rootScope) {

    var whenReadyFns = [];
    var $this;

    function Rdio() {
        $this = this;
        this.ready = false;
        this.userName = null;
        this.authenticated = false;

        R.ready(function() {
            $this.ready = true;
            updateAuthStatus();
            execWhenReadyFns();
            $rootScope.$apply();
        });
    }

    Rdio.prototype.ready = function(fn) {
        execWhenReady(fn);
    };

    Rdio.prototype.authenticate = function() {
        execWhenReady(authenticate);
    };

    function execWhenReady(fn) {
        if($this.ready) {
            fn();
        } else {
            whenReadyFns.push(fn);
        }
    }

    function execWhenReadyFns() {
        for(var i in whenReadyFns) {
            whenReadyFns[i]();
        }
        whenReadyFns = [];
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