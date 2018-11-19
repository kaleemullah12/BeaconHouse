using SchoolErp.Models;
using SchoolErp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolErp.Services;

namespace SchoolErp.Controllers
{
    public class Cl_SecController : Controller
    {
        Cl_SecService service = new Cl_SecService();
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: Cl_Sec
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetList()
        {
            var list = service.GetList();
            return Json(list, JsonRequestBehavior.AllowGet);


        }
        public ActionResult Create()
        {
            if(Session["admin"] != null) { 
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;
            return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        [HttpPost]
        public JsonResult Save(Class_SectionVM rec)
        {
            service.Save(rec);
            return Json(new { msg="Save"},JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveCl_Sec(int id)
        {
            if (Session["admin"] != null)
            {
                service.RemoveCl_Sec(id);
                return Json(new { msg = "Done" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult GetCl_Sec(int id)
        {
            if (Session["admin"] != null)
            {
                var det = service.GetCl_Sec(id);
                return Json(det, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult Update(Class_SectionVM det)
        {
           
            service.Update(det);
            return Json(new { msg = "Done" }, JsonRequestBehavior.AllowGet);
        }
    }
}