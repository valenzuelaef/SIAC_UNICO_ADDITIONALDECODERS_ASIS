using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.Transfer.Areas.Transfer.Models.DatosAdicionales
{


    [DataContract(Name = "listaEdificio")]
    public class ListaEdificios
    {
        [DataMember(Name = "codEst")]
        public string CodEst { get; set; }
        [DataMember(Name = "nomDepa")]
        public string NomDepa { get; set; }
        [DataMember(Name = "codPVC")]
        public string CodPVC { get; set; }
        [DataMember(Name = "nomProv")]
        public string NomProv { get; set; }
        [DataMember(Name = "codDst")]
        public string CodDst { get; set; }
        [DataMember(Name = "nomDst")]
        public string NomDst { get; set; }
        [DataMember(Name = "distDesc")]
        public string DistDesc { get; set; }
        [DataMember(Name = "codUbi")]
        public string CodUbi { get; set; }
        [DataMember(Name = "ubigeo")]
        public string Ubigeo { get; set; }
        [DataMember(Name = "codPos")]
        public string CodPos { get; set; }
        [DataMember(Name = "codPos2")]
        public string CodPos2 { get; set; }
        [DataMember(Name = "codEdi")]
        public string CodEdi { get; set; }
        [DataMember(Name = "idPlano")]
        public object IdPlano { get; set; }
        [DataMember(Name = "nombre")]
        public object Nombre { get; set; }
        [DataMember(Name = "nomDstr")]
        public string NomDstr { get; set; }
        [DataMember(Name = "distDescr")]
        public string DistDescr { get; set; }
        [DataMember(Name = "tipViaP")]
        public string TipViaP { get; set; }
        [DataMember(Name = "desTipVia")]
        public string DesTipVia { get; set; }
        [DataMember(Name = "nomVia")]
        public string NomVia { get; set; }
        [DataMember(Name = "numVia")]
        public string NumVia { get; set; }
        [DataMember(Name = "nomUrb")]
        public object NomUrb { get; set; }
        [DataMember(Name = "pisos")]
        public object Pisos { get; set; }
        [DataMember(Name = "administrador")]
        public object Administrador { get; set; }
        [DataMember(Name = "telefono")]
        public object Telefono { get; set; }
        [DataMember(Name = "referencia")]
        public object Referencia { get; set; }
        [DataMember(Name = "complemento")]
        public object Complemento { get; set; }
    }

}