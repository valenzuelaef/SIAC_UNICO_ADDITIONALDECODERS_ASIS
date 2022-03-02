using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.VisitaTecnica
{
    public class VisitaTecnicaRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public VisitaTecnicaMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class VisitaTecnicaMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public VisitaTecnicaBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class VisitaTecnicaBodyRequest
    {
        [DataMember(Name = "contratoId")]
        public string ContratoId { get; set; }

        [DataMember(Name = "customerId")]
        public string customerId { get; set; }

        [DataMember(Name = "listaTrama")]
        public ICollection<ListaTrama> listaTrama { get; set; }
    }
    
    [DataContract(Name = "listaTrama")]
    public class ListaTrama
    {
        [DataMember(Name = "lista")]
        public ICollection<ListaServicios> lista { get; set; }
    }

    [DataContract(Name = "lista")]
    public class ListaServicios
    {
        [DataMember(Name = "nombre")]
        public string Nombre { get; set; }

        [DataMember(Name = "valor")]
        public string Valor { get; set; }
    }
}