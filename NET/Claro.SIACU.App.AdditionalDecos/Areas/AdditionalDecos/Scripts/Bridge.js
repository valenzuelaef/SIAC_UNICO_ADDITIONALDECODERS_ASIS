var Session = {};

(function ($, undefined) {

    var Form = function ($element, options) {

        $.extend(this, $.fn.DataLoadRedirect.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({});
    }
    
    Form.prototype = {

        constructor: Form,

        init: function () {
            var that = this,
                controls = this.getControls();
            that.render();
        },

        render: function () {            
            this.LoadRedirect();
        },

        LoadRedirect: function () {
            var that = this,
             controls = this.getControls();

            var strSequence = $("#dRedirectContent").data("sequence");

            var StrURL = this.getRoute();

            var urlRedirectVal = StrURL + "/AdditionalDecos/Redirect/GetRedirect";

            $.ajax({

                type: 'POST',
                url: urlRedirectVal,
                data: { sequence: strSequence },
                dataType: 'json',
                error: function (data, status) {
                    $.unblockUI();
                    alert("La página no se encuentra disponible en estos momentos. Vuelva intentarlo en breve.", "Informativo");
                },
                success: function (data) {

                    if (data != null) {

                        var urlDest = data.response.strDestinationURL;
                        var Availability = data.response.strAvailability;
                        var jsonParameters = data.response.strParameters;
                        var node = data.response.strNode;
                        var objparameters = JSON.stringify(jsonParameters);

                        Session = JSON.parse(JSON.parse(objparameters));
                        Session.UrlParams.IdTransaction = data.audit.Transaction;

                        $("#spnNode").text(node);
                        $("#spnCustomerNameTitle").text(Session.SessionParams.USERACCESS.login + " - " + Session.SessionParams.USERACCESS.fullName);

                        that.LoadTransaction(urlDest);
                    }
                    else {
                        alert("No se encontró la página.", "Alerta");
                    }
                },
            });

        },

        LoadTransaction: function (urlDest) {

            var strURL = this.getRoute();

            var strUrlContent = strURL + urlDest;
            var dataContent = {};
            $.ajax({
                type: "POST",
                url: strUrlContent,
                data: dataContent,
                async: false,
                success: function (res) {
                    if (res != null || res != "" || typeof (res != 'undefined')) {
                        $('#dRedirectContent').html(res);
                    } else {
                        $(this).focus();
                        alert('No se Encontrarón Resultados', this.strTitleMessage);
                        $('#dRedirectContent').html("");
                    }
                },
                error: function (msg) {}
            });
        },

        getControls: function () {
            return this.m_controls || {};
        },

        setControls: function (value) {
            this.m_controls = value;
        },

        getRoute: function () {
            return window.location.protocol + '//' + window.location.host;
        },

        getRouteTemplate: function () {
            return window.location.href + '/Home/DialogTemplate';
        }
    }

    $.fn.DataLoadRedirect = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {

            var $this = $(this),
                data = $this.data('DataLoadRedirect'),
                options = $.extend({}, $.fn.DataLoadRedirect.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('DataLoadRedirect', data);
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
    }

    $.fn.DataLoadRedirect.defaults = {}

    $('#dRedirectContent').DataLoadRedirect();

})(jQuery);