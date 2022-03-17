using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.DatosAdicionales;
using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{
    public class DatosAdicionalesResponse
    {
        [DataMember(Name = "MessageResponse")]
        public DatosAdicionalesMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class DatosAdicionalesMessageResponse
    {
        [DataMember(Name = "Header")]
        public Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public DatosAdicionalesBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class DatosAdicionalesBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public int CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "servicios")]
        public Servicios servicios { get; set; } 
    }
    [DataContract(Name = "servicios")]
     public class Servicios    {
        [DataMember(Name = "configuracionesfija/obtenerConfiguraciones")]
        public ConfiguracionesfijaObtenerConfiguraciones configuracionesfija_obtenerConfiguraciones { get; set; }

        [DataMember(Name = "consultatipificacion/obtenerInformacionTipificacion")]
        public TipificacionreglasObtenerInformacionTipificacion tipificacionreglas_obtenerInformacionTipificacion { get; set; }

        [DataMember(Name = "planfijacamp/obtPlanFijaCampDisp")]
        public FixedPlanResponse FixedPlan { get; set; }

        [DataMember(Name = "planfijaservequip")]
        public FixedPlanDetailResponse FixedPlanDetail { get; set; }

        [DataMember(Name = "consultamotivo")]
        public Consultamotivo consultamotivo { get; set; }

        [DataMember(Name = "consultasubtipo/consultarSubtipo")]
        public ObtenerSubTiposTrabajo consultasubtipo { get; set; }

        [DataMember(Name = "tipostrabajo/consultarTipoTrabajo")]
        public TiposTrabajo tipostrabajo_consultarTipoTrabajo { get; set; }

        [DataMember(Name = "franjahorario/validaEta")]
        public FranjaHorarioValidaETA franjahorario_validaEta { get; set; }

        [DataMember(Name = "datosinstalacioncliente/obtenerDatosInstalacion")]
        public DatosinstalacionclienteObtenerDatosInstalacion datosinstalacioncliente_obtenerDatosInstalacion { get; set; }

        [DataMember(Name = "planfijaservequip/obtPlanServEquDisponible")]
        public PlanFijaServicio PlanFijaServicioCampana { get; set; }

        [DataMember(Name = "consultatransaccionfija/validarTransaccion")]
        public ConsultatransaccionfijaValidarTransaccion consultatransaccionfija_validarTransaccion { get; set; }

         //[DataMember(Name = "ubigeo/obtenerUbigeo")]
         //public UbicacionesObtenerUbicaciones ubicaciones_obtenerUbicaciones { get; set; }

         //[DataMember(Name = "tiposzonificacioninteriorvia/obtenerTiposUrbanizacion")]
         //public TiposubicacionObtenerTiposUrbanizacion tiposubicacion_obtenerTiposUrbanizacion { get; set; }

         //[DataMember(Name = "tiposzonificacioninteriorvia/obtenerTiposVia")]
         //public TiposubicacionObtenerTiposVia tiposubicacion_obtenerTiposVia { get; set; }

         //[DataMember(Name = "tiposzonificacioninteriorvia/obtenerTiposInterior")]
         //public TiposubicacionObtenerTiposInterior tiposubicacion_obtenerTiposInterior { get; set; }

         

         //[DataMember(Name = "datosinstalacioncliente/obtenerDatosInstalacion")]
         //public DatosinstalacionclienteObtenerDatosInstalacion datosinstalacioncliente_obtenerDatosInstalacion { get; set; } 

         /////TX=2
         //[DataMember(Name = "planosubicacion/obtenerPlanos")]
         //public ObtenerPlanos complementosubicacion_obtenerPlanos { get; set; }

         //[DataMember(Name = "planosubicacion/obtenerCentrosPoblados")]
         //public ObtenerCentroPoblados complementosubicacion_obtenerCentrosPoblados { get; set; }

         //[DataMember(Name = "planosubicacion/obtenerNombresEdificios")]
         //public ObtenerEdificios complementosubicacion_obtenerNombreEdificios { get; set; }

        
         //[DataMember(Name = "tipostrabajo/consultarTipoTrabajo")]
         //public TiposTrabajo tipostrabajo_consultarTipoTrabajo { get; set; }

         //[DataMember(Name = "franjahorario/obtenerFranjaHorario")]
         //public GetFranjaHoraria franjahorario_obtenerFranjaHorario { get; set; }

         //[DataMember(Name = "franjahorario/validaEta")]
         //public FranjaHorarioValidaETA franjahorario_validaEta { get; set; }

         
    }

    [DataContract(Name = "planfijaservequip/obtPlanServEquDisponible")]
    public class PlanFijaServicio
    {
        [DataMember(Name = "codigoRespuesta")]
        public string codigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaPlanServEquDisp")]
        public ICollection<FixedPlanServiceCampana> ListPlanFijaServicio { get; set; }
    }

    [DataContract(Name = "listaPlanServEquDisp")]
    public class FixedPlanServiceCampana
    {
        /*   
         */
        [DataMember(Name = "codigoGrupo")]
        public string CodeGroup { get; set; }

        [DataMember(Name = "grupo")]
        public string Group { get; set; }

        [DataMember(Name = "servicioEquipo")]
        public string ServiceEquiptment { get; set; }

        [DataMember(Name = "tipoServicio")]
        public string ServiceType { get; set; }

        [DataMember(Name = "coreAdicional")]
        public string coreAdicional { get; set; }

        [DataMember(Name = "idSericio")]
        public string LineID { get; set; }

        [DataMember(Name = "descServicio")]
        public string ServiceDescription { get; set; }

        [DataMember(Name = "cantidad")]
        public string cantidad { get; set; }

        [DataMember(Name = "idEquipo")]
        public string idEquipo { get; set; }

        [DataMember(Name = "descEquipo")]
        public string descEquipo { get; set; }

        [DataMember(Name = "tipEqu")]
        public string tipEqu { get; set; }

        [DataMember(Name = "codigoTipEqu")]
        public string codigoTipEqu { get; set; }

        [DataMember(Name = "tipoEquipo")]
        public string tipoEquipo { get; set; }

        [DataMember(Name = "spCode")]
        public string spCode { get; set; }

        [DataMember(Name = "sncode")]
        public string sncode { get; set; }

        [DataMember(Name = "cargoFijo")]
        public string FixedCharge { get; set; }

        [DataMember(Name = "grupoPadre")]
        public string grupoPadre { get; set; }

        [DataMember(Name = "idDet")]
        public string idDet { get; set; }

        [DataMember(Name = "cargoFijoPromocion")]
        public string cargoFijoPromocion { get; set; }

        [DataMember(Name = "codigoPlan")]
        public string PlanCode { get; set; }

        [DataMember(Name = "codigoExterno")]
        public string codigoExterno { get; set; }

        [DataMember(Name = "descExterno")]
        public string descExterno { get; set; }

        [DataMember(Name = "capacidad")]
        public string capacidad { get; set; }

        [DataMember(Name = "unidadCapacidad")]
        public string unidadCapacidad { get; set; }
        //INI-ContratoPublico-TOBE
        [DataMember(Name = "po")]
        public string poId { get; set; }
        [DataMember(Name = "poType")]
        public string poType { get; set; }
        [DataMember(Name = "idProducto")]
        public string idProductoCBIO { get; set; }
        [DataMember(Name = "pop1")]
        public string pop1 { get; set; }
        [DataMember(Name = "pop2")]
        public string pop2 { get; set; }
        //FIN-ContratoPublico-TOBE
    }


   
     //public class StatusResponse
     //{
     //    [DataMember(Name = "codigoRespuesta")]
     //    public string CodigoRespuesta { get; set; }
     //    [DataMember(Name = "mensajeRespuesta")]
     //    public string MensajeRespuesta { get; set; }
     //}

     [DataContract(Name = "ubigeo/obtenerUbigeo")]
     public class UbicacionesObtenerUbicaciones //:StatusResponse
     {
         [DataMember(Name = "codigoRespuesta")]
         public string CodigoRespuesta { get; set; }
         [DataMember(Name = "mensajeRespuesta")]
         public string MensajeRespuesta { get; set; }
          [DataMember(Name = "listaUbicaciones")]
         public ICollection<Ubicaciones> listaUbicaciones { get; set; }
     }

     [DataContract(Name = "tiposzonificacioninteriorvia/obtenerTiposUrbanizacion")]
     public class TiposubicacionObtenerTiposUrbanizacion    {
         [DataMember(Name = "codigoRespuesta")]
         public string CodigoRespuesta { get; set; }
         [DataMember(Name = "mensajeRespuesta")]
         public string MensajeRespuesta { get; set; }
         [DataMember(Name = "listaTipoUrbanizacion")]
         public ICollection<TipoUrbanizacion> listaTipoUrbanizacion { get; set; } 
    }

    [DataContract(Name = "tiposzonificacioninteriorvia/obtenerTiposVia")]
    public class TiposubicacionObtenerTiposVia
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaTipoVia")]
        public ICollection<ListaTipoVia> listaTipoVia { get; set; }
    }

    [DataContract(Name = "tiposzonificacioninteriorvia/obtenerTiposInterior")]
    public class TiposubicacionObtenerTiposInterior
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaTipoInterior")]
        public ICollection<ListaTipoInterior> listaTipoInterior { get; set; }
    }

    [DataContract(Name = "configuracionesfija/obtenerConfiguraciones")]
    public class ConfiguracionesfijaObtenerConfiguraciones
    {
        [DataMember(Name = "idTransaccion")]
        public string TransactionID { get; set; }
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "transaccionProducto")]
        //public ICollection<TransaccionProducto> TransaccionProducto { get; set; }
        public TransaccionProducto ProductTransaction { get; set; }
    }

    [DataContract(Name = "consultatipificacion/obtenerInformacionTipificacion")]
    public class TipificacionreglasObtenerInformacionTipificacion
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaTipificacionRegla")]
        public ICollection<ListaTipificacionRegla> listaTipificacionRegla { get; set; }
    }

    [DataContract(Name = "datosinstalacioncliente/obtenerDatosInstalacion")]
    public class DatosinstalacionclienteObtenerDatosInstalacion
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "direccion")]
        public string Direccion { get; set; }
        [DataMember(Name = "notaDireccion")]
        public string NotaDireccion { get; set; }
        [DataMember(Name = "pais")]
        public string Pais { get; set; }
        [DataMember(Name = "departamento")]
        public string Departamento { get; set; }
        [DataMember(Name = "provincia")]
        public string Provincia { get; set; }
        [DataMember(Name = "distrito")]
        public string Distrito { get; set; }
        [DataMember(Name = "codPlano")]
        public object CodPlano { get; set; }
        [DataMember(Name = "codUbigeo")]
        public string codUbigeo { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "zona")]
        public string Zona { get; set; }
    }


    /// <summary>
    /// TX==>2
    /// </summary>
    [DataContract(Name = "complementosubicacion/obtenerPlanos")]
    public class ObtenerPlanos {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaPlanos")]
        public ICollection<ListaPlanos> listaPlanos { get; set; }
    }

    [DataContract(Name = "complementosubicacion/obtenerCentrosPoblados")]
    public class ObtenerCentroPoblados
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaCenPob")]
        public ICollection<ListaCentroPoblados> listaCenPob { get; set; }
    }

    [DataContract(Name = "complementosubicacion/obtenerNombresEdificios")]
    public class ObtenerEdificios
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaEdificio")]
        public ICollection<ListaEdificios> ListaEdificio { get; set; }
    }

    /// <summary>
    /// TX=3/PR=3
    /// </summary>
    /// 
    [DataContract(Name = "consultamotivo")]
    public class Consultamotivo
    {
        [DataMember(Name = "codResp")]
        public string CodResp { get; set; }
        [DataMember(Name = "msjResp")]
        public string MsjResp { get; set; }
        [DataMember(Name = "listaMotivos")]
        public ICollection<Motivos> listaMotivos { get; set; }
    }

    [DataContract(Name = "tipostrabajo/consultarTipoTrabajo")]
    public class TiposTrabajo {
        [DataMember(Name = "codigoRespuesta")]
        public string codigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string mensajeRespuesta { get; set; }
        [DataMember(Name = "listaTipoTrabajo")]
        public ICollection<ListaTiposTrabajo> listatipotrabajo { get; set; }
    }

    [DataContract(Name = "consultasubtipo/consultarSubtipo")]
    public class ObtenerSubTiposTrabajo
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "listaSubTipo")]
        public ICollection<ListaSubTiposTrabajo> listaSubTipo { get; set; }
    }

   
    [DataContract(Name = "franjahorario/obtenerFranjaHorario")]
    public class GetFranjaHoraria
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "codigoZona")]
        public string codigoZona { get; set; }
        [DataMember(Name = "flag")]
        public string flag { get; set; }
        [DataMember(Name = "listaPrograma")]
        public ICollection<ListaProgramaHorario> listaPrograma { get; set; }
    }

    [DataContract(Name = "franjahorario/validaEta")]
    public class FranjaHorarioValidaETA
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
        [DataMember(Name = "validaEta")]
        public ValidaEta ValidaEta { get; set; }
    }

    [DataContract(Name = "validaEta")]
    public class ValidaEta {
        [DataMember(Name = "codigoZona")]
        public string CodigoZona { get; set; }
        [DataMember(Name = "flagIndica")]
        public string FlagIndica { get; set; }
        [DataMember(Name = "flagReserva")]
        public string FlagReserva { get; set; }
    }

    [DataContract(Name = "consultatransaccionfija/validarTransaccion")]
    public class ConsultatransaccionfijaValidarTransaccion
    {
        [DataMember(Name = "responseAudit")]
        public ResponseAudit ResponseAudit { get; set; }
        [DataMember(Name = "responseData")]
        public ResponseData ResponseData { get; set; }
    }

    [DataContract(Name = "responseAudit")]
    public class ResponseAudit
    {
        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }
    }

    [DataContract(Name = "responseData")]
    public class ResponseData
    {
        [DataMember(Name = "codigo")]
        public string Codigo { get; set; }
        [DataMember(Name = "mensaje")]
        public string Mensaje { get; set; }
        [DataMember(Name = "listaOpcional")]
        public List<ListaOpcional> ListaOpcional { get; set; }
    }

    public class ListaOpcional
    {
        [DataMember(Name = "clave")]
        public string Clave { get; set; }
        [DataMember(Name = "valor")]
        public string Valor { get; set; }
    }
}