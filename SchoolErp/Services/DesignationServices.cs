using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class DesignationServices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void AddDesignation(Designation rec)
        {
            db.Designations.Add(rec);
            db.SaveChanges();

        }

        public object List()
        {
            var obj = db.Designations.Select(x => new { x.Des_Id, x.Name, }).ToList();
            return obj;
        }
        public void Remove(int id)
        {
            var rec = db.Designations.Find(id);
            db.Designations.Remove(rec);
            db.SaveChanges();
        }
    }
}