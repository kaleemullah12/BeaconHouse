using SchoolErp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolErp.Models;

namespace SchoolErp.Services
{
    public class Cl_SecService
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void Save(Class_SectionVM Rec)
        {
            var clasid = Rec.Classid;
            var sec_list = Rec.SectionList;
            foreach (var item in sec_list)
            {
                var VM = new Cl_Sec
                {
                    Class_Id = clasid,
                    Sec_Id = item.Section_Id
                };
                db.Cl_Sec.Add(VM);
                db.SaveChanges();
            }


        }
        public object GetList()
        {
            var rec = db.Cl_Sec.Select(c => new { c.Class_Id,c.Class.Name }).Distinct().ToList();
            return rec;
            
        }
        public void RemoveCl_Sec(int id)
        {
           var det= db.Cl_Sec.Where(o=>o.Class_Id == id).ToList();
            db.Cl_Sec.RemoveRange(det);
            db.SaveChanges();
        }
        public object GetCl_Sec(int id)
        {
            var det = db.Cl_Sec.Where(o => o.Class_Id == id).Select(o=>new {o.Class.Class_Id,o.Sec_Id,o.CS_Id,o.Section.Name }).ToList();
            return det;
        }
        public void Update(Class_SectionVM ret)
        {

            var clasid = ret.Classid;
            var sec_list = ret.SectionList;
            var det = db.Cl_Sec.Where(o => o.Class_Id == clasid).ToList();
            db.Cl_Sec.RemoveRange(det);
            db.SaveChanges();
            foreach (var item in sec_list)
            {
                var VM = new Cl_Sec
                {
                    Class_Id = clasid,
                    Sec_Id = item.Section_Id
                };
                db.Cl_Sec.Add(VM);
                db.SaveChanges();
            }

        }
    }
}