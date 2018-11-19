using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class StudentsController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        StudentServices services = new StudentServices();
        EnrolmentServices enrl_service = new EnrolmentServices();
        // GET: Students
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public ActionResult AddStudent()
        {
            if (Session["admin"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        [HttpPost]
        public JsonResult AddStudent(Student_Record rec)
        {
            if (rec.Stud_Id == 0)
            {
                services.AddStudent(rec);
                return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                services.Update(rec);
                return Json(new { data = "Edit" }, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult StudentList()
        {
            var list = services.List();
            return Json(list, JsonRequestBehavior.AllowGet);

        }

        public ActionResult RemoveStudent(int id)
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

        [HttpGet]
        public ActionResult GetStudent(int id)
        {
            if (Session["admin"] != null)
            {
                var det = db.Student_Records.Find(id);
                return Json(det, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        public ActionResult AddParents()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult Student_Enrolment()
        {
            if (Session["admin"] != null)
            {
                var stud_list = db.Student_Records.ToList();
                ViewBag.stud = stud_list;
                var cl_list = db.Classes.ToList();
                ViewBag.cl = cl_list;
                //var sec_list = db.Cl_Sec.Include("").Where(x => x.Sec_Id == );
                //ViewBag.sec = sec_list;
                var st_list = db.Staffs.ToList();
                ViewBag.st = st_list;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }
        [HttpPost]
        public ActionResult Student_Enrolment(Student_Enrolment rec)
        {
            if (Session["admin"] != null)
            {
                EnrolmentServices services = new EnrolmentServices();
                if (rec.Enrolment_Id == 0)
                {
                    services.Student_Enrolment(rec);
                    var stud_list = db.Student_Records.ToList();
                    ViewBag.stud = stud_list;
                    var cl_list = db.Classes.ToList();
                    ViewBag.cl = cl_list;
                    return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    services.Student_Enrolment(rec);
                    var stud_list = db.Student_Records.ToList();
                    ViewBag.stud = stud_list;
                    var cl_list = db.Classes.ToList();
                    ViewBag.cl = cl_list;
                    return Json(new { msg = "Update" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
                    
        }

        public ActionResult GetSection(int Id)
        {
            var list = db.Cl_Sec.Where(x => x.Class_Id == Id).Select(c=> new { c.Sec_Id,c.Section.Name}).ToList();
            
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetStaff(int Id)
        {
            var list = db.Cl_Sec.Where(x => x.Sec_Id == Id).Select(c => new { c.Section.Staff_Id, c.Section.Staff.Name }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult StudentEnrolmentList()
        {
          var rec=  enrl_service.StudentEnrolmentList();
            return Json(rec,JsonRequestBehavior.AllowGet);
        }
        public ActionResult RemoveEnroll(int id)
        {
            enrl_service.RemoveEnroll(id);
            return Json(new { msg = "Done" }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetEnroll(int id)
        {
            var rec=enrl_service.GetEnroll(id);
            return Json(rec, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult AddAttendence()
        {
            if (Session["admin"] != null)
            {
                var cl_list = db.Classes.ToList();
                ViewBag.cl = cl_list;
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
            
        }
        [HttpPost]
        public JsonResult AddAttendence(Attendence rec)
        {

            S_AttendenceServices services = new S_AttendenceServices();
            services.AddAttendence(rec);
            var stud_list = db.Student_Records.ToList();
            ViewBag.stud = stud_list;
            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStudAttend(int id)
        {
            S_AttendenceServices service = new S_AttendenceServices();
            var rec=service.GetStudAttend(id);
            return Json(rec, JsonRequestBehavior.AllowGet);
        }



    }

}