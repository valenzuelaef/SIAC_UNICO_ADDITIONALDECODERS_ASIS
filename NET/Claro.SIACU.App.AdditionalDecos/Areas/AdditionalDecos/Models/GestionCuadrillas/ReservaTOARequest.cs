using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.GestionCuadrillas
{
    public class ReservaTOARequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public ReservaTOAMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class ReservaTOAMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }
        [DataMember(Name = "Body")]
        public ReservaTOABodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class ReservaTOABodyRequest
    {

        [DataMember(Name = "flagValidaETA")]
        public string flagValidaETA { get; set; }

        [DataMember(Name = "tiptra")]
        public string tiptra { get; set; }

        [DataMember(Name = "tipSrv")]
        public string tipSrv { get; set; }

        [DataMember(Name = "nroOrden")]
        public string nroOrden { get; set; }

        [DataMember(Name = "fechaReserva")]
        public string fechaReserva { get; set; }

        [DataMember(Name = "idBucket")]
        public string idBucket { get; set; }

        [DataMember(Name = "codZona")]
        public string codZona { get; set; }

        [DataMember(Name = "idPlano")]
        public string idPlano { get; set; }

        [DataMember(Name = "tipoOrden")]
        public string tipoOrden { get; set; }

        [DataMember(Name = "codSubTipoOrden")]
        public string codSubTipoOrden { get; set; }

        [DataMember(Name = "idConsulta")]
        public string idConsulta { get; set; }

        [DataMember(Name = "franjaHoraria")]
        public string franjaHoraria { get; set; }

        [DataMember(Name = "duracion")]
        public string duracion { get; set; }
    }
}