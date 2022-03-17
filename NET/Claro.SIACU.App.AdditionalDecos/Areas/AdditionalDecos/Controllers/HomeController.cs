using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.CargaInicialCustomers;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.FranjaHoraria;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.GestionCuadrillas;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.Transversal;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.VisitaTecnica;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Utils;
using Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Controllers
{
    public class HomeController : Controller
    {
        static DatosAdicionalesResponse oDatosAdi = new DatosAdicionalesResponse();
        static string stridSession;
        //static string strIpSession = Utils.Common.GetApplicationIp();
        static string strIpSession = "172.19.84.167";
        static byte[] databytesFile;

        public ActionResult Index()
        {
            return PartialView();
        }

        public ActionResult CustomerData()
        {
            return PartialView();
        }

        public ActionResult RenderPartialView(string partialView)
        {
            return PartialView(partialView);
        }

        [HttpPost]
        public JsonResult GetInitialConfiguration(Models.InitialData.InitialDataBodyRequest oBodyRequest, string SessionID, string TransactionID)
        {
            Models.InitialData.InitialDataRequest oInitialDataRequest = new Models.InitialData.InitialDataRequest();
            Models.InitialData.AdditionalFixedDataRequest oDatosAdicionalesDataRequest = new Models.InitialData.AdditionalFixedDataRequest();
            Models.InitialData.InitialDataResponse oInitialDataResponse = new Models.InitialData.InitialDataResponse();
            Models.InitialData.AdditionalFixedDataResponse oAdditionalFixedDataResponse = new Models.InitialData.AdditionalFixedDataResponse();
            PuntoAtencionResponse oPointAttention = new PuntoAtencionResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(SessionID);
            stridSession = SessionID;
            oBodyRequest.TransactionId = TransactionID;
            DatosAdicionalesResponse oRequestDatosAdicionales = new DatosAdicionalesResponse();

            try
            {
                string strUrl;
                 if (TransactionID == "2")
                      strUrl = "http://172.19.172.6/v1.0/postventa/customer_Domain/custInfo/cargadatosclientefija/obtenerDatosClienteFija";
                else
                      strUrl = ConfigurationManager.AppSettings["DPGetCargaDatosClienteFija"];

                oInitialDataRequest.Audit = oAuditRequest;
                oInitialDataRequest.MessageRequest = new Models.InitialData.InitialDataMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "obtenerDatosInicial",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new Models.InitialData.InitialDataBodyRequest
                    {
                        ContractID = oBodyRequest.ContractID,
                        CustomerID = oBodyRequest.CustomerID,
                        UserAccount = oBodyRequest.UserAccount,
                        codeRol = oBodyRequest.codeRol,
                        codeCac = oBodyRequest.codeCac,
                        state = oBodyRequest.state,
                        Type = oBodyRequest.Type,
                        flagConvivencia = ConfigurationManager.AppSettings["flagConvivenciaAsIsToBeReingFija"]
                    }
                };

                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Request: " + JsonConvert.SerializeObject(oInitialDataRequest));
                oInitialDataResponse = Utils.RestService.PostInvoque<Models.InitialData.InitialDataResponse>(strUrl, oInitialDataRequest.Audit, oInitialDataRequest, true);
                Tools.Traces.Logging.Info(SessionID, oInitialDataRequest.Audit.Transaction, "Response: " + JsonConvert.SerializeObject(oInitialDataResponse));

                if (oInitialDataResponse.MessageResponse != null)
                {
                    if (oInitialDataResponse.MessageResponse.Body != null)
                    {
                        oPointAttention = oInitialDataResponse.MessageResponse.Body.PuntoAtencion;
                        if (oPointAttention != null)
                        {
                            if (oPointAttention.CodigoRespuesta == "0")
                            {
                                oInitialDataResponse.MessageResponse.Body.PuntoAtencion.listaRegistros = oPointAttention.listaRegistros.OrderBy(x => x.nombre).ToList();
                            }
                        }
                    }
                }
                #region "Datos adicionales primera carga"
                this.GetDatosAdicionales(new DatosAdicionalesBodyRequest
                {
                    IdTransaccion = oBodyRequest.TransactionId,
                    IdProceso = Tools.Utils.Constants.NumberOneString,
                    tecnologia = oInitialDataResponse.MessageResponse.Body.CoreServices.Technology,
                    IdProducto = oInitialDataResponse.MessageResponse.Body.CoreServices.Technology,
                    ContratoId = oBodyRequest.ContractID,
                    customerId = oBodyRequest.CustomerID
                });

                oRequestDatosAdicionales = oDatosAdi;
                #endregion

                #region "Datos adicionales segunda carga"

                this.GetDatosAdicionales(new DatosAdicionalesBodyRequest
                {
                    IdTransaccion = oBodyRequest.TransactionId,
                    IdProceso = Tools.Utils.Constants.NumberTwoString,
                    IdProducto = oBodyRequest.TransactionId == Tools.Utils.Constants.NumberTenString ? oInitialDataResponse.MessageResponse.Body.CoreServices.Technology : Tools.Utils.Constants.NumberFiveString,//ContratoPublico-TOBE
                    tecnologia = oBodyRequest.TransactionId == Tools.Utils.Constants.NumberTenString ? oInitialDataResponse.MessageResponse.Body.CoreServices.Technology : Tools.Utils.Constants.NumberFiveString,//ContratoPublico-TOBE
                    ContratoId = oBodyRequest.ContractID,
                    customerId = oBodyRequest.CustomerID,
                    plan = oInitialDataResponse.MessageResponse.Body.CoreServices.planCode,
                    coIdPub = oBodyRequest.coIdPub,//ContratoPublico-TOBE
                    flagConvivencia = ConfigurationManager.AppSettings["flagConvivenciaAsIsToBeReingFija"]//ContratoPublico-TOBE
                });

                if (oRequestDatosAdicionales.MessageResponse.Body.CodigoRespuesta == 0)
                {
                    if (oDatosAdi.MessageResponse.Body.CodigoRespuesta == 0)
                    {
                        if (oDatosAdi.MessageResponse.Body.servicios.PlanFijaServicioCampana.codigoRespuesta == "0")
                        {
                            oRequestDatosAdicionales.MessageResponse.Body.servicios.PlanFijaServicioCampana = oDatosAdi.MessageResponse.Body.servicios.PlanFijaServicioCampana;
                        }
                    }
                }
                #endregion
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(SessionID, oInitialDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oInitialDataResponse = JsonConvert.DeserializeObject<Models.InitialData.InitialDataResponse>(result);
            }

            return Json(new
            {
                oInitialDataResponse,
                oRequestDatosAdicionales,
                oAuditRequest
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetDatosAdicionales(DatosAdicionalesBodyRequest request)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetObtenerDatosAcionales"];
            DatosAdicionalesRequest oDatosAcicionalesDataRequest = new DatosAdicionalesRequest();
            DatosAdicionalesResponse oDatosAcicionalesDataResponse = new DatosAdicionalesResponse();

            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            oDatosAcicionalesDataRequest.Audit = oAuditRequest;

            oDatosAcicionalesDataRequest.MessageRequest = new DatosAdicionalesMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "TCRM",
                        country = "PERU",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "OM",
                        msgType = "REQUEST",
                        operation = "obtenerDatosInicialAdicionales",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIACU",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new DatosAdicionalesBodyRequest
                {
                    IdTransaccion = request.IdTransaccion,
                    IdProceso = request.IdProceso,
                    IdProducto = request.IdProducto == null ? string.Empty : request.IdProducto,
                    //IdProducto = request.tecnologia == null ? string.Empty : request.tecnologia,
                    CodPais = request.CodPais == null ? string.Empty : request.CodPais,
                    IdTipoUrba = request.IdTipoUrba == null ? string.Empty : request.IdTipoUrba,
                    ContratoId = request.ContratoId == null ? string.Empty : request.ContratoId,
                    IdTipoInt = request.IdTipoInt == null ? string.Empty : request.IdTipoInt,
                    IdCodVia = request.IdCodVia == null ? string.Empty : request.IdCodVia,
                    CodUbi = request.CodUbi == null ? string.Empty : request.CodUbi,
                    Ubigeo = request.Ubigeo == null ? string.Empty : request.Ubigeo,
                    IdPoblado = request.IdPoblado == null ? string.Empty : request.IdPoblado,
                    TipTrabajo = request.TipTrabajo == null ? string.Empty : request.TipTrabajo,
                    FlagCE = request.FlagCE == null ? string.Empty : request.FlagCE,
                    TipoServicio = request.TipoServicio == null ? Tools.Utils.Constants.FormatDoubleZero + Tools.Utils.Constants.NumberSixString + Tools.Utils.Constants.NumberOneString : request.TipoServicio,
                    TipTra = request.TipTra == null ? string.Empty : request.TipTra,
                    Origen = request.Origen == null ? string.Empty : request.Origen,
                    IdPlano = request.IdPlano == null ? string.Empty : request.IdPlano,
                    tecnologia = request.tecnologia == null ? string.Empty : request.tecnologia,
                    customerId = request.customerId == null ? string.Empty : request.customerId,
                    plan = request.plan == null ? string.Empty : request.plan,
                    canal = string.Empty,
                    cantDeco = request.cantDeco == null ? string.Empty : request.cantDeco,
                    coIdPub = request.coIdPub,//ContratoPublico-TOBE
                    flagConvivencia = ConfigurationManager.AppSettings["flagConvivenciaAsIsToBeReingFija"]//request.flagConvivencia,//ContratoPublico-TOBE
                }
            };

            try
            {
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Request GetDatosAdicionales DP PostTransfer: " + JsonConvert.SerializeObject(oDatosAcicionalesDataRequest));
                oDatosAcicionalesDataResponse = Utils.RestService.PostInvoque<DatosAdicionalesResponse>(strUrl, oDatosAcicionalesDataRequest.Audit, oDatosAcicionalesDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, "Response GetDatosAdicionales DP PostTransfer: " + JsonConvert.SerializeObject(oDatosAcicionalesDataResponse));
                oDatosAdi = oDatosAcicionalesDataResponse;
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDatosAcicionalesDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDatosAcicionalesDataResponse = JsonConvert.DeserializeObject<DatosAdicionalesResponse>(result);
            }


            return Json(new
            {
                data = oDatosAcicionalesDataResponse,
            }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult GetDatosFranjaHorario(FranjaHorariaBodyRequest request)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetObtenerFranjaHorario"];
            Models.FranjaHoraria.FranjaHorariaRequest oDataRequest = new Models.FranjaHoraria.FranjaHorariaRequest();
            Models.FranjaHoraria.FranjaHorariaResponse oDataResponse = new Models.FranjaHoraria.FranjaHorariaResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            oDataRequest.Audit = oAuditRequest;

            oDataRequest.MessageRequest = new Models.FranjaHoraria.FranjaHorariaMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "TCRM",
                        country = "PERU",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "OM",
                        msgType = "REQUEST",
                        operation = "obtenerFranjaHorario",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIAC",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new Models.FranjaHoraria.FranjaHorariaBodyRequest
                {
                    FlagValidaEta = request.FlagValidaEta,
                    Disponibilidad = request.Disponibilidad,
                    TipTra = request.TipTra,
                    TipSrv = request.TipSrv,
                    FechaAgenda = request.FechaAgenda,
                    Origen = request.Origen,
                    IdPlano = request.IdPlano,
                    Ubigeo = request.Ubigeo,
                    TipoOrden = request.TipoOrden,
                    SubtipoOrden = request.SubtipoOrden,
                    CodZona = request.CodZona,
                    Customer = request.Customer,
                    Contrato = request.Contrato,
                    ReglaValidacion = request.ReglaValidacion,
                    listaCampoActividadCapacidad = request.listaCampoActividadCapacidad
                }
            };

            try
            {
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request GetDatosFranjaHorario DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<Models.FranjaHoraria.FranjaHorariaResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response GetDatosFranjaHorario DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<Models.FranjaHoraria.FranjaHorariaResponse>(result);
            }
            return Json(new
            {
                dataCapacity = oDataResponse,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult postGeneraTransaccion(GuardarDatosDataBodyRequest request, string stridSession, string TransactionID)
        {
            request.idFlujo = TransactionID == Tools.Utils.Constants.NumberTwoString ? ConfigurationManager.AppSettings["IdFlujoAddDecodersFTTH"] : ConfigurationManager.AppSettings["IdFlujoAddDecodersFTTHONE"];
            string strUrl = ConfigurationManager.AppSettings["DPGetGuardarDatosAgendamiento"];
            Models.Transversal.GuardarDatosRequest oDataRequest = new Models.Transversal.GuardarDatosRequest();
            Models.Transversal.GuardarDatosResponse oDataResponse = new Models.Transversal.GuardarDatosResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            //Encriptamos a base64 la notas -  Tipificacion
            request.Servicios.Where(m => m.Servicio == "Tipificacion")
           .Select(m => new Models.Transversal.Servicios
           {
               Servicio = m.Servicio,
               parametros = m.parametros.Where(u => u.parametro == "Notas").ToList()
           }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 la inter_30 - Tipificacion
            request.Servicios.Where(m => m.Servicio == "Plantilla")
           .Select(m => new Models.Transversal.Servicios
           {
               Servicio = m.Servicio,
               parametros = m.parametros.Where(u => u.parametro == "inter30").ToList()
           }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 Trama_Venta
            request.Servicios.Where(m => m.Servicio == "Tramas").Select(m => new Models.Transversal.Servicios
            {
                Servicio = m.Servicio,
                parametros = m.parametros.Where(u => u.parametro == "Trama_Ventas").ToList()
            }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 Trama_Servicios
            request.Servicios.Where(m => m.Servicio == "Tramas").Select(m => new Models.Transversal.Servicios
            {
                Servicio = m.Servicio,
                parametros = m.parametros.Where(u => u.parametro == "Trama_Servicios").ToList()
            }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 Lista_Servicios_Contratos
            //request.Servicios.Where(m => m.Servicio == "Contrato").Select(m => new Models.Transversal.Servicios
            //{
            //   Servicio = m.Servicio,
            //   parametros = m.parametros.Where(u => u.parametro == "listaServicios").ToList()
            //}).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //Encriptamos a base64 Trama_Servicios
            request.Servicios.Where(m => m.Servicio == "getlistaTipificacionTransversal").Select(m => new Models.Transversal.Servicios
            {
                Servicio = m.Servicio,
                parametros = m.parametros.Where(u => u.parametro == "listaServicio").ToList()
            }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));


            //Encriptamos a base64 la Constancia
            request.Servicios.Where(m => m.Servicio == "Constancia").Select(m => new Models.Transversal.Servicios
            {
                Servicio = m.Servicio,
                parametros = m.parametros.Where(u => u.parametro == "DRIVE_CONSTANCIA").ToList()
            }).ToList().ForEach(y => y.parametros.FirstOrDefault().valor = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(y.parametros.FirstOrDefault().valor)));

            //SETEAMOS LOS NULL A VACIO
            var obj = request.Servicios.Select(m => new Models.Transversal.Servicios
            {
                Servicio = m.Servicio,
                parametros = m.parametros.Where(u => u.valor == null).ToList()
            }).ToList();

            foreach (var Item in obj)
            {
                if (Item.parametros.Count > 0)
                {
                    foreach (var item in Item.parametros)
                    {
                        item.valor = "";
                    }
                }
            }

            oDataRequest.Audit = oAuditRequest;

            oDataRequest.MessageRequest = new Models.Transversal.GuardarDatosDataMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "TCRM",
                        country = "PE",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "sisact",
                        msgType = "REQUEST",
                        operation = "GeneraTransaccion",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIACU",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new Models.Transversal.GuardarDatosDataBodyRequest
                {
                    idFlujo = request.idFlujo,
                    Servicios = request.Servicios
                }
            };
            try
            {
                databytesFile = null;
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request postGeneraTransaccion DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<Models.Transversal.GuardarDatosResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response postGeneraTransaccion DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataResponse));
                databytesFile = Convert.FromBase64String(oDataResponse.MessageResponse.Body.constancia);


            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
            }

            return Json(new
            {
                data = oDataResponse,
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetDatosVisitaTecnica(VisitaTecnicaBodyRequest request)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetObtenerVisitaTecnica"];
            Models.VisitaTecnica.VisitaTecnicaRequest oDataRequest = new Models.VisitaTecnica.VisitaTecnicaRequest();
            Models.VisitaTecnica.VisitaTecnicaResponse oDataResponse = new Models.VisitaTecnica.VisitaTecnicaResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            oDataRequest.Audit = oAuditRequest;
            oDataRequest.MessageRequest = new Models.VisitaTecnica.VisitaTecnicaMessageRequest
            {
                Header = new Models.DataPower.HeaderReq
                {
                    HeaderRequest = new Models.DataPower.HeaderRequest
                    {
                        consumer = "TCRM",
                        country = "PERU",
                        dispositivo = "MOVIL",
                        language = "ES",
                        modulo = "sisact",
                        msgType = "REQUEST",
                        operation = "DatosVisitaTecnica",
                        pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                        system = "SIAC",
                        timestamp = DateTime.Now.ToString("o"),
                        userId = Utils.Common.CurrentUser,
                        wsIp = strIpSession
                    }
                },
                Body = new Models.VisitaTecnica.VisitaTecnicaBodyRequest
                {
                    ContratoId = request.ContratoId,
                    customerId = request.customerId,
                    listaTrama = request.listaTrama
                }
            };

            try
            {
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request GetDatosVisitaTecnica DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<Models.VisitaTecnica.VisitaTecnicaResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response GetDatosVisitaTecnica DP AdditionalDecos: " + JsonConvert.SerializeObject(oDataResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<Models.VisitaTecnica.VisitaTecnicaResponse>(result);
            }
            return Json(new
            {
                dataVisitaTecnica = oDataResponse.MessageResponse.Body,
            }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult GestionarReservaTOA(ReservaTOABodyRequest oBodyRequest)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetGestionarCuadrillaReservar"];
            ReservaTOARequest oDataRequest = new ReservaTOARequest();
            ReservaTOAResponse oDataResponse = new ReservaTOAResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            try
            {
                oDataRequest.Audit = oAuditRequest;
                oDataRequest.MessageRequest = new ReservaTOAMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "GestionarReservaTOA",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new ReservaTOABodyRequest
                    {
                        codSubTipoOrden = oBodyRequest.codSubTipoOrden == null ? "" : oBodyRequest.codSubTipoOrden,
                        codZona = oBodyRequest.codZona == null ? "" : oBodyRequest.codZona,
                        duracion = oBodyRequest.duracion == null ? "" : oBodyRequest.duracion,
                        fechaReserva = oBodyRequest.fechaReserva == null ? "" : oBodyRequest.fechaReserva,
                        flagValidaETA = oBodyRequest.flagValidaETA == null ? "" : oBodyRequest.flagValidaETA,
                        franjaHoraria = oBodyRequest.franjaHoraria == null ? "" : oBodyRequest.franjaHoraria,
                        idBucket = oBodyRequest.idBucket == null ? "" : oBodyRequest.idBucket,
                        idConsulta = oBodyRequest.idConsulta == null ? "" : oBodyRequest.idConsulta,
                        idPlano = oBodyRequest.idPlano == null ? "" : oBodyRequest.idPlano,
                        nroOrden = oBodyRequest.nroOrden == null ? "" : oBodyRequest.nroOrden,
                        tipoOrden = oBodyRequest.tipoOrden == null ? "" : oBodyRequest.tipoOrden,
                        tipSrv = oBodyRequest.tipSrv == null ? "" : oBodyRequest.tipSrv,
                        tiptra = oBodyRequest.tiptra == null ? "" : oBodyRequest.tiptra
                    }
                };

                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request GestionarReservaTOA Cambio Plan: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<ReservaTOAResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response GestionarReservaTOA Cambio Plan: " + JsonConvert.SerializeObject(oDataResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<ReservaTOAResponse>(result);
            }

            return Json(new
            {
                oDataResponse = oDataResponse.MessageResponse.Body.auditResponse
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GestionarCancelarTOA(CancelarTOABodyRequest oBodyRequest)
        {
            string strUrl = ConfigurationManager.AppSettings["DPGetGestionarCuadrillaCancelar"];
            CancelarTOARequest oDataRequest = new CancelarTOARequest();
            CancelarTOAResponse oDataResponse = new CancelarTOAResponse();
            Tools.Entity.AuditRequest oAuditRequest = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(stridSession);

            try
            {
                oDataRequest.Audit = oAuditRequest;
                oDataRequest.MessageRequest = new CancelarTOAMessageRequest
                {
                    Header = new Models.DataPower.HeaderReq
                    {
                        HeaderRequest = new Models.DataPower.HeaderRequest
                        {
                            consumer = "SIACU",
                            country = "PE",
                            dispositivo = "MOVIL",
                            language = "ES",
                            modulo = "siacu",
                            msgType = "Request",
                            operation = "GestionarCancelarTOA",
                            pid = DateTime.Now.ToString("yyyyMMddHHmmssfff"),
                            system = "SIACU",
                            timestamp = DateTime.Now.ToString("o"),
                            userId = Utils.Common.CurrentUser,
                            wsIp = strIpSession
                        }
                    },
                    Body = new CancelarTOABodyRequest
                    {
                        nroOrden = oBodyRequest.nroOrden == null ? "" : oBodyRequest.nroOrden
                    }
                };

                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Url: " + strUrl);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Request GestionarCancelarTOA Cambio Plan: " + JsonConvert.SerializeObject(oDataRequest));
                oDataResponse = Utils.RestService.PostInvoque<CancelarTOAResponse>(strUrl, oDataRequest.Audit, oDataRequest, true);
                Tools.Traces.Logging.Info(stridSession, oDataRequest.Audit.Transaction, "Response GestionarCancelarTOA Cambio Plan: " + JsonConvert.SerializeObject(oDataResponse));
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(stridSession, oDataRequest.Audit.Transaction, ex.Message);
                string sep = " - ";
                int posResponse = ex.Message.IndexOf(sep);
                string result = ex.Message.Substring(posResponse + sep.Length);
                oDataResponse = JsonConvert.DeserializeObject<CancelarTOAResponse>(result);
            }

            return Json(new
            {
                oDataRequest
            }, JsonRequestBehavior.AllowGet);
        }

        public FileContentResult ShowRecordSharedFile(string strIdSession)
        {
            Tools.Entity.AuditRequest oAuditRequest = Common.CreateAuditRequest<Tools.Entity.AuditRequest>(strIdSession);
            byte[] databytes;
            string strContenType = "application/pdf";
            try
            {
                Tools.Entity.AuditRequest oAudit = Utils.Common.CreateAuditRequest<Tools.Entity.AuditRequest>(strIdSession);
                databytes = databytesFile;
            }
            catch (Exception ex)
            {
                Tools.Traces.Logging.Error(strIdSession, oAuditRequest.Transaction, ex.Message);
                databytes = null;
            }

            return File(databytes, strContenType);
        }
    }
}