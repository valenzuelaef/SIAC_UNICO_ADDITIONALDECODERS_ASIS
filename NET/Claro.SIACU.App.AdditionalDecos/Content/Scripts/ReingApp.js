(function ($, undefined) {

    'use strict';

    var __jControl__ = function (options, $element) {
        var constructor = this.constructor,
            descriptor = constructor.descriptor,
            defaults = constructor.defaults;

        var that = this;

        if (this.__settings == null) {
            this.__settings = {};
        }

        $.each(descriptor.settings.concat(__jControl__.descriptor.settings), function (index, name) {
            var value = options[name];

            if (value == null || value == undefined) {
                value = defaults[name];
            }

            that.__settings[name] = value;
        });

        if (this.__events == null) {
            this.__events = {};
        }

        $.each(descriptor.events.concat(__jControl__.descriptor.events), function (index, name) {
            var value = options[name];

            if (value == null || value == undefined) {
                value = defaults[name];
            }

            that.__events[name] = value;
        });

        for (var member in __jControl__.prototype) {
            if (this[member] == null) {
                this[member] = __jControl__.prototype[member];
            }
        };

        $element = $element || $('<' + this._tagName + '>');

        var id = this.getId();

        if (!$.string.isEmptyOrNull(id)) {
            $element.attr('id', id);
        }

        var data = options.data;

        if (data != null) {
            for (var item in data) {
                $element.attr('data-' + item, data[item]);
            }
        }

        this._setElement($element);

        this.init();
    }

    __jControl__.prototype = {

        init: function (sender, args) {
            this.render();
        },

        render: function (sender, args) {

        },

        add: function (control, $container) {
            if (control == null) {
                throw 'no se ha especificado el control.';
            }

            $container = $container || this.getElement();

            if ($container == null) {
                throw 'El control no se ha especificado el elemento.';
            }

            if (control.id == null || control.id.length == 0) {
                //Generar AutoID
            }

            $container.append(control.getElement());

            control._setParent(this);
        },

        remove: function (control) {
        },

        getParent: function () {
            return this.parent;
        },

        getId: function () {
            return this._getSettings('id');
        },

        getClass: function () {
            return this._getSettings('class');
        },
        getElement: function () {
            return this.__$element;
        },
        _getSettings: function (value) {
            return this.__settings[value];
        },
        _getEvents: function (value) {
            return this.__events[value];
        },
        _setParent: function (control) {
            this.parent = control;
        },
        _setElement: function (value) {
            this.__$element = value;
        },
        _setSettings: function (name, value) {
            this.__settings[name] = value;
        },
        _tagName: null,
        __$element: null,
        __settings: {},
        __events: {}
    }
    __jControl__.defaults = {
        id: '',
        parent: null,
        $element: null
    }
    __jControl__.descriptor = {
        settings: ['id', 'class'],
        events: []
    }

    var __jControlButton__ = function (options, $element) {
        __jControl__.call(this, options, $element);

        var $button = this.getElement();

        if (this._getEvents('click') != null) {
            $button.addEvent(this, 'click', this.click);
        }

        // var text = this.getText() || this.getHtml();
        var text = this.getText(),
            html = this.getHtml();

        if (text != null && text.length > 0 || html != null && html.length) {
            $button.append(string.format('{0} {1}', html, text));
        }

        var cssClass = this.getClass() || 'btn transaction-button btn-sm';

        $button
            .addClass('btn')
            .attr('type', 'button');

        if (cssClass != null && cssClass.length > 0) {
            $button.addClass(cssClass);
        }
    }
    __jControlButton__.prototype = {
        _tagName: 'button',
        constructor: __jControlButton__,
        click: function (sender, args) {
            this._getEvents('click').call(this.getParent(), sender, args);
        },
        getText: function () {
            return this._getSettings('text');
        },
        getHtml: function () {
            return this._getSettings('html');
        }
    }
    __jControlButton__.defaults = {
        text: '',
        html: '',
        click: null,
        dblClick: null
    }
    __jControlButton__.descriptor = {
        settings: ['text', 'html'],
        events: ['click', 'dblclick']
    }

    var __jControlWindow__ = function (options, $element) {

        __jControl__.call(this, options, $element);

        var id = this.getId();

        if ($.string.isEmptyOrNull(id)) {
            id = string.format('window-{0}', $.guid);
        }

        this.getElement().attr('id', id);
        this._setSettings('id', id);
    }

    __jControlWindow__.prototype = {
        _tagName: 'div',
        constructor: __jControlWindow__,

        _createElement: function (className, $container) {

            var $element = $(string.format('.{0}', className), $container);

            if ($element.length === 0) {
                $element = $('<div>');

                $element
                    .addClass(className)
                    .appendTo($container);
            } else {
                throw string.format('The {0} element already exists', className);
            }

            return $element;
        },

        _createSpanElement: function (className, $container) {

            var $element;

            if (className === '') {
                $element = $('<span>');
                $element.appendTo($container);
            }
            else {
                $element = $(string.format('.{0}', className), $container);

                if ($element.length === 0) {

                    $element = $('<span>');

                    $element
                        .addClass(className)
                        .appendTo($container);
                } else {
                    throw string.format('The {0} element already exists', className);
                }
            }

            return $element;
        },

        _createImageElement: function (className, $container) {

            if (this.getImageSource() === '') return false;

            var $element;
            var ImageSource = '/Content/Images/SUFija/' + this.getImageSource();

            if (className === '') {
                $element = $('<img>');
                $element.attr('src', ImageSource);
                $element.appendTo($container);
            }
            else {
                $element = $(string.format('.{0}', className), $container);

                if ($element.length === 0) {

                    $element = $('<img>');

                    $element
                        .addClass(className)
                        .attr('src', ImageSource)
                        .appendTo($container);
                } else {
                    throw string.format('The {0} element already exists', className);
                }
            }

            return $element;
        },

        _createDialogElement: function ($container) {
            return this._createElement(__jControlWindow__.dialogClass, $container);
        },

        _createContentElement: function ($container) {
            var $contentModal = this.getAlert() ? 'modal-alert-content' : '';
            return this._createElement(__jControlWindow__.contentClass, $container).addClass($contentModal);
        },

        _createBodyElement: function ($container) {
            return this._createElement(__jControlWindow__.bodyClass, $container);
        },

        _createHeaderElement: function ($container) {

            var $header = this._createElement(__jControlWindow__.headerClass, $container);

            this._createHeaderControlboxElement($header);

            if (!this.getAlert()) {

                var $dataTitle = this._createElement('customer-data-title', $header);

                var $dataTitleIcon = this._createElement('customer-data-title-items customer-data-title-icon', $dataTitle);
                var $dataTitleLabel = this._createElement('customer-data-title-items customer-data-title-label', $dataTitle);
                var $imageTitle = this._createImageElement(this.getImageSourceClass(), $dataTitle);

                this._createSpanElement(this.getIcon(), $dataTitleIcon);
                this._createHeaderTitleElement($dataTitleLabel);
            }
            else {
                var $imageTitle = this._createImageElement(this.getImageSourceClass(), $header);
                this._createHeaderTitleElement($header);
            }

            return $header;
        },

        _createHeaderTitleElement: function ($container) {
            var title = this.getTitle();
            if (!$.string.isEmptyOrNull(title)) {
                var $package = this._createSpanElement(this.getAlert() ? 'modal-alert-title' : '', $container).text(title);
            }
        },

        _createHeaderControlboxElement: function ($container) {
            var that,
                $controlBox,
                buttons;

            buttons = __jControlWindow__.controlBox;

            if (this.getControlBox() && !$.array.isEmptyOrNull(buttons)) {
                var modal = this.getModal();

                $controlBox = this._createElement('modal-controlbox', $container);

                $controlBox.addClass('pull-right');

                var $button;

                if (!modal && this.getMinimizeBox()) {
                    $button = new $.control.button(buttons['minimize']);
                    this.add($button, $controlBox);
                }
            } else {
                $controlBox = null;
            }
        },

        _createFooterElement: function ($container) {
            var that,
                $footer,
                buttons = this.getButtons();

            $footer = this._createElement(__jControlWindow__.footerClass, $container);

            if (buttons != null) {
                that = this;

                $.each(buttons, function (index, button) {
                    if ($.string.isEmptyOrNull(button.text) && $.string.isEmptyOrNull(button.html)) {
                        button.text = index;
                    }

                    var $button = new $.control.button(button);

                    that.add($button, $footer);
                });
            }

            return $footer;
        },

        _resizableStart: function (args) {

            this._maximized = args.maximize;

            var maximize = (this._maximized == null || this._maximized == false),
                $modal = this.getElement(),
                $dialog = $('> .modal-dialog', $modal),
                $content = $('> .modal-content', $dialog),
                $header = $('> .modal-header', $content),
                $controlbox = $('> .modal-controlbox', $header),
                $btnResize = $('#window-maximize', $controlbox),
                cssPrefix = 'fa fa-window-',
                oldClass,
                newClass;

            if (maximize) {
                oldClass = 'restore';
                newClass = 'maximize';
            } else {
                oldClass = 'maximize';
                newClass = 'restore';
            }

            $btnResize
                .removeClass(cssPrefix + oldClass)
                .addClass(cssPrefix + newClass);

            var t = setTimeout(function () {
                $('div.dataTables_scrollHeadInner')
                    .css('width', '')
                    .find('> table')
                    .css('width', '');
                clearTimeout(t);
            }, 100);

        },

        _resizableResize: function (args) {

            var $modal = args.$modal,
                $header = args.$header,
                $body = args.$body,
                $footer = args.$footer,
                headerHeight = ($header != null && $header.length > 0 ? $header.outerHeight() : 0),
                footerHeight = ($footer != null && $footer.length > 0 ? $footer.outerHeight() : 0),
                bodyHeight = ($modal.outerHeight() - (headerHeight + footerHeight))

            $body.css('height', bodyHeight);
        },

        _resize: function () {

            var maximize = (this._maximized == null || this._maximized == false),
                $modal = this.getElement(),
                $dialog = $('> .modal-dialog', $modal),
                $content = $('> .modal-content', $dialog),
                $header = $('> .modal-header', $content),
                $controlbox = $('> .modal-controlbox', $header),
                $btnResize = $('#window-maximize', $controlbox),
                $body = $('> .modal-body', $content),
                $footer = $('> .modal-footer', $content),
                cssPrefix = 'fa-window-',
                oldClass,
                newClass,
                position = { left: 0, top: 0 },
                size = { width: '100%', height: '100%' },
                that = this;

            if (maximize) {
                oldClass = 'maximize';
                newClass = 'restore';

                this._oldPosition = $modal.position();
                this._oldSize = { height: $modal.outerHeight(), width: $modal.outerWidth() };
            } else {
                oldClass = 'restore';
                newClass = 'maximize';

                position = this._oldPosition;
                size = this._oldSize;
            }

            $modal.animate({
                left: position.left,
                top: position.top,
                width: size.width,
                height: size.height
            }, {
                duration: 100,
                start: function () { that._resizableStart.call(that, { maximize: maximize }); },
                progress: function () { that._resizableResize.call(that, { $modal: $modal, $header: $header, $body: $body, $footer: $footer }); }
            });
        },

        _focus: function () {
            if (__jControlWindow__.overlay.length > 0) {
                $('.modal-backdrop').css('z-index', $.app.getMaxZIndex() + 1);
            }

            var $modal = this.getElement(),
                zIndex = $modal.css('z-index'),
                maxZIndex = $.app.getMaxZIndex();

            if (zIndex != maxZIndex) {
                $modal.css('z-index', maxZIndex + 1);
            }
        },

        _initializePosition: function () {
            var $modal = this.getElement();

            $modal
                .offset({
                    top: (($(window).height() - $modal.outerHeight()) / 2),
                    left: (($(window).width() - $modal.outerWidth()) / 2)
                });
        },

        _showModal: function (args) {

            this._focus();

            if (this._getAutoSize() == true) {
                var $modal = args.$modal,
                    $header = args.$header,
                    $body = args.$body,
                    $footer = args.$footer;

                $body.css('height', '');

                var headerHeight = ($header != null && $header.length > 0 ? $header.outerHeight() : 0),
                    footerHeight = ($footer != null && $footer.length > 0 ? $footer.outerHeight() : 0),
                    bodyHeight = $body.outerHeight();

                $modal.css('height', headerHeight + bodyHeight + footerHeight);
            }

            this._resizableResize(args);
            this._initializePosition();
        },

        open: function () {

            var $modal = this.getElement(),
                $dialog = this._createDialogElement($modal),
                $content = this._createContentElement($dialog),
                $header = this._createHeaderElement($content),
                $body = this._createBodyElement($content),
                $footer = this._createFooterElement($content),
                currentWidth = this.getWidth(),
                currentHeight = this.getHeight(),
                that = this,
                url = this.getUrl();

            if (!$.isNumeric(currentWidth)) {
                currentWidth = currentWidth.replace('px', '');
            }

            if (!$.isNumeric(currentHeight)) {
                currentHeight = currentHeight.replace('px', '');
            }

            var maxWidth = ($(window).innerWidth() > currentWidth ? this.getWidth() : $(window).innerWidth()),
                maxHeight = ($(window).innerHeight() > currentHeight ? this.getHeight() : $(window).innerHeight()),
                mOverflow = this.getOverflow();


            $modal.addEvent(this, 'shown.bs.modal', function () {
                if (!$.string.isEmptyOrNull(url)) {
                    that._showModal({ $modal: $modal, $header: $header, $body: $body, $footer: $footer });
                    $content.addClass(__jControlWindow__.loadingClass);

                    $.ajax({
                        type: that.getType(),
                        url: url,
                        data: that.getData(),
                        async: true,
                        cache: false,
                        complete: function (jqXHR, textStatus) {
                            $content.removeClass(__jControlWindow__.loadingClass);
                            that._showModal({ $modal: $modal, $header: $header, $body: $body, $footer: $footer });
                            that.complete();
                        },
                        success: function (data, textStatus, jqXHR) {
                            $body.html(data);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $body.html(errorThrown);
                        }
                    });
                } else {
                    $body.html(this.getText());

                    var t = setTimeout(function () {
                        that._showModal({ $modal: $modal, $header: $header, $body: $body, $footer: $footer });
                        that.complete();
                        clearTimeout(t);
                    }, 1);
                }

                if (this.getModal() == true) {
                    __jControlWindow__.overlay.push(this);
                }
            });

            $header.addEvent(this, 'dblclick', function () {
                //this._resize();
                //this._focus();
            });

            $modal
                .css({
                    width: maxWidth,
                    height: maxHeight,
                    overflow: mOverflow
                });

            this._initializePosition();

            $modal
                .attr('url', url)
                .addClass(__jControlWindow__.class)
                .appendTo(document.body)
                .addEvent(this, 'mousedown', function () {
                    this._focus();
                })
                .modal({
                    show: true,
                    backdrop: (__jControlWindow__.overlay.length == 0 ? this.getModal() : false),
                    keyboard: false
                })
                .draggable({
                    handle: $header,
                    containment: document.body
                })
                .resizable({
                    handles: 'n, e, s, w, ne, se, sw, nw',
                    minHeight: 153,
                    minWidth: 148,
                    containment: document.body,
                    start: function () { that._resizableStart.call(that, { maximize: false }); },
                    resize: function () { that._resizableResize.call(that, { $modal: $modal, $header: $header, $body: $body, $footer: $footer }); }
                });


            if (this.getAlert()) {
                $header.addClass('modal-alert-header');
                $footer.addClass('modal-alert-footer');
            }

        },

        close: function () {
            this.getElement().remove();

            var count = __jControlWindow__.overlay.length;

            __jControlWindow__.overlay.splice(count - 1, 1);

            var $backdrop = $('> .modal-backdrop', document.body);

            if (__jControlWindow__.overlay.length == 0) {
                $backdrop.remove();
            }

            if (__jControlWindow__.overlay.length > 0) {
                var x = __jControlWindow__.overlay[__jControlWindow__.overlay.length - 1].getElement().css('z-index');

                $backdrop.css('z-index', x - 1);
            }

            var $modals = __jControlWindow__.modals;

            if (!$.array.isEmptyOrNull($modals)) {
                for (var i = 0, j = $modals.length; i < j; i++) {
                    var $modal = $modals[i];

                    if ($modal.getId() == this.getId()) {
                        __jControlWindow__.modals.splice(i, 1);
                    }
                }
            }
        },

        maximize: function () {
            this._resize();
        },

        minimize: function () {
            var $toolbar = __jControlWindow__.toolbar;

            if ($toolbar.length == 1) {
                var $element = this.getElement();

                $element.hide();

                var $li = $('<li>'),
                    $a = $('<a>');

                $a
                    .addClass('glyphicon glyphicon-comment')
                    .attr('title', this.getTitle());

                $a.addEvent(this, 'click', function (e) {
                    $element.show();
                    $li.remove();
                    this._focus();
                });

                $toolbar.append($li.append($a))
            }
        },

        complete: function () {
            if (this._getEvents('complete') != null) {
                this._getEvents('complete').call(this);
            }
        },

        restore: function () {
            this._resize();
        },

        getTarget: function () {
            return this._getSettings('target');
        },

        getAsync: function () {
            return this._getSettings('async');
        },

        getData: function () {
            return this._getSettings('data');
        },

        getType: function () {
            return this._getSettings('type');
        },

        getWidth: function () {
            return this._getSettings('width');
        },

        getHeight: function () {
            return this._getSettings('height');
        },

        getTitle: function () {
            return this._getSettings('title');
        },

        getText: function () {
            return this._getSettings('text');
        },

        getModal: function () {
            return this._getSettings('modal');
        },

        getUrl: function () {
            return this._getSettings('url');
        },

        _getAutoSize: function () {
            return this._getSettings('autoSize');
        },

        getControlBox: function () {
            return this._getSettings('controlBox');
        },

        getMaximizeBox: function () {
            return this._getSettings('maximizeBox');
        },

        getMinimizeBox: function () {
            return this._getSettings('minimizeBox');
        },

        getButtons: function () {
            return this._getSettings('buttons');
        },

        getIcon: function () {
            return this._getSettings('icon');
        },

        getOverflow: function () {
            return this._getSettings('overflow');
        },

        getAlert: function () {
            return this._getSettings('alert');
        },

        getImageSource: function () {
            return this._getSettings('imageSource');
        },

        getImageSourceClass: function () {
            return this._getSettings('imageSourceClass');
        },
    }

    __jControlWindow__.controlBox = {

        minimize: {
            enable: true,
            class: 'fa fa-window-minimize',
            click: function (e) {
                this.minimize();
            }
        },

        maximize: {
            enable: true,
            id: 'window-maximize',
            class: 'fa fa-window-maximize',
            click: function (sender, args) {
                this._resize();
            }
        },

        close: {
            enable: true,
            class: 'fa fa-window-close',
            click: function (sender, args) {
                this.close();
            }
        }
    };

    __jControlWindow__.contentClass = 'modal-content';
    __jControlWindow__.dialogClass = 'modal-dialog';
    __jControlWindow__.headerClass = 'modal-header claro-gris';
    __jControlWindow__.titleClass = 'modal-title';
    __jControlWindow__.bodyClass = 'modal-body';
    __jControlWindow__.footerClass = 'modal-footer';
    __jControlWindow__.loadingClass = 'modal-loading';
    __jControlWindow__.class = 'modal';
    __jControlWindow__.toolbar = null;
    __jControlWindow__.overlay = [];
    __jControlWindow__.modals = [];
    __jControlWindow__.defaults = {
        autoSize: false,
        type: 'GET',
        async: true,
        data: null,
        target: '',
        url: '',
        icon: '',
        title: null,
        modal: false,
        alert: false,
        width: '350px',
        height: '160px',
        overflow: 'hidden',
        imageSource: '',
        imageSourceClass: '',
        controlBox: true,
        maximizeBox: true,
        minimizeBox: true,
        buttons: null,
        complete: null,
    }

    __jControlWindow__.descriptor = {
        settings: ['autoSize', 'async', 'data', 'target', 'url', 'data', 'text', 'icon', 'title', 'type', 'modal', 'alert', 'imageSource', 'imageSourceClass', 'width', 'height', 'overflow', 'controlBox', 'maximizeBox', 'minimizeBox', 'buttons'],
        events: ['complete']
    }

    __jControlWindow__.close = function () {
        var ele = $('div.modal.in:last'),
            id = ele.attr("id");

        var $modals = $.window.modals;

        if (!$.array.isEmptyOrNull($modals)) {
            for (var i = 0, j = $modals.length; i < j; i++) {
                var $modal = $modals[i];

                if ($modal.getId() == id) {
                    $modal.close();
                }
            }
        }
    }

    __jControlWindow__.open = function (options) {

        var url = options.url,
            $modals = __jControlWindow__.modals,
            w = null;

        if (!$.string.isEmptyOrNull(url) && !$.array.isEmptyOrNull($modals)) {
            for (var i = 0, j = $modals.length; i < j; i++) {
                w = $modals[i];

                if (url == w.getUrl()) {
                    w._focus();
                    break;
                }

                w = null;
            }
        }

        if (w == null) {
            w = new __jControlWindow__(options);

            __jControlWindow__.modals.push(w);

            w.open();
        }

        return w;
    }

    $.extend($, {
        app: {
            getMaxZIndex: function () {
                var maxZIndex = 0,
                    currentZIndex = 0;

                $('*').each(function () {
                    currentZIndex = $(this).css('z-index');

                    if ($.isNumeric(currentZIndex) && currentZIndex > maxZIndex) {
                        maxZIndex = parseInt(currentZIndex);
                    };
                })

                return maxZIndex;

            },

            ajax: function (settings) {
                var beforeSend = settings.beforeSend,
                    success = settings.success,
                    complete = settings.complete;

                settings.beforeSend = function () {
                    if (settings.container != null) {
                        settings.container.html('<div class="ajax-loading"></div>');
                    }

                    if (beforeSend != null) {
                        beforeSend.call(this, arguments[0], arguments[1]);
                    }
                }

                settings.success = function (response) {
                    if (settings.container != null) {
                        settings.container.html(response);
                    }
                    if (success != null) {
                        success.call(this, arguments[0], arguments[1], arguments[2]);
                    }
                }

                settings.complete = function (response) {
                    if (complete != null) {
                        complete.call(this, arguments[0], arguments[1]);
                    }
                }

                return $.ajax(settings);
            },

            date: {
                format: function (date, format) {
                    return $.formatDate(date, format);
                },
                addMonth: function (date, value, settings) {
                    var currentMonth = date.getMonth();
                    var newDate = date.setMonth(currentMonth + value);

                    if (settings != null) {
                        newDate = $.formatDate(newDate, settings);
                    }

                    return newDate;
                },
                limitedDate: function (date) {
                    var fDateToDay = new Date();
                    fDateToDay = this.format(fDateToDay, { format: 'dd/mm/yy' });
                    return date.valueOf() > fDateToDay.valueOf() ? 'disabled' : '';
                }
            },

            ddmmyyyyhhmisstt2Time: function (date) {
                var dateParts = date.split(' '),
                    date_ddmmyyyy = dateParts[0].split('/'),
                    date_hhmmss = dateParts[1].split(':');

                return (new Date(date_ddmmyyyy[2], date_ddmmyyyy[1], date_ddmmyyyy[0], date_hhmmss[0], date_hhmmss[1], (date_hhmmss[2] + (dateParts[2] != null && dateParts[2].toUpperCase() === 'P.M.' ? 12 : 0)))).getTime();
            },

            const: {
                days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                today: 'Hoy',
                loadingRecords: 'Cargando...',
                processing: 'Procesando...',
                zeroRecords: 'No se encontraron registros coincidentes.',
                emptyTable: 'No hay datos disponibles en la tabla.',
                formatDate: 'd/m/Y',
                actionSuccessClassName: 'action-exito',
                actionErrorClassName: 'action-error',
                messageErrorLoading: 'Estimado usuario, en este momento estamos presentando intermitencia en el aplicativo<br> por favor intentelo otra vez en unos minutos  ...<br /><br /><label class="control-label">Id de Transacción:</label>'
            },

            createSteps: function (steps, container) {

                var stepsLength = steps.length;

                $.each(steps, function (idx, step) {

                    var oStep = {}

                    $.each(step.AttributeListConfiguration, function (i, attr) {
                        oStep[attr.AttributeName.replace('step', '').toLowerCase()] = attr.AttributeValue;
                    })

                    oStep.disabled = (oStep.order == 1) ? '' : 'disabled';
                    oStep.divClass = (oStep.order == 1) ? stepsLength + '-left' : (oStep.order == stepsLength) ? stepsLength + '-right' : stepsLength;
                    oStep.buttonClass = (oStep.order == 1) ? 'transaction-button-Steps' : 'btn-default-Step';

                    var markup = '';

                    markup += string.format('<div class="process-step-part process-step-part-{0}">', oStep.divClass);
                    markup += string.format('<span class="{0}" indexstep="{1}"></span><br />', oStep.icon, oStep.order);
                    markup += string.format('<button type="button" id="idTab{0}" class="btn btn-circle-step {1}" data-toggle="tab" role="tab" href="#{3}" percent="{4}" index="{0}" {2}></button>', oStep.order, oStep.buttonClass, oStep.disabled, oStep.target, oStep.percent, oStep.order);
                    markup += string.format('<p>{0}</p></div>', oStep.name);

                    container.append(markup);
                })

            },

            promiseRequestPartialView: function (view) {

                return new Promise(function (resolve, reject) {

                    var request = {}, areaApp = '';

                    request.partialView = view;
                    areaApp = window.location.pathname.substr(1).split('/')[0];

                    $.ajax({
                        url: string.format('/{0}/Home/RenderPartialView', areaApp),
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        data: JSON.stringify(request),
                        success: function (res) { resolve(res) },
                        error: function (err) { reject(err) }
                    });

                });
            },

            createElement: function (attributes, $container) {

                var $element = $(string.format('#{0}', attributes.id), $container);

                if ($element.length === 0) {
                    $element = $('<div>');

                    $element
                        .attr(attributes)
                        .appendTo($container);
                }
                else {
                    throw string.format('The {0} element already exists', attributes.id);
                }

                return $element;
            },

            sortUpwards: function (a, b) {
                return (a.AttributeValueOrder > b.AttributeValueOrder) ? 1 : ((b.AttributeValueOrder > a.AttributeValueOrder) ? -1 : 0);
            },

            orderDownwards: function (a, b) {
                return (a.AttributeValueOrder < b.AttributeValueOrder) ? 1 : ((b.AttributeValueOrder < a.AttributeValueOrder) ? -1 : 0);
            },

            ViewsRender: function (oViews, views, level, parent, callback) {

                var that = this;

                if (oViews.length == 0) {

                    if (callback != null) { callback(); }
                }
                else {
                    if (views.length > 0) { // Valida la cantidad de Registros del Arreglo Temporal

                        var oChildren = views[0].AttributeListConfiguration.find(function (e) { return e.AttributeName == 'children' });
                        var oName = views[0].AttributeListConfiguration.find(function (e) { return e.AttributeName == 'name' && e.AttributeValue !== '' });
                        var oOrder = views[0].AttributeListConfiguration.find(function (e) { return e.AttributeName == 'order' && e.AttributeValue !== '' });

                        var hasChildren = typeof oChildren !== 'undefined';

                        if (hasChildren) { // Mientas tenga hijos crea el contenedor

                            var $parent = $(string.format('#{0}', parent));

                            var order = oOrder.AttributeValue;
                            var children = oChildren.AttributeListConfiguration.sort(that.sortUpwards);;
                            var oAttributes = views[0].AttributeListConfiguration.find(function (e) { return e.AttributeName == 'attributes' });
                            var additionalAttributes = (typeof oAttributes !== 'undefined') ? oAttributes.AttributeListConfiguration : {};

                            var attributes = {}
                            attributes.id = oName.AttributeValue;
                            $.each(additionalAttributes, function (idx, attr) { attributes[attr.AttributeName] = attr.AttributeValue })

                            that.createElement(attributes, $parent);
                            level = (level == '') ? order : string.format('{0}_{1}', level, order);

                            return that.ViewsRender(oViews, children, level, attributes.id, callback);
                        }
                        else { // Obtiene la Vista y la Agrega
                            var viewName = oName.AttributeValue;

                            that.promiseRequestPartialView(viewName)
                                .then(
                                function (partialView) {
                                    var currentViews = views.slice(1);
                                    $(string.format('#{0}', parent)).append(partialView);
                                    return that.ViewsRender(oViews, currentViews, level, parent, callback);
                                },
                                function (err) {
                                    //alert(string.format('PartialView {0} does not exist', viewName)) // uncommnet for testing
                                })
                        }
                    }
                    else { // Valida si el contenedor
                        var levels = level.split('_');          // Niveles de los Contenedores        
                        var currentPosition = levels.pop();     // Se eliminar el Nivel del Contenedor Actual y se obtiene su orden
                        var parentsLevel = levels;              // Arbol hasta el Padre del Contenedor                                      

                        if (parentsLevel.length > 0) {          // Valida si el Contenedor tiene Padres
                            var oParent = oViews;

                            for (var i = 0; i < parentsLevel.length; i++) {
                                parent = oParent[parentsLevel[i]].AttributeListConfiguration.find(function (e) {
                                    return e.AttributeName == 'name';
                                }).AttributeValue;

                                oParent = oParent[parentsLevel[i]].AttributeListConfiguration.find(function (e) {
                                    return e.AttributeName == 'children';
                                }).AttributeListConfiguration;
                            }

                            var siblings = oParent.sort(that.sortUpwards);
                            var hasSiblings = (siblings.length > parseInt(currentPosition, 10) + 1);
                            var lastSibling = (siblings.length == parseInt(currentPosition, 10) + 1);

                            level = parentsLevel.join('_');

                            if (hasSiblings) { // Valida si tiene hermanos no procesados
                                var unProcessedSiblings = siblings.slice(parseInt(currentPosition, 10) + 1);
                                return that.ViewsRender(oViews, unProcessedSiblings, level, parent, callback);
                            }
                            else {
                                return that.ViewsRender(oViews, [], level, parent, callback);
                            }
                        }
                        else {
                            var hasSiblings = (oViews.length > parseInt(currentPosition, 10) + 1);

                            if (hasSiblings) {
                                views = oViews.slice(parseInt(currentPosition, 10) + 1);
                                parent = $($(string.format('#{0}', parent)).parents()[0]).attr('id');

                                return that.ViewsRender(oViews, views, '', parent, callback);
                            }
                            else {
                                return that.ViewsRender([], [], '', '', callback);
                            }
                        }
                    }

                } // End
            },

            validateControl: function (container, prevControls) {
                var status = true;
                var stop = true;
                $('#' + container).find(':input').each(function () {
                    var strText = '';
                    var elemento = this;
                    var valor = elemento.id;
                    var control = $('#' + valor);

                    if (prevControls != null && control.attr('id') == prevControls) {
                        stop = false;
                    }
                    if (control.attr('validate') != undefined && stop) {
                        switch (control.prop('nodeName')) {
                            case 'INPUT':
                                strText = 'Ingrese valor.';
                                break;
                            case 'SELECT':
                                strText = 'Seleccione ' + control.prev().html();
                                break;
                            default:
                                strText = 'Ingrese/Seleccione valor.'
                                break;
                        };

                        if (control.val() == '') {
                            control.closest('.form-control').addClass('has-error');
                            $('#ErrorMessage' + valor).text(strText);
                            status = false;
                        } else {
                            control.closest('.form-control').removeClass('has-error');
                            $('#ErrorMessage' + valor).text('');
                        }
                    }

                });
                return status;
            },
            /**Copy Seccion*/
            copyToClipboard: function () {
                var element = document.getElementById('resumeContent');

                if (document.body.createTextRange) { // ie

                    var range = document.body.createTextRange();

                    range.moveToElementText(element);
                    range.select();

                    document.execCommand("Copy");
                    setInterval(function () { document.selection.empty(); }, 1000);

                } else if (window.getSelection) { // moz, opera, webkit

                    var selection = window.getSelection();
                    var range = document.createRange();

                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    document.execCommand("Copy");
                    setInterval(function () { selection.removeAllRanges(); }, 1000);
                }
            },

            getTypeClientAsIsOrToBe: function (plataformaAT, idTransactionAsIs, IdTransactionToBe) {
                console.log(plataformaAT + ' - ' + idTransactionAsIs + ' - ' + IdTransactionToBe)
                var idTransactionFront = '';
                switch (plataformaAT) {
                    case 'ASIS':
                        idTransactionFront = idTransactionAsIs;
                        break;
                    case 'TOBE':
                        idTransactionFront = IdTransactionToBe;
                        break;
                    default:
                        idTransactionFront = idTransactionAsIs;
                        break;
                }
                console.log('Transaccion:' + idTransactionFront)
                return idTransactionFront;
            },
            /*Seccion - left*/
            renderCustomerInformation: function (transactionData) {
                console.log(transactionData.Data.plataformaAT);
                var aplicaIGV = '00';// (transactionData.Data.plataformaAT == 'TOBE') ? '00' : transactionData.Data.Configuration.Constantes_Igv;
                var that = this,
                  igv = "1." + aplicaIGV;

                if (!$.array.isEmptyOrNull(transactionData.Data.CustomerInformation)) {
                    for (var prop in transactionData.Data.CustomerInformation) {
                        if ($(string.format('#spn{0}', prop)).length > 0) {
                            if (prop == 'PackageCost')
                                $(string.format('#spn{0}', prop)).text(transactionData.Data.CustomerInformation[prop] !== null ? (parseFloat(transactionData.Data.CustomerInformation[prop]) * parseFloat(igv)).toFixed(2) : '');
                            else
                                $(string.format('#spn{0}', prop)).text(transactionData.Data.CustomerInformation[prop] !== null ? transactionData.Data.CustomerInformation[prop] : '');

                        }
                    }
                }
                else {
                    alert('Error al consultar los datos del cliente. Por favor, reintente nuevamente más tarde.', null, function () {
                        $.unblockUI();
                        parent.window.close();
                    });

                }
            },

            renderCoreServices: function (transactionData) {
                var aplicaIGV = (transactionData.Data.plataformaAT == 'TOBE') ? '00' : transactionData.Data.Configuration.Constantes_Igv;/*TOBE  incluido Igv*/
                var that = this,
                    igv = "1." + aplicaIGV,
                    fixedCharge = 0;

                if (!$.array.isEmptyOrNull(transactionData.Data.CoreServices)) {
                    var iconService = { Cable: 'ico_cable', Internet: 'ico_internet', Telefonia: 'ico_phone' },
                        iconEquipment = { Cable: 'ico_modem', Internet: 'ico_router', Telefonia: 'ico_router' };

                    var cable = transactionData.Data.CoreServices.filter(function (el, idx) { return el.ServiceName == 'Internet' }),
                        telephony = transactionData.Data.CoreServices.filter(function (el, idx) { return el.ServiceName == 'Telefonia' }),
                        internet = transactionData.Data.CoreServices.filter(function (el, idx) { return el.ServiceName == 'Cable' });

                    $.each([internet, cable, telephony], function (idx, el) {

                        var markup = '';

                        if (el.length > 0) {
                            fixedCharge = parseFloat(fixedCharge) + parseFloat(el[0].FixedCharge);
                            markup += '<div class="row">';

                            markup += '<div class="col-sm-5 text-left pull-left">';
                            markup += '<div class="row">';
                            markup += '<div class="col-md-3">';
                            markup += string.format('<img src="/Content/Images/SUFija/{0}.svg" alt="..." class="">', iconService[el[0].ServiceName]);//Cable-internet-Telefonia
                            markup += '</div>';
                            markup += '<div class="col-md-9">';
                            markup += string.format('<span class="label-customer">{0}</span>', el[0].ServiceName);
                            markup += '<div class="clearfix"></div>';
                            markup += string.format('<span class="input-customer">{0}</span>', el[0].ServiceDescription);
                            markup += '</div>';
                            markup += '</div>';
                            markup += '</div>';

                            $.each(el, function (i, eq) {

                                markup += '<div class="col-sm-7 text-left pull-right">';
                                markup += '<div class="col-md-1 remove-padding">';
                                if (eq.EquipmentName != null || eq.EquipmentModel != null || eq.EquipmentSerial != null) {
                                    markup += string.format('<img src="/Content/Images/SUFija/{0}.svg" alt="" class="icon-collapse-bar" />', iconEquipment[el[0].ServiceName]);
                                }
                                markup += '</div>';
                                markup += '<div class="col-md-11 info-box">';
                                if (eq.EquipmentName != null || eq.EquipmentModel != null || eq.EquipmentSerial != null) {
                                    markup += string.format('<span class="label-customer-nbold">{0}</span>', (eq.EquipmentName == null) ? "" : eq.EquipmentName);
                                    markup += '<div class="clearfix"></div>';
                                    markup += string.format('<span class="input-customer">MOD: {0}</span>', (eq.EquipmentModel == null) ? "" : eq.EquipmentModel);
                                    markup += '<div class="clearfix"></div>';
                                    markup += string.format('<span class="input-customer">SER: {0}</span>', (eq.EquipmentSerial == null) ? "" : eq.EquipmentSerial);
                                }
                                markup += '</div>';
                                markup += '</div>';
                            })

                            markup += '</div>';

                            $('#lpCoreService').append(markup);
                        }

                    });
                } else {
                    alert('Error al consultar los servicio principales del cliente. Por favor, reintente nuevamente más tarde.', null, function () {

                        $.unblockUI();
                        parent.window.close();
                    });

                }
                fixedCharge = parseFloat(fixedCharge) * parseFloat(igv);
                $("#spnFixedChargeCoreService").show();
                $("#spnFixedChargeCoreService").text("S/. " + fixedCharge.toFixed(2));

            },

            renderAdditionalServices: function (transactionData) {
                var aplicaIGV = (transactionData.Data.plataformaAT == 'TOBE') ? '00' : transactionData.Data.Configuration.Constantes_Igv;
                var that = this,
                    igv = "1." + aplicaIGV,
                   FixedChargeServices = 0;

                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }
                if (!$.array.isEmptyOrNull(transactionData.Data.AdditionalServices)) {
                    var equipmentList = transactionData.Data.AdditionalServices.filter(function (el, idx) { return !$.string.isEmptyOrNull(el.EquipmentName) && !$.string.isEmptyOrNull(el.EquipmentModel) && !$.string.isEmptyOrNull(el.EquipmentSerial) }),
                        additionalServiceList = transactionData.Data.AdditionalServices.filter(function (el, idx) { return $.string.isEmptyOrNull(el.EquipmentName) && $.string.isEmptyOrNull(el.EquipmentModel) && $.string.isEmptyOrNull(el.EquipmentSerial) }),
                        Services = additionalServiceList.map(function (a) { return a.ServiceName }).filter(onlyUnique);

                    var markupII = ',',
                        iconService = { Cable: 'ico_cable', Internet: 'ico_internet', Telefonia: 'ico_phone' },
                        FixedCharge = 0;


                    // Services
                    $.each(Services, function (idx, serviceType) {

                        var ServiceList = additionalServiceList.filter(function (el, idx) { return el.ServiceName == serviceType });

                        markupII += '<ul class="tree remove-margin remove-padding">';
                        markupII += '<li>';
                        markupII += '<a>';
                        markupII += string.format('<img src="/Content/Images/SUFija/{0}.svg" alt="..." class=""><strong>{1}.</strong>', iconService[serviceType], serviceType);
                        markupII += '</a>';
                        markupII += '<ul>';
                        $.each(ServiceList, function (idx, service) {
                            markupII += string.format('<li><a>{0}</a></li>', service.ServiceDescription);
                            FixedChargeServices = parseFloat(FixedChargeServices) + parseFloat(service.FixedCharge);
                        });

                        markupII += '</ul>';
                        markupII += '</li>';
                        markupII += '</ul>';

                    });

                    if (FixedCharge > 0) {
                        FixedChargeServices = FixedChargeServices + FixedCharge;
                    }
                }
                FixedChargeServices = parseFloat(FixedChargeServices) * parseFloat(igv);//nuevo incluir igv
                $("#spnFixedCharge").show();
                $("#spnFixedCharge").text("S/. " + FixedChargeServices.toFixed(2));
                $('#serviceTree').append(markupII);
            },

            renderAdditionalEquipment: function (transactionData) {
                var aplicaIGV = (transactionData.Data.plataformaAT == 'TOBE') ? '00' : transactionData.Data.Configuration.Constantes_Igv;
                var that = this,
                  igv = "1." + aplicaIGV,
                  fixedCharge = 0;

                if (!$.array.isEmptyOrNull(transactionData.Data.AdditionalEquipment)) {
                    var iconService = { Cable: 'ico_cable', Internet: 'ico_internet', Telefonia: 'ico_phone' },
                        iconEquipment = { Cable: 'ico_modem', Internet: 'ico_router', Telefonia: 'ico_router' };

                    var cable = transactionData.Data.AdditionalEquipment.filter(function (el, idx) { return el.ServiceName == 'Internet' }),
                        telephony = transactionData.Data.AdditionalEquipment.filter(function (el, idx) { return el.ServiceName == 'Telefonia' }),
                        internet = transactionData.Data.AdditionalEquipment.filter(function (el, idx) { return el.ServiceName == 'Cable' });

                    $.each([internet, cable, telephony], function (idx, el) {

                        var markup = '';

                        if (el.length > 0) {
                            //fixedCharge = parseFloat(fixedCharge) + parseFloat(el[0].FixedCharge);
                            markup += '<div class="row">';

                            markup += '<div class="col-sm-5 text-left pull-left">';
                            markup += '<div class="row">';
                            markup += '<div class="col-md-3">';
                            markup += string.format('<img src="/Content/Images/SUFija/{0}.svg" alt="..." class="">', iconService[el[0].ServiceName]);//Cable-internet-Telefonia
                            markup += '</div>';
                            markup += '<div class="col-md-9">';
                            markup += string.format('<span class="label-customer">{0}</span>', el[0].ServiceName);
                            markup += '<div class="clearfix"></div>';
                            markup += string.format('<span class="input-customer">{0}</span>', el[0].ServiceDescription);
                            markup += '</div>';
                            markup += '</div>';
                            markup += '</div>';

                            $.each(el, function (i, eq) {
                                fixedCharge = parseFloat(fixedCharge) + parseFloat(eq.FixedCharge);
                                markup += '<div class="col-sm-7 text-left pull-right">';
                                markup += '<div class="col-md-1 remove-padding">';
                                if (eq.EquipmentName != null || eq.EquipmentModel != null || eq.EquipmentSerial != null) {
                                    markup += string.format('<img src="/Content/Images/SUFija/{0}.svg" alt="" class="icon-collapse-bar" />', iconEquipment[el[0].ServiceName]);
                                }
                                markup += '</div>';
                                markup += '<div class="col-md-11 info-box">';
                                if (eq.EquipmentName != null || eq.EquipmentModel != null || eq.EquipmentSerial != null) {
                                    markup += string.format('<span class="label-customer-nbold">{0}</span>', (eq.EquipmentName == null) ? "" : eq.EquipmentName);
                                    markup += '<div class="clearfix"></div>';
                                    markup += string.format('<span class="input-customer">MOD: {0}</span>', (eq.EquipmentModel == null) ? "" : eq.EquipmentModel);
                                    markup += '<div class="clearfix"></div>';
                                    markup += string.format('<span class="input-customer">SER: {0}</span>', (eq.EquipmentSerial == null) ? "" : eq.EquipmentSerial);
                                }
                                markup += '</div>';
                                markup += '</div>';
                            })

                            markup += '</div>';

                            $('#lpAdditionalEquipment').append(markup);
                        }

                    });
                }
                fixedCharge = parseFloat(fixedCharge) * parseFloat(igv);
                $("#spnFixedChargeEquipmentService").show();
                $("#spnFixedChargeEquipmentService").text("S/. " + fixedCharge.toFixed(2));

            },
            transactionInitialConfigurationPromise: function (oSessionParams, idTransactionFront) {
                var oBodyRequest = {
                    ContractID: oSessionParams.DATACUSTOMER.ContractID,
                    CustomerID: oSessionParams.DATACUSTOMER.CustomerID,
                    coIdPub: oSessionParams.DATACUSTOMER.coIdPub,//ContratoPublico-TOBE
                    UserAccount: oSessionParams.USERACCESS.login,
                    codeRol: '-1',
                    codeCac: '-1',
                    state: '1',
                    Type: "DAC"
                }

                var areaApp = window.location.pathname.substr(1).split('/')[0],
                    strUrl = string.format('/{0}/Home/GetInitialConfiguration', areaApp)
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: strUrl,
                        contentType: "application/json; charset=utf-8",
                        type: 'POST',
                        data: JSON.stringify({
                            oBodyRequest: oBodyRequest,
                            SessionID: Session.UrlParams.IdSession,
                            TransactionID: idTransactionFront
                        }),
                        success: function (res) { resolve(res); },
                        error: function (err) { reject(err); }
                    });
                });
            }
        },
        reusableViews: {
            viewOfTheLeftSide: function (container) {
                var viewOfTheLeft = '',
                    feed = '',
                    that = this;
                return new Promise(function (resolve, reject) {
                    feed += '<div id=\"divCustomerData\" class=\"bg-container\">';
                    feed += '{0}{1}{2}{3}{4}';
                    feed += '<\/div>';
                    feed += '{5}';
                    viewOfTheLeft = string.format(feed,
                                    that.viewPackageCurrentInformation(),
                                    that.viewCustomerInformation(),
                                    that.viewServicesCoreInformation(),
                                    that.viewServicesAdittionalInformation(),
                                    that.viewServicesEquipmentInformation(),
                                    that.viewReserveTime()
                                    )
                    container.html(viewOfTheLeft);
                    resolve();
                });
            },
            viewPackageCurrentInformation: function () {
                var viewCustomer = '';
                /*Datos del Paquete actual*/
                viewCustomer += "    <div class=\"row\">";
                viewCustomer += "        <div class=\"customer-data-title\">";
                viewCustomer += "            <div class=\"customer-data-title-items customer-data-title-icon\">";
                viewCustomer += "                <span class=\"pqt-actual-icon\"><\/span>";
                viewCustomer += "            <\/div>";
                viewCustomer += "            <div class=\"customer-data-title-items customer-data-title-label\">";
                viewCustomer += "                <span>PAQUETE ACTUAL<\/span>";
                viewCustomer += "            <\/div>";
                viewCustomer += "            <div class=\"customer-data-title-items customer-data-title-price text-right pull-right\">";
                viewCustomer += "                <span class=\"data-currency\">S\/<\/span>";
                viewCustomer += "                <span id=\"spnPackageCost\" class=\"data-price\"><\/span>";
                viewCustomer += "                <p class=\"data-igv\">Incluido IGV<\/p>";
                viewCustomer += "            <\/div>";
                viewCustomer += "        <\/div>";
                viewCustomer += "    <\/div>";
                viewCustomer += "";
                viewCustomer += "";
                viewCustomer += "    <div class=\"row\">";
                viewCustomer += "        <div class=\"col-md-12 plan\">";
                viewCustomer += "            <div class=\"col-xs-5 col-sm-5 col-md-5\">";
                viewCustomer += "                <div class=\"plan-text\">";
                viewCustomer += "                    <div class=\"row\">";
                viewCustomer += "                        <div class=\"col-md-12\" id=\"spnPackageDescription\"><\/div>";
                viewCustomer += "                        <div class=\"col-md-12 description\"><\/div>";
                viewCustomer += "                    <\/div>";
                viewCustomer += "                <\/div>";
                viewCustomer += "            <\/div>";
                viewCustomer += "            <div class=\"col-xs-7 col-sm-7 col-md-7\">";
                viewCustomer += "                <img src=\"\/Content\/Images\/SUFija\/3playBlanco.png\" alt=\"\" class=\"pull-right img-responsive\" \/>";
                viewCustomer += "            <\/div>";
                viewCustomer += "        <\/div>";
                viewCustomer += "    <\/div>";
                return viewCustomer;
            },
            viewCustomerInformation: function () {
                var viewCustomer = '';
                /*Datos del Cliente*/
                viewCustomer += "    <div class=\"row\">";
                viewCustomer += "        <div class=\"panel-group customer-data-panel-group\" id=\"accordion\">";
                viewCustomer += "";
                viewCustomer += "            <div class=\"panel panel-default customer-data-panel\">";
                viewCustomer += "";
                viewCustomer += "                <div class=\"panel-heading\">";
                viewCustomer += "                    <h4 class=\"panel-title font-size-fixed\">";
                viewCustomer += "                        <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"\" href=\"#collapseOne\">";
                viewCustomer += "                            <img src=\"\/Content\/Images\/SUFija\/ico_client.svg\" alt=\"\" class=\"icon-collapse-bar-horizontal\" \/>";
                viewCustomer += "                            Datos del Cliente";
                viewCustomer += "                        <\/a>";
                viewCustomer += "                    <\/h4>";
                viewCustomer += "                <\/div>";
                viewCustomer += "                <div id=\"collapseOne\" class=\"panel-collapse collapse in\">";
                viewCustomer += "                    <div class=\"panel-body customer-data-panel-body\">";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-12 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Cliente\/Razón social.<\/span>";
                viewCustomer += "                                <p id=\"spnCustomerName\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-12 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Contacto.<\/span>";
                viewCustomer += "                                <p id=\"spnContactName\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Contrato.<\/span>";
                viewCustomer += "                                <p id=\"spnContractNumber\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Fecha de Activación.<\/span>";
                viewCustomer += "                                <p id=\"spnActivationDate\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Representante Legal.<\/span>";
                viewCustomer += "                                <p id=\"spnLegalRepresentative\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Doc. Repres. Legal.<\/span>";
                viewCustomer += "                                <p id=\"spnLegalRepresentativeDocument\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">DNI\/RUC.<\/span>";
                viewCustomer += "                                <p id=\"spnDocumentNumber\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Customer ID<\/span>";
                viewCustomer += "                                <p id=\"spnCustomerID\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Tipo de Persona.<\/span>";
                viewCustomer += "                                <p id=\"spnCustomerType\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Ciclo de Facturación.<\/span>";
                viewCustomer += "                                <p id=\"spnBillingCycle\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                        <div class=\"row\">";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Telefono 1.<\/span>";
                viewCustomer += "                                <p id=\"spnPhoneNumber01\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                            <div class=\"col-sm-6 text-left\">";
                viewCustomer += "                                <span class=\"label-customer\">Telefono 2.<\/span>";
                viewCustomer += "                                <p id=\"spnPhoneNumber02\" class=\"input-customer\"><\/p>";
                viewCustomer += "                            <\/div>";
                viewCustomer += "                        <\/div>";
                viewCustomer += "                    <\/div>";
                viewCustomer += "                <\/div>";
                viewCustomer += "            <\/div>";
                viewCustomer += "";
                return viewCustomer;
            },
            viewServicesCoreInformation: function () {
                var viewCustomer = '';
                /*Servicios y Equipos*/
                viewCustomer += "            <div class=\"panel panel-default\">";
                viewCustomer += "";
                viewCustomer += "                <div class=\"panel-heading\">";
                viewCustomer += "                    <h4 class=\"panel-title font-size-fixed\">";
                viewCustomer += "                        <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"\" href=\"#collapseTwo\">";
                viewCustomer += "                            <img src=\"\/Content\/Images\/SUFija\/ico_core_services.svg\" alt=\"\" class=\"icon-collapse-bar-horizontal\" \/>";
                viewCustomer += "                            Servicios y Equipos";
                viewCustomer += "                        <\/a>";
                viewCustomer += "                        <span id=\"spnFixedChargeCoreService\"  class=\"partial-cost pull-right\">S\/ 0.00<\/span>";
                viewCustomer += "                    <\/h4>";
                viewCustomer += "                <\/div>";
                viewCustomer += "";
                viewCustomer += "                <div id=\"collapseTwo\" class=\"panel-collapse collapse in\">";
                viewCustomer += "";
                viewCustomer += "                    <div id=\"lpCoreService\" class=\"panel-body customer-data-panel-body\"><\/div>";
                viewCustomer += "";
                viewCustomer += "                <\/div>";
                viewCustomer += "";
                viewCustomer += "            <\/div>";
                viewCustomer += "";
                return viewCustomer;
            },
            viewServicesAdittionalInformation: function () {
                var viewCustomer = '';
                /*Servicios Adicionales*/
                viewCustomer += "            <div class=\"panel panel-default\">";
                viewCustomer += "";
                viewCustomer += "                <div class=\"panel-heading\">";
                viewCustomer += "                    <h4 class=\"panel-title font-size-fixed\">";
                viewCustomer += "                        <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"\" href=\"#collapseThree\">";
                viewCustomer += "                            <img src=\"\/Content\/Images\/SUFija\/ico_additional_services.svg\" alt=\"\" class=\"icon-collapse-bar-horizontal\" \/>";
                viewCustomer += "                            Servicios Adicionales";
                viewCustomer += "                        <\/a>";
                viewCustomer += "                        <span id=\"spnFixedCharge\" class=\"partial-cost pull-right\">S\/ 0.00<\/span>";
                viewCustomer += "                    <\/h4>";
                viewCustomer += "                <\/div>";
                viewCustomer += "";
                viewCustomer += "                <div id=\"collapseThree\" class=\"panel-collapse collapse in\">";
                viewCustomer += "                    <div class=\"panel-body customer-data-panel-body\">";
                viewCustomer += "";
                viewCustomer += "                        <div id=\"serviceTree\" class=\"col-sm-12 remove-margin remove-padding\"><\/div>";
                viewCustomer += "                    <\/div>";
                viewCustomer += "";
                viewCustomer += "                <\/div>";
                viewCustomer += "            <\/div>";
                viewCustomer += "";
                return viewCustomer;
            },
            viewServicesEquipmentInformation: function () {
                var viewCustomer = '';
                /*Equipos Adicionales*/
                viewCustomer += "            <div class=\"panel panel-default\">";
                viewCustomer += "";
                viewCustomer += "                <div class=\"panel-heading\">";
                viewCustomer += "                    <h4 class=\"panel-title font-size-fixed\">";
                viewCustomer += "                        <a class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"\" href=\"#collapseFour\">";
                viewCustomer += "                            <img src=\"\/Content\/Images\/SUFija\/ico_additional_services.svg\" alt=\"\" class=\"icon-collapse-bar-horizontal\" \/>";
                viewCustomer += "                            Equipos Adicionales";
                viewCustomer += "                        <\/a>";
                viewCustomer += "                        <span id=\"spnFixedChargeEquipmentService\" class=\"partial-cost pull-right\">S\/ 0.00<\/span>";
                viewCustomer += "                    <\/h4>";
                viewCustomer += "                    <\/div>";
                viewCustomer += "";
                viewCustomer += "                <div id=\"collapseFour\" class=\"panel-collapse collapse in\">";
                viewCustomer += "                    <div id=\"lpAdditionalEquipment\" class=\"panel-body customer-data-panel-body\"><\/div>";
                viewCustomer += "                <\/div>";
                viewCustomer += "";
                viewCustomer += "            <\/div>";
                viewCustomer += "";
                viewCustomer += "        <\/div>";
                viewCustomer += "    <\/div>";
                //  viewCustomer += "<\/div>";
                return viewCustomer;
            },
            viewReserveTime: function () {
                var viewReserveTime = '';
                /*Tiempo de reserva TOA*/
                viewReserveTime += "<div id=\"countdown\" ";
                viewReserveTime += "style=\"background-color: #da291c; ";
                viewReserveTime += "color: #ffffff;";
                viewReserveTime += " font-size: 20px;";
                viewReserveTime += " position: fixed; ";
                viewReserveTime += " z-index: 10; ";
                viewReserveTime += " padding-left: 2%; ";
                viewReserveTime += " padding-right: 2%; ";
                viewReserveTime += " top: 86vh;";
                viewReserveTime += "display:none\">";
                viewReserveTime += " <small style=\"font-size: 13px;\">";
                viewReserveTime += " Tiempo restante de reserva";
                viewReserveTime += " <\/small><p>";
                viewReserveTime += " <\/p>";
                viewReserveTime += " <\/div>";
                return viewReserveTime;
            },
        },
        reusableBusiness: {

            getIgv: function (ListIgv, callback) {
                var that = this,
                    fecActual = $.getFechaActual().split('/');
                var currentDate = new Date(fecActual[2] + '-' + fecActual[1] + '-' + fecActual[0]);
                var igv;
                if (ListIgv != []) {
                    $.each(ListIgv, function (index, value) {
                        ;
                        var fStart = new Date(value.impudFecIniVigencia);
                        var fEnd = new Date(value.impudFecFinVigencia);
                        if (fStart <= currentDate && fEnd >= currentDate && value.impunTipDoc == '0')
                            igv = value.igv;
                    });
                }
                callback(igv);
            },

            LoadTimeZone: function (control, objLoadParameters) {

                var areaApp = window.location.pathname.substr(1).split('/')[0],
                    strUrl = string.format('/{0}/Home/GetDatosFranjaHorario', areaApp);

                var ActivityCapacity = [
                        { "nombre": "XA_Map", "valor": $.PadLeft(objLoadParameters.idPlano, 10) },
                        { "nombre": "XA_WorkOrderSubtype", "valor": objLoadParameters.subtipoOrden },
                        { "nombre": "XA_Zone", "valor": objLoadParameters.codZona }
                ];
                objLoadParameters.listaCampoActividadCapacidad = ActivityCapacity;

                $.app.ajax({
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    url: strUrl,
                    data: JSON.stringify(objLoadParameters),
                    success: function (response) {
                        debugger;
                        control.empty();
                        control.append($('<option>', { value: '', html: 'Seleccionar' }));

                        if (response.dataCapacity.MessageResponse.Body.CodigoRespuesta == '-1') {
                            alert('El servicio capacity no devuelve listas franjas horarias.');
                        }
                        else {
                            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioCapacity != null) {
                                var i = 0;
                                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioCapacity, function (index, value) {
                                    if (value.Estado == 'RED') {
                                        control.append('<option idHorario="' + value.Descripcion2.split('-')[0] + '" style="background-color: #E60000; color:#ffffff" value="' + value.Codigo + '" Disabled>' + value.Descripcion + '</option>');
                                    }
                                    else {
                                        control.append('<option idHorario="' + value.Descripcion2.split('-')[0] + '" idConsulta="' + value.Codigo2 + '" Franja="' + value.Codigo + '" idBucket="' + value.Codigo3 + '" style="background-color: #FFFFFF;" value="' + value.Codigo + '+' + value.Codigo3 + '">' + value.Descripcion + '</option>');
                                        //value.Codigo2: idConsulta- xejmpl: 7176588
                                        //value.Codigo :vFranja  - xejmpl: AM2
                                        //value.Codigo3: idBucket - xejmpl: BUCKET_PRUEBA_FTTH
                                        //value.Descripcion2: FRANJA_HOR - xejmpl: 09:00 am-11:00 am
                                    }
                                });
                            }
                            else {
                                alert('El servicio capacity no devuelve listas franjas horarias.');
                            }
                            /*
                            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioSga != null) {
                                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioSga, function (index, value) {
                                    control.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));
                                });
                            }

                            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioXml != null) {
                                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioXml, function (index, value) {
                                    control.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));
                                });
                            }
                            */
                        }
                        $.unblockUI();
                    },
                    complete: function () {
                        $.unblockUI();
                    },
                    error: function (ex) {
                        alert('Error al consultar las franjas horarias. Por favor intente nuevamente.');
                        $.unblockUI();
                    }
                }
                );
            },



            LoadPointOfAttention: function (control, transactionData) {
                var index = transactionData.Data.DatosUsuarioCtaRed.length;
                var oDatosUsuarioCtaRed = transactionData.Data.DatosUsuarioCtaRed.length > 0 ?
                                          transactionData.Data.DatosUsuarioCtaRed[index - 1] : [];
                console.log(transactionData);
                var oListPuntoAtencion = transactionData.Data.PuntoAtencion;

                var itemSelect = '';
                control.append($('<option>', { value: '', html: '-Seleccionar-' }));
                $.each(oListPuntoAtencion, function (index, value) {
                    if (value.nombre == oDatosUsuarioCtaRed.descripcionCac) {
                        control.append($('<option>', { value: value.codigo, html: value.nombre }));
                        itemSelect = value.codigo;
                    }
                    else {
                        control.append($('<option>', { value: value.codigo, html: value.nombre }));
                    }
                    if (!$.string.isEmptyOrNull(itemSelect)) {
                        $(control.selector + ' option[value="' + itemSelect + '"]').attr('selected', true);
                    }
                });

            }


        },

        window: __jControlWindow__,

        control: {
            button: __jControlButton__
        },

        array: {
            isEmptyOrNull: function (value) {
                return /*value instanceof Array &&*/ (value == null || this.isEmpty(value));
            },
            isEmpty: function (value) {
                return value.length === 0;
            },
            unique: function (array, propertyName) {
                return array.filter(function (e, i) { return array.findIndex(function (a) { return a[propertyName] === e[propertyName] }) === i });
            }
        },

        string: {
            isEmptyOrNull: function (value) {
                return (typeof value == 'string' && !value.trim()) || typeof value == 'undefined' || value === null;
            },
            capitalize: function (value) {
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        },

        getSiteRoot: function () {
            return siteRoot;
        },

        formatDate: function (date, settings) {

            var formatDateTimeDefault = {

                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
                    'Diciembre'],
                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
                    'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves',
                    'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                ampmNames: ['a.m.', 'p.m.'],
                getSuffix: function (num) {
                    if (num > 3 && num < 21) {
                        return 'th';
                    }

                    switch (num % 10) {
                        case 1: return "st";
                        case 2: return "nd";
                        case 3: return "rd";
                        default: return "th";
                    }
                },
                attribute: 'data-datetime',
                formatAttribute: 'data-dateformat',
                format: 'dd/mm/yy gg:ii:ss a'

            };

            if (!date)
                return '';

            if (typeof date != Date) {
                if ((/^\//).test(date))
                    date = eval('new ' + date.replace(/\//g, ''));
                else
                    date = new Date(date);
            }

            settings = $.extend({}, formatDateTimeDefault, settings);

            var format = settings.format;
            var ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4)
                - Math.floor(1970 / 100)
                + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);

            var output = '';
            var literal = false;
            var iFormat = 0;

            // Check whether a format character is doubled
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length
                    && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            };

            // Format a number, with leading zero if necessary
            var formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            };

            // Format a name, short or long as requested
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };

            // Get the value for the supplied unit, e.g. year for y
            var getUnitValue = function (unit) {
                switch (unit) {
                    case 'y': return date.getFullYear();
                    case 'm': return date.getMonth() + 1;
                    case 'd': return date.getDate();
                    case 'g': return date.getHours() % 12 || 12;
                    case 'h': return date.getHours();
                    case 'i': return date.getMinutes();
                    case 's': return date.getSeconds();
                    case 'u': return date.getMilliseconds();
                    default: return '';
                }
            };

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case 'a':
                            output += date.getHours() < 12
                                ? settings.ampmNames[0]
                                : settings.ampmNames[1];
                            break;
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'S':
                            var v = getUnitValue(iFormat && format.charAt(iFormat - 1));
                            output += (v && (settings.getSuffix || $.noop)(v)) || '';
                            break;
                        case 'D':
                            output += formatName('D',
                                date.getDay(),
                                settings.dayNamesShort,
                                settings.dayNames);
                            break;
                        case 'o':
                            var end = new Date(date.getFullYear(),
                                date.getMonth(),
                                date.getDate()).getTime();
                            var start = new Date(date.getFullYear(), 0, 0).getTime();
                            output += formatNumber(
                                'o', Math.round((end - start) / 86400000), 3);
                            break;
                        case 'g':
                            output += formatNumber('g', date.getHours() % 12 || 12, 2);
                            break;
                        case 'h':
                            output += formatNumber('h', date.getHours(), 2);
                            break;
                        case 'u':
                            output += formatNumber('u', date.getMilliseconds(), 3);
                            break;
                        case 'i':
                            output += formatNumber('i', date.getMinutes(), 2);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M',
                                date.getMonth(),
                                settings.monthNamesShort,
                                settings.monthNames);
                            break;
                        case 's':
                            output += formatNumber('s', date.getSeconds(), 2);
                            break;
                        case 'y':
                            output += (lookAhead('y')
                                ? date.getFullYear()
                                : (date.getYear() % 100 < 10 ? '0' : '')
                                + date.getYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                output += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }

            return output;
        },

        onlyNumbersPoint: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                if (this.value.match(/[^0-9.]/g)) {
                    this.value = this.value.replace(/[^0-9.]/g, '');
                }
            });
        },

        onlyNumbers: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                if (this.value.match(/[^0-9]/g)) {
                    this.value = this.value.replace(/[^0-9]/g, '');
                }
            });
        },

        onlyNumbersLetters: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                if (this.value.match(/[^a-zA-Z0-9]/g)) {
                    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
                }
            });
        },

        onlyNumbersLettersLine: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                if (this.value.match(/[^a-zA-Z0-9-]/g)) {
                    this.value = this.value.replace(/[^a-zA-Z0-9-]/g, '');
                }
            });
        },

        onlyLetters: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                if (this.value.match(/[^a-zA-ZñÑ]/g)) {
                    this.value = this.value.replace(/[^a-zA-Z]/g, '');
                }
            });
        },

        onlyLettersSpaces: function myfunction(input) {
            input.off('keyup');
            input.keyup(function () {
                this.value = this.value.replace(/(\s{2,})|[^a-zA-ZÑñ]/g, ' ');
                this.value = this.value.replace(/^\s*/, '');
            });
        },

        rowSelection: function (options) {
            var _rowSelectionDefault = {
                id: null,
                link: null
            };
            options = $.extend({}, _rowSelectionDefault, options);

            $((options.link == null ? '#' + options.id : '.' + options.link) + ' tbody tr').on('click', function (event) {
                if (event.target.type != 'radio')
                    $(this).find('td input[type=radio]').prop('checked', true).trigger('change');

                $('.' + options.link + ' tbody tr').removeAttr('style');
                $(this).css({ 'background': '#E3EEF7' }).siblings("tr").removeAttr('style');
            });
        },
        PadLeft: function (num, length) {
            while (num.length < length) {
                num = '0' + num;
            }
            return num;
        },
        getFechaActual: function () {

            var that = this;
            var d = new Date();
            var FechaActual = that.AboveZero(d.getDate()) + "/" + (that.AboveZero(d.getMonth() + 1)) + "/" + d.getFullYear();
            return FechaActual;
        },
        AboveZero: function (i) {

            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        monthDays: function () {
            var d = new Date(new Date().getFullYear(),
                new Date().getMonth() + 1, 0);
            return d.getDate();
        }
    });

    $.fn.extend({

        enable: function (value) {
            return this.each(function () {
                this.disabled = (value != undefined ? !value : false);
            });
        },

        populateDropDown: function (items) {
            return this.each(function () {
                var $this = $(this);

                $this.empty();
                $this.enable(false);

                if (items != null && items.length > 0) {

                    $.each(items, function (index, item) {

                        $this.append($('<option>')
                           .val(item.Id)
                           .text(item.Desc)
                           .attr(item.attributes)
                           );
                    });

                    $this.enable();
                }
            });
        },

        hideMessage: function () {
            return this.each(function () {
                var $that = $(this);

                $that.hide();

                var className = $that.attr('class');

                if (className) {
                    $that.removeClass(className);
                }

                $that.empty();
            });
        },

        showMessage: function (type, message) {
            var className;

            switch (type) {
                case 'error':
                    className = $.app.const.actionErrorClassName;
                    break;
                case 'success':
                    className = $.app.const.actionSuccessClassName;
                    break;
                default:
                    className = '';
                    break;
            }

            return this.each(function () {
                $(this)
                    .addClass(className)
                    .html(message)
                    .show();
            })
        },

        showMessageErrorLoading: function (objectError) {
            var className;
            className = $.app.const.actionErrorClassName;

            var div = $('<div>',
                {
                    class: 'containerError',
                    align: 'center'
                });

            if (typeof (objectError) === "object") {

                objectError.message += '<span>' + objectError.session + '</span><br /><br />';
                objectError.message += '<button id="' + objectError.buttonID + '" type="button" class="btn claro-btn-info btn-sm" data-dismiss="modal">Volver a cargar</button>';

                div.html(objectError.message);
                return this.each(function () {
                    $(this)
                        .addClass(className)
                        .html(div)
                        .show();
                    $("#" + objectError.buttonID).addEvent(objectError.that, 'click', objectError.funct);
                    objectError.message = "";
                })
            } else {
                objectError += '<span>' + Session.IDSESSION + '</span><br /><br />';
                div.html(objectError);
                return this.each(function () {
                    $(this)
                        .addClass(className)
                        .html(div)
                        .show();
                })
            }

        },

        addEvent: function (sender, name, event) {
            var fn = this;
            return this.each(function () {
                var that = $(this);
                function facadeEvent(e) {
                    var typeoption2 = that.attr('typeoptions');
                    var args = {};

                    if (typeof typeoption2 != 'undefined' && (typeoption2 == '1' || typeoption2 == '2')) {
                        args = {
                            sender: sender,
                            event: e,
                            control: that,
                            code: that.attr('profile'),
                            fn_response: event,
                            fn_validate: fn.ValidateMenu

                        };

                        $.functionValidateMenu.call(sender, that, args);
                        return;

                    } else {
                        args = {
                            event: e,
                            control: that
                        };
                        event.call(sender, that, args);
                    }
                }


                var atributo = that.attr('profile');
                var typeoption = that.attr('typeoptions');
                if (typeoption == undefined || typeoption == '3') {
                    if (atributo == undefined) {
                        that.unbind(name);
                        that.bind(name, facadeEvent);
                    } else {
                        var stroptionPermissions = Session.USERACCESS.optionPermissions;

                        var arr = atributo.split(",");
                        var i = Session.DATACUSTOMER.Application == 'POSTPAID' ? 0 : Session.DATACUSTOMER.Application == 'HFC' ? 1 : Session.DATACUSTOMER.Application == 'LTE' ? 1 : 0;
                        if (stroptionPermissions.indexOf(arr[i]) < 0) {
                            that.hide();
                        } else {
                            that.unbind(name);
                            that.bind(name, facadeEvent);
                        }

                    }
                } else if (typeoption == '1' || typeoption == '2') {
                    that.unbind(name);
                    that.bind(name, facadeEvent);
                }
            })
        },
        showMessageErrorLoadingTransaction: function () {
            var className, message = '';
            className = $.app.const.actionErrorClassName;
            var div = $('<div>',
                {
                    class: 'principal-row',
                    align: 'center'
                });
            message += '<div style=" background-image: url(../../../../Content/images/SUFija/claro-bg.png);';
            message += 'padding: 25px 300px 250px 300px; display: block; text-align: center; width: 100%; margin: 0 auto;';
            message += 'background-color: white; background-image: url(../../../../Content/images/SUFija/claro-bg.png);';
            message += 'background-repeat: no-repeat; background-position: left top;background-size: 25%; ">';
            //message += '<h1><span style="color: #da291c!important;">¡Ups...!</span></h1>';
            message += '<p>&nbsp;</p>';
            message += '<p>Estimado usuario, en este momento estamos presentando intermitencia en el aplicativo. ';
            //message += '<br/>';
            message += 'Por favor intentelo nuevamente en unos minutos ingresando  a la opción o actualizando la página.</p>';
            message += '</div>';
            div.html(message);
            $('#myRulenav').hide();
            $('#navbar-body').hide();
            $('#main-footer').hide();
            return this.each(function () {
                $(this)
                    .addClass(className)
                    .html(div)
                    .show();
            });

        },


    });

    // This will help DataTables magic detect the "ddmmyyyyhhmisstt" format; Unshift
    // so that it's the first data type (so it takes priority over existing)
    jQuery.fn.dataTableExt.aTypes.unshift(
        function (sData) {
            if (/^([0-2]?\d|3[0-1])\/([0-2]?\d|3[0-1])\/\d{4}/i.test(sData)) {
                return 'date-ddmmyyyyhhmisstt';
            }
            return null;
        }
    );

    // define the sorts
    jQuery.fn.dataTableExt.oSort['date-ddmmyyyyhhmisstt-asc'] = function (a, b) {
        var ordA = $.app.ddmmyyyyhhmisstt2Time(a),
            ordB = $.app.ddmmyyyyhhmisstt2Time(b);

        return (ordA < ordB) ? -1 : ((ordA > ordB) ? 1 : 0);
    };

    jQuery.fn.dataTableExt.oSort['date-ddmmyyyyhhmisstt-desc'] = function (a, b) {
        var ordA = $.app.ddmmyyyyhhmisstt2Time(a),
            ordB = $.app.ddmmyyyyhhmisstt2Time(b);

        return (ordA < ordB) ? 1 : ((ordA > ordB) ? -1 : 0);
    };

    jQuery.fn.dataTable.Api.register('sum()', function () {
        return this.flatten().reduce(function (a, b) {
            if (typeof a === 'string') {
                a = a.replace(/[^\d.-]/g, '') * 1;
            }
            if (typeof b === 'string') {
                b = b.replace(/[^\d.-]/g, '') * 1;
            }

            return a + b;
        }, 0);
    });

    $.fn.extend($, {
        IsNullOrUndefinedOrEmpty: function (value) {
            if (!value) {
                if (typeof value == 'undefined' || value == null || value.toString().trim() == '') {
                    return false;
                } else if (value = '') {
                    return false;
                }
                return false;
            }
            if (value.trim() == '') {
                return false;
            }
            return true;
        },
        NameWindow: null,
        Window: {
            open: function (url, args, width, height, center, modal, fn_closed) {

                var left = ((screen.width - parseInt(width)) / 2);
                var top = ((screen.height - parseInt(height)) / 2);
                var options = 'location=si,menubar=no,titlebar=no,resizable=si,toolbar=no, menubar=no,width=' + width + ',height=' + height;
                if (center != null && center == true) options = 'location=si,menubar=no,titlebar=no,resizable=si,toolbar=no, menubar=no,width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
                var win = null;
                if (modal != null && modal == true) {
                    if (typeof window.showModalDialog != 'undefined') {
                        win = window.showModalDialog(url, args, options);
                    } else {
                        win = window.open(url, '_win', options);
                        win.dialogarguments = args;
                    }
                } else {
                    win = window.open(url, '_win', options);
                    win.dialogarguments = args;
                }
                win.response = null;
                $(win).on('blur', function (e) {
                    win.focus();
                });
                var timer = setInterval(function () {
                    if (typeof win != 'undefined' && win != null) {
                        if (win.closed) {
                            clearInterval(timer);
                            if (typeof fn_closed != 'undefined' && fn_closed != null) {
                                if ($.isFunction(fn_closed)) {
                                    win.response = JSON.parse(win.response);
                                    fn_closed(win.response);
                                }
                            }
                        }
                    }
                }, 1000);
                return win;
            }
        }
    });

})(jQuery, null);

