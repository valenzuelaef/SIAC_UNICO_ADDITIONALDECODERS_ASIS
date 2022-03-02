using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.CargaInicialCustomers
{
    [DataContract(Name = "servicioprincipales")]
    public class CoreServicesResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "tecnologia")]
        public string Technology { get; set; }
        [DataMember(Name = "codPlan")]
        public string planCode { get; set; }
        [DataMember(Name = "listaServicios")]
        public List<CoreService> ServiceList { get; set; }
    }

    [DataContract(Name = "listaServicios")]
    public class CoreService
    {
        [DataMember(Name = "nombreServicio")]
        public string ServiceName { get; set; }

        [DataMember(Name = "descripcionServicio")]
        public string ServiceDescription { get; set; }

        [DataMember(Name = "nombreEquipo")]
        public string EquipmentName { get; set; }

        [DataMember(Name = "modeloEquipo")]
        public string EquipmentModel { get; set; }

        [DataMember(Name = "serieEquipo")]
        public string EquipmentSerial { get; set; }

        [DataMember(Name = "tecnologia")]
        public string technology { get; set; }

        [DataMember(Name = "cargoFijo")]
        public string FixedCharge { get; set; }
    }
}