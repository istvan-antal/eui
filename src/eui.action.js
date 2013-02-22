/*
 * eui.widget
 * 
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function ($) {
    "use strict";
    var actionTypes = {};
    
    $.eui('extend', {
        registerAction: function (type, fn) {
            if (actionTypes[type]) {
                throw 'Action already reigstered';
            }
        
            actionTypes[type] = fn;
        }
    }, true);
    
    $('.eui-action').live('click', function (e) {
        actionTypes[$(this).data('eui-action')].call(this, e);
    });
}(jQuery));