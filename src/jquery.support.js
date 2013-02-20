if (!jQuery.fn.live) {
    jQuery.fn.live = function(types, data, fn) {
        jQuery(this.context).on(types, this.selector, data, fn);
        return this;
    };
}

if (!jQuery.fn.die) {
    jQuery.fn.die = function(types, fn) {
        jQuery(this.context).off(types, this.selector || "**", fn);
        return this;
    };
}