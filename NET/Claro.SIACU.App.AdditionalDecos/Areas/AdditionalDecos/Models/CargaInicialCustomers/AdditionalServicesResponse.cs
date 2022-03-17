using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.CargaInicialCustomers
{
    [DataContract(Name = "serviciosadicionales")]
    public class AdditionalServicesResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "listaServAdicionales")]
        public List<AdditionalService> AdditionalServiceList { get; set; }
        [DataMember(Name = "listaEquAdicionales")]
        public List<AdditionalService> AdditionalEquipmentList { get; set; } 
    }

    [DataContract(Name = "listaServAdicionales")]
    public class AdditionalService
    {
        [DataMember(Name = "nombreServicio")]
        public string ServiceName { get; set; }

        [DataMember(Name = "descServicio")]
        public string ServiceDescription { get; set; }

        [DataMember(Name = "nombreEquipo")]
        public string EquipmentName { get; set; }

        [DataMember(Name = "modeloEquipo")]
        public string EquipmentModel { get; set; }

        [DataMember(Name = "serieEquipo")]
        public string EquipmentSerial { get; set; }

        [DataMember(Name = "tecnologia")]
        public string Technology { get; set; }

        [DataMember(Name = "cargoFijoPromocion")]
        public string FixedChargePromotion { get; set; }

        [DataMember(Name = "cargoFijo")]
        public string FixedCharge { get; set; }

        [DataMember(Name = "tipoAdicional")]
        public string tipoAdicional { get; set; }
        [DataMember(Name = "codSrv")]
        public string codSrv { get; set; }
        [DataMember(Name = "idServPvu")]
        public string idServPvu { get; set; }
        [DataMember(Name = "sncode")]
        public string sncode { get; set; }
        [DataMember(Name = "estado")]
        public string estado { get; set; }
        //INI-idServPvuToBe-TOBE
        [DataMember(Name = "idServPvuTobe")]
        public string idServPvuTobe { get; set; }
        //FIN-idServPvuToBe-TOBE
    }
    //Validar -ubicacion  - Evalenzs
    [DataContract(Name = "puntoAtencion")]
    public class PuntoAtencionResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "objid")]
        public string Objid { get; set; }
        [DataMember(Name = "flagConsulta")]
        public string FlagConsulta { get; set; }
        [DataMember(Name = "mensaje")]
        public string Mensaje { get; set; }
        [DataMember(Name = "listaRegistros")]
        public List<listaRegistrosResponse> listaRegistros { get; set; }
    }

    [DataContract(Name = "listaRegistros")]
    public class listaRegistrosResponse
    {
        [DataMember(Name = "codigo")]
        public string codigo { get; set; }
        [DataMember(Name = "nombre")]
        public string nombre { get; set; }
        [DataMember(Name = "tipo")]
        public string tipo { get; set; }
        [DataMember(Name = "rank")]
        public string rank { get; set; }
        [DataMember(Name = "cacTypeCodEle")]
        public string cacTypeCodEle { get; set; }
        [DataMember(Name = "cacTypeTitle")]
        public string cacTypeTitle { get; set; }
    }
    [DataContract(Name = "OficinaVentaUsuario")]
    public class OficinaVentaUsuarioResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaOficinaVenta")]
        public List<listaOficinaVentaUsuarioResponse> listaOficinaVenta { get; set; }
    }

    [DataContract(Name = "listaOficinaVenta")]
    public class listaOficinaVentaUsuarioResponse
    {
        [DataMember(Name = "codigoClasfOficinaVenta")]
        public string codigoClasfOficinaVenta { get; set; }

        [DataMember(Name = "codigoOficinaVenta")]
        public string codigoOficinaVenta { get; set; }

        [DataMember(Name = "codigoUsuario")]
        public string codigoUsuario { get; set; }
    }

    [DataContract(Name = "obtenerDatosUsuarioCuentaRed")]
    public class obtenerDatosUsuarioCuentaRedResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaDatosUsuarioCtaRed")]
        public List<listaDatosUsuarioCtaRedResponse> listaDatosUsuarioCtaRed { get; set; }
    }

    [DataContract(Name = "listaDatosUsuarioCtaRed")]
    public class listaDatosUsuarioCtaRedResponse
    {
        [DataMember(Name = "apellidoUsuario")]
        public string apellidoUsuario { get; set; }

        [DataMember(Name = "codigoEstadoUsuario")]
        public string codigoEstadoUsuario { get; set; }

        [DataMember(Name = "codigoUsuario")]
        public string codigoUsuario { get; set; }

        [DataMember(Name = "descripcionCac")]
        public string descripcionCac { get; set; }
        [DataMember(Name = "descripcionEmpresa")]
        public string descripcionEmpresa { get; set; }
        [DataMember(Name = "descripcionRol")]
        public string descripcionRol { get; set; }
        [DataMember(Name = "dniUsuario")]
        public string dniUsuario { get; set; }
        [DataMember(Name = "emailUsuario")]
        public string emailUsuario { get; set; }
        [DataMember(Name = "estadoUsuario")]
        public string estadoUsuario { get; set; }
        [DataMember(Name = "idCac")]
        public string idCac { get; set; }
        [DataMember(Name = "idEmpresa")]
        public string idEmpresa { get; set; }
        [DataMember(Name = "idProg")]
        public string idProg { get; set; }
        [DataMember(Name = "idTipo")]
        public string idTipo { get; set; }
        [DataMember(Name = "idTipoCac")]
        public string idTipoCac { get; set; }
        [DataMember(Name = "nombreUsuario")]
        public string nombreUsuario { get; set; }
        [DataMember(Name = "passwordUsuario")]
        public string passwordUsuario { get; set; }
        [DataMember(Name = "rol")]
        public string rol { get; set; }
        [DataMember(Name = "rolUsuario")]
        public string rolUsuario { get; set; }
        [DataMember(Name = "tipoCac")]
        public string tipoCac { get; set; }
    }
}