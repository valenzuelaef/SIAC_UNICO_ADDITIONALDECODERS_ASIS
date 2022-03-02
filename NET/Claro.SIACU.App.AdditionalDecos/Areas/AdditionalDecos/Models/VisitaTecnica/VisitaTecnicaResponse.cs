using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.VisitaTecnica
{
    public class VisitaTecnicaResponse
    {
        [DataMember(Name = "MessageResponse")]
        public VisitaTecnicaMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class VisitaTecnicaMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public VisitaTecnicaBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class VisitaTecnicaBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodigoRespuesta { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MensajeRespuesta { get; set; }

        [DataMember(Name = "tipTra")]
        public string tipTrabajo { get; set; }

        [DataMember(Name = "codSubTipoOrden")]
        public string subTipTrabajo { get; set; }

        [DataMember(Name = "codMotot")]
        public string CodMotot { get; set; }

        [DataMember(Name = "anotacion")]
        public string anotaciones { get; set; }

        [DataMember(Name = "flgVT")]
        public string flagVisitaTecnica { get; set; }
    }
}