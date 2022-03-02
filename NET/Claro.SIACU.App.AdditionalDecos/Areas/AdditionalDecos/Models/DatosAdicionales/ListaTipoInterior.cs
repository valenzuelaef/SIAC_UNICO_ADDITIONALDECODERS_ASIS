using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "listaTipoInterior")]
    public class ListaTipoInterior
    {
        [DataMember(Name = "tipo")]
        public string Tipo { get; set; }
        [DataMember(Name = "idTipo")]
        public string IdTipo { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "abreviacion")]
        public string Abreviacion { get; set; }
        [DataMember(Name = "estado")]
        public string Estado { get; set; }
    }
}