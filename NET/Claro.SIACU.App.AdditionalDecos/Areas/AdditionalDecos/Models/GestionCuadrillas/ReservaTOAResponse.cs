using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.GestionCuadrillas
{
    public class ReservaTOAResponse
    {
        [DataMember(Name = "MessageResponse")]
        public ReservaTOAMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class ReservaTOAMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public ReservaTOABodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class ReservaTOABodyResponse
    {
        [DataMember(Name = "auditResponse")]
        public AuditResponse auditResponse { get; set; }
    }

    [DataContract(Name = "auditResponse")]
    public class AuditResponse
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