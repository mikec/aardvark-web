describe('AppCtrl', function() {

    var ctrl;

    beforeEach(function() {
        module('aardvarkweb');
        inject(function($controller) {
            ctrl = $controller('AppCtrl');
        });
    });

    it('should define the controller', function() {
        expect(ctrl).toBeDefined();
    });

});