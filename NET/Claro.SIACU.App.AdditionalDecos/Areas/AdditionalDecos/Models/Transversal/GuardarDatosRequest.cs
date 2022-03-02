using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.Transversal
{
    public class GuardarDatosRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public GuardarDatosDataMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class GuardarDatosDataMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public GuardarDatosDataBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Servicios")]
    public class GuardarDatosDataBodyRequest
    {
        [DataMember(Name = "idFlujo")]
        public string idFlujo { get; set; }

        [DataMember(Name = "servicios")]
        public ICollection<Servicios> Servicios { get; set; }
    }

    [DataContract(Name = "servicios")]
    public class Servicios
    {
        [DataMember(Name = "servicio")]
        public string Servicio { get; set; }

        [DataMember(Name = "parametros")]
        public ICollection<Paramertros> parametros { get; set; }
    }


    public class Paramertros
    {
        [DataMember(Name = "parametro")]
        public string parametro { get; set; }

        [DataMember(Name = "valor")]
        public string valor { get; set; }
    }
}