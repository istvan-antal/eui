$(function () {
    var _dialog;
    
    function dialog() {
        
        if (!_dialog) {
            _dialog = $('<div/>').appendTo('body').dialog({
                title: 'View source',
                width: 600,
                modal: true,
                draggable: false,
                resizable: false,
                autoOpen: false
            });
        }
        
        return _dialog;
    }
    
    $.eui('registerAction', 'view-source', function () {
        var content = $('<pre/>').text($(this).closest('.eui-widget').data('source'));
        dialog().
                empty().
                append(content).
                dialog('open');
    });
});