(function($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/
     
     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('jQuery#eui', {
        // This will run before each test in this module.
        setup: function() {
            this.sandbox = $('#sandbox').empty();
        },
        teardown: function() {
            this.sandbox = $('#sandbox').empty();
        }
    });

    test('is initialized', function() {
        ok($.eui, ' should be defined');
    });

    asyncTest('can be used with dynamic HTML', function() {
        var self = this;
        this.sandbox.html('<div class="eui-widget" data-eui-widget="datepicker"></div>');

        setTimeout(function() {
            equal($($(self.sandbox.children()[0]).children()[0]).hasClass('ui-datepicker'), true, 'widget should be initialized');
            start();
        }, 1000);
    });
    
    asyncTest('does validation work', function() {
        var form,
            didNotSubmit = true;
            
        this.sandbox.html('<form class="eui-validate-form"><input data-eui-validate="non-empty" class="eui-validate" type="text"></form>');

        form = this.sandbox.find('form');
        
        form.on('validateSubmit', function () {
            didNotSubmit = false;
        });
        
        form.find('input').on('validateFail', function () {
            ok(didNotSubmit);
            start();
        });

        form.submit();
        /*
        setTimeout(function() {
            equal($($(self.sandbox.children()[0]).children()[0]).hasClass('ui-datepicker'), true, 'widget should be initialized');
            start();
        }, 1000);*/
    });

    /*asyncTest('can be used with dynamic HTML', function() {
        
        setTimeout(function() {
            
            start();
        }, 0);
    });*/
    /*test('is chainable', function() {
     expect(1);
     // Not a bad test to run on collection methods.
     strictEqual(this.elems.awesome(), this.elems, 'should be chainable');
     });
     
     test('is awesome', function() {
     expect(1);
     strictEqual(this.elems.awesome().text(), 'awesome0awesome1awesome2', 'should be awesome');
     });
     
     module('jQuery.awesome');
     
     test('is awesome', function() {
     expect(2);
     strictEqual($.awesome(), 'awesome.', 'should be awesome');
     strictEqual($.awesome({punctuation: '!'}), 'awesome!', 'should be thoroughly awesome');
     });
     
     module(':awesome selector', {
     // This will run before each test in this module.
     setup: function() {
     this.elems = $('#qunit-fixture').children();
     }
     });*/

}(jQuery));
