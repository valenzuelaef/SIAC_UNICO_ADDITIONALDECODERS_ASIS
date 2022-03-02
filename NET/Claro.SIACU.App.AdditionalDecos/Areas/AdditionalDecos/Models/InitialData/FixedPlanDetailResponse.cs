using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    [DataContract(Name = "planfijaservequip")]
    public class FixedPlanDetailResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "listaPlanServEquDisp")]
        public List<Detail> DetailList { get; set; }
    }

    [DataContract(Name = "listaPlanServEquDisp")]
    public class Detail
    {
        [DataMember(Name = "codigoPlan")]
        public string PlanCode { get; set; }

        [DataMember(Name = "grupo")]
        public string Group { get; set; }

        [DataMember(Name = "servicioEquipo")]
        public string ServiceEquiptment { get; set; }

        [DataMember(Name = "tipoServicio")]
        public string ServiceType { get; set; }

        [DataMember(Name = "flagDefecto")]
        public string DefaultFlag { get; set; }

        [DataMember(Name = "flagObligatorio")]
        public string MandatoryFlag { get; set; }

        [DataMember(Name = "idProducto")]
        public string ProductID { get; set; }

        [DataMember(Name = "descProducto")]
        public string ProductDescription { get; set; }

        [DataMember(Name = "codServicio")]
        public string ServiceCode { get; set; }

        [DataMember(Name = "descServicio")]
        public string ServiceDescription { get; set; }

        [DataMember(Name = "cantidad")]
        public string Quantity { get; set; }

        [DataMember(Name = "codEquipo")]
        public string EquipmentCode { get; set; }

        [DataMember(Name = "descEquipo")]
        public string EquipmentDescription { get; set; }

        [DataMember(Name = "tipsrv")]
        public string TIPSRV { get; set; }

        [DataMember(Name = "spcode")]
        public string SPCODE { get; set; }

        [DataMember(Name = "sncode")]
        public string SNCODE { get; set; }

        [DataMember(Name = "cargoFijo")]
        public string FixedCharge { get; set; }

        [DataMember(Name = "grupoProducto")]
        public string ProductGroup { get; set; }

        [DataMember(Name = "idLinea")]
        public string LineID { get; set; }

        [DataMember(Name = "cargoFijoPromocion")]
        public string PromotionalFixedCharge { get; set; }
    }
}