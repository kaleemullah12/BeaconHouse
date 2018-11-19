using SchoolErp.Models;
using SchoolErp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class ExamController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SchoolSchedule()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Exam_Schedule()
        {
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;
            return View();
        }
        [HttpPost]
        public JsonResult Exam_Schedule(Exam_Schedule rec)
        {
            ExamScheduleservices services = new ExamScheduleservices();
            services.Exam_Schedule(rec);
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;



            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Result()
        {
            var stud_list = db.Student_Records.ToList();
            ViewBag.st = stud_list;
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;
            return View();
        }
        [HttpPost]
        public JsonResult Result(Result rec)
        {
            Resultservices services = new Resultservices();
            services.Result(rec);
            var stud_list = db.Student_Records.ToList();
            ViewBag.st = stud_list;
            var sub_list = db.Subjects.ToList();
            ViewBag.sb = sub_list;
            var sec_list = db.Sections.ToList();
            ViewBag.sc = sec_list;
            var cal_list = db.Classes.ToList();
            ViewBag.cl = cal_list;



            return Json(new { msg = "save" }, JsonRequestBehavior.AllowGet);
        }
    }
}