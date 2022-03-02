using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.Redirect
{
    public class RedirectRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public RedirectMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class RedirectMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }
        [DataMember(Name = "Body")]
        public RedirectBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class RedirectBodyRequest
    {
        [DataMember(Name = "auditRequest")]
        public auditBodyRequest auditRequest { get; set; }
        [DataMember(Name = "secuencia")]
        public string secuencia { get; set; }
        [DataMember(Name = "ipServDestino")]
        public string ipServDestino { get; set; }

        [DataMember(Name = "listaAdicionalRequest")]
        public listaAdicionalBodyRequest listaAdicionalRequest { get; set; }

    }

    [DataContract(Name = "auditRequest")]
    public class auditBodyRequest
    {
        [DataMember(Name = "idTransaccion")]
        public string idTransaccion { get; set; }
        [DataMember(Name = "ipAplicacion")]
        public string ipAplicacion { get; set; }
        [DataMember(Name = "nombreAplicacion")]
        public string nombreAplicacion { get; set; }

        [DataMember(Name = "usuarioAplicacion")]
        public string usuarioAplicacion { get; set; }
    }

    [DataContract(Name = "auditBodyRequest")]
    public class listaAdicionalBodyRequest
    {
        [DataMember(Name = "parametrosRequest")]
        public string parametrosRequest { get; set; }
        [DataMember(Name = "parametrosBodyRequest")]
        public string parametrosBodyRequest { get; set; }

    }
}