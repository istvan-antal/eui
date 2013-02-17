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
    
    $('.eui-widget').livequery(function () {
        var type = $(this).data('eui-widget');
        
        if (widgetTypes[type]) {
            widgetTypes[type].call(this);
        }
    });
}());