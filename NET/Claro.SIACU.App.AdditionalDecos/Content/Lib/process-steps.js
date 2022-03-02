$(function () {

    $('.next-step').show();
    $('.Save-step, .Constancy-step, .prev-step').hide();

    $('.next-step, .prev-step').on('click', function (e) {
        navigateTabs(e);
    });

    $('.close').on('click', function (e) {
        $(this).parent().hide();
    });

});

function navigateTabs(e) {

    var index,
        $activeTab = $('.step.tab-pane.active');

    e = e.target ? e.target : e.srcElement;

    if ($(e).hasClass('next-step') || $(e).hasClass('next-trans')) {

        var length = $('.btn-circle-step').length;
        var nextTab = $activeTab.next('.tab-pane').attr('id');
        var percent = $activeTab.next('.tab-pane').attr('percent');

        document.getElementById('prog').style.width = percent;

        $('[href="#' + nextTab + '"]').tab('show');
        $('[href="#' + nextTab + '"]').removeClass('disabled');
        $('[href="#' + nextTab + '"]').prop('disabled', false);

        index = $('[href="#' + nextTab + '"]').attr('index');
    }

    var btnClass = ''

    if ($(e).hasClass('prev-step')) {

        var length = $('.btn-circle-step').length;
        var prevTab = $activeTab.prev('.tab-pane').attr('id');
        var percent = $activeTab.prev('.tab-pane').attr('percent');

        document.getElementById('prog').style.width = percent;

        $('[href="#' + prevTab + '"]').tab('show');
        index = $('[href="#' + prevTab + '"]').attr('index');
    }

    for (var i = 1; i <= length; i++) {

        btnClass = $('[index="' + i + '"]').closest('div').find('span').attr('class');

        if (i <= index) {
            $('[index="' + i + '"]').removeClass('btn-default-Step').addClass('transaction-button-Steps');
            $('[index="' + i + '"]').closest('div').find('span').attr('class', btnClass.replace('-passive', '-active'));
        } else {
            $('[index="' + i + '"]').removeClass('transaction-button-Steps').addClass('btn-default-Step');
            $('[index="' + i + '"]').closest('div').find('span').attr('class', btnClass.replace('-active', '-passive'));
        }
    }

    displayButtons(percent);
}

function navigateIcons(target) {

    var btnClass = '',
        index = $(target).attr('index'),
        percent = $(target).attr('percent'),
        length = $('.btn-circle-step').length,
        selectedTab = $(target).attr('href');

    document.getElementById('prog').style.width = percent;

    $(string.format('[href="{0}"]', selectedTab)).tab('show');
    $(string.format('[href="{0}"]', selectedTab)).removeClass('disabled');
    $(string.format('[href="{0}"]', selectedTab)).prop('disabled', false);

    for (var i = 1; i <= length; i++) {

        btnClass = $('[index="' + i + '"]').closest('div').find('span').attr('class');

        if (i <= index) {
            $('[index="' + i + '"]').removeClass('btn-default-Step').addClass('transaction-button-Steps');
            $('[index="' + i + '"]').closest('div').find('span').attr('class', btnClass.replace('-passive', '-active'));
        } else {
            $('[index="' + i + '"]').removeClass('transaction-button-Steps').addClass('btn-default-Step');
            $('[index="' + i + '"]').closest('div').find('span').attr('class', btnClass.replace('-active', '-passive'));
        }
    }

    displayButtons(percent);
}

function displayButtons(percent) {
    switch (percent) {
        case '0%':
            $('.Save-step, .prev-step').hide();
            $('.next-step').show();
            break;
        case '100%':
            $('.Save-step, .prev-step').show();
            $('.next-step').hide();
            break;
        default:
            $('.Save-step').hide();
            $('.prev-step, .next-step').show();
            break;
    }
}

function DataBinder(object_id) {
    // Use a jQuery object as simple PubSub
    var pubSub = jQuery({});

    // We expect a `data` element specifying the binding
    // in the form: data-bind-<object_id>="<property_name>"
    var data_attr = "bind-" + object_id,
        message = object_id + ":change";

    // Listen to change events on elements with the data-binding attribute and proxy
    // them to the PubSub, so that the change is "broadcasted" to all connected objects
    jQuery(document).on("change", "[data-" + data_attr + "]", function (evt) {
        var $input = jQuery(this);

        if ($input.prop('type') == 'checkbox') {
            pubSub.trigger(message, [$input.data(data_attr), $input.prop('checked')]);
        } else {
            pubSub.trigger(message, [$input.data(data_attr), $input.val()]);
        }

    });

    // PubSub propagates changes to all bound elements, setting value of
    // input tags or HTML content of other tags
    pubSub.on(message, function (evt, prop_name, new_val) {
        jQuery("[data-" + data_attr + "=" + prop_name + "]").each(function () {
            var $bound = jQuery(this);
            if ($bound.is("input, textarea, select")) {

                if ($bound.prop('type') == 'checkbox') {
                    $bound.prop('checked', new_val);
                } else {
                    $bound.val(new_val);
                }
            } else {
                $bound.html(new_val + '');
            }
        });
    });

    return pubSub;
}

function Summary(uid) {
    var binder = new DataBinder(uid),

        smry = {
            attributes: {},

            // The attribute setter publish changes using the DataBinder PubSub
            set: function (attr_name, val) {
                this.attributes[attr_name] = val;
                binder.trigger(uid + ":change", [attr_name, val, this]);
            },

            get: function (attr_name) {
                return this.attributes[attr_name];
            },

            _binder: binder
        };

    // Subscribe to the PubSub
    binder.on(uid + ":change", function (evt, attr_name, new_val, initiator) {
        if (initiator !== smry) {
            smry.set(attr_name, new_val);
        }
    });

    return smry;
}