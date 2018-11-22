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
        public object GetStudAttend(int id)
        {
            var rec = db.Student_Enrolments.Where(x => x.Section_Id == id).Select(o => new { o.Stud_ID, o.Student_Record.Roll_Number }).ToList();
            return rec;
        }
    }
}