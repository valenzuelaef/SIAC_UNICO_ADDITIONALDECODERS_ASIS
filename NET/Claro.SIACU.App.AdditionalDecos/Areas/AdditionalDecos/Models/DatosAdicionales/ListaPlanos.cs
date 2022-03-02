using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "listaPlanos")]
    public class ListaPlanos
    {
        [DataMember(Name = "codUbi")]
        public string CodUbi { get; set; }
        [DataMember(Name = "idPlano")]
        public string IdPlano { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "nomDst")]
        public string NomDst { get; set; }
        [DataMember(Name = "distDesc")]
        public string DistDesc { get; set; }
    }
}