(function ($, undefined) {

    'use strict';

    var Form = function ($element, options) {
        $.extend(this, $.fn.AdditionalDecosScheduling.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({
            form: $element,
            txtCalendar: $('#txtCalendar', $element)
        });
    }

    Form.prototype = {
        constructor: Form,

        init: function () {
            var that = this;
            var controls = that.getControls();            
            controls.txtCalendar.datepicker({ format: 'dd/mm/yyyy' });
            that.render();
        },

        render: function () {
            var that = this,
                controls = this.getControls();
        },

        getControls: function () {
            return this.m_controls || {};
        },

        setControls: function (value) {
            this.m_controls = value;
        }
    }

    $.fn.AdditionalDecosScheduling = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {
            var $this = $(this),
                data = $this.data('AdditionalDecosScheduling'),
                options = $.extend({}, $.fn.AdditionalDecosScheduling.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('AdditionalDecosScheduling', data);
            }

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }
                value = data[option](args[1]);
            } else {
                data.init();
                if (args[1]) {
                    value = data[args[1]].apply(data, [].slice.call(args, 2));
                }
            }
        });

        return value || this;
    };

    $.fn.AdditionalDecosScheduling.defaults = {
    }

    $('#DivScheduling').AdditionalDecosScheduling();

})(jQuery, null);