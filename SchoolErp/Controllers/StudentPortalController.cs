using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class StudentPortalController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentPortal
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult S_Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult S_Login(Student_Record data)
        {

            var rec = db.Student_Records.Where(x => x.Roll_Number == data.Roll_Number && x.Password == data.Password).SingleOrDefault();
            Session["admin"] = rec;
            if (Session["Admin"] != null)
            {
                return RedirectToAction("S_Portal");
            }
            else
            {
                ViewBag.msg = "Your User Name Or Password is Incorrect!!";
                return View();
            }
        }
        public ActionResult S_Portal()
        {
            return View();
        }

    }
}