/*
 * eui.widget
 * 
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function () {
    "use strict";
    var widgetTypes = {};
    
    $.eui('extend', {
        registerWidget: function (type, fn) {
            if (widgetTypes[type]) {
                throw 'Widget already reigstered';
            }
        
            widgetTypes[type] = fn;
            
            $('.eui-widget[data-eui-widget="' + type + '"]').each(function () {
                fn.call(this);
            });
        }
    }, true);
    
    if ($.fn.livequery) {
        $('.eui-widget').livequery(function () {
            var type = $(this).data('eui-widget');

            if (widgetTypes[type]) {
                widgetTypes[type].call(this);
            }
        });
    }
}(jQuery));