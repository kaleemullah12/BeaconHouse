using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class ClassController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        ClassServices services = new ClassServices();
        // GET: Class
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddClass()
        {
                return View();
        }
        [HttpPost]
        public JsonResult AddClass(Class rec)
        {
            if (rec.Class_Id == 0)
            {
                services.AddClass(rec);
                
                return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                services.Update(rec);
                return Json(new { data = "Edit" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetList()
        {
           var list= services.List();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveClass(int id)
        {
            if (Session["admin"] != null)
            {
                services.Remove(id);
                return Json(new { msg = "Done" }, JsonRequestBehavior.AllowGet);
            }
            else
            {

                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult GetClass(int id)
        {
            if (Session["admin"] != null)
            {
                var det = db.Classes.Find(id);
                return Json(det, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }


        [HttpGet]
        public ActionResult AddSection()
        {
           
            var st_list = db.Staffs.ToList();
           
            ViewBag.st = st_list;
            return View();
        }
        [HttpPost]
        public JsonResult AddSection(Section rec )
        {
            SectionServices services = new SectionServices();
            services.AddSection(rec);
           
            var st_list = db.Staffs.ToList();
           
            ViewBag.st = st_list;

            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult AddSubject()
        {
          
            return View();
        }
        [HttpPost]
        public JsonResult AddSubject(Subject rec)
        {
            SubjectServices services = new SubjectServices();
            services.AddSubject(rec);
           

            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
    }
}
