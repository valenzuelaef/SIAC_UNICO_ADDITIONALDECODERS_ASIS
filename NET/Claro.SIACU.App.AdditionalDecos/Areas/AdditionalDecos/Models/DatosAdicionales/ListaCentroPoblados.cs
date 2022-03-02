using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "listaCenPob")]
    public class ListaCentroPoblados
    {
        [DataMember(Name = "idPoblado")]
        public string IdPoblado { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "codClasificacion")]
        public string CodClasificacion { get; set; }
        [DataMember(Name = "clasificacion")]
        public string Clasificacion { get; set; }
        [DataMember(Name = "codCategoria")]
        public string CodCategoria { get; set; }
        [DataMember(Name = "categoria")]
        public string Categoria { get; set; }
        [DataMember(Name = "nombre")]
        public string Nombre { get; set; }
        [DataMember(Name = "poblacion")]
        public string Poblacion { get; set; }
        [DataMember(Name = "cobertura")]
        public string Cobertura { get; set; }
        [DataMember(Name = "coberturaLTE")]
        public string CoberturaLTE { get; set; }
    }
}