using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{

    [DataContract(Name = "transaccionProducto")]
    public class TransaccionProducto
    {
        [DataMember(Name = "producto")]
        public string Producto { get; set; }
        [DataMember(Name = "transaccion")]
        public string Transaccion { get; set; }
        [DataMember(Name = "atributosConfiguracion")]
        public ICollection<AtributosConfiguracion> ConfigurationAttributes { get; set; }
    }


    [DataContract(Name = "atributosConfiguracion")]
    public class AtributosConfiguracion
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
        public ICollection<AtributosConfiguracion> AttributeListConfiguration { get; set; }
    }



    //[DataContract(Name = "listaAtributosConfiguracion")]
    //public class ListaAtributosConfiguracion
    //{
    //    [DataMember(Name = "tipoAtributo")]
    //    public string TipoAtributo { get; set; }
    //    [DataMember(Name = "tipoDato")]
    //    public string TipoDato { get; set; }
    //    [DataMember(Name = "descripcionAtributo")]
    //    public string DescripcionAtributo { get; set; }
    //    [DataMember(Name = "nombreAtributo")]
    //    public string NombreAtributo { get; set; }
    //    [DataMember(Name = "identificadorAtributo")]
    //    public string IdentificadorAtributo { get; set; }
    //    [DataMember(Name = "valorAtributo")]
    //    public object ValorAtributo { get; set; }
    //    [DataMember(Name = "ordenTipoAtributo")]
    //    public string OrdenTipoAtributo { get; set; }
    //    [DataMember(Name = "ordenValorAtributo")]
    //    public string OrdenValorAtributo { get; set; }
    //    [DataMember(Name = "listaAtributosConfiguracion")]
    //    public ICollection<ListaAtributosConfiguracion> listaAtributosConfiguracion { get; set; }
    //}
}