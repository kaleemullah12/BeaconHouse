using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class SectionServices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void AddSection(Section rec)
        {
            if (rec.Section_Id == 0)
            {
                db.Sections.Add(rec);
                db.SaveChanges();
            }
            else
            {
              var find=db.Sections.Find(rec.Section_Id);
                find.Name = rec.Name;
                find.Staff_Id = rec.Staff_Id;
                db.SaveChanges();
            }
        }
        public object GetSection()
        {
            var res = db.Sections.ToList().Select(o => new { o.Section_Id, Staff=o.Staff.Name, o.Name });
            return res;
        }
        public void RemoveSection(int id)
        {
            var rec = db.Sections.Find(id);
            db.Sections.Remove(rec);
            db.SaveChanges();
        }
           
        public object GetEdit(int id)
        {
           var ret= db.Sections.Where(x => x.Section_Id == id).Select(o => new { o.Section_Id, o.Staff_Id, o.Name }).SingleOrDefault();
            return ret;
        }
    }
    
}