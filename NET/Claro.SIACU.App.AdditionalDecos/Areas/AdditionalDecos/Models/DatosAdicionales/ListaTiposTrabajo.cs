using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{


    [DataContract(Name = "listaTipoTrabajo")]
    public class ListaTiposTrabajo
    {
        [DataMember(Name = "tipoTrabajo")]
        public string TipoTrabajo { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "flagFranja")]
        public string FlagFranja { get; set; }
        [DataMember(Name = "tecnologia")]
        public string Tecnologia { get; set; }
    }
}