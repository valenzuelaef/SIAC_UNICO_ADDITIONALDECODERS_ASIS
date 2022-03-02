using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Utils
{
    public class RestService
    {
        private static WebHeaderCollection GetHeaders(Hashtable table)
        {
            WebHeaderCollection Headers = new WebHeaderCollection();
            foreach (DictionaryEntry entry in table)
            {
                Headers.Add(entry.Key.ToString(), entry.Value != null ? entry.Value.ToString() : null);
            }
            Headers.Add("Authorization", "Basic " + System.Configuration.ConfigurationManager.AppSettings["strEncriptSiacu"]);

            return Headers;
        }

        public static T PostInvoque<T>(string name, object Audit, object obj, bool osb)
        {
            HttpWebRequest request = HttpWebRequest.Create(name) as HttpWebRequest;
            request.Method = "POST";
            request.Headers = GetHeaders(paramHeaderOsb(Audit));
            request.Accept = "application/json";
            request.Timeout = 900000; //Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["strTimeOut"]);
            JavaScriptSerializer Serializer = new JavaScriptSerializer();
            string data = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
            byte[] byteArray = Encoding.UTF8.GetBytes(data);
            request.ContentType = "application/json";
            request.ContentLength = byteArray.Length;
            Stream dataStream = request.GetRequestStream();
            dataStream.Write(byteArray, 0, byteArray.Length);
            dataStream.Close();
            try
            {
                WebResponse ws = request.GetResponse();
                using (Stream stream = ws.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(stream, Encoding.UTF8);
                    String responseString = reader.ReadToEnd();
                    T result = JsonConvert.DeserializeObject<T>(responseString);
                    return result;
                }
            }
            catch (WebException ex)
            {
                WebResponse ws = ex.Response;
                String responseString = string.Empty;
                using (Stream stream = ws.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(stream, Encoding.UTF8);
                    responseString = reader.ReadToEnd();
                    Tools.Traces.Logging.Error("", "responseString catch-WebException", responseString);
                }
                throw new Exception(string.Format("{0} - {1}", ex.Message, responseString));
            }
            catch (Exception ex2)
            {
                Tools.Traces.Logging.Error("", "responseString catch", ex2.ToString());
                throw;
            }
        }

        public static Hashtable paramHeader(object obj)
        {
            Hashtable paramHeaders = new Hashtable();
            PropertyInfo[] props = obj.GetType().GetProperties();
            foreach (PropertyInfo p in props)
            {
                object valor = p.GetValue(obj, null);
                if (p.Name.Equals("Transaction"))
                {
                    paramHeaders.Add("idTransaccion", valor);
                    paramHeaders.Add("msgid", valor);
                }
                else if (p.Name.Equals("UserName"))
                {
                    paramHeaders.Add("userId", valor);
                }
            }
            paramHeaders.Add("timestamp", DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ssZ"));
            return paramHeaders;
        }

        public static Hashtable paramHeaderOsb(object obj)
        {
            Hashtable paramHeaders = new Hashtable();
            PropertyInfo[] props = obj.GetType().GetProperties();
            foreach (PropertyInfo p in props)
            {
                object valor = p.GetValue(obj, null);
                if (p.Name.Equals("Transaction"))
                {
                    paramHeaders.Add("idTransaccionESB", valor);
                    paramHeaders.Add("idTransaccionNegocio", valor);
                    paramHeaders.Add("idTransaccion", valor);
                }
                else if (p.Name.Equals("UserName"))
                {
                    paramHeaders.Add("usuarioSesion", valor);
                    paramHeaders.Add("userId", valor);
                }
            }
            paramHeaders.Add("canal", System.Configuration.ConfigurationManager.AppSettings["strCanal"]);
            paramHeaders.Add("idAplicacion", System.Configuration.ConfigurationManager.AppSettings["strIdAplicacion"]);
            paramHeaders.Add("usuarioAplicacion", System.Configuration.ConfigurationManager.AppSettings["strIdTransaccionESB"]);
            paramHeaders.Add("fechaInicio", DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ssZ"));
            paramHeaders.Add("nodoAdicional", System.Configuration.ConfigurationManager.AppSettings["strNodoAdicional"]);
            //paramHeaders.Add("timestamp", DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
            paramHeaders.Add("timestamp", DateTime.Now.ToString("yyyy-MM-ddThh:mm:ss.fffZ"));
            return paramHeaders;
        }
    }
}