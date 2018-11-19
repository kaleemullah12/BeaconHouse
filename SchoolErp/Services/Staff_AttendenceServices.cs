using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class Staff_AttendenceServices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void Staff_Attendence(Staff_Attendence rec)
        {
            db.Staff_Attendence.Add(rec);
            db.SaveChanges();
        }
    }
}