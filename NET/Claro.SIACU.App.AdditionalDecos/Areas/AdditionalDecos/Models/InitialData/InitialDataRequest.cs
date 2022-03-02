using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    public class InitialDataRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public InitialDataMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class InitialDataMessageRequest
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderReq Header { get; set; }
        [DataMember(Name = "Body")]
        public InitialDataBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class InitialDataBodyRequest
    {

        [DataMember(Name = "contratoId")]
        public string ContractID { get; set; }
        [DataMember(Name = "customerId")]
        public string CustomerID { get; set; }
        [DataMember(Name = "codigoUsuario")]
        public string UserAccount { get; set; }
        [DataMember(Name = "codigoRol")]
        public string codeRol { get; set; }
        [DataMember(Name = "codigoCac")]
        public string codeCac { get; set; }
        [DataMember(Name = "estado")]
        public string state { get; set; }
        [DataMember(Name = "canal")]
        public string Type { get; set; }
        [DataMember(Name = "transactionId")]
        public string TransactionId { get; set; }
    }
}