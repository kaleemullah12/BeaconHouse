using SchoolErp.Models;
using SchoolErp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class EnrolmentServices
    {

        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void Student_Enrolment(Student_Enrolment rec)
        {
            if (rec.Enrolment_Id ==0)
            {
                db.Student_Enrolments.Add(rec);
                db.SaveChanges();
            }
            else
            {
                var det = db.Student_Enrolments.Find(rec.Enrolment_Id);
                det.Class_Id = rec.Class_Id;
                det.Section_Id = rec.Section_Id;
                det.Staff_Id = rec.Staff_Id;
                det.Stud_ID = rec.Stud_ID;
                det.Session_Start = rec.Session_Start;
                det.Session_End = rec.Session_End;
                db.SaveChanges();
            }
        }
        public object StudentEnrolmentList()
        {
            var obj = db.Student_Enrolments.ToList().Select(x => new {id= x.Enrolment_Id, StudentName =  x.Student_Record.Name, ClassName = x.Class.Name, SectionName= x.Section.Name,StaffName=x.Staff.Name,Starttime=x.Session_Start.ToShortDateString(), Endtime= x.Session_End.ToShortDateString() });
            
            return obj;

        }
        public object GetEnroll(int id)
        {
            var det = db.Student_Enrolments.Where(x => x.Enrolment_Id == id).Select(o => new { o.Enrolment_Id,roll=o.Stud_ID ,o.Class_Id, o.Class.Name, o.Section_Id, Section = o.Section.Name, o.Staff_Id, Staff = o.Staff.Name, Starttime= o.Session_Start.ToString(),EndTime= o.Session_End.ToString()}).SingleOrDefault();
            //EnrollmentEditVM getEnrol = new EnrollmentEditVM();

            return det;
        }
      public void RemoveEnroll(int id)
        {
           var det= db.Student_Enrolments.Where(x => x.Enrolment_Id == id).SingleOrDefault();
            db.Student_Enrolments.Remove(det);
            db.SaveChanges();
        }
    }
}