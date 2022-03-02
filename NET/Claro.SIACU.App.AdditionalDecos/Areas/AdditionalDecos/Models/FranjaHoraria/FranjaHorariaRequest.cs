using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.FranjaHoraria
{
    public class FranjaHorariaRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public FranjaHorariaMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class FranjaHorariaMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public FranjaHorariaBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class FranjaHorariaBodyRequest
    {
        [DataMember(Name = "flagValidaEta")]
        public string FlagValidaEta { get; set; }

        [DataMember(Name = "disponibilidad")]
        public string Disponibilidad { get; set; }

        [DataMember(Name = "tipTra")]
        public string TipTra { get; set; }

        [DataMember(Name = "tipSrv")]
        public string TipSrv { get; set; }

        [DataMember(Name = "fechaAgenda")]
        public string FechaAgenda { get; set; }

        [DataMember(Name = "origen")]
        public string Origen { get; set; }

        [DataMember(Name = "idPlano")]
        public string IdPlano { get; set; }

        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }

        //[DataMember(Name = "tipoServicio")]
        //public string TipoServicio { get; set; }

        [DataMember(Name = "tipoOrden")]
        public string TipoOrden { get; set; }

        [DataMember(Name = "subtipoOrden")]
        public string SubtipoOrden { get; set; }

        [DataMember(Name = "codZona")]
        public string CodZona { get; set; }

        [DataMember(Name = "customer")]
        public string Customer { get; set; }

        [DataMember(Name = "contrato")]
        public string Contrato { get; set; }

        [DataMember(Name = "reglaValidacion")]
        public string ReglaValidacion { get; set; }

        [DataMember(Name = "listaCampoActividadCapacidad")]
        public ICollection<CampoActividadCapacidad> listaCampoActividadCapacidad { get; set; }

    }


    [DataContract(Name = "listaCampoActividadCapacidad")]
    public class CampoActividadCapacidad
    {

        [DataMember(Name = "nombre")]
        public string Nombre { get; set; }

        [DataMember(Name = "valor")]
        public string Valor { get; set; }
    }
}