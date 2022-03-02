using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    public class AdditionalFixedDataRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public AdditionalFixedDataMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class AdditionalFixedDataMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }

        [DataMember(Name = "Body")]
        public AdditionalFixedDataBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class AdditionalFixedDataBodyRequest
    {

        [DataMember(Name = "idTransaccion")]
        public int TransactionID { get; set; }

        [DataMember(Name = "idProceso")]
        public int ProcessID { get; set; }

        [DataMember(Name = "idProducto")]
        public string ProductID { get; set; }

        [DataMember(Name = "codPais")]
        public string CountryID { get; set; }

        [DataMember(Name = "idTipoUrba")]
        public string TypeUrbaID { get; set; }

        [DataMember(Name = "contratoId")]
        public string ContractID { get; set; }

        [DataMember(Name = "idTipoInt")]
        public string TypeIntID { get; set; }

        [DataMember(Name = "idCodVia")]
        public string CodViaID { get; set; }

        [DataMember(Name = "oferta")]
        public string Oferta { get; set; }

        [DataMember(Name = "tecnologia")]
        public string tecnologia { get; set; }

    }
}