(function ($, undefined) {

    'use strict';

    var Form = function ($element, options) {
        $.extend(this, $.fn.form.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({
            form: $element,
            body: $('body'),
            divMainBody:        $('#navbar-body'),
            divMainHeader:      $('#main-header'),
            divMainFooter:      $('#main-footer'),
            btnNext:            $('#btn-next'),
            btnBack:            $('#btn-back'),
            btnNextSummary: $('#btn-next-summary'),
            btnsave: $('#btn-save'),
            
        });
    }

    Form.prototype = {
        constructor: Form,

        init: function () {
            var that = this,
                controls = this.getControls();

            $(".Save-step").addEvent(that, 'click', that.Save);
            that.getLoadingPage();
            that.render();
        },

        render: function () {
            var that = this,
                controls = this.getControls();
        

            that.resizeContent();
        },

        Save: function () {
            confirm("¿Esta seguro de guardar los cambios?", null, function () {
                alert("La Transacción se ha grabado satisfactoriamente");
            });
        },

        btnNextSummary_Click: function () {
            var that = this;
            var controls = that.getControls();
        },

        btnBack_Click: function () {
            var that = this;
            var controls = that.getControls();
        },

        btnNext_Click: function () {
            var that = this;
            var controls = this.getControls();
            
        },

        getControls: function () {
            return this.m_controls || {};
        },

        setControls: function (value) {
            this.m_controls = value;
        },

        resizeContent: function () {
        
            var controls = this.getControls();
            controls.divMainBody.css('height', $(window).outerHeight() - controls.divMainHeader.outerHeight() - controls.divMainFooter.outerHeight());
        },
        getLoadingPage: function () {
            var that = this;
            var controls = that.getControls();
            $.blockUI({
                message: $("#myModalLoad"),
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
        },

    }

    $.fn.form = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = ['resizeContent', 'getControls'];

        this.each(function () {
            var $this = $(this),
                data = $this.data('form'),
                options = $.extend({}, $.fn.form.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('form', data);
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

    $.fn.form.defaults = {}

    $('#main-contenedor').form();

})(jQuery, null);

function openRules() {
    document.getElementById("myRulenav").style.width = "25%";
}
function closeRules() {
    document.getElementById("myRulenav").style.width = "0";
}