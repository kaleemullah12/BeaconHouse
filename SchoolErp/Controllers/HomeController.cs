using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolErp.Controllers
{
    public class HomeController : Controller
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public ActionResult menu()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult Login(Admin data)
        {

            var rec = db.Admins.Where(x => x.User_Name == data.User_Name && x.Password == data.Password).SingleOrDefault();
            Session["admin"] = rec;
            if (Session["Admin"] != null)
            {
                return RedirectToAction("Dashboard");
            }
            else
            {
                ViewBag.msg = "Your User Name Or Password is Incorrect!!";
                return View();
            }
        }
        public ActionResult Dashboard()
        {
            if (Session["admin"] != null)
            {
                var list = db.Student_Records.ToList();
                ViewBag.total = list.Count();
                var li = db.Classes.ToList();
                ViewBag.cl = li.Count();
                var sc = db.Staffs.ToList();
                ViewBag.sec = sc.Count();
                return View();
            }
            return RedirectToAction("Login");
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login");
        }
    }
}