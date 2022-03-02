using Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.CargaInicialCustomers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    public class AdditionalFixedDataResponse
    {
        [DataMember(Name = "MessageResponse")]
        public AdditionalFixedDataResponseMessageResponse MessageResponse { get; set; }
    }

    [DataContract(Name = "MessageResponse")]
    public class AdditionalFixedDataResponseMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public AdditionalFixedDataBodyResponse Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class AdditionalFixedDataBodyResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "servicios")]
        public AdditionalFixedDataServices Services { get; set; }
    }
    [DataContract(Name = "servicios")]
    public class AdditionalFixedDataServices
    {

        [DataMember(Name = "configuracionesfija/obtenerConfiguraciones")]
        public ConfigurationResponse Configuration { get; set; }

    }
}