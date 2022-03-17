using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{
    public class DatosAdicionalesRequest : Tools.Entity.Request
    {
        [DataMember(Name = "MessageRequest")]
        public DatosAdicionalesMessageRequest MessageRequest { get; set; }
    }

    [DataContract(Name = "MessageRequest")]
    public class DatosAdicionalesMessageRequest
    {
        [DataMember(Name = "Header")]
        public Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.DataPower.HeaderReq Header { get; set; }
        [DataMember(Name = "Body")]
        public DatosAdicionalesBodyRequest Body { get; set; }
    }

    [DataContract(Name = "Body")]
    public class DatosAdicionalesBodyRequest
    {
        /*INI Contingencia*/
        [DataMember(Name = "customerId")]
        public string customerId { get; set; }
        [DataMember(Name = "tipoPuntoVenta")]
        public string tipoPuntoVenta { get; set; }
        [DataMember(Name = "canal")]
        public string canal { get; set; }

        /*FIN*/
        [DataMember(Name = "idTransaccion")]
        public string IdTransaccion { get; set; }

        [DataMember(Name = "idProceso")]
        public string IdProceso { get; set; }

        [DataMember(Name = "idProducto")]
        public string IdProducto { get; set; }

        [DataMember(Name = "tecnologia")]
        public string tecnologia { get; set; }

        [DataMember(Name = "codPais")]
        public string CodPais { get; set; }
        [DataMember(Name = "idTipoUrba")]
        public string IdTipoUrba { get; set; }
        [DataMember(Name = "contratoId")]
        public string ContratoId { get; set; }
        [DataMember(Name = "idTipoInt")]
        public string IdTipoInt { get; set; }
        [DataMember(Name = "idCodVia")]
        public string IdCodVia { get; set; }
        [DataMember(Name = "codUbi")]
        public string CodUbi { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "idPoblado")]
        public string IdPoblado { get; set; }
        [DataMember(Name = "tipTrabajo")]
        public string TipTrabajo { get; set; }
        [DataMember(Name = "flagCE")]
        public string FlagCE { get; set; }
        [DataMember(Name = "tipSrv")]
        public string TipoServicio { get; set; }
        [DataMember(Name = "tipTra")]
        public string TipTra { get; set; }
        [DataMember(Name = "origen")]
        public string Origen { get; set; }
        [DataMember(Name = "idPlano")]
        public string IdPlano { get; set; }
        [DataMember(Name = "oferta")]
        public string oferta { get; set; }
        [DataMember(Name = "oficina")]
        public string oficina { get; set; }
        [DataMember(Name = "oficinaDefault")]
        public string oficinaDefault { get; set; }
        [DataMember(Name = "flagEjecucion")]
        public string flagEjecucion { get; set; }
        [DataMember(Name = "plan")]
        public string plan { get; set; }
        [DataMember(Name = "tipo")]
        public string tipo { get; set; }
        [DataMember(Name = "cantDeco")]
        public string cantDeco { get; set; }
        [DataMember(Name = "coIdPub")]//ContratoPublico-TOBE
        public string coIdPub { get; set; }//ContratoPublico-TOBE 
        [DataMember(Name = "flagConvivencia")]//ContratoPublico-TOBE
        public string flagConvivencia { get; set; }//ContratoPublico-TOBE 
    }

}