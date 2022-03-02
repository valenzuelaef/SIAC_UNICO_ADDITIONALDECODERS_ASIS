using System.Web.Mvc;
using System.Web.Optimization;

namespace Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos
{
    public class AdditionalDecosAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "AdditionalDecos";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "AdditionalDecos_default",
                "AdditionalDecos/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            RegisterBundles(BundleTable.Bundles);
        }

        private void RegisterBundles(BundleCollection bundles)
        {
            Claro.SIACU.App.AdditionalDecos.Areas.AdditionalDecos.Utils.BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}