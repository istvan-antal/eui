/*
 * eui.widget
 * 
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function ($) {
    $.eui('registerWidget', 'demo', function () {
        var self = $(this);
            
        self.data('source', self.find('.view-source-content').html());
    });
}(jQuery));