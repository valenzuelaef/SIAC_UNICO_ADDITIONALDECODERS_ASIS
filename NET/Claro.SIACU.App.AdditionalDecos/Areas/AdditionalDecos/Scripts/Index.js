(function ($, undefined) {

    'use strict';

    var Form = function ($element, options) {
        $.extend(this, $.fn.AdditionalDecos.defaults, $element.data(), typeof options === 'object' && options);

        this.setControls({
            form: $element,
            divCustomerDataView: $('#divCustomerDataView', $element),
            divMainBody: $('#navbar-body'),
            divMainHeader: $('#main-header'),
            divMainFooter: $('#main-footer'),
            /*Configuraciones*/
            stepsContainer: $('.process-row-step', $element),
            cboCoreServices: $('.coreServices', $element),
            btnStep: $('.next-step'),
            btnStepPrev: $('.prev-step'),
            btnSave: $('.Save-step'),
            btnConstancy: $('#btnConstancy'),
            divFooterInfoSot: $('.footer-info-sot'),
        });
    }
    Form.prototype = {
        constructor: Form,

        init: function () {
            var that = this,
                controls = this.getControls();
            that.render();
        },

        render: function () {
            var that = this,
                controls = this.getControls();

            moment.locale('es');
            that.additionalDecosInit();
        },

        resizeContent: function () {
            var controls = this.getControls();
            $('#navbar-body').css('height', $(window).outerHeight() - $('#main-header').outerHeight() - $('#main-footer').outerHeight());
        },

        getControls: function () {
            return this.m_controls || {};
        },

        setControls: function (value) {
            this.m_controls = value;
        },

        updateControl: function (object) {
            for (var prop in object) {
                if (typeof this.m_controls[prop] == 'undefined') {
                    this.m_controls[prop] = object[prop];
                }
            }
        },

        timer: function () {
            var that = this, controls = that.getControls();
            that.resizeContent();
            var time = moment().format('DD/MM/YYYY hh:mm:ss a');
            $('#idSession').html(string.format('Session ID: {0} &nbsp&nbsp {1}', Session.UrlParams.IdSession, time));
            var t = setTimeout(function () { that.timer() }, 500);
        },

        navigateTabs: function () {
            var that = this, controls = this.getControls();

            var $activeTab = $('.step.tab-pane.active');
            var stepValidation = $activeTab.attr('data-validation');

            if (typeof stepValidation !== 'undefined') {
                if (that[stepValidation]()) { navigateTabs(event) }
            }
            else {
                navigateTabs(event);
            }
        },
        navigateIcons: function () {

            var that = this,
                controls = this.getControls();

            event.stopImmediatePropagation();

            var $activeTab = $('.step.tab-pane.active');
            var $previousButton = $(string.format('button[href="#{0}"]', $activeTab.attr('id')));
            var $currentButton = event.target ? $(event.target) : $(event.srcElement);
            var target = string.format('#{0}', $currentButton.attr('id'));

            while ($previousButton.attr('index') < $currentButton.attr('index')) {

                var stepValidation = $activeTab.attr('data-validation');

                if (typeof stepValidation !== 'undefined' && stepValidation !== '') {

                    if (!that[stepValidation]()) {
                        target = string.format('#{0}', $previousButton.attr('id'));
                        $previousButton = $currentButton;
                    }
                    else {
                        $activeTab = $activeTab.next('.tab-pane');
                        $previousButton = $(string.format('button[href="#{0}"]', $activeTab.attr('id')));
                    }
                }
                else {
                    $activeTab = $activeTab.next('.tab-pane');
                    $previousButton = $(string.format('button[href="#{0}"]', $activeTab.attr('id')));
                }

            }

            navigateIcons(target);
        },

        /* Metodos Carga Información */
        AdditionalDecos: {},
        stopCountDown: false,
        additionalDecosInit: function () {
            var that = this, controls = that.getControls();
            that.timer();

            var plataformaAT = !$.string.isEmptyOrNull(Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT) ? Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT : '';
            var idTransactionFront = $.app.getTypeClientAsIsOrToBe(plataformaAT, '2', '10');
            var customerInformationPromise = $.reusableViews.viewOfTheLeftSide(controls.divCustomerDataView);
            var initialConfigurationPromise = $.app.transactionInitialConfigurationPromise(Session.SessionParams, idTransactionFront);

            Promise.all([customerInformationPromise, initialConfigurationPromise]).then(function (res) {
                var initialConfiguration = res[1].oInitialDataResponse.MessageResponse.Body,
                    AdditionalFixedData = res[1].oRequestDatosAdicionales.MessageResponse.Body,
                    AuditRequest = res[1].oAuditRequest,

                    AdditionalServices = initialConfiguration.AdditionalServices || {},
                    CoreServices = initialConfiguration.CoreServices || {},
                    CustomerInformation = initialConfiguration.CustomerInformation || {},
                    Igv = initialConfiguration.Igv,
                    PuntoAtencion = initialConfiguration.PuntoAtencion || {},
                    DatosUsuarioCtaRed = initialConfiguration.obtenerDatosUsuarioCuentaRed || {},
                    OficinaVentaUsuario = initialConfiguration.obtenerOficinaVentaUsuario || {},
                    Configuration = AdditionalFixedData.servicios.configuracionesfija_obtenerConfiguraciones || {},
                    Instalacion = AdditionalFixedData.servicios.datosinstalacioncliente_obtenerDatosInstalacion || {},
                    Ubigeos = AdditionalFixedData.servicios.ubicaciones_obtenerUbicaciones || {},
                    fixPlanesCoreService = AdditionalFixedData.servicios.PlanFijaServicioCampana || {},
                    lstTyping = AdditionalFixedData.servicios.tipificacionreglas_obtenerInformacionTipificacion || {},
                    AuditRequest = AuditRequest || {};

                that.AdditionalDecos.Data = {};
                that.AdditionalDecos.Data.idTransactionFront = idTransactionFront;
                that.AdditionalDecos.Data.plataformaAT = plataformaAT;
                that.AdditionalDecos.Data.planCode = CoreServices.planCode;
                that.AdditionalDecos.Data.AdditionalServices = (AdditionalServices.CodeResponse == '0') ? AdditionalServices.AdditionalServiceList || [] : [];
                that.AdditionalDecos.Data.AdditionalEquipment = (AdditionalServices.CodeResponse == '0') ? AdditionalServices.AdditionalEquipmentList || [] : [];
                that.AdditionalDecos.Data.CoreServices = (CoreServices.CodeResponse == '0') ? CoreServices.ServiceList || [] : [];
                that.AdditionalDecos.Data.CustomerInformation = (CustomerInformation.CodeResponse == '0') ? CustomerInformation.CustomerList[0] : [];
                that.AdditionalDecos.Data.ListIgv = (Igv.CodeResponse == '0') ? Igv.listaIGV : [];
                that.AdditionalDecos.Data.Configuration = (Configuration.CodeResponse == '0') ? Configuration.ProductTransaction.ConfigurationAttributes : [];
                that.AdditionalDecos.Data.Instalation = (Instalacion.CodeResponse == '0') ? Instalacion : [];
                that.AdditionalDecos.Data.Ubigeos = (Ubigeos.CodigoRespuesta == '0') ? Ubigeos.listaUbicaciones : [];
                that.AdditionalDecos.Data.PuntoAtencion = (PuntoAtencion.CodigoRespuesta == '0') ? PuntoAtencion.listaRegistros : [];
                that.AdditionalDecos.Data.DatosUsuarioCtaRed = (DatosUsuarioCtaRed.CodigoRespuesta == '0') ? DatosUsuarioCtaRed.listaDatosUsuarioCtaRed : [];
                that.AdditionalDecos.Data.OficinaVentaUsuario = (OficinaVentaUsuario.CodigoRespuesta == '0') ? OficinaVentaUsuario.listaOficinaVenta : [];
                that.AdditionalDecos.Data.ValidaEta = [];
                that.AdditionalDecos.Data.AuditRequest = AuditRequest;
                that.AdditionalDecos.Data.TypeWork = [];
                that.AdditionalDecos.Data.SubTypeWork = [];
                that.AdditionalDecos.Data.LstTyping = (lstTyping.CodigoRespuesta == '0') ? lstTyping.listaTipificacionRegla : [];
                that.AdditionalDecos.Data.VisitaTecnica = {};


                if (that.AdditionalDecos.Data.AdditionalEquipment != []) {

                    that.AdditionalDecos.Data.AdditionalEquipment = that.AdditionalDecos.Data.AdditionalEquipment.sort(function (a, b) {
                        var x = a.ServiceDescription.toLowerCase(),
                            y = b.ServiceDescription.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                }
                if (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT == 'TOBE')
                    that.AdditionalDecos.Data.ValidarTransaccion = (ValidarTransaccion.ResponseAudit.CodigoRespuesta == '0') ? ValidarTransaccion.ResponseData : [];

                that.AdditionalDecos.Configuration = {};
                that.AdditionalDecos.Configuration.Constants = {};

                // Variables
                that.AdditionalDecos.oRequest = {
                    TotMax: 0,
                    TotEquipment: 0,
                    arrEquipmentGroup: [], //arreglo de equipos agrupados
                    arrEquipment: [], //arreglo que contiene equipos de alquiler
                    arrEquipmentAdd: [], //arreglo que contiene equipo de alquiler adicional
                    arrAddEquipment: [],
                    arrRemoveEquipment: [],
                    strTypeWork: '', //tipo de trabajo seleccionado
                    decAmount: 0, //monto regular actual
                    decRegularAmount: 0, //monto regular total
                    decRegularAmountIGV: 0, //monto regular total + IGV
                    decPromotionAmount: 0, //monto promocion
                    strTechnology: CoreServices.Technology,
                    planCode: CoreServices.planCode,
                    strCodMotot: '', //cod.motivo
                    intQuantity: 0, //cantidad de equipos adicionales
                    strFlagMail: '0', //flag correo 1:si / 0:no
                    strLoyalty: '0', //flag fidelizacion
                    decLoyaltyAmount: '0.00', //monto fidelizacion
                    arrCoreServices: [], //lista de servicios principales
                    arrAddServices: [] //lista de servicios adicionales
                };

                $.reusableBusiness.getIgv(that.AdditionalDecos.Data.ListIgv, function (igv) {
                    that.AdditionalDecos.Data.Configuration.Constantes_Igv = igv
                    // Load Customer Information - Left Panel
                    $.app.renderCustomerInformation(that.AdditionalDecos);
                    // Load Core Service Information - Left Panel                                  
                    $.app.renderCoreServices(that.AdditionalDecos);
                    //Load Additional Service Information - Left Panel
                    $.app.renderAdditionalServices(that.AdditionalDecos);
                    //Load Additional Equipment Information - Left Panel
                    $.app.renderAdditionalEquipment(that.AdditionalDecos);
                });

                if (!that.InitialValidation()) {
                    return false;
                }
                console.log('planCode -> ' + CoreServices.planCode);
                console.log('coIdPub  -> ' + Session.SessionParams.DATACUSTOMER.coIdPub);
                if (!$.array.isEmptyOrNull(that.AdditionalDecos.Data.CoreServices)) {
                    var CoreServicesCable = CoreServices.ServiceList.filter(function (el, idx) { return el.ServiceName == 'Cable' });
                    if (CoreServicesCable.length == 0) {
                        alert("El contrato no tiene asociado el servicio de Cable.", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                        return false;
                    }
                }

                if ($.array.isEmptyOrNull(fixPlanesCoreService.ListPlanFijaServicio)) {
                    if (!$.array.isEmptyOrNull(that.AdditionalDecos.Data.CoreServices)) {
                        alert("Error al consultar la lista de servicios del plan " + CoreServices.planCode + ".", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                    }
                    return false;
                }

                that.AdditionalDecos.Data.FixPlanesServCapanas = fixPlanesCoreService.ListPlanFijaServicio
                    .map(function (item) {
                        return {
                            cantidad: item.cantidad,
                            capacidad: item.capacidad,
                            cargoFijoPromocion: $.string.isEmptyOrNull(item.cargoFijoPromocion) ? item.cargoFijoPromocion = '0.00' : (parseFloat(item.cargoFijoPromocion) * parseFloat('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv)).toFixed(2),//FixedCharge,
                            CodeGroup: item.CodeGroup,
                            codigoExterno: item.codigoExterno,
                            codigoTipEqu: item.codigoTipEqu,
                            coreAdicional: item.coreAdicional,
                            descEquipo: $.string.isEmptyOrNull(item.descEquipo) ? '' : item.descEquipo,
                            descExterno: item.descExterno,
                            FixedCharge: $.string.isEmptyOrNull(item.FixedCharge) ? item.FixedCharge = '0' : (parseFloat(item.FixedCharge) * parseFloat('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv)).toFixed(2),//FixedCharge,
                            Group: item.Group,
                            grupoPadre: item.grupoPadre,
                            idDet: item.idDet,
                            idEquipo: item.idEquipo,
                            LineID: item.LineID,
                            PlanCode: item.PlanCode,
                            ServiceDescription: item.ServiceDescription,
                            ServiceEquiptment: item.ServiceEquiptment,
                            ServiceType: item.ServiceType,
                            sncode: item.sncode,
                            spCode: item.spCode,
                            tipEqu: item.tipEqu,
                            tipoEquipo: item.tipoEquipo,
                            unidadCapacidad: item.unidadCapacidad,
                            /*INI-ContratoPublico-TOBE*/
                            poId: $.string.isEmptyOrNull(item.poId) ? '' : item.poId,
                            poType: $.string.isEmptyOrNull(item.poType) ? '' : item.poType,
                            idProductoCBIO: $.string.isEmptyOrNull(item.idProductoCBIO) ? '' : item.idProductoCBIO,
                            pop1: $.string.isEmptyOrNull(item.pop1) ? '' : item.pop1,//POP1
                            pop2: $.string.isEmptyOrNull(item.pop2) ? '' : item.pop2//POP2
                            /*FIN-ContratoPublico-TOBE*/
                        };
                    });

                var attributes = that.AdditionalDecos.Data.Configuration;
                that.AdditionalDecos.Configuration.Steps = attributes.filter(function (e) { return (e.AttributeName == 'step') });
                that.AdditionalDecos.Configuration.Views = attributes.filter(function (e) { return (e.AttributeType == 'CONTENEDOR') });

                var
                    viewsPromise = that.viewsRenderPromise(),
                    stepsPromise = that.stepsRenderPromise(controls.stepsContainer);

                Promise.all([viewsPromise, stepsPromise]).then(function (RenderTransaction) {
                    controls = that.AsignControls(that, controls.form);
                    controls.btnCopy.addEvent(that, 'click', $.app.copyToClipboard);
                    controls.btnStep.addEvent(that, 'click', that.navigateTabs);
                    controls.btnSave.addEvent(that, 'click', that.btnSave_Click);
                    controls.btnConstancy.addEvent(that, 'click', that.btnConstancy_click);
                    controls.navigateIcon.addEvent(that, 'click', that.navigateIcons);
                    controls.chkFideliza.change(function () { that.chkFideliza_change() });
                    controls.chkMail.change(function () { that.chkMail_change() });
                    controls.ipCalendar.change(function () { that.ipCalendar_change() });
                    controls.ipClientEmail.addEvent(that, 'focusout', that.chkMail_focus);
                    controls.cboPointAttention.change(function () { that.cboPointAttention_Change() });
                    controls.cboTypeWork.change(function () { that.cboTypeWork_Change() });
                    controls.cboStypeWork.change(function () { that.cboStypeWork_Change() });
                    controls.cboSchedule.change(function () { that.cboSchedule_Change() });

                    //Datos de configuracion
                    var lstConfig = that.AdditionalDecos.Data.Configuration.filter(function (Item) { return Item.AttributeType == 'CONFIGURACIONES'; });
                    that.loadSettings(lstConfig);
                    //Carga de variables en duro
                    //that.loadSettingsD();
                    that.loadEquipment(that.AdditionalDecos.Data.FixPlanesServCapanas);
                    that.loadPlan(that.AdditionalDecos.Data.FixPlanesServCapanas);
                    $.reusableBusiness.LoadPointOfAttention(controls.cboPointAttention, that.AdditionalDecos);
                    that.loadClientEquipment();
                    /***INI-Nuevas configuraciones***/
                    that.AdditionalDecos.Configuration.Constants.Plataforma_Facturador = idTransactionFront == '2' ? 'BSCS7' : 'CBIO';
                    /***FIN-Nuevas configuraciones***/
                });

            }).catch(function (e) {
                $.unblockUI();
                alert(string.format('Ocurrio un error al cargar la transacción - {0}', e));
                $('#navbar-body').showMessageErrorLoadingTransaction();

            }).then(function () {
                $.unblockUI();

            });
        },
        /* Carga formulario */
        viewsRenderPromise: function () {
            var that = this, controls = that.getControls();

            return new Promise(function (resolve, reject) {
                var transactionViews = that.AdditionalDecos.Configuration.Views;
                $.app.ViewsRender(transactionViews, transactionViews, '', 'transactionContent', resolve);
            });
        },
        stepsRenderPromise: function (container) {
            var that = this, controls = that.getControls();

            return new Promise(function (resolve, reject) {
                $.app.createSteps(that.AdditionalDecos.Configuration.Steps, container);
                resolve();
            });
        },
        AsignControls: function (that, $element) {
            that.updateControl({
                tbodyEquipment: $('#tbodyEquipment', $element),

                spanMaxDecos: $('#MaxDecos', $element),
                spanDisDecos: $('#DisDecos', $element),
                spanRegularPrice: $('#RegularPrice', $element),
                spanAddDecos: $('#AddDecos', $element),
                spanFixedPromotionalPrice: $('#FixedPromotionalPrice', $element),
                spanInstalationPrice: $('#InstalationPrice', $element),
                SpanSumLoyalty: $('#SpanSumLoyalty', $element),
                SpanSumPrice: $('#SpanSumPrice', $element),
                SpanSumNewPrice: $('#SpanSumNewPrice', $element),
                SpanSumTypeWork: $('#SpanSumTypeWork', $element),
                SpanSumSubTypeWork: $('#SpanSumSubTypeWork', $element),
                SpanSumCalendar: $('#SpanSumCalendar', $element),
                SpanSumVisit: $('#SpanSumVisit', $element),
                SpanSumEquipment: $('#SpanSumEquipment', $element),
                SpanResEquipment: $('#SpanResEquipment', $element),
                btnCopy: $('#btnCopy', $element),
                chkFideliza: $('#chkFideliza', $element),
                chkMail: $('#chkMail', $element),

                cboTypeWork: $('#cboTypeWork', $element),
                cboStypeWork: $('#cboStypeWork', $element),
                cboSchedule: $('#cboSchedule', $element),
                cboPointAttention: $('#cboPointAttention', $element),

                ipcompany: $('#company', $element),
                ipClientEmail: $('#email', $element),
                ipCalendar: $('#txtCalendar', $element),
                txtNote: $('#txtNote', $element),

                ErrorMessageEmail: $('#ErrorMessageEmail', $element),
                ErrorMessageddlWorkType: $('#ErrorMessageddlWorkType', $element),
                ErrorMessageddlSubWorkType: $('#ErrorMessageddlSubWorkType', $element),
                ErrorMessagetxtCalendar: $('#ErrorMessagetxtCalendar', $element),
                ErrorMessageddlTimeZone: $('#ErrorMessageddlTimeZone', $element),
                ErrorMessageddlCenterofAttention: $('#ErrorMessageddlCenterofAttention', $element),

                DivSummary: $('#DivSummary', $element),
                DivScheduling: $('#DivScheduling', $element),
                DivInstallEquipment: $('#DivInstallEquipment', $element),
                DivUninstallEquipment: $('#DivUninstallEquipment', $element),
                DivContenInstallEquipment: $('#DivContenInstallEquipment', $element),
                DivContenUnInstallEquipment: $('#DivContenUnInstallEquipment', $element),

                navigateIcon: $('.btn-circle-step', $element)
            });
            return that.getControls();
        },

        loadSettings: function (data) {
            var that = this, controls = that.getControls(),
                LstTyping = that.AdditionalDecos.Data.LstTyping;

            controls.spanInstalationPrice.text('0,00');
            that.AdditionalDecos.oRequest.decLoyaltyAmount = '0,00';

            //Tipo de trabajo
            that.AdditionalDecos.Configuration.Constants.TypeWorkAdd = that.getSetting(data, 'TipTrabID_Alta'); // tipo de trabajo alta
            that.AdditionalDecos.Configuration.Constants.TypeWorkRemove = that.getSetting(data, 'TipTrabID_Baja'); // tipo de trabajo baja
            that.AdditionalDecos.Configuration.Constants.TypeWorkBoth = that.getSetting(data, 'TipTrabID_Mixto'); // tipo de trabajo ambos

            //Cliente
            that.AdditionalDecos.Configuration.Constants.KeyCustomerInteract = that.getSetting(data, 'KeyCustomerInteract');
            that.AdditionalDecos.Configuration.Constants.Modalidad = that.getSetting(data, 'Modalidad');

            //Tificacion
            that.AdditionalDecos.Configuration.Constants.Tipo = (LstTyping[0] != undefined || LstTyping[0] != null) ? LstTyping[0].Tipo : '';
            that.AdditionalDecos.Configuration.Constants.TipoD = (LstTyping[1] != undefined || LstTyping[1] != null) ? LstTyping[1].Tipo : '';
            that.AdditionalDecos.Configuration.Constants.TipoA = (LstTyping[2] != undefined || LstTyping[2] != null) ? LstTyping[2].Tipo : '';
            that.AdditionalDecos.Configuration.Constants.Clase = (LstTyping[0] != undefined || LstTyping[0] != null) ? LstTyping[0].Clase : '';
            that.AdditionalDecos.Configuration.Constants.ClaseD = (LstTyping[1] != undefined || LstTyping[1] != null) ? LstTyping[1].Clase : '';
            that.AdditionalDecos.Configuration.Constants.ClaseA = (LstTyping[2] != undefined || LstTyping[2] != null) ? LstTyping[2].Clase : '';
            that.AdditionalDecos.Configuration.Constants.SubClase = (LstTyping[0] != undefined || LstTyping[0] != null) ? LstTyping[0].SubClase : '';
            that.AdditionalDecos.Configuration.Constants.SubClaseDesinstalar = (LstTyping[1] != undefined || LstTyping[1] != null) ? LstTyping[1].SubClase : '';
            that.AdditionalDecos.Configuration.Constants.SubClaseA = (LstTyping[2] != undefined || LstTyping[2] != null) ? LstTyping[2].SubClase : '';

            that.AdditionalDecos.Configuration.Constants.FlagReg = that.getSetting(data, 'FlagReg');
            that.AdditionalDecos.Configuration.Constants.ContingenciaClarify = that.getSetting(data, 'ContingenciaClarify');
            that.AdditionalDecos.Configuration.Constants.MetodoContacto = that.getSetting(data, 'MetodoContacto');
            that.AdditionalDecos.Configuration.Constants.TipoTipificacion = that.getSetting(data, 'TipoTipificacion');
            that.AdditionalDecos.Configuration.Constants.USRAPLICACION = that.getSetting(data, 'USRAPLICACION');
            that.AdditionalDecos.Configuration.Constants.HechoDeUno = that.getSetting(data, 'HechoDeUno');
            that.AdditionalDecos.Configuration.Constants.FlagCaso = that.getSetting(data, 'FlagCaso');
            that.AdditionalDecos.Configuration.Constants.Resultado = that.getSetting(data, 'Resultado');
            that.AdditionalDecos.Configuration.Constants.TipoInter = that.getSetting(data, 'TipoInter');

            //Tramas
            that.AdditionalDecos.Configuration.Constants.TIPO_PRODUCTO = that.getSetting(data, 'TIPO_PRODUCTO');
            that.AdditionalDecos.Configuration.Constants.TIPO_TRANS = that.getSetting(data, 'TIPO_TRANS');
            that.AdditionalDecos.Configuration.Constants.Tipservicio = that.getSetting(data, 'Tipservicio');

            //Constancia 
            that.AdditionalDecos.Configuration.Constants.ContComercial = that.getSetting(data, 'ContComercial');

            //Correo
            that.AdditionalDecos.Configuration.Constants.remitente = that.getSetting(data, 'remitente');
            that.AdditionalDecos.Configuration.Constants.htmlFlag = that.getSetting(data, 'htmlFlag');
            that.AdditionalDecos.Configuration.Constants.driver = that.getSetting(data, 'driver');
            that.AdditionalDecos.Configuration.Constants.formatoConstancia = that.getSetting(data, 'formatoConstancia');
            that.AdditionalDecos.Configuration.Constants.directory = that.getSetting(data, 'directory');
            that.AdditionalDecos.Configuration.Constants.fileName = that.getSetting(data, 'fileName');
            that.AdditionalDecos.Configuration.Constants.asunto = that.getSetting(data, 'asunto');
            that.AdditionalDecos.Configuration.Constants.asuntoD = that.getSetting(data, 'asuntoD');
            that.AdditionalDecos.Configuration.Constants.asuntoA = that.getSetting(data, 'asuntoA');
            that.AdditionalDecos.Configuration.Constants.mensaje = that.getSetting(data, 'mensaje');
            that.AdditionalDecos.Configuration.Constants.mensajeD = that.getSetting(data, 'mensajeD');
            that.AdditionalDecos.Configuration.Constants.mensajeA = that.getSetting(data, 'mensajeA');

            //Auditoria
            that.AdditionalDecos.Configuration.Constants.Monto = that.getSetting(data, 'Monto');
            that.AdditionalDecos.Configuration.Constants.TRANSACCION_DESCRIPCION = that.getSetting(data, 'TransaccionDescripcion');

            //Configuracion
            that.AdditionalDecos.Configuration.Constants.TimerFranjaHorario = that.getSetting(data, 'TimerFranjaHorario');
            that.AdditionalDecos.Configuration.Constants.Origen = that.getSetting(data, 'Origen');
            that.AdditionalDecos.Configuration.Constants.ReglaValidacion = that.getSetting(data, 'ReglaValidacion');

            that.AdditionalDecos.Configuration.Constants.TitInsDeco = that.getSetting(data, 'TitInsDeco');
            that.AdditionalDecos.Configuration.Constants.TitDesDeco = that.getSetting(data, 'TitDesDeco');
            that.AdditionalDecos.Configuration.Constants.TitDecoA = that.getSetting(data, 'TitDecoA');

            that.AdditionalDecos.Configuration.Constants.MontoOcc = that.getSetting(data, 'MontoOcc');
            that.AdditionalDecos.Configuration.Constants.MontoOccD = that.getSetting(data, 'MontoOccD');
            that.AdditionalDecos.Configuration.Constants.MontoOccA = that.getSetting(data, 'MontoOccA');

            that.AdditionalDecos.Configuration.Constants.MaxEquipment = that.getSetting(data, 'MaxEquipment'); //5
            that.AdditionalDecos.Configuration.Constants.MaxEquipmentIP = that.getSetting(data, 'MaxEquipmentIP'); //3

        },
        loadPlan: function (data) {
            var that = this, controls = that.getControls();

            //var lstCoreServices = data.filter(function (Item) { return Item.Group == 'PRINCIPAL' && Item.ServiceEquiptment == 'SERVICIO'; });
            var lstAddServices = data;
            var lstAddServicesClient = that.AdditionalDecos.Data.AdditionalServices;
            var lstServicesCoreClient = that.AdditionalDecos.Data.CoreServices;
            debugger;
            lstServicesCoreClient.forEach(function (Item) {
                var objService = lstAddServices.filter(function (x) { return x.LineID == Item.idServPvu  || x.LineID == Item.idServPvuTobe; })[0];
                if (objService != null || objService != undefined) {
                    that.AdditionalDecos.oRequest.arrCoreServices.push({
                        LineID: objService.LineID,
                        ServiceDescription: that.getNotNull(objService.ServiceDescription),
                        ServiceType: that.getNotNull(objService.ServiceType),
                        idServicio: that.getNotNull(objService.sncode),
                        Price: that.getNotNull(objService.FixedCharge),
                        idGrupoPrincipal: that.getNotNull(objService.grupoPadre),
                        idGrupo: that.getNotNull(objService.CodeGroup),
                        banwid: that.getNotNull(objService.capacidad),
                        unidadcapacidad: that.getNotNull(objService.unidadCapacidad),
                        tipequ: that.getNotNull(objService.tipEqu),
                        codTipoEquipo: that.getNotNull(objService.codigoTipEqu),
                        descEquipo: that.getNotNull(objService.descEquipo),
                        cantidad: objService.cantidad,
                        codigoExterno: that.getNotNull(objService.codigoExterno),
                        spcode: that.getNotNull(objService.spCode),
                        sncode: that.getNotNull(objService.sncode),
                        GroupName: that.getNotNull(objService.Group),
                        CoreAdicional: that.getNotNull(objService.coreAdicional),
                    });
                }
            });

            lstAddServicesClient.forEach(function (Item) {
                var objService = lstAddServices.filter(function (x) { return x.LineID == Item.idServPvu; })[0];
                if (objService != null || objService != undefined) {
                    that.AdditionalDecos.oRequest.arrAddServices.push({
                        LineID: objService.LineID,
                        ServiceDescription: that.getNotNull(objService.ServiceDescription),
                        ServiceType: that.getNotNull(objService.ServiceType),
                        idServicio: that.getNotNull(objService.sncode),
                        Price: that.getNotNull(objService.FixedCharge),
                        idGrupoPrincipal: that.getNotNull(objService.grupoPadre),
                        idGrupo: that.getNotNull(objService.CodeGroup),
                        banwid: that.getNotNull(objService.capacidad),
                        unidadcapacidad: that.getNotNull(objService.unidadCapacidad),
                        tipequ: that.getNotNull(objService.tipEqu),
                        codTipoEquipo: that.getNotNull(objService.codigoTipEqu),
                        descEquipo: that.getNotNull(objService.descEquipo),
                        cantidad: objService.cantidad,
                        codigoExterno: that.getNotNull(objService.codigoExterno),
                        spcode: that.getNotNull(objService.spCode),
                        sncode: that.getNotNull(objService.sncode),
                        GroupName: that.getNotNull(objService.Group),
                        CoreAdicional: that.getNotNull(objService.coreAdicional)
                    });
                }
            });
        },
        /*GESTION DE PUNTOS DE TV ADICIONALES*/
        /*data:Servicios del plan actual del cliente*/
        loadEquipment: function (data) {
            var that = this, controls = that.getControls();
            debugger;

            controls.tbodyEquipment.empty();

            var lstEquipmentFilter = [];
            var intID = 1;

            var lstEquipmentGlobal = data.filter(function (item) {
                return (item.coreAdicional == 'EQUIPO_ALQUILER' && item.ServiceEquiptment == 'EQUIPO') || item.ServiceType == 'ALQUILER EQUIPOS FTTH' || item.ServiceType == 'ALQUILER EQUIPOS IPTV' || item.ServiceType == 'ALQUILER EQUIPOS'
            });
            that.AdditionalDecos.oRequest.arrEquipment = lstEquipmentGlobal;

            var lstEquipmentAdd = data.filter(function (Item) { return Item.coreAdicional == 'ADICIONAL' && Item.ServiceEquiptment == 'EQUIPO'; });
            that.AdditionalDecos.oRequest.arrEquipmentAdd = lstEquipmentAdd;

            var intMaxEquipmentPlan = lstEquipmentGlobal.length;
            var intMaxEquipmentConfig = '4'//that.AdditionalDecos.Configuration.Constants.MaxEquipment;
            var intMaxEquipment = 0;

            /*if (intMaxEquipmentPlan <= intMaxEquipmentConfig) {
                intMaxEquipment = intMaxEquipmentPlan;
            } else {*/
            intMaxEquipment = intMaxEquipmentConfig;
            /*}*/

            controls.spanMaxDecos.text(intMaxEquipment);
            that.AdditionalDecos.oRequest.TotMax = (intMaxEquipment * 1);
            lstEquipmentGlobal = lstEquipmentGlobal.sort(function (a, b) {
                if (a.ServiceDescription < b.ServiceDescription) { return 1; }
                if (a.ServiceDescription > b.ServiceDescription) { return -1; }
                return 0;
            });

            var lstEquipment = lstEquipmentGlobal.map(function (item) {
                return {
                    tipoEquipo: item.tipoEquipo == null ? "" : item.tipoEquipo,
                    descEquipo: item.descEquipo == null ? '' : item.descEquipo,
                    FixedCharge: item.FixedCharge == null ? "" : item.FixedCharge,
                    cargoFijoPromocion: item.cargoFijoPromocion == null ? "0" : item.cargoFijoPromocion,
                    idEquipo: ''
                };
            });

            lstEquipment.forEach(function (Item) {
                var intEquipment = lstEquipmentFilter.filter(function (x) { return x.tipoEquipo == Item.tipoEquipo }).length;
                // if (intEquipment == 0 && Item.FixedCharge > 0) {/*filtra IP TV - No se esta mostrando*/
                if (intEquipment == 0) {
                    lstEquipmentFilter.push(Item);
                }
            });

            lstEquipmentFilter.forEach(function (Item) {
                Item.idEquipo = 'DECO' + intID;
                intID++;
            });


            var arrOrigin = [];
            var arrNew = [];
            var arrNewRemove = [];

            //
            var lista = [];
            var intID2 = 1;
            //
            lstEquipmentFilter.forEach(function (Item) {
                var decFixedCharge = 0.00;

                var oNew = {
                    'cargoFijoPromocion': Item.cargoFijoPromocion,
                    'descEquipo': Item.descEquipo,
                    'FixedCharge': Item.FixedCharge,// decFixedCharge,
                    'idEquipo': 'DECO' + intID2,
                    'tipoEquipo': Item.tipoEquipo
                }
                lista.push(oNew);

                intID2++;
            });

            that.AdditionalDecos.oRequest.arrEquipmentGroup = lista;
            that.AdditionalDecos.oRequest.arrEquipmentGroup2 = lstEquipmentFilter;

            lstEquipmentFilter.forEach(function (Item) {
                var ElementTd1 = document.createElement('td');
                var ElementTd2 = document.createElement('td');
                var ElementTd3 = document.createElement('td');
                var ElementTr = document.createElement('tr');

                var ElementLabelName = document.createElement('label');
                ElementLabelName.innerHTML = Item.tipoEquipo.replace('_', ' ');

                var ElementImg = document.createElement('img');
                ElementImg.src = '/Content/Images/SUFija/ico_deco.svg';
                ElementImg.alt = '...';

                $(ElementTd1).append(ElementImg);
                $(ElementTd1).append(ElementLabelName);

                var ElementSpan = document.createElement('span');
                ElementSpan.innerHTML = 'S/ ' + Item.FixedCharge;

                $(ElementTd2).append(ElementSpan);

                var ElementBtnMore = document.createElement('button');
                ElementBtnMore.className = 'close btnMore math-operator pull-right';
                ElementBtnMore.innerHTML = '+';
                ElementBtnMore.id = 'btnAdd_' + Item.idEquipo;

                var ElementSpanCount = document.createElement('span');
                ElementSpanCount.id = 'SP_' + Item.idEquipo;
                ElementSpanCount.className = 'badge math-operator pull-right TotalAmount';
                ElementSpanCount.innerHTML = '0';

                var ElementBtnMin = document.createElement('button');
                ElementBtnMin.className = 'close btnMin math-operator pull-right';
                ElementBtnMin.innerHTML = '-';
                ElementBtnMin.id = 'btnRemove_' + Item.idEquipo;

                $(ElementTd3).append(ElementBtnMore);
                $(ElementTd3).append(ElementSpanCount);
                $(ElementTd3).append(ElementBtnMin);

                $(ElementTr).append(ElementTd1);
                $(ElementTr).append(ElementTd2);
                $(ElementTr).append(ElementTd3);
                $(controls.tbodyEquipment).append(ElementTr);

                ////Creacion de detalle
                var ElementDivSummary = document.createElement('div');
                ElementDivSummary.className = 'col-sm-12';
                ElementDivSummary.style.fontWeight = 'bold';
                ElementDivSummary.style.fontSize = '13px';
                ElementDivSummary.style.paddingLeft = '30px';

                var ElementImgSummary = document.createElement('img');
                ElementImgSummary.src = '/Content/Images/SUFija/ico_deco.svg';
                ElementImgSummary.alt = '...';

                var ElementLabelSummary = document.createElement('label');
                ElementLabelSummary.style.fontSize = '15px';
                ElementLabelSummary.innerHTML = Item.tipoEquipo.replace('_', ' ');
                $(ElementDivSummary).append(ElementImgSummary);
                $(ElementDivSummary).append(ElementLabelSummary);

                var ElementTbody = document.createElement('tbody');
                ElementTbody.id = 'TB_' + Item.idEquipo;
                var ElementTableSummary = document.createElement('table');
                ElementTableSummary.className = 'table table-borderless text-center recurrentService';

                ElementTableSummary.appendChild(ElementTbody);

                $(controls.DivSummary).append(ElementDivSummary);
                $(controls.DivSummary).append(ElementTableSummary);
            });

            $('.btnMore').click(function () {
                var strId = $(this)[0].getAttribute('id');
                var arrId = strId.split('_');
                var spID = arrId[1];

                that.addEquipment(spID);
            });

            $('.btnMin').click(function () {
                var strId = $(this)[0].getAttribute('id');
                var arrId = strId.split('_');
                var spID = arrId[1];

                that.removeEquipment(spID);
            });
        },
        addEquipment: function (strID) {
            var that = this, controls = that.getControls();
            debugger;
            var arrEquipmentGroup = that.AdditionalDecos.oRequest.arrEquipmentGroup2;
            var arrEquipmentClient = that.AdditionalDecos.Data.AdditionalEquipment;
            var arrEquipmentPlan = that.AdditionalDecos.oRequest.arrEquipment;
            var arrEquipmentRemove = that.AdditionalDecos.oRequest.arrRemoveEquipment;

            var intCountMax = that.AdditionalDecos.oRequest.TotMax * 1;
            var intEquipmentTotal = 0;
            var intDecoDVR = 0;
            var oEquipmentAdd = null;
            var oEquipmentSelect = arrEquipmentGroup.filter(function (x) { return x.idEquipo == strID; })[0];

            var arrEquipmentRemoveSelect = arrEquipmentRemove.filter(function (x) { return x.Type == oEquipmentSelect.tipoEquipo; });

            var spCount = $('#SP_' + strID);
            var intCount = spCount.text() * 1;
            var intCountMax = that.AdditionalDecos.oRequest.TotMax * 1;
            var decPromotionCharge = that.AdditionalDecos.oRequest.decPromotionAmount * 1;
            var decRegularAmount = that.AdditionalDecos.oRequest.decRegularAmount * 1;

            $.each(arrEquipmentGroup, function (Index, Item) {
                intEquipmentTotal += ($('#SP_' + Item.idEquipo).text() * 1);
            });
            intEquipmentTotal++;

            intCount++;

            if (intEquipmentTotal > intCountMax) {
                alert('No puede sobrepasar el número máximo de decos.');
                return false;
            }

            if (arrEquipmentRemoveSelect.length > 0) {
                arrEquipmentRemoveSelect = arrEquipmentRemoveSelect.sort(function (a, b) {
                    if (a.ServiceDescription > b.ServiceDescription) { return 1; }
                    if (a.ServiceDescription < b.ServiceDescription) { return -1; }
                    return 0;
                });

                oEquipmentAdd = arrEquipmentRemoveSelect[0];
                oEquipmentAdd.Price = that.getFixedChargeEquipment(oEquipmentAdd.Type, oEquipmentSelect.FixedCharge);
                //oEquipmentAdd.Price = that.getFixedChargeEquipment(oEquipmentAdd.tipoEquipo, oEquipmentSelect.FixedCharge);//Revisarlo
                that.AdditionalDecos.oRequest.arrRemoveEquipment = that.AdditionalDecos.oRequest.arrRemoveEquipment.filter(function (x) { return x.LineID != oEquipmentAdd.LineID; });

            } else {
                $.each(arrEquipmentClient, function (Index, Item) {
                    arrEquipmentPlan = arrEquipmentPlan.filter(function (x) { return x.LineID != Item.idServPvu  && x.LineID != Item.idServPvuTobe; });
                });
                $.each(that.AdditionalDecos.oRequest.arrAddEquipment, function (Index, Item) {
                    arrEquipmentPlan = arrEquipmentPlan.filter(function (x) { return x.LineID != Item.idServicio; });
                });

                arrEquipmentPlan = arrEquipmentPlan.filter(function (x) { return x.tipoEquipo == oEquipmentSelect.tipoEquipo; });
                arrEquipmentPlan = arrEquipmentPlan.sort(function (a, b) {
                    if (a.ServiceDescription > b.ServiceDescription) { return 1; }
                    if (a.ServiceDescription < b.ServiceDescription) { return -1; }
                    return 0;
                });
                debugger;

                if (arrEquipmentPlan[0] == null) {
                    alert(string.format('No tiene {0} disponibles', oEquipmentSelect.tipoEquipo.replace('_', ' ')));
                    return false;
                }
                oEquipmentAdd = arrEquipmentPlan[0];

                //oEquipmentAdd.Price = that.getFixedChargeEquipment(oEquipmentAdd.tipoEquipo, oEquipmentSelect.FixedCharge, intEquipmentTotal);
                oEquipmentAdd.Price = that.getFixedChargeEquipment(oEquipmentAdd.tipoEquipo, oEquipmentSelect.FixedCharge);


                oEquipmentAdd.PricePromotion = oEquipmentAdd.cargoFijoPromocion;
                oEquipmentAdd.idServicio = oEquipmentAdd.LineID;
                oEquipmentAdd.idGrupoPrincipal = oEquipmentAdd.grupoPadre;
                oEquipmentAdd.idGrupo = oEquipmentAdd.CodeGroup;
                oEquipmentAdd.banwid = oEquipmentAdd.capacidad;
                oEquipmentAdd.tipequ = oEquipmentAdd.tipEqu;
                oEquipmentAdd.codTipoEquipo = oEquipmentAdd.codigoTipEqu;
                oEquipmentAdd.cantidad = '1';
                oEquipmentAdd.spcode = '';//that.AdditionalDecos.oRequest.arrEquipmentAdd.filter(function (x) { return x.LineID == oEquipmentAdd.LineID; })[0].spCode;
                oEquipmentAdd.GroupName = oEquipmentAdd.Group;
                oEquipmentAdd.CoreAdicional = oEquipmentAdd.coreAdicional;
                oEquipmentAdd.Type = oEquipmentAdd.tipoEquipo;

                that.AdditionalDecos.oRequest.arrAddEquipment.push(oEquipmentAdd);
            }

            var oDetail = {
                FixedCharge: oEquipmentAdd.Price * 1,
                cargoFijoPromocion: oEquipmentAdd.PricePromotion * 1,
                ServiceDescription: oEquipmentAdd.ServiceDescription,
                type: oEquipmentAdd.tipEqu
            };
            that.getDomDetail(oDetail, strID);

            decPromotionCharge += (oEquipmentAdd.PricePromotion * 1);
            decRegularAmount += (oEquipmentAdd.Price * 1);

            spCount.text(intCount);
            controls.spanDisDecos.text(intCountMax - intEquipmentTotal);
            debugger;
            controls.spanRegularPrice.text(Math.ceil(decRegularAmount.toFixed(2)).toFixed(2));
            controls.spanFixedPromotionalPrice.text(decPromotionCharge.toFixed(2));

            that.AdditionalDecos.oRequest.decPromotionAmount = decPromotionCharge.toFixed(2);
            that.AdditionalDecos.oRequest.decRegularAmount = decRegularAmount.toFixed(2);

            that.getAmountOcc();
            that.getCalculateAdditional();
        },
        removeEquipment: function (strID) {
            debugger;
            var that = this, controls = that.getControls();

            var strTbID = 'TB_' + strID;
            var tbSummary = document.getElementById(strTbID);
            var spCount = $('#SP_' + strID);

            var arrEquipmentAdd = that.AdditionalDecos.oRequest.arrAddEquipment;
            //var arrEquipmentAdd = that.AdditionalDecos.oRequest.arrEquipmentGroup2;
            var arrEquipmentGroup = that.AdditionalDecos.oRequest.arrEquipmentGroup;
            var arrEquipmentClient = that.AdditionalDecos.Data.AdditionalEquipment;
            var arrEquipmentPlan = that.AdditionalDecos.oRequest.arrEquipment;
            var arrEquipment = [];
            var arrEquipment2 = [];
            var arrEquipmentAddFilter = [];

            var intCount = spCount.text() * 1;
            var intAvailable = controls.spanDisDecos.text() * 1;
            var intQuantity = that.AdditionalDecos.oRequest.intQuantity * 1;

            var decRegularAmount = that.AdditionalDecos.oRequest.decRegularAmount * 1;
            var decPromotionAmount = that.AdditionalDecos.oRequest.decPromotionAmount * 1;

            $.each(arrEquipmentClient, function (Index, Item) {
                var oItemClient = arrEquipmentPlan.filter(function (x) { return x.LineID == Item.idServPvu  || x.LineID == Item.idServPvuTobe; })[0];
                arrEquipment.push(oItemClient);
            });

            intCount--;
            intAvailable++;
            debugger;
            if (intCount >= 0) {
                var oGroupSelect = arrEquipmentGroup.filter(function (x) { return x.idEquipo == strID; })[0];
                arrEquipmentAddFilter = arrEquipmentAdd.filter(function (x) { return x.Type == oGroupSelect.tipoEquipo; });
                if (arrEquipmentAddFilter.length == 0) {
                    arrEquipment = arrEquipment.filter(function (x) { return x.tipoEquipo == oGroupSelect.tipoEquipo; });
                    arrEquipment = arrEquipment.sort(function (a, b) {
                        if (a.ServiceDescription < b.ServiceDescription) { return 1; }
                        if (a.ServiceDescription > b.ServiceDescription) { return -1; }
                        return 0;
                    });
                    debugger;
                    /***/
                    var indice = that.AdditionalDecos.oRequest.arrRemoveEquipment.filter(function (x) { return x.Type == oGroupSelect.tipoEquipo }).length;

                    FixedChargeEquipment = arrEquipment[indice].FixedCharge;


                    decRegularAmount -= FixedChargeEquipment * 1; //  (oGroupSelect.FixedCharge * 1);
                    decPromotionAmount -= (arrEquipment[indice].cargoFijoPromocion * 1);


                    that.AdditionalDecos.oRequest.arrRemoveEquipment.push({
                        LineID: that.getNotNull(arrEquipment[indice].LineID),
                        ServiceDescription: that.getNotNull(arrEquipment[indice].ServiceDescription),
                        ServiceType: that.getNotNull(arrEquipment[indice].ServiceType),
                        idServicio: that.getNotNull(arrEquipment[indice].LineID),
                        Price: that.getNotNull(FixedChargeEquipment),//that.getNotNull(oGroupSelect.FixedCharge),
                        idGrupoPrincipal: that.getNotNull(arrEquipment[indice].grupoPadre),
                        idGrupo: that.getNotNull(arrEquipment[indice].CodeGroup),
                        banwid: that.getNotNull(arrEquipment[indice].capacidad),
                        unidadcapacidad: that.getNotNull(arrEquipment[indice].unidadCapacidad),
                        tipequ: that.getNotNull(arrEquipment[indice].tipEqu),
                        codTipoEquipo: that.getNotNull(arrEquipment[indice].codigoTipEqu),
                        descEquipo: that.getNotNull(arrEquipment[indice].descEquipo),
                        cantidad: '1',
                        codigoExterno: that.getNotNull(arrEquipment[indice].codigoExterno),
                        spcode: that.getNotNull(that.AdditionalDecos.oRequest.arrEquipmentAdd.filter(function (x) { return x.LineID == arrEquipment[0].LineID; })[0].spCode),
                        sncode: that.getNotNull(arrEquipment[indice].sncode),
                        GroupName: that.getNotNull(arrEquipment[indice].Group),
                        CoreAdicional: that.getNotNull(arrEquipment[indice].coreAdicional),

                        Type: that.getNotNull(arrEquipment[indice].tipoEquipo),
                        PricePromotion: that.getNotNull(arrEquipment[indice].cargoFijoPromocion),
                        /*INI-ContratoPublico-TOBE*/
                        poId: $.string.isEmptyOrNull(arrEquipment[indice].poId) ? '' : arrEquipment[indice].poId,
                        poType: $.string.isEmptyOrNull(arrEquipment[indice].poType) ? '' : arrEquipment[indice].poType,
                        idProductoCBIO: $.string.isEmptyOrNull(arrEquipment[indice].idProductoCBIO) ? '' : arrEquipment[indice].idProductoCBIO,
                        pop1: $.string.isEmptyOrNull(arrEquipment[indice].pop1) ? '' : arrEquipment[indice].pop1,//POP1
                        pop2: $.string.isEmptyOrNull(arrEquipment[indice].pop2) ? '' : arrEquipment[indice].pop2//POP2
                        /*FIN-ContratoPublico-TOBE*/
                    });

                } else {
                    arrEquipment = that.AdditionalDecos.oRequest.arrAddEquipment.filter(function (x) { return x.Type == oGroupSelect.tipoEquipo; });
                    //arrEquipment2 = that.AdditionalDecos.oRequest.arrEquipmentGroup2.filter(function (x) { return x.Type == oGroupSelect.tipoEquipo; });
                    arrEquipment = arrEquipment.sort(function (a, b) {
                        if (a.ServiceDescription < b.ServiceDescription) { return 1; }
                        if (a.ServiceDescription > b.ServiceDescription) { return -1; }
                        return 0;
                    });

                    //decRegularAmount -= (oGroupSelect.FixedCharge * 1);
                    var FixedChargeEquipment = that.AdditionalDecos.oRequest.arrAddEquipment.filter(function (x) { return x.ServiceDescription == arrEquipment[0].ServiceDescription; })[0].Price
                    // decRegularAmount -= (arrEquipment[0].FixedCharge * 1);
                    decRegularAmount -= (FixedChargeEquipment * 1);
                    decPromotionAmount -= (arrEquipment[0].PricePromotion * 1);

                    that.AdditionalDecos.oRequest.arrAddEquipment = that.AdditionalDecos.oRequest.arrAddEquipment.filter(function (x) { return x.LineID != arrEquipment[0].LineID; });



                }
                debugger;

                var boolClearPointsAdditionals = false;
                if (false) {
                    if (that.AdditionalDecos.oRequest.arrRemoveEquipment.length > 0)
                        if (that.AdditionalDecos.oRequest.arrRemoveEquipment[that.AdditionalDecos.oRequest.arrRemoveEquipment.length - 1].Price == '0.00') {
                            boolClearPointsAdditionals = true;
                        }
                }

                if (boolClearPointsAdditionals) {
                    //that.loadClientEquipment();
                    $('#DivSummary').empty()
                    that.AdditionalDecos.oRequest.arrAddEquipment = [];
                    that.loadEquipment(that.AdditionalDecos.Data.FixPlanesServCapanas);
                    decRegularAmount = 0;

                }

                var intRow = tbSummary.getElementsByTagName('tr').length - 1;
                $('#' + tbSummary.getElementsByTagName('tr')[intRow].id).remove();

                spCount.text(intCount);
                controls.spanDisDecos.text(intAvailable);
            }

            that.getAmountOcc();
            that.getCalculateAdditional();
            that.AdditionalDecos.oRequest.intQuantity = (intQuantity - 1);
            that.AdditionalDecos.oRequest.decRegularAmount = decRegularAmount;
            that.AdditionalDecos.oRequest.decRegularAmountIGV = (decRegularAmount * (('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv) * 1)).toFixed(2);
            that.AdditionalDecos.oRequest.decPromotionAmount = decPromotionAmount;
            controls.spanRegularPrice.text(Math.ceil(decRegularAmount.toFixed(2)).toFixed(2));
        },

        getFixedChargeEquipment: function (tipoEquipo, fixedChargeEquipment) {
            debugger;
            var that = this;
            var arrEquipmentAdd = that.AdditionalDecos.oRequest.arrAddEquipment;/*Decos Agregados*/
            var arrEquipmentRemove = that.AdditionalDecos.oRequest.arrRemoveEquipment/*Decos Retirados*/
            var arrEquipmentGroup = that.AdditionalDecos.oRequest.arrEquipmentGroup;/*Tipos de Decos*/
            var arrEquipmentClient = that.AdditionalDecos.Data.AdditionalEquipment;/*Decos Actuales*/

            var fixedChargeEnd = '0.00';
            var intEquipmentTotalNoDVR = 0;
            var boolEquipmentDVR = false;
            /*1er DECO diferente a DVR  es gratis (0.00).*/
            switch (tipoEquipo) {
                case 'DECO_DVR':
                    fixedChargeEnd = fixedChargeEquipment;
                    break;
                case 'DECO_HD':

                    if (arrEquipmentRemove.length > 0 && arrEquipmentRemove.length == arrEquipmentClient.length && arrEquipmentAdd.length == 0
					|| that.AdditionalDecos.oRequest.TotMax == $("#DisDecos").html()) {//if ((!boolEquipmentDVR && intEquipmentTotalNoDVR == 0) || (boolEquipmentDVR && intEquipmentTotalNoDVR == 0 || that.Decos == 0)) {
                        fixedChargeEnd = '0.00';
                    }
                    else {
                        fixedChargeEnd = fixedChargeEquipment;
                    }
                    // that.Decos++;
                    break;
                case 'BASICO_HD':
                    if (arrEquipmentRemove.length > 0 && arrEquipmentRemove.length == arrEquipmentClient.length && arrEquipmentAdd.length == 0
					|| that.AdditionalDecos.oRequest.TotMax == $("#DisDecos").html()) {//arrEquipmentRemove.length == arrEquipmentClient.length && if ((!boolEquipmentDVR && intEquipmentTotalNoDVR == 0) || (boolEquipmentDVR && intEquipmentTotalNoDVR == 0 || that.Decos == 0)) {
                        fixedChargeEnd = '0.00';
                    }
                    else {
                        fixedChargeEnd = fixedChargeEquipment;
                    }
                    // that.Decos++;
                    break;
                case 'DECO_IP':
                    if (arrEquipmentRemove.length > 0 && arrEquipmentRemove.length == arrEquipmentClient.length && arrEquipmentAdd.length == 0
					|| that.AdditionalDecos.oRequest.TotMax == $("#DisDecos").html()) {//if ((!boolEquipmentDVR && intEquipmentTotalNoDVR == 0) || (boolEquipmentDVR && intEquipmentTotalNoDVR == 0)) {
                        fixedChargeEnd = '0.00';
                    }
                    else {
                        fixedChargeEnd = fixedChargeEquipment;
                    }
                    break;
                case 'DECO_SD':
                    if (arrEquipmentRemove.length > 0 && arrEquipmentRemove.length == arrEquipmentClient.length && arrEquipmentAdd.length == 0
					|| that.AdditionalDecos.oRequest.TotMax == $("#DisDecos").html()) {//if ((!boolEquipmentDVR && intEquipmentTotalNoDVR == 0) || (boolEquipmentDVR && intEquipmentTotalNoDVR == 0)) {
                        fixedChargeEnd = '0.00';
                    }
                    else {
                        fixedChargeEnd = fixedChargeEquipment;
                    }
                    break;
                default:
                    fixedChargeEnd = fixedChargeEquipment;
                    break;

            }
            return fixedChargeEnd;
        },

        loadClientEquipment: function () {
            var that = this, controls = that.getControls();
            debugger;
            var arrEquipmentGroup = that.AdditionalDecos.oRequest.arrEquipmentGroup;
            var arrEquipmentClient = that.AdditionalDecos.Data.AdditionalEquipment;
            var arrEquipmentPlan = that.AdditionalDecos.oRequest.arrEquipment;
            var intEquipmentTot = 0;
            var decRegularAmount = 0;
            var decPromotionAmount = 0;
            arrEquipmentPlan = arrEquipmentPlan.sort(function (a, b) {
                if (a.ServiceDescription > b.ServiceDescription) { return 1; }
                if (a.ServiceDescription < b.ServiceDescription) { return -1; }
                return 0;
            });
            arrEquipmentClient = arrEquipmentClient.sort(function (a, b) {
                if (a.idServPvu > b.idServPvu) { return 1; }
                if (a.idServPvu < b.idServPvu) { return -1; }
                return 0;
            });
			/*inicio - solo para log quitar*/
			console.log('Lista de Equipos Disponibles del plan: ');
			$.each(arrEquipmentPlan, function (Index, Item) {
				console.log('- Item.ServiceDescription --> ' +Item.ServiceDescription +' - '+ '- Item.LineID -->'+ Item.LineID );
				});
			/*fin - solo para log quitar*/
            console.log('plataformaAT: ' + Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT);
            $.each(arrEquipmentClient, function (Index, Item) {
                if (!($.array.isEmptyOrNull(Item.idServPvu) && $.array.isEmptyOrNull(Item.idServPvuTobe))) {
					console.log('Equipo cliente: Item.ServiceDescription  --> ' +Item.ServiceDescription +' -> '+  'Item.idServPvu --> ' + Item.idServPvu + ' - o - ' + 'Item.idServPvuTobe --> ' + Item.idServPvuTobe);			
					 if (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT == 'TOBE')
                        var oEquipment = arrEquipmentPlan.filter(function (x) { return x.LineID == Item.idServPvu || x.LineID == Item.idServPvuTobe; })[0];
                    else
                        var oEquipment = arrEquipmentPlan.filter(function (x) { return x.LineID == Item.idServPvu })[0];
					var oGroup = arrEquipmentGroup.filter(function (x) { return x.tipoEquipo == oEquipment.tipoEquipo })[0];
					debugger;

					if (oEquipment != null) {
						
						var strID = oGroup.idEquipo;
						var strSpanID = 'SP_' + strID;

						document.getElementById(strSpanID).innerHTML = (document.getElementById(strSpanID).innerHTML * 1) + 1;

						var oDetail = {
							FixedCharge: that.getFixedChargeEquipment(oEquipment.tipoEquipo, oEquipment.FixedCharge * 1),
							cargoFijoPromocion: oEquipment.cargoFijoPromocion * 1,
							ServiceDescription: oEquipment.ServiceDescription,
							type: oEquipment.tipoEquipo
						};
						that.getDomDetail(oDetail, strID);

						decRegularAmount += (oDetail.FixedCharge * 1);// decRegularAmount += (oGroup.FixedCharge * 1);
						decPromotionAmount += (oDetail.cargoFijoPromocion * 1);
					}

					intEquipmentTot++;
				}
			});

            that.AdditionalDecos.oRequest.TotEquipment = intEquipmentTot;
            that.AdditionalDecos.oRequest.intQuantity = intEquipmentTot;
            that.AdditionalDecos.oRequest.decRegularAmount = decRegularAmount.toFixed(2);
            that.AdditionalDecos.oRequest.decAmount = decRegularAmount.toFixed(2);
            that.AdditionalDecos.oRequest.decRegularAmountIGV = (decRegularAmount * (('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv) * 1));
            that.AdditionalDecos.oRequest.decPromotionAmount = decPromotionAmount.toFixed(2);

            controls.spanDisDecos.text(that.AdditionalDecos.oRequest.TotMax - intEquipmentTot);
            controls.spanRegularPrice.text(Math.ceil(decRegularAmount.toFixed(2)).toFixed(2));
            controls.spanFixedPromotionalPrice.text(decPromotionAmount.toFixed(2));
        },

        /* Validaciones */
        decosValidation: function () {
            var that = this, controls = that.getControls();

            var lstNew = that.AdditionalDecos.oRequest.arrAddEquipment || [];
            var lstNewRemove = that.AdditionalDecos.oRequest.arrRemoveEquipment || [];
            var intAdd = lstNew.length;
            var intRemove = lstNewRemove.length;
            var strMessage = '';
            var blnValidation = false;
            var lstConfig = that.AdditionalDecos.Config;

            //tipo de trabajo agregar
            if (intAdd > 0 && intRemove == 0) {
                that.AdditionalDecos.oRequest.strTypeWork = that.AdditionalDecos.Configuration.Constants.TypeWorkAdd;
                blnValidation = true;

            } else if (intAdd == 0 && intRemove > 0) {
                //tipo de trabajo quitar
                that.AdditionalDecos.oRequest.strTypeWork = that.AdditionalDecos.Configuration.Constants.TypeWorkRemove;
                blnValidation = true;

            } else if (intAdd > 0 && intRemove > 0) {
                //tipo de trabajo mixto
                that.AdditionalDecos.oRequest.strTypeWork = that.AdditionalDecos.Configuration.Constants.TypeWorkBoth;
                blnValidation = true;

            } else if (intAdd == 0 && intRemove == 0) {
                strMessage = 'Debe agregar o quitar decos.';
                alert(strMessage);
                blnValidation = false;

            }

            //blnValidation = true;
            if (blnValidation) {
                controls.ipClientEmail.val(that.AdditionalDecos.Data.CustomerInformation.Email);
                that.AdditionalDecos.oRequest.strFlagMail = '1';

                var cantDecosInstall = that.AdditionalDecos.oRequest.arrAddEquipment.length;
                var cantDecosUnInstall = that.AdditionalDecos.oRequest.arrRemoveEquipment.length;
                var cantDecos = cantDecosInstall > 0 ? cantDecosInstall : cantDecosUnInstall;


                var oRequest = {
                    idTransaccion: that.AdditionalDecos.Data.idTransactionFront,
                    idProceso: '3',
                    tecnologia: that.AdditionalDecos.oRequest.strTechnology,
                    contratoId: Session.SessionParams.DATACUSTOMER.ContractID,
                    origen: that.AdditionalDecos.Configuration.Constants.Origen,
                    idPlano: that.AdditionalDecos.Data.Instalation.CodPlano,
                    ubigeo: that.AdditionalDecos.Data.Instalation.Ubigeo,
                    tipTra: that.AdditionalDecos.oRequest.strTypeWork,
                    tipSrv: that.AdditionalDecos.Configuration.Constants.Tipservicio,
                    cantDeco: cantDecos
                };
                that.loadProgramming(oRequest);
            }

            return blnValidation;
        },
        schedulingValidation: function () {
            var that = this, controls = this.getControls();

            var strFlgVisTecnica = that.AdditionalDecos.Data.VisitaTecnica.flagVisitaTecnica || '0';

            if (controls.DivScheduling.length > 0) {

                if ($("#cboTypeWork option:selected").html() == '-Seleccionar-') {
                    controls.cboTypeWork.closest('.form-control').addClass('has-error');
                    controls.ErrorMessageddlWorkType.text('Seleccione un Tipo de Trabajo válido');
                    alert('Seleccione un Tipo de Trabajo válido');
                    controls.cboTypeWork.focus();
                    return false;
                }



                if ($("#cboStypeWork option:selected").html() == '-Seleccionar-') {
                    controls.cboStypeWork.closest('.form-control').addClass('has-error');
                    controls.ErrorMessageddlSubWorkType.text('Seleccione un Sub Tipo de Trabajo válido');
                    alert('Seleccione un Sub Tipo de Trabajo válido');
                    controls.cboStypeWork.focus();
                    return false;
                }
                if (controls.ipCalendar.val().length <= 0) {
                    controls.ipCalendar.closest('.form-control').addClass('has-error');
                    controls.ErrorMessagetxtCalendar.text('Ingrese una fecha válida');
                    alert('Ingrese una fecha válida');
                    controls.ipCalendar.focus();
                    return false;
                }

                if ($("#cboSchedule option:selected").html() == 'Seleccionar') {
                    controls.cboSchedule.closest('.form-control').addClass('has-error');
                    controls.ErrorMessageddlTimeZone.text('Seleccione un Horario válido');
                    alert('Seleccione un Horario válido');
                    controls.cboSchedule.focus();
                    return false;
                }

                if (!that.chkMail_focus()) {
                    alert('Ingrese una dirección de correo válida.');
                    return false;
                }
                if ($("#cboPointAttention option:selected").html() == '-Seleccionar-') {
                    controls.cboPointAttention.closest('.form-control').addClass('has-error');
                    controls.ErrorMessageddlCenterofAttention.text('Seleccione un Centro de Atención válido');
                    alert('Seleccione un Centro de Atención válido');
                    controls.cboPointAttention.focus();
                    return false;
                }

                that.loadSummary();
            }

            return true;
        },

        /* Cargar resumen */
        loadSummary: function () {
            var that = this, controls = that.getControls();

            controls.DivInstallEquipment.empty();
            controls.DivUninstallEquipment.empty();
            controls.DivContenInstallEquipment.hide();
            controls.DivContenUnInstallEquipment.hide();
            var oAddEquipment = that.AdditionalDecos.oRequest;
            var intIndex = 0;
            var decAmountCurrent = that.AdditionalDecos.Data.CustomerInformation.PackageCost * 1;
            var decEquipmentAmount = 0;
            var decEquipmentAmountRes = 0;
            var decAmount = 0;
            var LstGroupAdd = [];
            var LstGroupRemove = [];
            var elementSpanInstall = '';

            $.each(oAddEquipment.arrAddEquipment, function (idx, e) {
                if (LstGroupAdd.filter(function (x) { return x.descEquipo == e.Type; }).length == 0) {
                    var ItemNew = {
                        descEquipo: e.Type,
                        totAmount: 1
                    };
                    LstGroupAdd.push(ItemNew);
                } else {
                    LstGroupAdd.filter(function (x) { return x.descEquipo == e.Type; })[0].totAmount += 1;
                }

                var elementSpan = document.createElement('span');

                elementSpan.innerHTML = string.format('{0} | {1} | Costo S/ {2}', e.ServiceDescription, e.descEquipo, e.Price);

                decEquipmentAmount += (e.Price * 1)

                elementSpanInstall += elementSpan.innerHTML + '<br />';
            });

            decAmount = (decAmountCurrent + decEquipmentAmount);

            intIndex = 0;
            var elementSpanUnInstall = '';
            $.each(oAddEquipment.arrRemoveEquipment, function (idx, e) {
                if (LstGroupRemove.filter(function (x) { return x.descEquipo == e.Type; }).length == 0) {
                    var ItemNew = {
                        descEquipo: e.Type,
                        totAmount: 1
                    };
                    LstGroupRemove.push(ItemNew);
                } else {
                    LstGroupRemove.filter(function (x) { return x.descEquipo == e.Type; })[0].totAmount += 1;
                }

                var elementSpan = document.createElement('span');


                elementSpan.innerHTML = string.format('{0} | {1} | Costo S/ {2}', e.ServiceDescription, e.descEquipo, e.Price);

                decEquipmentAmountRes += (e.Price * 1);

                elementSpanUnInstall += elementSpan.innerHTML + '<br />';
            });

            decAmount = decAmount - decEquipmentAmountRes;
            $.each(LstGroupAdd, function (idx, e) {
                if (e.totAmount > 0) {
                    controls.DivContenInstallEquipment.show();
                    var elementImgAdd = document.createElement('img');
                    var elementSpan1Add = document.createElement('span');
                    var elementSpan2Add = document.createElement('span');

                    elementImgAdd.src = '/Content/Images/SUFija/ico_deco.svg';
                    elementImgAdd.alt = '...';

                    elementSpan1Add.innerHTML = string.format('{0} {1}', e.totAmount, e.descEquipo.replace('_', ' '));
                    elementSpan1Add.className = 'spanAddEquipment';

                    elementSpan2Add.innerHTML = ' + ';
                    elementSpan2Add.className = 'spanAddEquipmentPlus';

                    if (intIndex > 0) {
                        $(controls.DivInstallEquipment).append(elementSpan2Add);
                    }

                    $(controls.DivInstallEquipment).append(elementImgAdd);
                    $(controls.DivInstallEquipment).append(elementSpan1Add);
                    intIndex++;
                }

            });

            $.each(LstGroupRemove, function (idx, e) {
                if (e.totAmount > 0) {
                    controls.DivContenUnInstallEquipment.show();
                    var elementImgRemove = document.createElement('img');
                    var elementSpan1Remove = document.createElement('span');
                    var elementSpan2Remove = document.createElement('span');

                    elementImgRemove.src = '/Content/Images/SUFija/ico_deco.svg';
                    elementImgRemove.alt = '...';

                    elementSpan1Remove.innerHTML = string.format('{0} {1}', e.totAmount, e.descEquipo);
                    elementSpan1Remove.className = 'spanAddEquipment';

                    elementSpan2Remove.innerHTML = ' - ';
                    elementSpan2Remove.className = 'spanAddEquipmentPlus';

                    if (intIndex > 0) {
                        $(controls.DivUninstallEquipment).append(elementSpan2Remove);
                    }

                    $(controls.DivUninstallEquipment).append(elementImgRemove);
                    $(controls.DivUninstallEquipment).append(elementSpan1Remove);

                    intIndex++;
                }

            });

            var markup = "";
            if (elementSpanInstall != '') {
                markup += '<b>---------------SERVICIOS ACTIVADOS---------------</b><br />';
                markup += elementSpanInstall;
            }
            if (elementSpanUnInstall != '') {
                markup += '<b>---------------SERVICIOS DESACTIVADOS---------------</b><br />';
                markup += elementSpanUnInstall;
            }

            if (that.AdditionalDecos.oRequest.arrAddEquipment.length > 0) {
                markup += string.format('<b>Costo Instalación:</b>{0} <br />', that.AdditionalDecos.oRequest.decLoyaltyAmount);
            }
            else {
                markup += string.format('<b>Costo Desinstalación :</b>{0} <br />', that.AdditionalDecos.oRequest.decLoyaltyAmount);
            }

            markup += string.format('<b>Cargo Fijo Actual:</b>{0}<br />', that.getTransformNumber(decAmountCurrent.toFixed(2)));
            markup += string.format('<b>Cargo Equipos:</b> {0}<br />', that.getTransformNumber((decEquipmentAmount * 1).toFixed(2)));
            markup += string.format('<b>Cargo Equipos Retirados:</b> {0}<br />', that.getTransformNumber(decEquipmentAmountRes.toFixed(2)));
            markup += string.format('<b>Nuevo Cargo Fijo:</b> {0}<br />', that.getTransformNumber(decAmount.toFixed(2)));
            markup += '<b>---------------TIPO DE TRABAJO A REALIZAR---------------</b><br />';
            markup += string.format('<b>TIPO DE TRABAJO:</b>{0} <br />', $('#cboTypeWork option:selected').html());
            markup += string.format('<b>Sub Tipo de Trabajo:</b>{0} <br />', $('#cboStypeWork option:selected').html());
            markup += string.format('<b>Fecha de Visita:</b>{0} <br />', controls.ipCalendar.val());
            /**/
            var strflagVisitaTecnica = (that.AdditionalDecos.Data.VisitaTecnica.flagVisitaTecnica == '') ? '0' : that.AdditionalDecos.Data.VisitaTecnica.flagVisitaTecnica;
            if (strflagVisitaTecnica != '0') {
                markup += string.format('<b>* {0} Visita</b><br />', 'Con');
            }
            else {
                markup += string.format('<b>* {0} Visita</b><br />', 'Sin');
            }
            $("#resumeContent").empty();
            $("#resumeContent").append(markup);


        },


        loadProgramming: function (oRequest) {
            var that = this, controls = that.getControls();
            that.getLoadingPage();
            debugger;
            $.app.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: '/AdditionalDecos/Home/GetDatosAdicionales',
                data: JSON.stringify(oRequest),
                success: function (oResponse) {
                    var oResponseBody = oResponse.data.MessageResponse.Body;

                    if (oResponseBody.CodigoRespuesta == '0') {
                        var oResponseServices = oResponseBody.servicios;
                        var oResponseValEta = oResponseServices.franjahorario_validaEta.ValidaEta;
                        var oResponseTypeWork = oResponseServices.tipostrabajo_consultarTipoTrabajo.codigoRespuesta == '0' ? oResponseServices.tipostrabajo_consultarTipoTrabajo.listatipotrabajo : [];
                        var oResponseSTypeWork = oResponseServices.consultasubtipo.CodigoRespuesta == '0' ? oResponseServices.consultasubtipo.listaSubTipo : [];


                        that.AdditionalDecos.Data.ValidaEta = oResponseValEta;
                        that.AdditionalDecos.Data.TypeWork = oResponseTypeWork;
                        that.AdditionalDecos.Data.SubTypeWork = oResponseSTypeWork;


                        that.GetWorkType();
                        that.GetSubWorkType();
                    }

                    $.unblockUI();
                },
                error: function (ex) {
                    alert(string.format('Ocurrio un error al obtener datos adicionales - {0}', e));
                    $.unblockUI();
                }
            });
        },
        loadProgramming_Change: function (oRequest) {
            var that = this, controls = that.getControls();

            $.app.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: '/AdditionalDecos/Home/GetDatosAdicionales',
                data: JSON.stringify(oRequest),
                success: function (oResponse) {

                    var oResponseBody = oResponse.data.MessageResponse.Body;

                    if (oResponseBody.CodigoRespuesta == '0') {
                        var oResponseServices = oResponseBody.servicios;
                        var oResponseValEta = oResponseServices.franjahorario_validaEta.ValidaEta;
                        //let oResponseTypeWork = oResponseServices.tipostrabajo_consultarTipoTrabajo.codigoRespuesta == '0' ? oResponseServices.tipostrabajo_consultarTipoTrabajo.listatipotrabajo : [];
                        var oResponseSTypeWork = oResponseServices.consultasubtipo.CodigoRespuesta == '0' ? oResponseServices.consultasubtipo.listaSubTipo : [];

                        that.AdditionalDecos.Data.ValidaEta = oResponseValEta;
                        //that.AdditionalDecos.Data.TypeWork = oResponseTypeWork;
                        that.AdditionalDecos.Data.SubTypeWork = oResponseSTypeWork;

                        //that.GetWorkType();
                        that.GetSubWorkType();
                    }

                    $.unblockUI();
                },
                error: function (ex) {
                    alert(string.format('Ocurrio un error al obtener datos adicionales - {0}', e));
                    $.unblockUI();
                }
            });
        },
        ReservaTOA: function (nroOrden) {
            var that = this, controls = that.getControls();

            var objLoadParameters = {};
            objLoadParameters.flagValidaETA = that.AdditionalDecos.Data.ValidaEta.FlagIndica;//that.TransferSession.Data.ValidaEta.FlagReserva;
            objLoadParameters.tiptra = controls.cboTypeWork.val();
            objLoadParameters.tipSrv = $("#cboStypeWork option:selected").attr("idtiposervicio");
            objLoadParameters.nroOrden = nroOrden;
            objLoadParameters.fechaReserva = controls.txtCalendar.val();
            objLoadParameters.idBucket = $("#cboSchedule option:selected").attr('idBucket') == undefined ? '' : $("#cboSchedule option:selected").attr('idBucket');
            objLoadParameters.codZona = that.AdditionalDecos.Data.ValidaEta.CodigoZona, //that.planMigrationSession.Data.Instalacion.Zona;//"400";
            objLoadParameters.idPlano = that.AdditionalDecos.Data.Instalacion.CodPlano;
            objLoadParameters.tipoOrden = $("#cboStypeWork option:selected").attr('codtipoorden');
            objLoadParameters.codSubTipoOrden = controls.cboStypeWork.val()
            objLoadParameters.idConsulta = $("#cboSchedule option:selected").attr('idConsulta') == undefined ? '' : $("#cboSchedule option:selected").attr('idConsulta');
            objLoadParameters.franjaHoraria = $("#cboSchedule option:selected").attr('franja') == undefined ? '' : $("#cboSchedule option:selected").attr('franja');// "PM2";
            objLoadParameters.duracion = $("#cboStypeWork option:selected").attr('disponibilidad');//20;

            var urlBase = '/AdditionalDecos/Home/GestionarReservaTOA';
            $.app.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(objLoadParameters),
                url: urlBase,
                success: function (response) {
                    if (response != null) {
                        that.AdditionalDecos.Configuration.Constants.nroOrdenTOA = response.oDataResponse.nroOrden;
                        that.countdown(response.oDataResponse.nroOrden)
                    }
                    else {
                        alert('No se pudo ejecutar la reseva del horario. Por favor vuelva a intentar')
                    }
                    ///$.unblockUI();
                }
            });
        },
        CancelarTOA: function (nroOrden) {
            var that = this, controls = that.getControls();

            var objLoadParameters = {};
            objLoadParameters.nroOrden = nroOrden;
            var urlBase = '/AdditionalDecos/Home/GestionarCancelarTOA';
            $.app.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(objLoadParameters),
                url: urlBase,
                success: function (response) {
                    if (response != null) { }

                }
            });


        },
        SaveTransaction: function () {
            var that = this, controls = that.getControls();
            that.getLoadingPage();
            /**/
            var temporal = '';
            if (that.AdditionalDecos.oRequest.strTechnology == '9')
                temporal = that.getSettingsSave('SubClase')
            else if (that.AdditionalDecos.Configuration.Constants.TypeWorkAdd == '1100')
                temporal = 'INSTALACION DECO ADICIONAL';
            else
                temporal = 'DESINSTALACION DE DECO ADICIONAL';

            /**/
            debugger;
            var servicios = [
                {
                    "servicio": "Cliente",
                    "parametros": [
                        {
                            "parametro": "phone",
                            "valor": that.AdditionalDecos.Configuration.Constants.KeyCustomerInteract + that.AdditionalDecos.Data.CustomerInformation.CustomerID
                        },
                        {
                            "parametro": "usuario",
                            "valor": Session.SessionParams.USERACCESS.login
                        },
                        {
                            "parametro": "nombres",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerName
                        },
                        {
                            "parametro": "apellidos",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerName
                        },
                        {
                            "parametro": "razonsocial",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.LegalRepresentative
                        },
                        {
                            "parametro": "tipoDoc",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.LegalRepresentativeDocument
                        },
                        {
                            "parametro": "numDoc",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.DocumentNumber
                        },
                        {
                            "parametro": "domicilio",
                            "valor": that.AdditionalDecos.Data.Instalation.Direccion
                        },
                        {
                            "parametro": "distrito",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.BillingDistrict
                        },
                        {
                            "parametro": "departamento",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.BillingDepartament
                        },
                        {
                            "parametro": "provincia",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.BillingProvince
                        },
                        {
                            "parametro": "modalidad",
                            "valor": that.AdditionalDecos.Configuration.Constants.Modalidad
                        }
                    ]
                },
                {
                    "servicio": "Tipificacion",
                    "parametros": [
                        {
                            "parametro": "coid",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.ContractNumber,
                        },
                        {
                            "parametro": "customer_id",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerID,
                        },
                        {
                            "parametro": "Phone",
                            "valor": that.AdditionalDecos.Configuration.Constants.KeyCustomerInteract + that.AdditionalDecos.Data.CustomerInformation.CustomerID
                        },
                        {
                            "parametro": "flagReg",
                            "valor": that.AdditionalDecos.Configuration.Constants.FlagReg
                        },
                        {
                            "parametro": "contingenciaClarify",
                            "valor": that.AdditionalDecos.Configuration.Constants.ContingenciaClarify
                        },
                        {
                            "parametro": "tipo",
                            "valor": that.AdditionalDecos.oRequest.strTechnology == '9' ? that.getSettingsSave('Tipo') : 'HFC'
                        },
                        {
                            "parametro": "clase",
                            "valor": that.getSettingsSave('Clase')
                        },
                        {
                            "parametro": "SubClase",
                            "valor": temporal //that.getSettingsSave('SubClase')
                        },
                        {
                            "parametro": "metodoContacto",
                            "valor": that.AdditionalDecos.Configuration.Constants.MetodoContacto
                        },
                        {
                            "parametro": "tipoTipificacion",
                            "valor": that.AdditionalDecos.Configuration.Constants.TipoTipificacion
                        },
                        {
                            "parametro": "agente",
                            "valor": Session.SessionParams.USERACCESS.login
                        },
                        {
                            "parametro": "usrProceso",
                            "valor": that.AdditionalDecos.Configuration.Constants.USRAPLICACION
                        },
                        {
                            "parametro": "hechoEnUno",
                            "valor": that.AdditionalDecos.Configuration.Constants.HechoDeUno
                        },
                        {
                            "parametro": "Notas",
                            "valor": $.string.isEmptyOrNull(controls.txtNote.val()) ? '-' : controls.txtNote.val().replace(/\t/g, " ").replace(/\n/g, "\\n")
                        },
                        {
                            "parametro": "flagCaso",
                            "valor": that.AdditionalDecos.Configuration.Constants.FlagCaso
                        },
                        {
                            "parametro": "resultado",
                            "valor": that.AdditionalDecos.Configuration.Constants.Resultado
                        },
                        {
                            "parametro": "tipoInter",
                            "valor": that.AdditionalDecos.Configuration.Constants.TipoInter
                        }
                    ]
                },
                {
                    "servicio": "Plantilla",
                    "parametros": [
                        {
                            "parametro": "nroIteraccion",
                            "valor": ""
                        },
                        {
                            "parametro": "P_FIRST_NAME", //AD nombre de cliente
                            "valor": that.AdditionalDecos.Data.CustomerInformation.ContactName
                        },
                        {
                            "parametro": "P_BASKET", //AD nombre de plan
                            "valor": Session.SessionParams.DATASERVICE.Plan
                        },
                        {
                            "parametro": "P_MARITAL_STATUS", //AD
                            "valor": that.getFechaActual()
                        },
                        {
                            "parametro": "MARITAL_STATUS", //AD
                            "valor": that.getFechaActual()
                        },
                        {
                            "parametro": "xinter1", //AD
                            "valor": Session.SessionParams.DATACUSTOMER.objPostDataAccount.BillingCycle
                        },
                        {
                            "parametro": "P_CLARO_LDN1", //AD
                            "valor": that.AdditionalDecos.Data.CustomerInformation.DocumentNumber
                        },
                        {
                            "parametro": "xinter3", //AD
                            "valor": that.AdditionalDecos.Data.CustomerInformation.ActivationDate
                        },
                        {
                            "parametro": "inter5", //AD
                            "valor": Session.SessionParams.DATASERVICE.StateLine
                        },
                        {
                            "parametro": "inter7", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.Direccion
                        },
                        {
                            "parametro": "inter15", //AD
                            "valor": $("#cboPointAttention option:selected").html()
                        },
                        {
                            "parametro": "inter16", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.Departamento
                        },
                        {
                            "parametro": "inter17", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.Distrito
                        },

                        {
                            "parametro": "inter18", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.Pais
                        },

                        {
                            "parametro": "inter19", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.Provincia
                        },
                        {
                            "parametro": "inter20", //AD
                            "valor": that.AdditionalDecos.Data.Instalation.CodPlano
                        },
                        {
                            "parametro": "inter21", //AD
                            "valor": that.AdditionalDecos.oRequest.intQuantity
                        },
                        {
                            "parametro": "inter22", //AD
                            "valor": (that.AdditionalDecos.oRequest.decRegularAmount * 1)
                        },
                        {
                            "parametro": "inter23", //AD
                            "valor": (that.AdditionalDecos.oRequest.decRegularAmountIGV * 1)
                        },
                        {
                            "parametro": "inter24", //AD
                            "valor": 0.00
                        },
                        {
                            "parametro": "P_CLARO_LDN2", //AD
                            "valor": that.AdditionalDecos.oRequest.strFlagMail
                        },
                        {
                            "parametro": "P_EMAIL", //AD 
                            "valor": controls.ipClientEmail.val()
                        },
                        {
                            "parametro": "P_EMAIL_CONFIRMATION", //AD 
                            "valor": controls.ipClientEmail.val()
                        },
                        {
                            "parametro": "P_CLARO_LDN4", //AD flag fidelizacion
                            "valor": that.AdditionalDecos.oRequest.strLoyalty
                        },
                        {
                            "parametro": "P_CLAROLOCAL1", //AD monto fidelizacion
                            "valor": that.AdditionalDecos.oRequest.decLoyaltyAmount
                        },
                        {
                            "parametro": "P_CLAROLOCAL2", //AD inst/desinst/ambos
                            "valor": that.getTypeWork()
                        },
                        {
                            "parametro": "inter25", //AD monto IGV
                            "valor": '0.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv
                        },
                        {
                            "parametro": "inter6",
                            "valor": '0'
                        },
                        {
                            "parametro": "P_DISTRICT",
                            "valor": Session.SessionParams.DATACUSTOMER.LegalUrbanization
                        },
                        {
                            "parametro": "inter30",
                            "valor": $.string.isEmptyOrNull(controls.txtNote.val()) ? '-' : controls.txtNote.val().replace(/\t/g, " ").replace(/\n/g, "\\n")
                        },
                        {
                            "parametro": "P_FIRST_NAME",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerName
                        },
                        {
                            "parametro": "P_LAST_NAME",
                            "valor": ''
                        },
                        {
                            "parametro": "P_DOCUMENT_NUMBER",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.DocumentNumber
                        },
                        {
                            "parametro": "P_REGISTRATION_REASON",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.ContractNumber
                        },
                        {
                            "parametro": "P_CLARO_NUMBER",
                            "valor": Session.SessionParams.DATACUSTOMER.ContractID
                        },
                        {
                            "parametro": "P_TYPE_DOCUMENT",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerType
                        },
                        {
                            "parametro": "P_AMOUNT_UNIT",
                            "valor": that.AdditionalDecos.Data.Instalation.NotaDireccion
                        },
                        {
                            "parametro": "P_CITY",
                            "valor": Session.SessionParams.DATACUSTOMER.InstallUbigeo
                        },
                        {
                            "parametro": "P_REASON",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerName
                        },
                        {
                            "parametro": "P_POSITION",
                            "valor": $("#txtCalendar").val()
                        },
                        {
                            "parametro": "P_OCCUPATION",
                            "valor": that.getFechaActual()
                        },
                        //Se agregaron despues de las pruebas
                        {
                            "parametro": "P_CLAROLOCAL4",
                            "valor": ""
                        },
                        {
                            "parametro": "P_MODEL",
                            "valor": ""
                        },
                        {
                            "parametro": "P_CLAROLOCAL3",
                            "valor": ""
                        },
                        {
                            "parametro": "P_DEPARTMENT",
                            "valor": that.AdditionalDecos.Data.Instalation.Departamento
                        },
                        {
                            "parametro": "P_LASTNAME_REP",
                            "valor": ""
                        },
                        {
                            "parametro": "P_REFERENCE_ADDRESS",
                            "valor": ""
                        },
                        {
                            "parametro": "P_FLAG_CHARGE",
                            "valor": "0"
                        },
                        {
                            "parametro": "P_LOT_CODE",
                            "valor": ""
                        },
                        {
                            "parametro": "P_ICCID",
                            "valor": ""
                        },
                        {
                            "parametro": "P_FLAG_REGISTERED",
                            "valor": ""
                        },
                        {
                            "parametro": "P_FIXED_NUMBER",
                            "valor": ""
                        },
                        {
                            "parametro": "P_MONTH",
                            "valor": ""
                        }
                    ]
                },
                {
                    "servicio": "getlistaTipificacionTransversal",
                    "parametros": [
                        {
                            "parametro": "listaServicio",
                            "valor": JSON.stringify(that.getTramaTipi())
                        }
                    ]
                },
                {
                    "servicio": "Tramas", /*(Generacion de SOT)*/
                    "parametros": [
                        {
                            "parametro": "Trama_Ventas",
                            "valor": that.getXMLTramaVenta()
                        },
                        {
                            "parametro": "Trama_Servicios",
                            "valor": that.getXMLTramaServicios()
                        },


                    ]
                },
                {
                    "servicio": "Constancia",
                    "parametros": [

                        {
                            "parametro": "DRIVE_CONSTANCIA",
                            "valor": that.getXMLTramaConstancia()
                        },
                    ]
                },
                {
                    "servicio": "Correo",
                    "parametros": [
                        {
                            "parametro": "remitente",
                            "valor": that.AdditionalDecos.Configuration.Constants.remitente
                        },
                        {
                            "parametro": "destinatario",
                            "valor": controls.ipClientEmail.val()
                        },
                        {
                            "parametro": "asunto",
                            "valor": that.getSettingsSave('Asunto')
                        },
                        {
                            "parametro": "htmlFlag",
                            "valor": that.AdditionalDecos.Configuration.Constants.htmlFlag
                        },
                        {
                            "parametro": "driver/fileName",
                            "valor": that.AdditionalDecos.Configuration.Constants.driver
                        },
                        {
                            "parametro": "formatoConstancia",
                            "valor": that.AdditionalDecos.Configuration.Constants.formatoConstancia
                        },
                        {
                            "parametro": "directory",
                            "valor": that.AdditionalDecos.Configuration.Constants.directory
                        },
                        {
                            "parametro": "fileName",
                            "valor": "@idInteraccion_@p_fecha_INS_DES_DECO@extension" //that.planMigrationSession.Configuration.Constants.fileName
                        },
                        {
                            "parametro": "p_fecha",
                            "valor": "dd_MM_yyyy"
                        },
                        {
                            "parametro": "mensaje",
                            "valor": that.getSettingsSave('Mensaje')
                        },
                    ]
                },
                {
                    "servicio": "Auditoria",
                    "parametros": [
                        {
                            "parametro": "ipcliente",
                            "valor": that.AdditionalDecos.Data.AuditRequest.idApplication// "172.19.91.216" //System.Web.HttpContext.Current.Request.UserHostAddress;
                        },
                        {
                            "parametro": "nombrecliente",
                            "valor": that.AdditionalDecos.Data.CustomerInformation.CustomerName
                        },
                        {
                            "parametro": "ipservidor",
                            "valor": that.AdditionalDecos.Data.AuditRequest.IPAddress// "172.19.91.216" //audit.ipAddress,
                        },
                        {
                            "parametro": "nombreservidor",
                            "valor": that.AdditionalDecos.Data.AuditRequest.ApplicationName//"SIAC_UNICO" //audit.applicationName
                        },
                        {
                            "parametro": "cuentausuario",
                            "valor": Session.SessionParams.USERACCESS.login
                        },
                        {
                            "parametro": "monto",
                            "valor": that.AdditionalDecos.Configuration.Constants.Monto
                        },
                        {
                            "parametro": "texto",
                            "valor": string.format("/Ip Cliente: {0}/Usuario:  {1}/Opcion: {2}/Fecha y Hora: {3} {4}", that.AdditionalDecos.Data.AuditRequest.idApplication, Session.SessionParams.USERACCESS.login, that.AdditionalDecos.Configuration.Constants.TRANSACCION_DESCRIPCION, that.getFechaActual(), that.getHoraActual())//"15/10/2020 19:03:21")
                        },
                        {
                            "parametro": "TRANSACCION_DESCRIPCION",
                            "valor": that.AdditionalDecos.Configuration.Constants.TRANSACCION_DESCRIPCION
                        }
                    ]
                },
				 {
				     "servicio": "Trazabilidad",
				     "parametros": [
                         {
                             "parametro": "tipoTransaccion",
                             "valor": 'INSTALACION_DESINSTALACION_DECOS_ADICIONALES'//that.transactionData.Configuration.Constants.Constancia_FormatoTransaccion
                         },
                         {
                             "parametro": "tarea",
                             "valor": "generaConstancia"
                         },
                         {
                             "parametro": "fechaRegistro",
                             "valor": that.getFechaActual()
                         },
                         {
                             "parametro": "descripcion",
                             "valor": "Trazabilidad generada desde SIACUNICO"
                         }
				     ]
				 }
            ];

            debugger;
            var objLoadParameters = {};
            objLoadParameters.idFlujo = '';
            objLoadParameters.servicios = servicios;
            objLoadParameters.stridSession = Session.UrlParams.IdSession;
            objLoadParameters.TransactionID = that.AdditionalDecos.Data.idTransactionFront;
            var urlBase = '/AdditionalDecos/Home/postGeneraTransaccion';

            $.app.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(objLoadParameters),
                url: urlBase,
                success: function (response) {

                    if (response != null) {
                        if (response.data != null && response.data.MessageResponse != null) {
                            if ((response.data.MessageResponse.Body.numeroSOT === "") || (response.data.MessageResponse.Body.numeroSOT === null)) {
                                alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar');

                            } else {
                                var nroSot = response.data.MessageResponse.Body.numeroSOT;

                                alert('La transacción se ha grabado satisfactoriamente.<br/>- Nro. SOT: ' + nroSot);
                                controls.btnConstancy.show();
                                controls.btnStep.hide();
                                controls.btnStepPrev.hide();
                                controls.btnSave.hide();
                                controls.divFooterInfoSot.show();
                                controls.divFooterInfoSot.prepend('Nro. SOT: ' + nroSot + ' </p>');

                                $('.transaction-button-Steps').attr('disabled', true);
                                that.AdditionalDecos.Data.Constancia = !$.string.isEmptyOrNull(response.data.MessageResponse.Body.constancia) ? true : false;

                            }
                        } else {
                            alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar')
                        }
                    }
                    else {
                        alert('No se pudo ejecutar la transacción. Informe o vuelva a intentar')
                    }
                    $.unblockUI();
                }
            });
        },

        /* XML */
        getXMLTramaVenta: function () {
            var that = this, controls = that.getControls();
            debugger;
            var strTrama = '';
            var dtStateDate = Session.SessionParams.DATASERVICE.StateDate;
            //var strObservacion = (that.getNotNull(that.AdditionalDecos.Data.VisitaTecnica.anotaciones) == '') ? controls.txtNote.val() : that.AdditionalDecos.Data.VisitaTecnica.anotaciones + ' ' + controls.txtNote.val();
            var strObservacion = controls.txtNote.val().replace(/\t/g, " ").replace(/\n/g, "\\n");
            strTrama += '<BODY>';
            strTrama += string.format('<APLICACION>{0}</APLICACION>', 'SIAC_UNICO');
            strTrama += string.format('<COD_ID>{0}</COD_ID>', Session.SessionParams.DATACUSTOMER.ContractID);
            strTrama += string.format('<CODIGO_POSTAL>{0}</CODIGO_POSTAL>', that.AdditionalDecos.Data.Instalation.Ubigeo);
            strTrama += string.format('<CUSTOMER_ID>{0}</CUSTOMER_ID>', Session.SessionParams.DATACUSTOMER.CustomerID);
            strTrama += string.format('<DEPARTAMENTO>{0}</DEPARTAMENTO>', that.AdditionalDecos.Data.Instalation.Departamento);
            strTrama += string.format('<DIRECCION_FACTURACION>{0}</DIRECCION_FACTURACION>', $.string.isEmptyOrNull(Session.SessionParams.DATACUSTOMER.InvoiceAddress) ? '' : Session.SessionParams.DATACUSTOMER.InvoiceAddress);
            strTrama += string.format('<DISTRITO>{0}</DISTRITO>', that.AdditionalDecos.Data.Instalation.Distrito);
            strTrama += string.format('<FLAG_ACT_DIR_FACT>{0}</FLAG_ACT_DIR_FACT>', '0');
            strTrama += string.format('<MONTO_OCC>{0}</MONTO_OCC>', Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT === 'TOBE' ? that.AdditionalDecos.oRequest.decLoyaltyAmount : that.getTransformNumber((parseFloat(that.AdditionalDecos.oRequest.decLoyaltyAmount) / parseFloat("1." + that.AdditionalDecos.Data.Configuration.Constantes_Igv)).toFixed(2)));
            strTrama += string.format('<NOTAS_DIRECCION>{0}</NOTAS_DIRECCION>', $.string.isEmptyOrNull(that.AdditionalDecos.Data.Instalation.NotaDireccion) ? '' : that.AdditionalDecos.Data.Instalation.NotaDireccion);
            strTrama += string.format('<OBSERVACION>{0}</OBSERVACION>', strObservacion);
            strTrama += string.format('<PAIS>{0}</PAIS>', that.AdditionalDecos.Data.Instalation.Pais);
            strTrama += string.format('<PROVINCIA>{0}</PROVINCIA>', that.AdditionalDecos.Data.Instalation.Provincia);
            strTrama += string.format('<TIPO_PRODUCTO>{0}</TIPO_PRODUCTO>', that.AdditionalDecos.Configuration.Constants.TIPO_PRODUCTO);
            strTrama += string.format('<TIPO_TRANS>{0}</TIPO_TRANS>', that.AdditionalDecos.Configuration.Constants.TIPO_TRANS);
            strTrama += string.format('<TIPOSERVICIO>{0}</TIPOSERVICIO>', that.AdditionalDecos.Configuration.Constants.Tipservicio);
            strTrama += string.format('<TIPTRA>{0}</TIPTRA>', controls.cboTypeWork.val());
            strTrama += string.format('<FLAG_FIDELIZA>{0}</FLAG_FIDELIZA>', that.AdditionalDecos.oRequest.strLoyalty);
            strTrama += string.format('<FEC_VIG>{0}</FEC_VIG>', $.trim(dtStateDate.split(' ')[0]));
            strTrama += string.format('<FECPROG>{0}</FECPROG>', $("#txtCalendar").val());
            strTrama += string.format('<CODPLAN>{0}</CODPLAN>', that.AdditionalDecos.Data.planCode);
            /**/
            strTrama += string.format('<COD_INTERCASO>{0}</COD_INTERCASO>', '@idInteraccion');
            strTrama += string.format('<FRANJA>{0}</FRANJA>', $.string.isEmptyOrNull($("#cboSchedule option:selected").attr('Franja')) ? '' : $("#cboSchedule option:selected").attr('franja'));
            strTrama += string.format('<FRANJA_HOR>{0}</FRANJA_HOR>', $.string.isEmptyOrNull($("#cboSchedule option:selected").attr('idHorario')) ? '' : $("#cboSchedule option:selected").attr('idHorario'));
            strTrama += string.format('<SUBTIPO_ORDEN>{0}</SUBTIPO_ORDEN>', $.string.isEmptyOrNull($("#cboStypeWork option:selected").attr('CodTipoSubOrden')) ? '' : $("#cboStypeWork option:selected").attr('CodTipoSubOrden'));
            strTrama += string.format('<ID_BUCKET>{0}</ID_BUCKET>', $.string.isEmptyOrNull($("#cboSchedule option:selected").attr('idBucket')) ? '' : $("#cboSchedule option:selected").attr('idBucket'));
            strTrama += string.format('<ID_CONSULTA_ETA>{0}</ID_CONSULTA_ETA>', $.string.isEmptyOrNull($("#cboSchedule option:selected").attr('idConsulta')) ? '' : $("#cboSchedule option:selected").attr('idConsulta'));
            strTrama += string.format('<USUREG>{0}</USUREG>', Session.SessionParams.USERACCESS.login);
            strTrama += string.format('<NODOPOSTVENTA>{0}</NODOPOSTVENTA>', 'Nodo ' + $("#spnNode").text());
            strTrama += string.format('<PLATF_FACTURADOR>{0}</PLATF_FACTURADOR>', that.AdditionalDecos.Configuration.Constants.Plataforma_Facturador);
            strTrama += '</BODY>';
            debugger;
            return strTrama;
        },
        getXMLTramaServicios: function () {
            var that = this, controls = that.getControls();
            debugger;
            var datosAdicionales = [];//that.AdditionalDecos.oRequest.arrAddServices == undefined ? [] : that.AdditionalDecos.oRequest.arrAddServices;            
            var datosPrincipales = []; //that.AdditionalDecos.oRequest.arrCoreServices == undefined ? [] : that.AdditionalDecos.oRequest.arrCoreServices;
            //var datosEquipos = [];//that.AdditionalDecos.oRequest.arrAddEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrAddEquipment;

            var equDataActivate = [];
            var equDataDesactivate = [];
            var accion = "";
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkAdd) {
                equDataActivate = that.AdditionalDecos.oRequest.arrAddEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrAddEquipment;
                accion = "A";
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkRemove) {
                equDataDesactivate = that.AdditionalDecos.oRequest.arrRemoveEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrRemoveEquipment;
                accion = "D";
            }

            var data = equDataActivate.concat(equDataDesactivate);
            var detailXML = "";
            data.forEach(function (select, idx) {
                var feed = "<ITEM>";
                feed += "<SERVICIO>{0}</SERVICIO>";
                feed += "<IDGRUPO_PRINCIPAL>{1}</IDGRUPO_PRINCIPAL>";
                feed += "<IDGRUPO>{2}</IDGRUPO>";
                feed += "<CANTIDAD_INSTANCIA>{3}</CANTIDAD_INSTANCIA>";
                feed += "<DSCSRV>{4}</DSCSRV>";
                feed += "<BANWID>{5}</BANWID>";
                feed += "<FLAG_LC>{6}</FLAG_LC>";
                feed += "<CANTIDAD_IDLINEA>{7}</CANTIDAD_IDLINEA>";
                feed += "<TIPEQU>{8}</TIPEQU>";
                feed += "<CODTIPEQU>{9}</CODTIPEQU>";
                feed += "<CANTIDAD>{10}</CANTIDAD>";
                feed += "<DSCEQU>{11}</DSCEQU>";
                feed += "<CODIGO_EXT>{12}</CODIGO_EXT>";
                feed += "<CARGOFIJO>{13}</CARGOFIJO>";
                feed += "<SNCODE>{14}</SNCODE>";
                feed += "<SPCODE>{15}</SPCODE>";
                feed += "<FLAG_ACCION>{16}</FLAG_ACCION>";
                /* */
                feed += "<POID>{17}</POID>";
                feed += "<POTYPE>{18}</POTYPE>";
                feed += "<IDPRODUCTOCBIO>{19}</IDPRODUCTOCBIO>";
                feed += "<POP1>{20}</POP1>";
                feed += "<POP2>{21}</POP2>";
                var XMLDetailService = string.format(feed,
                    select.idServicio,
                    (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT !== 'TOBE' ? select.idGrupoPrincipal : select.idGrupo),
                    select.idGrupo,
                    select.cantidad == null ? 1 : select.cantidad, //CANTIDAD_INSTANCIA
                    select.ServiceDescription,
                    $.string.isEmptyOrNull(select.banwid) ? '' : select.banwid,
                    '', //FLG_LC,
                    1, //CANTIDAD_ID_LINEA
                    select.tipequ,
                    select.codTipoEquipo,
                    1, //CANTIDAD
                    select.descEquipo,
                    $.string.isEmptyOrNull(select.codigoExterno) ? '' : select.codigoExterno,
                    (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT !== 'TOBE' ? that.getTransformNumber((parseFloat(select.Price) * parseFloat("1." + that.AdditionalDecos.Data.Configuration.Constantes_Igv)).toFixed(2)) : that.getTransformNumber(select.Price)),
                    select.sncode,
                    select.spcode,
                    accion,
                    select.poId,
                    select.poType,
                    select.idProductoCBIO,
                    select.pop1,
                    select.pop2)

                detailXML += XMLDetailService + "</ITEM>";
            });
            debugger;
            return "<BODY>" + detailXML + "</BODY>";
        },
        getXMLTramaConstancia: function () {
            var that = this, controls = that.getControls();

            var datosEquipos = [];
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkAdd) {
                datosEquipos = that.AdditionalDecos.oRequest.arrAddEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrAddEquipment;
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkRemove) {
                datosEquipos = that.AdditionalDecos.oRequest.arrRemoveEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrRemoveEquipment;
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkBoth) {
                datosEquipos = that.AdditionalDecos.oRequest.arrAddEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrAddEquipment;
                if (that.AdditionalDecos.oRequest.arrRemoveEquipment != undefined) {
                    datosEquipos.concat(that.AdditionalDecos.oRequest.arrRemoveEquipment);
                }
            }

            var strLegalRepresentative = that.AdditionalDecos.Data.CustomerInformation.LegalRepresentative == null ? "" : that.AdditionalDecos.Data.CustomerInformation.LegalRepresentative;
            var strFlagTipDeco = that.getTypeWork();
            var strLoyalty = (that.AdditionalDecos.oRequest.strLoyalty == '0') ? 'NO' : 'SI';
            var strFlagMail = (that.AdditionalDecos.oRequest.strFlagMail == '0') ? 'NO' : 'SI';
            var decIGV = ('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv) * 1;
            var decDetailAmountIGV = 0;
            var intCount = datosEquipos.length;
            var price = 0;
            var detailXML = "";
            var XMLServicios = "";
            var feed = "";
            var totPriceIGV = 0;
            datosEquipos.forEach(function (select, idx) {
                //decDetailAmountIGV = select.Price * decIGV;
                price = (select.Price * 1).toFixed(2);
                totPriceIGV = (parseFloat(totPriceIGV) + parseFloat(price)).toFixed(2);

                detailXML = "<NOMBRE_EQUIPO>{0}</NOMBRE_EQUIPO>";
                detailXML += "<TIPO_SERVICIO>{1}</TIPO_SERVICIO>";
                detailXML += "<CARGO_FIJO_SIN_IGV>{2}</CARGO_FIJO_SIN_IGV>";
                XMLServicios += string.format(detailXML,
                    select.ServiceDescription,
                    select.ServiceType,
					price
                );
            });

            feed += string.format("<FORMATO_TRANSACCION>{0}</FORMATO_TRANSACCION>", "INSTALACION_DESINSTALACION_DECOS_ADICIONALES");
            feed += string.format("<TITULO_INSTALACION>{0}</TITULO_INSTALACION>", that.getSettingsSave('ConsTitulo'));
            feed += string.format("<CENTRO_ATENCION_AREA>{0}</CENTRO_ATENCION_AREA>", $("#cboPointAttention option:selected").html());
            feed += string.format("<TITULAR_CLIENTE>{0}</TITULAR_CLIENTE>", that.AdditionalDecos.Data.CustomerInformation.CustomerName);
            feed += string.format("<REPRES_LEGAL>{0}</REPRES_LEGAL>", strLegalRepresentative);
            feed += string.format("<TIPO_DOC_IDENTIDAD>{0}</TIPO_DOC_IDENTIDAD>", that.AdditionalDecos.Data.CustomerInformation.LegalRepresentativeDocument);
            feed += string.format("<PLAN_ACTUAL>{0}</PLAN_ACTUAL>", Session.SessionParams.DATASERVICE.Plan);
            feed += string.format("<FECHA_TRANSACCION_PROGRAM>{0}</FECHA_TRANSACCION_PROGRAM>", that.getFechaActual());
            feed += string.format("<CASO_INTER>{0}</CASO_INTER>", '@idInteraccion');
            feed += string.format("<CONTRATO>{0}</CONTRATO>", that.AdditionalDecos.Data.CustomerInformation.ContractNumber);
            feed += string.format("<NRO_DOC_IDENTIDAD>{0}</NRO_DOC_IDENTIDAD>", that.AdditionalDecos.Data.CustomerInformation.DocumentNumber);
            feed += string.format("<CICLO_FACTURACION>{0}</CICLO_FACTURACION>", that.AdditionalDecos.Data.CustomerInformation.BillingCycle);
            feed += string.format("<FLAG_TIPO_DECO>{0}</FLAG_TIPO_DECO>", strFlagTipDeco);
            feed += string.format("<DIRECCION_CLIENTE_ACTUAL>{0}</DIRECCION_CLIENTE_ACTUAL>", Session.SessionParams.DATACUSTOMER.OfficeAddress);
            feed += string.format("<NOTAS_DIRECCION>{0}</NOTAS_DIRECCION>", $.string.isEmptyOrNull(that.AdditionalDecos.Data.Instalation.NotaDireccion) ? '' : that.AdditionalDecos.Data.Instalation.NotaDireccion);
            feed += string.format("<DEPARTAMENTO_CLIENTE_ACTUAL>{0}</DEPARTAMENTO_CLIENTE_ACTUAL>", that.AdditionalDecos.Data.Instalation.Departamento);
            feed += string.format("<DISTRITO_CLIENTE_ACTUAL>{0}</DISTRITO_CLIENTE_ACTUAL>", that.AdditionalDecos.Data.Instalation.Distrito);
            feed += string.format("<PAIS_CLIENTE_ACTUAL>{0}</PAIS_CLIENTE_ACTUAL>", that.AdditionalDecos.Data.Instalation.Pais);
            feed += string.format("<PROVINCIA_CLIENTE_ACTUAL>{0}</PROVINCIA_CLIENTE_ACTUAL>", that.AdditionalDecos.Data.Instalation.Provincia);
            feed += string.format("<CODIGO_PLANO>{0}</CODIGO_PLANO>", that.AdditionalDecos.Data.Instalation.CodPlano);
            feed += string.format("<FECHA_COMPROMISO>{0}</FECHA_COMPROMISO>", $("#txtCalendar").val());
            feed += XMLServicios;
            feed += string.format("<CANTIDAD_DESINSTALAR>{0}</CANTIDAD_DESINSTALAR>", intCount);
            feed += string.format("<CARGO_FIJO_CON_IGV>{0}</CARGO_FIJO_CON_IGV>", 'S/ ' + totPriceIGV),
            feed += string.format("<FIDELIZAR>{0}</FIDELIZAR>", strLoyalty);
            feed += string.format("<COSTO_INSTALACION>{0}</COSTO_INSTALACION>", 'S/ ' + that.AdditionalDecos.oRequest.decLoyaltyAmount);
            feed += string.format("<ENVIO_CORREO>{0}</ENVIO_CORREO>", strFlagMail);
            feed += string.format("<EMAIL>{0}</EMAIL>", controls.ipClientEmail.val());
            feed += string.format("<CONTENIDO_COMERCIAL2>{0}</CONTENIDO_COMERCIAL2>", that.AdditionalDecos.Configuration.Constants.ContComercial);
            feed += string.format("<NRO_SOT>{0}</NRO_SOT>", '@codSolot');

            return "<PLANTILLA>" + feed + "</PLANTILLA>";
        },
        getTramaTipi: function (data) {
            var that = this, controls = that.getControls();

            var lstEquipment = [];
            var lstEquipmentTipo = [];
            var decIGV = ('1.' + that.AdditionalDecos.Data.Configuration.Constantes_Igv) * 1;

            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkAdd) {
                lstEquipment = that.AdditionalDecos.oRequest.arrAddEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrAddEquipment;

            } else if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkRemove) {
                lstEquipment = that.AdditionalDecos.oRequest.arrRemoveEquipment == undefined ? [] : that.AdditionalDecos.oRequest.arrRemoveEquipment;

            }
            debugger;
            lstEquipment.forEach(function (Item, idx) {
                var decDetailAmountIGV = Item.Price * decIGV;

                var objEquipment = {
                    'codInter': '@idInteraccion',
                    'serv': Item.ServiceDescription,
                    'tipServ': Item.ServiceType,
                    'grupServ': Item.idGrupo,
                    'cf': Item.Price,
                    'equipo': Item.descEquipo,
                    'cantidad': '1'
                };
                lstEquipmentTipo.push(objEquipment);
            });

            return lstEquipmentTipo;
        },

        /* Funcionalidad */
        chkFideliza_change: function () {
            var that = this, controls = that.getControls();

            if (controls.chkFideliza.is(':checked')) {
                that.AdditionalDecos.oRequest.strLoyalty = '1';
                that.AdditionalDecos.oRequest.decLoyaltyAmount = 0.00;
                controls.spanInstalationPrice.text('0,00');

            } else {
                that.AdditionalDecos.oRequest.strLoyalty = '0';
                that.getAmountOcc();
            }
        },
        chkMail_change: function () {
            var that = this, controls = that.getControls();

            if (controls.chkMail.is(':checked')) {
                controls.ipClientEmail.attr('disabled', false);
                controls.ipClientEmail.val(that.AdditionalDecos.Data.CustomerInformation.Email);
                that.AdditionalDecos.oRequest.strFlagMail = '1';
            }
            else {
                controls.ErrorMessageEmail.text('');
                controls.ipClientEmail.val('');
                controls.ipClientEmail.closest('.form-group').removeClass('has-error');
                controls.ipClientEmail.attr('disabled', true);
                that.AdditionalDecos.oRequest.strFlagMail = '0';
            }
        },
        chkMail_focus: function () {
            var that = this, controls = this.getControls();

            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (controls.chkMail.is(':checked')) {
                if (!filter.test(controls.ipClientEmail.val())) {
                    controls.ipClientEmail.closest('.form-control').addClass('has-error');
                    controls.ErrorMessageEmail.text('Ingrese una dirección de correo válida.');
                    controls.ipClientEmail.focus();

                    return false;
                }
                else {
                    controls.ipClientEmail.closest('.form-control').removeClass('has-error');
                    controls.ErrorMessageEmail.text('');

                    return true;
                }
            }
            return true;
        },
        ipCalendar_change: function () {
            var that = this, controls = this.getControls();

            var strPlano = (that.AdditionalDecos.Data.Instalation.CodPlano == null || that.AdditionalDecos.Data.Instalation.CodPlano == undefined) ? '' : that.AdditionalDecos.Data.Instalation.CodPlano;
            var strMap = (strPlano == '') ? '' : that.PadLeft(strPlano, 10);

            if ($("#cboTypeWork option:selected").html() == '-Seleccionar-' && that.AdditionalDecos.Data.ValidaEta.FlagIndica != '0') {
                controls.cboTypeWork.closest('.form-control').addClass('has-error');
                controls.ErrorMessageddlWorkType.text('Seleccione un Tipo de Trabajo válido');
                alert('Seleccione un Tipo de Trabajo válido');
                controls.cboTypeWork.focus();
                return false;
            }

            if ($("#cboStypeWork option:selected").html() == '-Seleccionar-' && that.AdditionalDecos.Data.ValidaEta.FlagIndica != '0') {
                controls.cboStypeWork.closest('.form-control').addClass('has-error');
                controls.ErrorMessageddlSubWorkType.text('Seleccione un Sub Tipo de Trabajo válido');
                alert('Seleccione un Sub Tipo de Trabajo válido');
                controls.cboStypeWork.focus();
                return false;
            }



            controls.ipCalendar.closest('.form-control').removeClass('has-error');
            controls.ErrorMessagetxtCalendar.text('');
            that.getLoadingPage();

            var objLoadParameters = {};
            objLoadParameters.customer = Session.SessionParams.DATACUSTOMER.CustomerID;
            objLoadParameters.contrato = Session.SessionParams.DATACUSTOMER.ContractID;
            objLoadParameters.tipTra = controls.cboTypeWork.val();
            objLoadParameters.subtipoOrden = controls.cboStypeWork.val();
            objLoadParameters.fechaAgenda = controls.ipCalendar.val();
            objLoadParameters.flagValidaEta = that.AdditionalDecos.Data.ValidaEta.FlagIndica;
            objLoadParameters.codZona = that.AdditionalDecos.Data.ValidaEta.CodigoZona;
            objLoadParameters.idPlano = that.AdditionalDecos.Data.Instalation.CodPlano;
            objLoadParameters.ubigeo = that.AdditionalDecos.Data.Instalation.Ubigeo;
            objLoadParameters.reglaValidacion = 'DIA_SIGUIENTE';
            objLoadParameters.origen = 'P';
            objLoadParameters.disponibilidad = $('#cboStypeWork option:selected').attr('disponibilidad');
            objLoadParameters.tipSrv = $('#cboStypeWork option:selected').attr('idtiposervicio');
            objLoadParameters.tipoOrden = $('#cboStypeWork option:selected').attr('codtipoorden');

            $.reusableBusiness.LoadTimeZone(controls.cboSchedule, objLoadParameters)


        },
        cboPointAttention_Change: function () {
            var controls = this.getControls();
            controls.cboPointAttention.closest('.form-control').removeClass('has-error');
            controls.ErrorMessageddlCenterofAttention.text('');
        },
        cboTypeWork_Change: function () {
            var that = this, controls = that.getControls();

            controls.cboTypeWork.closest('.form-control').removeClass('has-error');
            controls.ErrorMessageddlWorkType.text('');

            that.AdditionalDecos.oRequest.strTypeWork = controls.cboTypeWork.val();

            var cantDecosInstall = that.AdditionalDecos.oRequest.arrAddEquipment.length;
            var cantDecosUnInstall = that.AdditionalDecos.oRequest.arrRemoveEquipment.length;
            var cantDecos = cantDecosInstall > 0 ? cantDecosInstall : cantDecosUnInstall;

            that.getLoadingPage();

            var oRequest = {
                idTransaccion: that.AdditionalDecos.Data.idTransactionFront,
                idProceso: '3',
                tecnologia: that.AdditionalDecos.oRequest.strTechnology,
                contratoId: Session.SessionParams.DATACUSTOMER.ContractID,
                origen: that.AdditionalDecos.Configuration.Constants.Origen,
                idPlano: that.AdditionalDecos.Data.Instalation.CodPlano,
                ubigeo: that.AdditionalDecos.Data.Instalation.Ubigeo,
                tipTra: that.AdditionalDecos.oRequest.strTypeWork,
                tipSrv: that.AdditionalDecos.Configuration.Constants.Tipservicio,
                cantDeco: cantDecos
            };
            that.loadProgramming_Change(oRequest);
        },
        cboStypeWork_Change: function () {
            var controls = this.getControls();
            controls.cboStypeWork.closest('.form-control').removeClass('has-error');
            controls.ErrorMessageddlSubWorkType.text('');
        },
        cboSchedule_Change: function () {
            var that = this, controls = that.getControls();

            if (that.AdditionalDecos.Data.ValidaEta.FlagReserva != '0') {
                that.ReservaTOA(that.planMigrationSession.Configuration.Constants.nroOrdenTOA);
            }

            controls.cboSchedule.closest('.form-control').removeClass('has-error');
            controls.ErrorMessageddlTimeZone.text('');
        },
        countdown: function (nroOrden) {
            var that = this;
            var controls = this.getControls();

            var STR_TIMER_FRANJA = that.AdditionalDecos.Configuration.Constants.TimerFranjaHorario;//that.TransferSession.Configuration.Constants.TimerFranjaHorario; //Configurable
            $('#countdown').show();
            var momentOfTime = new Date();
            var myTimeSpan = STR_TIMER_FRANJA * 60 * 1000;
            momentOfTime.setTime(momentOfTime.getTime() + myTimeSpan);
            var countDownDate = momentOfTime;

            var finalize = false;
            //clearInterval(x);
            var x = setInterval(function () {
                var strPlano = (that.AdditionalDecos.Data.Instalation.CodPlano == null || that.AdditionalDecos.Data.Instalation.CodPlano == undefined) ? '' : that.AdditionalDecos.Data.Instalation.CodPlano;
                var strMap = (strPlano == '') ? '' : that.PadLeft(strPlano, 10);
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $("#countdown p").html(minutes + "m " + seconds + "s ");
                if (that.stopCountDown) clearInterval(x);
                if (distance < 0) {
                    //  clearInterval(x);
                    $("#countdown p").html("Tiempo expirado");
                    //Cuando se expira el tiempo cancelamos la reserva TOA anterior
                    finalize = true;
                    alert("El tiempo de la reserva del horario ha expirado. Por favor seleccione un nuevo horario", "Alerta");

                    ///INICIO DE LINEAS AGREGADAS 
                    //MIGUEL ANTON
                    if (finalize) {
                        //CANCELAMOS LA RESERVA TOA
                        that.CancelarTOA(nroOrden);
                        //FINALIZAMOS LA SALIDA DEL TIMER. ANTES DE QUEDABA CICLADO :O
                        clearInterval(x)


                        var fechaSeleccionada = controls.ipCalendar.val();
                        var ActivityCapacity = [
                            { "nombre": "XA_Map", "valor": strMap },
                            { "nombre": "XA_WorkOrderSubtype", "valor": controls.cboStypeWork.val() },
                            { "nombre": "XA_Zone", "valor": that.AdditionalDecos.Data.ValidaEta.CodigoZona }
                        ]

                        that.getLoadingPage();

                        that.loadSchedule(
                            that.AdditionalDecos.Data.ValidaEta.FlagIndica,//flagValidaEta
                            controls.cboTypeWork.val(),
                            fechaSeleccionada,//fechaAgenda
                            that.AdditionalDecos.Configuration.Constants.Origen,//origen
                            that.AdditionalDecos.Data.Instalation.CodPlano, // "LAMO088-F", 
                            that.AdditionalDecos.Data.Instalation.Ubigeo, //"150114", 
                            "Post-Venta",//$("#ddlSubWorkType option:selected").attr("idtiposervicio"), //"Post-Venta",//$("#ddlSubWorkType option:selected").attr("typeservice"); //"Post-Venta"- 0062
                            $("#cboStypeWork option:selected").attr('codtipoorden'),//"FTTHTE"
                            controls.cboStypeWork.val(),//controls.ddlSubWorkType.val(), //controls.ddlSubWorkType.val(),//subtipoOrden -$("#ddlSubWorkType 
                            that.AdditionalDecos.Data.ValidaEta.CodigoZona, //that.planMigrationSession.Data.Instalacion.Zona,//"4000",//that.planMigrationSession.Data.ValidaEta.CodigoZona, 
                            Session.SessionParams.DATACUSTOMER.CustomerID,
                            Session.SessionParams.DATACUSTOMER.ContractID,
                            that.AdditionalDecos.Configuration.Constants.ReglaValidacion,
                            ActivityCapacity
                        );

                        $.unblockUI();
                    }
                    //FIN DE LINEAS AGREGADAS
                    //MIGUEL ANTON
                }
            }, 1000);
        },
        btnSave_Click: function () {
            var that = this;
            confirm("¿Esta seguro de guardar los cambios?", null, function () {
                that.stopCountDown = true;
                $('#countdown').css('display', 'none');
                that.SaveTransaction();
            });
        },

        /* Otros */
        getFechaActual: function () {
            var that = this;
            var d = new Date();
            var FechaActual = that.AboveZero(d.getDate()) + "/" + (that.AboveZero(d.getMonth() + 1)) + "/" + d.getFullYear();
            return FechaActual;
        },
        getHoraActual: function () {
            var that = this;
            var d = new Date();
            var HoraActual = that.AboveZero(d.getHours()) + ":" + (that.AboveZero(d.getMinutes() + 1)) + ":" + d.getSeconds();
            return HoraActual;
        },
        AboveZero: function (i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        getNumeration: function (index) {
            var strNumeration = '';
            switch (index) {
                case 1: strNumeration = '1ER'; break;
                case 2: strNumeration = '2DO'; break;
                case 3: strNumeration = '3ER'; break;
                case 4: strNumeration = '4TO'; break;
                case 5: strNumeration = '5TO'; break;
                case 5: strNumeration = '6TO'; break;
                case 5: strNumeration = '7TO'; break;
                case 5: strNumeration = '8TO'; break;
                case 5: strNumeration = '9TO'; break;
                case 5: strNumeration = '10MO';
            }
            return strNumeration;
        },
        getCalculateAdditional: function () {
            var that = this, controls = that.getControls();
            /* Calcula cantidad de decos adicionales */

            //var lstNew = that.AdditionalDecos.oRequest.arrAddEquipment || [];
            // var lstNew = that.AdditionalDecos.oRequest.arrEquipmentGroup2 || [];
            var lstNew = that.AdditionalDecos.oRequest.arrAddEquipment || [];
            var intCount = lstNew.length;

            controls.spanAddDecos.text(intCount);
        },
        getLoadingPage: function () {
            var strUrlLogo = window.location.protocol + '//' + window.location.host + '/Content/images/SUFija/loading_Claro.gif';
            $.blockUI({
                message: '<div align="center"><img src="' + strUrlLogo + '" width="25" height="25" /> Cargando ... </div>',
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff',
                }
            });
        },
        GetWorkType: function () {
            var that = this, controls = this.getControls();
            var lstTypeWork = that.AdditionalDecos.Data.TypeWork;
            var oValidateETA = that.AdditionalDecos.Data.ValidaEta;
            var intTypeWork = 0;
            controls.cboTypeWork.empty();
            debugger;
            controls.cboTypeWork.attr('disabled', false);
            controls.cboTypeWork.append($('<option>', { value: '', html: '-Seleccionar-' }));
            $.each(lstTypeWork, function (index, value) {
                if (value.TipoTrabajo == that.AdditionalDecos.oRequest.strTypeWork) {
                    controls.cboTypeWork.attr('disabled', true);
                    controls.cboTypeWork.append($('<option>', { value: value.TipoTrabajo, html: value.Descripcion, selected: true }));
                    intTypeWork++;
                }
                else {
                    controls.cboTypeWork.append($('<option>', { value: value.TipoTrabajo, html: value.Descripcion }));
                }

            });
        },
        GetSubWorkType: function () {
            var that = this, controls = this.getControls();

            var lstSTypeWork = that.AdditionalDecos.Data.SubTypeWork;
            var blnFlag = false;


            controls.cboStypeWork.empty();
            controls.cboStypeWork.append($('<option>', { value: '', html: '-Seleccionar-' }));
            var flg = false;
            $.each(lstSTypeWork, function (index, Item) {
                if (Item.flagDefecto == "1") {// flag defecto                     
                    controls.cboStypeWork.append('<option selected="selected" codTipoOrden="' + Item.CodTipoOrden + '" disponibilidad="' + Item.tiempoMin + '" idTipoServicio="' + Item.TipoServicio + '" CodTipoSubOrden = "' + Item.IdSubTipoOrden + '" value="' + Item.CodSubTipoOrden + '">' + Item.Descripcion + '</option>');
                    flg = true;
                } else {
                    controls.cboStypeWork.removeAttr("disabled");
                    controls.cboStypeWork.append('<option  codTipoOrden="' + Item.CodTipoOrden + '" disponibilidad="' + Item.tiempoMin + '" idTipoServicio="' + Item.TipoServicio + '" CodTipoSubOrden = "' + Item.IdSubTipoOrden + '" value="' + Item.CodSubTipoOrden + '">' + Item.Descripcion + '</option>');
                }

                if (flg) {
                    controls.cboStypeWork.attr('disabled', true);
                }
            });
            $.unblockUI();
        },
        GetSchedule: function (response, objeto) {
            objeto.empty();

            var that = this;
            objeto.append($('<option>', { value: '', html: 'Seleccionar' }));

            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioCapacity != null) {
                var i = 0;
                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioCapacity, function (index, value) {
                    if (value.Estado == 'RED') {
                        objeto.append('<option idHorario="' + value.Descripcion2.split('-')[0] + '" style="background-color: #E60000; color:#ffffff" value="' + value.Codigo + '" Disabled>' + value.Descripcion + '</option>');
                    }
                    else {
                        objeto.append('<option idHorario="' + value.Descripcion2.split('-')[0] + '" idConsulta="' + value.Codigo2 + '" Franja="' + value.Codigo + '" idBucket="' + value.Codigo3 + '" style="background-color: #FFFFFF;" value="' + value.Codigo + '+' + value.Codigo3 + '">' + value.Descripcion + '</option>');
                    }
                });
            }

            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioSga != null) {
                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioSga, function (index, value) {

                    if (value.Codigo == null) //Debe retorna el servicio
                        objeto.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));
                    else
                        objeto.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));

                });
            }

            if (response.dataCapacity.MessageResponse.Body.listaFranjaHorarioXml != null) {
                $.each(response.dataCapacity.MessageResponse.Body.listaFranjaHorarioXml, function (index, value) {

                    if (value.Codigo == null) //Debe retorna el servicio
                        objeto.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));
                    else
                        objeto.append($('<option>', { value: value.Descripcion, html: value.Descripcion }));

                });
            }
        },
        getSetting: function (data, value) {
            var strConfig = '';
            var objConfig = data.filter(function (Item) { return Item.AttributeIdentifier == value })[0];

            if (objConfig != null || objConfig != undefined) {
                strConfig = objConfig.AttributeValue;
            } else {
                strConfig = '';
            }
            return strConfig;
        },
        getTypeWork: function () {
            var that = this, controls = this.getControls();
            var strResult = '';

            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkAdd) {
                strResult = '1';
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkRemove) {
                strResult = '0';
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkBoth) {
                strResult = '';
            }

            return strResult;
        },
        getSettingsSave: function (strOption) {
            var that = this, controls = this.getControls();
            var strResult = '';

            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkAdd) {
                switch (strOption) {
                    case 'Tipo':
                        strResult = that.AdditionalDecos.Configuration.Constants.Tipo;
                        break;
                    case 'Clase':
                        strResult = that.AdditionalDecos.Configuration.Constants.Clase;
                        break;
                    case 'SubClase':
                        strResult = that.AdditionalDecos.Configuration.Constants.SubClase;
                        break;
                    case 'ConsTitulo':
                        strResult = that.AdditionalDecos.Configuration.Constants.TitInsDeco;
                        break;
                    case 'Asunto':
                        strResult = that.AdditionalDecos.Configuration.Constants.asunto;
                        break;
                    case 'Mensaje':
                        strResult = that.AdditionalDecos.Configuration.Constants.mensaje.replace('Migracion de Plan', 'Instalacion de Decos');
                        break;
                    default:
                        strResult = '';
                }
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkRemove) {
                switch (strOption) {
                    case 'Tipo':
                        strResult = that.AdditionalDecos.Configuration.Constants.TipoD;
                        break;
                    case 'Clase':
                        strResult = that.AdditionalDecos.Configuration.Constants.ClaseD;
                        break;
                    case 'SubClase':
                        strResult = that.AdditionalDecos.Configuration.Constants.SubClaseDesinstalar;
                        break;
                    case 'ConsTitulo':
                        strResult = that.AdditionalDecos.Configuration.Constants.TitDesDeco;
                        break;
                    case 'Asunto':
                        strResult = that.AdditionalDecos.Configuration.Constants.asuntoD;
                        break;
                    case 'Mensaje':
                        strResult = that.AdditionalDecos.Configuration.Constants.mensajeD;
                        break;
                    default:
                        strResult = '';
                }
            }
            if (that.AdditionalDecos.oRequest.strTypeWork == that.AdditionalDecos.Configuration.Constants.TypeWorkBoth) {
                switch (strOption) {
                    case 'Tipo':
                        strResult = that.AdditionalDecos.Configuration.Constants.TipoA;
                        break;
                    case 'Clase':
                        strResult = that.AdditionalDecos.Configuration.Constants.ClaseA;
                        break;
                    case 'SubClase':
                        strResult = that.AdditionalDecos.Configuration.Constants.SubClaseA;
                        break;
                    case 'ConsTitulo':
                        strResult = that.AdditionalDecos.Configuration.Constants.TitDecoA;
                        break;
                    case 'Asunto':
                        strResult = that.AdditionalDecos.Configuration.Constants.asuntoA;
                        break;
                    case 'Mensaje':
                        strResult = that.AdditionalDecos.Configuration.Constants.mensajeA;
                        break;
                    default:
                        strResult = '';
                }
            }

            return strResult;
        },
        btnConstancy_click: function () {
            var that = this;
            var params = ['height=600',
                'width=750',
                'resizable=yes',
                'location=yes'
            ].join(',');
            var strIdSession = Session.UrlParams.IdSession;

            if (that.AdditionalDecos.Data.Constancia)
                window.open('/AdditionalDecos/Home/ShowRecordSharedFile' + "?&strIdSession=" + strIdSession, "_blank", params);
            else
                alert('Ocurrió un error al generar la constancia.');

        },
        getAmountOcc: function () {
            var that = this, controls = this.getControls();

            var strAmountOcc = '';

            var arrAdd = that.AdditionalDecos.oRequest.arrAddEquipment || [];
            //var arrAdd = that.AdditionalDecos.oRequest.arrEquipmentGroup2 || [];
            var arrRemove = that.AdditionalDecos.oRequest.arrRemoveEquipment || [];
            var intAdd = arrAdd.length;
            var intRemove = arrRemove.length;
            debugger;
            var strIgv = "1." + that.AdditionalDecos.Data.Configuration.Constantes_Igv;
            if (controls.chkFideliza.is(':checked')) {
                controls.spanInstalationPrice.text('0,00');
                that.AdditionalDecos.oRequest.decLoyaltyAmount = '0,00';
            } else {
                if (intAdd > 0 && intRemove == 0) {
                    var montoIgv = (Math.ceil(parseFloat(that.AdditionalDecos.Configuration.Constants.MontoOcc.replace(',', '.')) * parseFloat(strIgv))).toFixed(2).replace('.', ',');
                    controls.spanInstalationPrice.text(montoIgv);
                    that.AdditionalDecos.oRequest.decLoyaltyAmount = montoIgv;
                } else if (intAdd == 0 && intRemove > 0) {
                    var montoIgv = (parseFloat(that.AdditionalDecos.Configuration.Constants.MontoOccD.replace(',', '.')) * parseFloat(strIgv)).toFixed(2).replace('.', ',');
                    controls.spanInstalationPrice.text(montoIgv);
                    that.AdditionalDecos.oRequest.decLoyaltyAmount = montoIgv;

                } else if (intAdd > 0 && intRemove > 0) {
                    var montoIgv = (parseFloat(that.AdditionalDecos.Configuration.Constants.MontoOccA.replace(',', '.')) * parseFloat(strIgv)).toFixed(2).replace('.', ',');
                    controls.spanInstalationPrice.text(montoIgv);
                    that.AdditionalDecos.oRequest.decLoyaltyAmount = montoIgv;

                } else {
                    controls.spanInstalationPrice.text('0,00');
                    that.AdditionalDecos.oRequest.decLoyaltyAmount = '0,00';
                }
            }
        },
        getNotNull: function (strValue) {
            var strValueReturn = '';
            if (strValue == null || strValue == undefined) {
                strValueReturn = '';
            } else {
                strValueReturn = strValue;
            }
            return strValueReturn;
        },
        getTransformNumber: function (strValue) {
            if (strValue.indexOf('.') >= 0) {
                strValue = strValue.replace('.', ',');
            }
            return strValue;
        },
        PadLeft: function (num, length) {
            while (num.length < length) {
                num = '0' + num;
            }
            return num;
        },

        //Crear HTML
        getDomDetail: function (data, strID) {
            var that = this, controls = that.getControls();

            var strTbID = 'TB_' + strID;
            var tbSummary = document.getElementById(strTbID);
            var ElementTr = document.createElement('tr');
            var ElementTd1 = document.createElement('td');
            var ElementTd2 = document.createElement('td');
            var ElementTd3 = document.createElement('td');
            var ElementSp1 = document.createElement('span');
            var ElementSp2 = document.createElement('span');
            var ElementLabel1 = document.createElement('label');

            var intID = tbSummary.getElementsByTagName('tr').length;
            var decFixedCharge = (data.FixedCharge * 1);
            var decPromotionCharge = (data.cargoFijoPromocion * 1);

            ElementLabel1.innerHTML = data.ServiceDescription;
            ElementLabel1.style.paddingLeft = '52px';
            ElementTd1.className = 'text-left';
            $(ElementTd1).append(ElementLabel1);

            ElementSp1.innerHTML = 'S/ ' + decPromotionCharge.toFixed(2);
            ElementTd2.className = 'text-left';
            ElementTd2.style.display = 'table-cell';
            $(ElementTd2).append(ElementSp1);

            ElementSp2.innerHTML = 'S/ ' + decFixedCharge.toFixed(2);
            ElementTd3.style.display = 'table-cell';
            $(ElementTd3).append(ElementSp2);

            ElementTr.id = 'TR_' + strID + '_' + intID

            $(ElementTr).append(ElementTd1);
            $(ElementTr).append(ElementTd2);
            $(ElementTr).append(ElementTd3);

            $(tbSummary).append(ElementTr);
        },

        InitialValidation: function () {
            var that = this,
                controls = that.getControls(),
                stateContract = !$.string.isEmptyOrNull(that.AdditionalDecos.Data.CustomerInformation.ContractStatus) ? that.AdditionalDecos.Data.CustomerInformation.ContractStatus : '',
                stateService = !$.string.isEmptyOrNull(that.AdditionalDecos.Data.CustomerInformation.ServiceStatus) ? that.AdditionalDecos.Data.CustomerInformation.ServiceStatus : '';
            if (!$.array.isEmptyOrNull(that.AdditionalDecos.Data.CustomerInformation)) {
                console.log('stateContracto: ' + stateContract);
                console.log('stateService:  ' + stateService);
                console.log('Plataforma:  ' + Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT);
                if (Session.SessionParams.DATACUSTOMER.objPostDataAccount.plataformaAT === 'TOBE') {
                    if (stateContract.trim().toUpperCase() != 'ACTIVO' || stateService.trim().toUpperCase() != 'ACTIVO') {
                        alert("El contrato no se encuentra activo.", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                        return false;
                    }
                }
                else {
                    if (stateContract.trim().toUpperCase() != 'ACTIVO') {
                        alert("El contrato no se encuentra activo.", 'Alerta', function () {
                            $.unblockUI();
                            parent.window.close();
                        });
                        return false;
                    }
                }
            }
            return true;
        }
    }

    $.fn.AdditionalDecos = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {
            var $this = $(this),
                data = $this.data('AdditionalDecos'),
                options = $.extend({}, $.fn.AdditionalDecos.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('AdditionalDecos', data);
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

    $.fn.AdditionalDecos.defaults = {}

    $('#divIndex').AdditionalDecos();

})(jQuery, null);