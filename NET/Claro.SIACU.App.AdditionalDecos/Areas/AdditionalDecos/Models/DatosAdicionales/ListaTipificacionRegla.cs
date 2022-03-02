using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "listaTipificacionRegla")]
    public class ListaTipificacionRegla
    {
        [DataMember(Name = "tipo")]
        public string Tipo { get; set; }
        [DataMember(Name = "clase")]
        public string Clase { get; set; }
        [DataMember(Name = "subclase")]
        public string SubClase { get; set; }
        [DataMember(Name = "tipoCodigo")]
        public string TipoCodigo { get; set; }
        [DataMember(Name = "claseCodigo")]
        public string ClaseCodigo { get; set; }
        [DataMember(Name = "subClaseCodigo")]
        public string SubClaseCodigo { get; set; }
        [DataMember(Name = "interaccionCodigo")]
        public string InteraccionCodigo { get; set; }
        [DataMember(Name = "regla")]
        public string Regla { get; set; }
    }

}