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
        public JsonResult Event(Event rec)
        {
            Eventservices services = new Eventservices();
            services.Event(rec);
            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }

    }
}