using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class ParentsController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: Parents
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult AddParent()
        {
            var stud_list = db.Student_Records.ToList();
            var rel_list = db.Relations.ToList();
            ViewBag.stud = stud_list;
            ViewBag.rel = rel_list;
            return View();
        }
        [HttpPost]
        public JsonResult AddParent (Parent_Record pec)
        {
            ParentServices services = new ParentServices ();
            services.AddParent(pec);
            var stud_list = db.Student_Records.ToList();
            var rel_list = db.Relations.ToList();
            ViewBag.stud = stud_list;
            ViewBag.rel = rel_list;

            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
    }
}