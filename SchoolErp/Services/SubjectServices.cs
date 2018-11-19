using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class SubjectServices
    {

        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void AddSubject(Subject rec)
        {
            db.Subjects.Add(rec);
            db.SaveChanges();
        }
    }
}