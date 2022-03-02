using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    [DataContract(Name = "consultasubtipo")]
    public class WorkSubTypesResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "listaSubTipo")]
        public List<WorkSubTypes> WorkSubTypesList { get; set; }
    }

    [DataContract(Name = "listaSubTipo")]
    public class WorkSubTypes
    {
        [DataMember(Name = "codSubT")]
        public string Id { get; set; }

        [DataMember(Name = "desc")]
        public string Desc { get; set; }
    }
}