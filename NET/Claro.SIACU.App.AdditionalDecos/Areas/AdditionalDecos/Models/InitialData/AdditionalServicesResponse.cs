using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    [DataContract(Name = "serviciosadicionales")]
    public class AdditionalServicesResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "listaServAdicionales")]
        public List<AdditionalService> AdditionalServiceList { get; set; }
    }

    [DataContract(Name = "listaServAdicionales")]
    public class AdditionalService
    {
        [DataMember(Name = "nombreServicio")]
        public string ServiceName { get; set; }

        [DataMember(Name = "descServicio")]
        public string ServiceDescription { get; set; }

        [DataMember(Name = "nombreEquipo")]
        public string EquipmentName { get; set; }

        [DataMember(Name = "modeloEquipo")]
        public string EquipmentModel { get; set; }

        [DataMember(Name = "serieEquipo")]
        public string EquipmentSerial { get; set; }

        [DataMember(Name = "tecnologia")]
        public string Technology { get; set; }

        [DataMember(Name = "cargoFijoPromocion")]
        public string FixedChargePromotion { get; set; }

        [DataMember(Name = "cargoFijo")]
        public string FixedCharge { get; set; }
    }
}