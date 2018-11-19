using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class StaffController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: Staff
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult AddStaff()
        {
            if (Session["admin"] != null)
            {
                var Des_list = db.Designations.ToList();
                var Qualif_list = db.Qualifications.ToList();
                ViewBag.Des = Des_list;
                ViewBag.Qualif = Qualif_list;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
            
        }
        [HttpPost]
        public JsonResult AddStaff(Staff rec)
        {
            if (rec.Staff_Id == 0) { 
            StaffServices services = new StaffServices();
            services.AddStaff(rec);
            var Des_list = db.Designations.ToList();
            var Qualif_list = db.Qualifications.ToList();
            ViewBag.stud = Des_list;
            ViewBag.rel = Qualif_list;

            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                StaffServices service = new StaffServices();
                service.Update(rec);
                var Des_list = db.Designations.ToList();
                var Qualif_list = db.Qualifications.ToList();
                ViewBag.stud = Des_list;
                ViewBag.rel = Qualif_list;
                return Json(new { msg = "Update" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult StaffList()
        {
            StaffServices services = new StaffServices();
            var list = services.List();
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult RemoveStaff(int id)
        {
            StaffServices services = new StaffServices();
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

        [HttpGet]
        public ActionResult GetStaff(int id)
        {
            if (Session["admin"] != null)
            {
                StaffServices services = new StaffServices();
               var dt= services.GetStaff(id);
                return Json(dt, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }



        [HttpGet]
        public ActionResult AddDesignation()
        {
            return View();
        }
        [HttpPost]
        public JsonResult AddDesignation(Designation rec)
        {
            DesignationServices services = new DesignationServices();
            services.AddDesignation(rec);
            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DesignationList()
        {
            DesignationServices services = new DesignationServices();
            var list = services.List();
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult RemoveDesignation(int id)
        {
            DesignationServices services = new DesignationServices();
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
        public ActionResult AddSalary()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Staff_Attendence()
        {
            var stf_list = db.Staffs.ToList();
            ViewBag.st = stf_list;
            return View();
        }
        [HttpPost]
        public JsonResult Staff_Attendence(Staff_Attendence rec)
        {
            Staff_AttendenceServices services = new Staff_AttendenceServices();
            services.Staff_Attendence(rec);
            var stf_list = db.Staffs.ToList();
            ViewBag.st = stf_list;
            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
    }
}