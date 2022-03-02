using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Utils
{
    public static class Common
    {
        public static string GetTransactionID()
        {
            Random rd = new Random(Guid.NewGuid().GetHashCode());
            return DateTime.Now.ToString("yyyyMMddHHMMss") + rd.Next(100, 999).ToString();
        }

        public static string GetApplicationIp()
        {
            return Convert.ToString(HttpContext.Current.Request.ServerVariables["LOCAL_ADDR"]);
        }

        public static string GetApplicationName()
        {
            return Convert.ToString(HttpContext.Current.Request.ServerVariables["SERVER_NAME"]);
        }

        [Browsable(false)]
        public static string CurrentUser
        {
            get
            {
                string strDomainUser = HttpContext.Current.Request.ServerVariables["LOGON_USER"];
                string strUser = ConfigurationManager.AppSettings["TestUser"];

                if (string.IsNullOrEmpty(strUser))
                {
                    strUser = strDomainUser.Substring(strDomainUser.IndexOf("\\", System.StringComparison.Ordinal) + 1);
                }

                return strUser.ToUpperInvariant();
            }
        }

        public static TAudit CreateAuditRequest<TAudit>(string strIdSession)
        {
            TAudit audit = Activator.CreateInstance<TAudit>();
            foreach (PropertyInfo propertyInfo in audit.GetType().GetProperties())
            {
                if (propertyInfo.Name.ToString().ToUpperInvariant() == Tools.Utils.Constants.Transaction)
                {
                    propertyInfo.SetValue(audit, GetTransactionID());
                }
                if (propertyInfo.Name.ToString().ToUpperInvariant() == Tools.Utils.Constants.ApplicationName)
                {
                    propertyInfo.SetValue(audit, GetApplicationName());
                }
                if (propertyInfo.Name.ToString().ToUpperInvariant() == Tools.Utils.Constants.IpAddress)
                {
                    propertyInfo.SetValue(audit, GetApplicationIp());
                }
                if (propertyInfo.Name.ToString().ToUpperInvariant() == Tools.Utils.Constants.UserName)
                {
                    propertyInfo.SetValue(audit, CurrentUser);
                }
                if (propertyInfo.Name.ToString().ToUpperInvariant() == Tools.Utils.Constants.Session)
                {
                    propertyInfo.SetValue(audit, strIdSession);
                }
            }
            return audit;
        }

    }
}