/*
 * eui.widget
 * 
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function ($) {
    $.eui('registerWidget', 'datepicker', function () {
        var self = $(this),
            options = self.data('options');
        
        self.datepicker(options);
    });
}(jQuery));