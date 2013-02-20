/*
 * eui.validate
 * https://github.com/istvan-antal/eui
 *
 * Copyright (c) 2013 István Miklós Antal
 * Licensed under the MIT license.
 */

(function ($) {
    "use strict";
    var validators = {
        'non-empty': function (params) {
            return !!params.self.val().length;
        },
        'min-chars': function (params) {
            return params.self.val().length >= params.item.count;
        },
        'email': function (params) {
            return !!params.self.val().match(/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        },
        'equal-to': function (params) {
            return params.self.val() === params.self.closest('form').find(params.item.element).val();
        },
        'ajax': function (params) {
            params.promises.push($.ajax({
                url: params.item.url,
                type: 'post',
                data: {
                    value: params.self.val()
                },
                dataType: 'json',
                success: function (data) {
                    params.isValid = params.isValid && data;
                }
            }));
        }
    };

    $.eui('extend', {
        defineValidator: function (type, validator) {
            validators[type] = validator;
        } 
    });

    function validate(self) {
        var data = self.data('eui-validate'),
            def = $.Deferred(),
            ret,
            offender,
            params = {
                self: self,
                isValid: true,
                promises: []
            };

        if ($.type(data) !== 'array') {
            data = [data];
        }

        data.forEach(function (item) {
            if (!params.isValid) {
                return;
            }

            if ($.type(item) === 'string') {
                item = { type: item };
            }

            if (validators[item.type]) {
                params.item = item;

                ret = validators[item.type](params);

                if ($.type(ret) === 'boolean') {
                    if (!ret) {
                        params.isValid = false;
                        offender = item;
                    }
                } else {
                    $.when(ret).done(function () {
                        offender = offender || item;
                    });
                }
            } else {
                throw "Invalid validation type: " + item.type;
            }
        });

        function finish() {
            if (params.isValid) {
                self.removeClass('error');
                self.trigger('validateSuccess');
            } else {
                self.addClass('error');
                self.trigger('validateFail', [offender]);
            }

            def.resolve(params.isValid);
        }

        if (params.promises.length) {
            $.when.apply($, params.promises).done(finish);
        } else {
            finish();
        }

        return def;
    }

    $('.eui-validate').live('blur change', function () {
        validate($(this));
    });

    $('.eui-validate-form').live('submit', function () {
        var self = $(this),
            event,
            promises = [];

        if (!self.data('data-eui-validate-pass')) {
            self.find('.eui-validate').each(function () {
                promises.push(validate($(this)));
            });

            $.when.apply($, promises).done(function () {
                var isError = false;

                Array.prototype.slice.call(arguments).forEach(function (valid) {
                    isError = isError || !valid;
                });

                if (!isError) {
                    self.data('data-eui-validate-pass', true);
                    event = $.Event('validateSubmit');
                    self.trigger(event);
                    if (!event.isDefaultPrevented()) {
                        self.submit();
                    }                    
                }
            });
            return false;
        }
    });
}(jQuery));