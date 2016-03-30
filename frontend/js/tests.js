describe('ohmApp', function () {
    var scope,
    controller;

    beforeEach(function () {
        module('ohmApp');
    });

    //Add Unit Tests for Ohm Controller
    describe('ohmCtrl', function () {
        beforeEach(inject(function ($compile,$rootScope, $controller) {          
            scope = $rootScope.$new();
            controller = $controller('ohmCtrl', {
                '$scope': scope
            });
        }));

        it('initializes bands to 0', function () {
            expect(scope.stripe_1.value).toBe(0);
            expect(scope.stripe_2.value).toBe(0);
            expect(scope.stripe_3.value).toBe(0);
        });

        it('sets multiplier to empty', function () {
            expect(scope.stripe_4.value).toBe('empty');
        });

        it('loads all colors', function () {
            expect(scope.colors.length).toBe(13);
        });

        it('expects resistance to be undefined',function(){
            expect(scope.resistance).toBe(undefined);
        })

        it('expects resistance to update on digest', function () {
            scope.$digest();
            expect(scope.resistance).toBe(0);
        });

        it('expects a reading of 5 ohms', function () {
            scope.stripe_1 = scope.colors[0];
            scope.stripe_2 = scope.colors[5];

            scope.$digest();
            expect(scope.resistance).toBe(5);
        });

        it('expects a reading of 50 ohms', function () {
            scope.stripe_1 = scope.colors[5];
            scope.stripe_2 = scope.colors[0];

            scope.$digest();
            expect(scope.resistance).toBe(50);
        });

        it('expects a multiplier of 10 on 50ohms', function () {
            scope.stripe_1 = scope.colors[5];
            scope.stripe_2 = scope.colors[0];
            scope.stripe_3 = scope.colors[1]

            scope.$digest();
            expect(scope.resistance).toBe(500);
        });

    });    
});


// Run Jasmine
(function () {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }

})();