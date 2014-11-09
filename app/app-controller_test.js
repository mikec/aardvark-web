describe('AppCtrl', function() {

    var ctrl;

    beforeEach(function() {
        module('aardvarkWeb');
        inject(function($controller) {
            ctrl = $controller('AppCtrl');
        });
    });

    it('should define the controller', function() {
        expect(ctrl).toBeDefined();
    });

});