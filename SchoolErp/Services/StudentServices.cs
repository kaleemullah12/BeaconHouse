using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Dynamic;
namespace SchoolErp.Services
{
    public class StudentServices
    {

        InvictusSchoolEntities db = new InvictusSchoolEntities();
    

        // GET: StudentServices
        public void AddStudent(Student_Record rec)
        {
            rec.Admission_Date = DateTime.Now;
            db.Student_Records.Add(rec);
            db.SaveChanges();

        }

        public object List()
        {
            var obj = db.Student_Records.ToList().Select(x => new { x.Stud_Id, x.Name, x.Father_Name, x.DOB, x.Address, x.Roll_Number });

            return obj;
        }

        public void Remove(int id)
        {
            var rec = db.Student_Records.Find(id);
            db.Student_Records.Remove(rec);
            db.SaveChanges();
        }
        public void Update(Student_Record rec)
        {

            var ret = db.Student_Records.Where(x => x.Stud_Id == rec.Stud_Id).SingleOrDefault();
            ret.Stud_Id = rec.Stud_Id;
            ret.Name = rec.Name;
            ret.Father_Name = rec.Father_Name;
            ret.Address = rec.Address;
            ret.DOB = rec.DOB;
            ret.Password = rec.Password;
            ret.Roll_Number = rec.Roll_Number;
            ret.Gender = rec.Gender;
            ret.Admission_Date = ret.Admission_Date;
            db.SaveChanges();

        }




    }




}
