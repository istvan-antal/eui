/*
 * eui
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

/**
 * @class $
 * @static
 */

(function($) {
    var nodeMethods = {
        },
        globalMethods = {
        extend: function(newMethods, isGlobal) {
            var methods = nodeMethods;

            if (isGlobal) {
                methods = globalMethods;
            }

            $.extend(methods, newMethods);
        }
    };

    
    $.extend($.fn, {
        eui: function (method) {
            return nodeMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });
    
    $.extend($, {
        /**
        * Executes a global EUI method.
        *  
        *
         
         @example
         $.eui('extend', { 
           alert: function (arg) { 
               alert(arg);
           } 
        });
        
        * @method eui
        * @param {String} method
        * @param [params] 
        */
        eui: function (method) {
            return globalMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });

}(jQuery));
