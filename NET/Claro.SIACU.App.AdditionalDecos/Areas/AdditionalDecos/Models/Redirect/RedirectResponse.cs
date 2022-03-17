using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Models.Redirect
{
    public class RedirectResponse
    {
        [DataMember(Name = "MessageResponse")]
        public RedirectMessageResponse MessageResponse { get; set; }

    }

    [DataContract(Name = "MessageResponse")]
    public class RedirectMessageResponse
    {
        [DataMember(Name = "Header")]
        public DataPower.HeaderRes Header { get; set; }
        [DataMember(Name = "Body")]
        public RedirectBodyResponse Body { get; set; }

    }

    [DataContract(Name = "Body")]
    public class RedirectBodyResponse
    {
        [DataMember(Name = "auditResponse")]
        public auditBodyResponse auditBodyResponse { get; set; }
        [DataMember(Name = "jsonParametros")]
        public jsonParametersBodyResponse jsonParameters { get; set; }
        [DataMember(Name = "strParameters")]
        public string strParameters { get; set; }

        [DataMember(Name = "urlDestino")]
        public string strDestinationURL { get; set; }

        [DataMember(Name = "disponibilidad")]
        public string strAvailability { get; set; }

        [DataMember(Name = "strNode")]
        public string strNode { get; set; }

    }

    [DataContract(Name = "auditResponse")]
    public class auditBodyResponse
    {
        [DataMember(Name = "idTransaccion")]
        public string TransactionID { get; set; }
        [DataMember(Name = "codigoRespuesta")]
        public string ResponseCode { get; set; }
        [DataMember(Name = "mensajeRespuesta")]
        public string ResponseMessage { get; set; }

    }

    [DataContract(Name = "auditResponse")]
    public class jsonParametersBodyResponse
    {
        [DataMember(Name = "SessionParams")]
        public SessionParamsResponse SessionParams { get; set; }
        [DataMember(Name = "UrlParams")]
        public UrlParamsResponse UrlParams { get; set; }

    }

    [DataContract(Name = "SessionParamsResponse")]
    public class SessionParamsResponse
    {
        [DataMember(Name = "DATACUSTOMER")]
        public DataCustomerResponse DATACUSTOMER { get; set; }
        [DataMember(Name = "DATASERVICE")]
        public DataServiceResponse DATASERVICE { get; set; }
        [DataMember(Name = "USERACCESS")]
        public UserAccessResponse USERACCESS { get; set; }

    }

    [DataContract(Name = "UrlParamsResponse")]
    public class UrlParamsResponse
    {
        [DataMember(Name = "IdSession")]
        public string IdSession { get; set; }

        [DataMember(Name = "SUREDIRECT")]
        public string SUREDIRECT { get; set; }
    }

    [DataContract(Name = "DataCustomerResponse")]
    public class DataCustomerResponse
    {
        [DataMember(Name = "Account")]
        public string ActivationDate { get; set; }

        [DataMember(Name = "Address")]
        public string Address { get; set; }
        [DataMember(Name = "BillingCycle")]
        public string BillingCycle { get; set; }
        [DataMember(Name = "BirthDate")]
        public string BirthDate { get; set; }
        [DataMember(Name = "BirthPlace")]
        public string BirthPlace { get; set; }
        [DataMember(Name = "BirthPlaceID")]
        public string BirthPlaceID { get; set; }
        [DataMember(Name = "BusinessName")]
        public string BusinessName { get; set; }
        [DataMember(Name = "CivilStatus")]
        public string CivilStatus { get; set; }
        [DataMember(Name = "CivilStatusID")]
        public string CivilStatusID { get; set; }
        [DataMember(Name = "CodCustomerType")]
        public string CodCustomerType { get; set; }
        [DataMember(Name = "CodeCenterPopulate")]
        public string CodeCenterPopulate { get; set; }
        [DataMember(Name = "ContractID")]
        public string ContractID { get; set; }
        [DataMember(Name = "CustomerID")]
        public string CustomerID { get; set; }
        [DataMember(Name = "CustomerType")]
        public string CustomerType { get; set; }
        [DataMember(Name = "DNIRUC")]
        public string DNIRUC { get; set; }
        [DataMember(Name = "Departament")]
        public string Departament { get; set; }
        [DataMember(Name = "District")]
        public string District { get; set; }
        [DataMember(Name = "DocumentNumber")]
        public string DocumentNumber { get; set; }
        [DataMember(Name = "DocumentType")]
        public string DocumentType { get; set; }
        [DataMember(Name = "Email")]
        public string Email { get; set; }
        [DataMember(Name = "FullName")]
        public string FullName { get; set; }
        [DataMember(Name = "InstallUbigeo")]
        public string InstallUbigeo { get; set; }
        [DataMember(Name = "OfficeAddress")]
        public string OfficeAddress { get; set; }
        [DataMember(Name = "objPostDataAccount")]
        public DataAccount objPostDataAccount { get; set; }
        [DataMember(Name = "LegalUrbanization")]
        public string LegalUrbanization { get; set; }
        [DataMember(Name = "PlaneCodeInstallation")]
        public string PlaneCodeInstallation { get; set; }
        [DataMember(Name = "coIdPub")]//ContratoPublico-TOBE
        public string coIdPub { get; set; }//ContratoPublico-TOBE 
    }

    [DataContract(Name = "objPostDataAccount")]
    public class DataAccount
    {
        public string CustomerType { get; set; }
        public string Modality { get; set; }
        public string Segment { get; set; }
        [DataMember(Name = "BillingCycle")]
        public string BillingCycle { get; set; }
        public string Niche { get; set; }
        public string AccountStatus { get; set; }
        public string ResponsiblePayment { get; set; }
        public string CreditLimit { get; set; }
        public string TotalLines { get; set; }
        public string TotalAccounts { get; set; }
        public string ActivationDate { get; set; }
        public string Consultant { get; set; }
        public string Name { get; set; }
        public string Balance { get; set; }
        [DataMember(Name = "ExpirationDate")]
        public string ExpirationDate { get; set; }
        public string LastName { get; set; }
        public string AccountParent { get; set; }
        public string AccountId { get; set; }
        public string Level { get; set; }
        public string CustomerId { get; set; }
        [DataMember(Name = "SaldoCreditLimit")]
        public string SaldoCreditLimit { get; set; }
        [DataMember(Name = "billingAccountId")]
        public string billingAccountId { get; set; }
        [DataMember(Name = "bmIdPub")]
        public string bmIdPub { get; set; }
        [DataMember(Name = "contactSeqno")]
        public string contactSeqno { get; set; }
        [DataMember(Name = "lstPostDataAccount")]
        public string lstPostDataAccount { get; set; }
        [DataMember(Name = "plataformaAT")]
        public string plataformaAT { get; set; }
    }

    [DataContract(Name = "DataServiceResponse")]
    public class DataServiceResponse
    {
        [DataMember(Name = "ActivationDate")]
        public string ActivationDate { get; set; }

        [DataMember(Name = "CableValue")]
        public string CableValue { get; set; }

        [DataMember(Name = "Campaign")]
        public string Campaign { get; set; }

        [DataMember(Name = "CellPhone")]
        public string CellPhone { get; set; }
        [DataMember(Name = "ChangedBy")]
        public string ChangedBy { get; set; }

        [DataMember(Name = "CodePlanTariff")]
        public string CodePlanTariff { get; set; }

        [DataMember(Name = "ContractID")]
        public string ContractID { get; set; }

        [DataMember(Name = "FlagPlatf")]
        public string FlagPlatf { get; set; }
        [DataMember(Name = "FlagTFI")]
        public string FlagTFI { get; set; }

        [DataMember(Name = "InternetValue")]
        public string InternetValue { get; set; }

        [DataMember(Name = "Introduced")]
        public string Introduced { get; set; }

        [DataMember(Name = "IntroducedBy")]
        public string IntroducedBy { get; set; }

        [DataMember(Name = "IsLTE")]
        public string IsLTE { get; set; }

        [DataMember(Name = "IsNot3Play")]
        public string IsNot3Play { get; set; }

        [DataMember(Name = "MSISDN")]
        public string MSISDN { get; set; }

        [DataMember(Name = "NumberICCID")]
        public string NumberICCID { get; set; }
        [DataMember(Name = "NumberIMSI")]
        public string NumberIMSI { get; set; }

        [DataMember(Name = "PIN1")]
        public string PIN1 { get; set; }

        [DataMember(Name = "PIN2")]
        public string PIN2 { get; set; }

        [DataMember(Name = "PUK1")]
        public string PUK1 { get; set; }

        [DataMember(Name = "PUK2")]
        public string PUK2 { get; set; }

        [DataMember(Name = "Plan")]
        public string Plan { get; set; }

        [DataMember(Name = "PlanTariff")]
        public string PlanTariff { get; set; }

        [DataMember(Name = "ProviderID")]
        public string ProviderID { get; set; }

        [DataMember(Name = "Reason")]
        public string Reason { get; set; }

        [DataMember(Name = "Seller")]
        public string Seller { get; set; }

        [DataMember(Name = "StateAgreement")]
        public string StateAgreement { get; set; }

        [DataMember(Name = "StateDate")]
        public string StateDate { get; set; }

        [DataMember(Name = "StateLine")]
        public string StateLine { get; set; }

        [DataMember(Name = "TelephonyValue")]
        public string TelephonyValue { get; set; }

        [DataMember(Name = "TermContract")]
        public string TermContract { get; set; }

        [DataMember(Name = "TypeProduct")]
        public string TypeProduct { get; set; }
        [DataMember(Name = "ValidFrom")]
        public string ValidFrom { get; set; }
    }

    [DataContract(Name = "UserAccessResponse")]
    public class UserAccessResponse
    {
        [DataMember(Name = "accessStatus")]
        public string accessStatus { get; set; }

        [DataMember(Name = "areaId")]
        public string areaId { get; set; }

        [DataMember(Name = "areaName")]
        public string areaName { get; set; }

        [DataMember(Name = "firstName")]
        public string firstName { get; set; }
        [DataMember(Name = "fullName")]
        public string fullName { get; set; }

        [DataMember(Name = "lastName1")]
        public string lastName1 { get; set; }

        [DataMember(Name = "lastName2")]
        public string lastName2 { get; set; }

        [DataMember(Name = "login")]
        public string login { get; set; }
        [DataMember(Name = "optionPermissions")]
        public string optionPermissions { get; set; }

        [DataMember(Name = "profileId")]
        public string profileId { get; set; }

        [DataMember(Name = "profiles")]
        public string profiles { get; set; }

        [DataMember(Name = "sapVendorId")]
        public string sapVendorId { get; set; }

        [DataMember(Name = "searchUser")]
        public string searchUser { get; set; }

        [DataMember(Name = "userId")]
        public string userId { get; set; }
    }
}