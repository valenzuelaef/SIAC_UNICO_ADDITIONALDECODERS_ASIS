using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.InitialData
{
    [DataContract(Name = "datoscliente")]
    public class CustomerInformationResponse
    {
        [DataMember(Name = "codigoRespuesta")]
        public string CodeResponse { get; set; }

        [DataMember(Name = "mensajeRespuesta")]
        public string MessageResponse { get; set; }

        [DataMember(Name = "listaDatosCliente")]
        public List<CustomerInformation> CustomerList { get; set; }
    }

    [DataContract(Name = "listaDatosCliente")]
    public class CustomerInformation
    {
        [DataMember(Name = "cliente")]
        public string CustomerName { get; set; }

        [DataMember(Name = "contacto")]
        public string ContactName { get; set; }

        [DataMember(Name = "contrato")]
        public string ContractNumber { get; set; }

        [DataMember(Name = "fechaActivacion")]
        public string ActivationDate { get; set; }

        [DataMember(Name = "repLegal")]
        public string LegalRepresentative { get; set; }

        [DataMember(Name = "docRepLegal")]
        public string LegalRepresentativeDocument { get; set; }

        [DataMember(Name = "rucDni")]
        public string DocumentNumber { get; set; }

        [DataMember(Name = "customerId")]
        public string CustomerID { get; set; }

        [DataMember(Name = "tipoCliente")]
        public string CustomerType { get; set; }

        [DataMember(Name = "cicloFac")]
        public string BillingCycle { get; set; }

        [DataMember(Name = "telefono1")]
        public string PhoneNumber01 { get; set; }

        [DataMember(Name = "telefono2")]
        public string PhoneNumber02 { get; set; }

        [DataMember(Name = "direccionFac")]
        public string BillingAddress { get; set; }

        [DataMember(Name = "notaDireccion")]
        public string AddressNotes { get; set; }

        [DataMember(Name = "email")]
        public string Email { get; set; }

        [DataMember(Name = "paisFac")]
        public string BillingCountry { get; set; }

        [DataMember(Name = "departamentoFac")]
        public string BillingDepartment { get; set; }

        [DataMember(Name = "provinciaFac")]
        public string BillingProvince { get; set; }

        [DataMember(Name = "distritoFac")]
        public string BillingDistrict { get; set; }

        [DataMember(Name = "codPostalFac")]
        public string BillingPostalCode { get; set; }

        [DataMember(Name = "codigoPlano")]
        public string MapCode { get; set; }

        [DataMember(Name = "codigoUbigeo")]
        public string UbigeoCode { get; set; }

        [DataMember(Name = "estadoServicio")]
        public string ServiceStatus { get; set; }

        [DataMember(Name = "descripcionPaquete")]
        public string PackageDescription { get; set; }

        [DataMember(Name = "costoPaquete")]
        public string PackageCost { get; set; }

        [DataMember(Name = "estadoContrato")]
        public string ContractStatus { get; set; }
        [DataMember(Name = "cDiasSuspendidosCiclo")]
        public string cantDiasSuspendidosCiclo { get; set; }
        [DataMember(Name = "cargoReconexion")]
        public string cargoReconexion { get; set; }
        [DataMember(Name = "cDiasProxCiclo")]
        public string cantDiasProxCiclo { get; set; }
    }
}