var string = String;

if (!string.format) {
    string.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}

function alert(message, title, callback) {

    $.window.open({
        autoSize: true,
        url: '',
        title: title || 'Alerta',
        text: message,
        imageSource: 'ico_alert_claro.svg',
        imageSourceClass: '',
        modal: true,
        alert: true,
        controlBox: false,
        maximizeBox: false,
        minimizeBox: false,
        buttons: {
            Confirmar: {
                'class': 'btn modal-button-confirm',
                'click': function (sender, args) {
                    this.close();
                    if (callback != null) {
                        callback.call(this);
                    }
                }
            }
        }
    });
}

function confirm(message, title, callbackOk, callbackCancel, callbackClose) {

    $.window.open({
        autoSize: true,
        url: '',
        title: title || 'Confirmar',
        text: message,
        imageSource: 'ico_alert_claro.svg',
        imageSourceClass: '',
        modal: true,
        alert: true,
        controlBox: false,
        maximizeBox: false,
        minimizeBox: false,
        buttons: {
            Cancelar: {
                "class": 'btn modal-button-cancel',
                click: function (sender, args) {
                    this.close();
                    if (callbackCancel != null) {
                        callbackCancel.call(this, false);
                    }
                    if (callbackClose != null) {
                        callbackClose.call(this, true);
                    }
                }
            },
            Confirmar: {
                "class": 'btn modal-button-confirm',
                click: function (sender, args) {
                    this.close();
                    if (callbackOk != null) {
                        callbackOk.call(this, true);
                    }
                    if (callbackClose != null) {
                        callbackClose.call(this, true);
                    }
                }
            },
        }
    });
}