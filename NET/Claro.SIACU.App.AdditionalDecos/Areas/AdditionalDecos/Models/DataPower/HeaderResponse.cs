using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.DataPower
{
    [DataContract(Name = "HeaderResponse")]
    public class HeaderResponse
    {
        [DataMember(Name = "consumer")]
        public string Consumer { get; set; }
        [DataMember(Name = "pid")]
        public string Pid { get; set; }
        [DataMember(Name = "timestamp")]
        public string TimeStamp { get; set; }
        [DataMember(Name = "VarArg")]
        public string VarArg { get; set; }
        [DataMember(Name = "status")]
        public HeaderStatusResponse Status { get; set; }
    }
}