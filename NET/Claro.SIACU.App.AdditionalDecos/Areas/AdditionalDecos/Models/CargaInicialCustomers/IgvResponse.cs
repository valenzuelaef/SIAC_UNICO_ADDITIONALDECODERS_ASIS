using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.CargaInicialCustomers
{
    [DataContract(Name = "IgvResponse")]
    public class IgvResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }
        [DataMember(Name = "listaIGVS")]
        public List<listaIGVSResponse> listaIGV { get; set; }
    }

    [DataContract(Name = "listaIGVS")]
    public class listaIGVSResponse
    {
        [DataMember(Name = "imputId")]
        public string imputId { get; set; }
        [DataMember(Name = "impuvDes")]
        public string impuvDes { get; set; }
        [DataMember(Name = "igv")]
        public string igv { get; set; }
        [DataMember(Name = "igvD")]
        public string igvD { get; set; }
        [DataMember(Name = "impunTipDoc")]
        public string impunTipDoc { get; set; }
        [DataMember(Name = "impudFecRegistro")]
        public string impudFecRegistro { get; set; }
        [DataMember(Name = "impudFecIniVigencia")]
        public string impudFecIniVigencia { get; set; }
        [DataMember(Name = "impudFecFinVigencia")]
        public string impudFecFinVigencia { get; set; }
    }
}