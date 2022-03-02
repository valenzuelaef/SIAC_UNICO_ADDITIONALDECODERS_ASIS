using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.GestionCuadrillas
{
    public class CancelarTOARequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public CancelarTOAMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class CancelarTOAMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }
        [DataMember(Name = "Body")]
        public CancelarTOABodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class CancelarTOABodyRequest
    {
        [DataMember(Name = "nroOrden")]
        public string nroOrden { get; set; }
    }
}