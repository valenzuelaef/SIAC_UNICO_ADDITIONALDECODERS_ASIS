using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.FranjaHoraria
{
    public class FranjaHorarioCapacity
    {
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }

        [DataMember(Name = "descripcion2")]
        public string Descripcion2 { get; set; }

        [DataMember(Name = "codigo")]
        public string Codigo { get; set; }
        [DataMember(Name = "codigo2")]
        public string Codigo2 { get; set; }

        [DataMember(Name = "codigo3")]
        public string Codigo3 { get; set; }

        [DataMember(Name = "estado")]
        public string Estado { get; set; }
    }

    public class FranjaHorarioSGA
    {
        [DataMember(Name = "agrupador")]
        public string Agrupador { get; set; }
        [DataMember(Name = "codigo")]
        public string Codigo { get; set; }
        [DataMember(Name = "codigo2")]
        public string Codigo2 { get; set; }
        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
        [DataMember(Name = "estado")]
        public string Estado { get; set; }
    }

    public class FranjaHorarioXML
    {

        [DataMember(Name = "codigo")]
        public string Codigo { get; set; }

        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }
    }
}