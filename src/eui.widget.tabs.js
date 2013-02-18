/*
 * eui.widget
 * 
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function ($) {
    $.eui('registerWidget', 'tabs', function () {
        var self = $(this),
            options = self.data('options');
        
        self.tabs(options);
    });
}(jQuery));