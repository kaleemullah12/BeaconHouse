using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class SubjectController : Controller
    {

        InvictusSchoolEntities db = new InvictusSchoolEntities();

        // GET: Subject
        public ActionResult Index()
        {
            return View();
        }
       
        [HttpGet]
        public ActionResult CST()
        {
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var sat_list = db.Staffs.ToList();
            ViewBag.st = sat_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;
            return View();
        }
        [HttpPost]
        public JsonResult CST(CST rec)
        {
            CSTservices services = new CSTservices();
            services.CST(rec);
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var sat_list = db.Staffs.ToList();
            ViewBag.st = sat_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;



            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
    }
}