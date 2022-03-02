using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    [DataContract(Name = "configuracion")]
    public class ConfigurationResponse
    {
        [DataMember(Name = "idTransaccion")]
        public string TransactionID { get; set; }
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "transaccionProducto")]
        public InitialDataProductTransaction ProductTransaction { get; set; }
    }

    [DataContract(Name = "transaccionProducto")]
    public class InitialDataProductTransaction
    {
        [DataMember(Name = "producto")]
        public string Product { get; set; }
        [DataMember(Name = "transaccion")]
        public string Transaction { get; set; }
        [DataMember(Name = "atributosConfiguracion")]
        public List<InitialDataConfigurationAttributes> ConfigurationAttributes { get; set; }
    }

    [DataContract(Name = "atributosConfiguracion")]
    public class InitialDataConfigurationAttributes
    {
        [DataMember(Name = "tipoAtributo")]
        public string AttributeType { get; set; }

        [DataMember(Name = "tipoDato")]
        public string AttributeDataType { get; set; }

        [DataMember(Name = "descripcionAtributo")]
        public string AttributeDescription { get; set; }

        [DataMember(Name = "nombreAtributo")]
        public string AttributeName { get; set; }

        [DataMember(Name = "identificadorAtributo")]
        public string AttributeIdentifier { get; set; }

        [DataMember(Name = "valorAtributo")]
        public string AttributeValue { get; set; }

        [DataMember(Name = "ordenTipoAtributo")]
        public string AttributeTypeOrder { get; set; }

        [DataMember(Name = "ordenValorAtributo")]
        public string AttributeValueOrder { get; set; }

        [DataMember(Name = "listaAtributosConfiguracion")]
        public ICollection<InitialDataConfigurationAttributes> AttributeListConfiguration { get; set; }
    }
}