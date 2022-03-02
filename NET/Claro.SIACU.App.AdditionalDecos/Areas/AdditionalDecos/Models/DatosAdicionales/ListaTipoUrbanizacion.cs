using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{
     

        [DataContract(Name = "listaTipoUrbanizacion")]
        public class TipoUrbanizacion
        {
            [DataMember(Name = "idTipUrb")]
            public string IdTipUrb { get; set; }
            [DataMember(Name = "descripcion")]
            public string Descripcion { get; set; }
        }
    
}