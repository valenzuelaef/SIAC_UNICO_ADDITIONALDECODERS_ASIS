using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "listaTipoVia")]
    public class ListaTipoVia
    {
        [DataMember(Name = "codVia")]
        public string CodVia { get; set; }
        [DataMember(Name = "desVia")]
        public string DesVia { get; set; }
        [DataMember(Name = "abrVia")]
        public string AbrVia { get; set; }
    }
}