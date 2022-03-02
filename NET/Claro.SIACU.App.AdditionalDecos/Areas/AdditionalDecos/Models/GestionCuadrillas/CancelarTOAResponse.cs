using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.GestionCuadrillas
{
    public class CancelarTOAResponse
    {
        [DataMember(Name = "MessageResponse")]
        public CancelarTOAMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class CancelarTOAMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public CancelarTOABodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class CancelarTOABodyResponse
    {
        [DataMember(Name = "auditResponse")]
        public auditResponse auditResponse { get; set; }
    }

    [DataContract(Name = "auditResponse")]
    public class auditResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string codigoRespuesta { get; set; }

        [DataMember(Name = "idTransaccion")]
        public string idTransaccion { get; set; }

        [DataMember(Name = "nroOrden")]
        public string nroOrden { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string mensajeRespuesta { get; set; }
    }
}