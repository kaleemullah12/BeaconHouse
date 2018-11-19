using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class S_AttendenceServices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void AddAttendence(Attendence rec)
        {
            db.Attendences.Add(rec);
            db.SaveChanges();
        }

    }
}