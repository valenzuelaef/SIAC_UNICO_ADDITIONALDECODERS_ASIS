using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.DatosAdicionales
{
    [DataContract(Name = "planfijacamp")]
    public class FixedPlanResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "listaPlanFijaCampDisp")]
        public List<FixedPlan> PlanList { get; set; }
    }

    [DataContract(Name = "listaPlanFijaCampDisp")]
    public class FixedPlan
    {
        [DataMember(Name = "codigoPlan")]
        public string PlanCode { get; set; }

        [DataMember(Name = "descPlan")]
        public string PlanDescription { get; set; }

        [DataMember(Name = "idSolucion")]
        public string SolutionID { get; set; }

        [DataMember(Name = "descSolucion")]
        public string SolutionDescription { get; set; }

        [DataMember(Name = "tmcode")]
        public string TMCode { get; set; }

        [DataMember(Name = "descTmcode")]
        public string TMCodeDescription { get; set; }

        [DataMember(Name = "version")]
        public string Version { get; set; }

        [DataMember(Name = "codigoOferta")]
        public string OfferCode { get; set; }

        [DataMember(Name = "descOferta")]
        public string OfferDescription { get; set; }

        [DataMember(Name = "estadoPlan")]
        public string PlanStatus { get; set; }

        [DataMember(Name = "codigoCampana")]
        public string CampaignCode { get; set; }

        [DataMember(Name = "descCampana")]
        public string CampaignDescription { get; set; }

        [DataMember(Name = "fechaFinCampana")]
        public string CampaignEndDate { get; set; }

        [DataMember(Name = "producto")]
        public string Product { get; set; }
    }
}