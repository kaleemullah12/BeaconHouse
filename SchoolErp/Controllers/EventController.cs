using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class EventController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: Event
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Event()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Event(Event rec)
        {
            if (Session["admin"] != null)
            {
                Eventservices services = new Eventservices();
                services.Event(rec);
                return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

    }
}