using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{
    /// <summary>
    /// Falta llenar porque aun no puedo visuaizar el modelo de datos de la franja horaria
    /// </summary>
    [DataContract(Name = "listaSubTipo")]
    public class ListaSubTiposTrabajo {

        [DataMember(Name = "codSubTipoOrden")]
        public string CodSubTipoOrden { get; set; }

        [DataMember(Name = "codTipoOrden")]
        public string CodTipoOrden { get; set; }

        [DataMember(Name = "descripcion")]
        public string Descripcion { get; set; }

        [DataMember(Name = "tipoServicio")]
        public string TipoServicio { get; set; }

        [DataMember(Name = "tiempoMin")]
        public string tiempoMin { get; set; }

        [DataMember(Name = "idSubTipoOrden")]
        public string IdSubTipoOrden { get; set; }

        [DataMember(Name = "flagDefecto")]
        public string flagDefecto { get; set; }
    }
}