using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class ClassServices
    {


        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void AddClass(Class rec)
        {
           
            db.Classes.Add(rec);
            db.SaveChanges();

        }
        public object List()
        {
            var obj = db.Classes.Select(x => new { x.Class_Id,x.Name, x.Fees }).ToList();
            return obj;
        }

        public void Remove(int id)
        {
            var rec = db.Classes.Find(id);
            db.Classes.Remove(rec);
            db.SaveChanges();
        }

        public void Update(Class rec)
        {

            var ret = db.Classes.Where(x => x.Class_Id == rec.Class_Id).SingleOrDefault();
            ret.Class_Id = rec.Class_Id;
            ret.Name = rec.Name;
            ret.Fees = rec.Fees;
            db.SaveChanges();

        }
    }
}