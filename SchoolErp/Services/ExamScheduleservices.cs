using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class ExamScheduleservices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void Exam_Schedule(Exam_Schedule rec)
        {

            db.Exam_Schedules.Add(rec);
            db.SaveChanges();

        }
    }
}