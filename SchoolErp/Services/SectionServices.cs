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
            db.Sections.Add(rec);
            db.SaveChanges();
        }
    }
}