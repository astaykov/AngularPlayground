using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularTest.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            System.Diagnostics.Trace.WriteLine("Home/Index called");
            return View();
        }

        public ActionResult Angular()
        {
            System.Diagnostics.Trace.WriteLine("Home/Angular called");
            return View();
        }
    }
}
