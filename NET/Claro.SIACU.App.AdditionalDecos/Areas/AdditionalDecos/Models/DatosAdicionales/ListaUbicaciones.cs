using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

        [DataContract(Name = "listaUbicaciones")]
        public class Ubicaciones
        {
            [DataMember(Name = "codPais")]
            public string CodPais { get; set; }
            [DataMember(Name = "abrevPais")]
            public string AbrevPais { get; set; }
            [DataMember(Name = "nomPais")]
            public string NomPais { get; set; }
            [DataMember(Name = "codEstado")]
            public string CodEstado { get; set; }
            [DataMember(Name = "abrevEstado")]
            public string AbrevEstado { get; set; }
            [DataMember(Name = "nomEstado")]
            public string NomEstado { get; set; }
            [DataMember(Name = "codProvincia")]
            public string CodProvincia { get; set; }
            [DataMember(Name = "abrevProvincia")]
            public string AbrevProvincia { get; set; }
            [DataMember(Name = "nomProvincia")]
            public string NomProvincia { get; set; }
            [DataMember(Name = "codDistrito")]
            public string CodDistrito { get; set; }
            [DataMember(Name = "nomDistrito")]
            public string NomDistrito { get; set; }
            [DataMember(Name = "distDescripcion")]
            public string DistDescripcion { get; set; }
            [DataMember(Name = "codUbigeo")]
            public string codUbigeo { get; set; }
            [DataMember(Name = "ubigeo")]
            public string Ubigeo { get; set; }
            [DataMember(Name = "codPos")]
            public object CodPos { get; set; }
            [DataMember(Name = "codPos2")]
            public object CodPos2 { get; set; }
        }
    
}