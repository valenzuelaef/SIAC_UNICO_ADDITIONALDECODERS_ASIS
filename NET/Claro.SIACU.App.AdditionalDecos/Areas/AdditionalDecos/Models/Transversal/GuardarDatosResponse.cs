using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.Transversal
{
    public class GuardarDatosResponse
    {
        [DataMember(Name = "MessageResponse")]
        public RedirectMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class RedirectMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public RedirectBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class RedirectBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string codigoRespuesta { get; set; }

        [DataMember(Name = "constancia")]
        public string constancia { get; set; }

        [DataMember(Name = "descripcionRespuesta")]
        public string descripcionRespuesta { get; set; }

        [DataMember(Name = "idInteraccion")]
        public string idInteraccion { get; set; }

        [DataMember(Name = "lstParam")]
        public ICollection<ListaParametros> lstParam { get; set; }

        [DataMember(Name = "numeroSOT")]
        public string numeroSOT { get; set; }
    }

    [DataContract(Name = "lstParam")]
    public class ListaParametros
    {
        [DataMember(Name = "proceso")]
        public string proceso { get; set; }
        [DataMember(Name = "req")]
        public string req { get; set; }
        [DataMember(Name = "res")]
        public string res { get; set; }
        [DataMember(Name = "url")]
        public string url { get; set; }
    }   
}