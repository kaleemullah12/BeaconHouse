using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class StaffServices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        public void AddStaff(Staff rec)
        {
            db.Staffs.Add(rec);
            db.SaveChanges();
        }

        public object List()
        {
            var obj = db.Staffs.ToList().Select(x => new { x.Staff_Id, x.Name, x.Cell_Number, x.CNIC, x.Address, x.Detail,design=x.Designation_Id,x.Salary,dob=x.DOB.ToString(),x.Qualification.Qualification1,x.Gender});

            return obj;
        }
        public void Remove(int id)
        {
            var rec = db.Staffs.Find(id);
            db.Staffs.Remove(rec);
            db.SaveChanges();
        }
        public object GetStaff(int id)
        {
            var det = db.Staffs.Where(x => x.Staff_Id == id).Select(c => new { c.Staff_Id,c.Name,c.Gender, c.Salary, c.Address, c.Cell_Number, c.CNIC, c.Designation_Id, c.Qualification_Id, c.Qualification.Qualification1, dob = c.DOB.ToString(), c.Detail }).SingleOrDefault();
            return det;
        }
        public void Update(Staff rec)
        {

            var ret = db.Staffs.Where(x => x.Staff_Id == rec.Staff_Id).SingleOrDefault();
            ret.Staff_Id = rec.Staff_Id;
            ret.Name = rec.Name;
            ret.Cell_Number = rec.Cell_Number;
            ret.Address = rec.Address;
            ret.DOB = rec.DOB;
            ret.Designation_Id = rec.Designation_Id;
            ret.Qualification_Id = rec.Qualification_Id;
            ret.Gender = rec.Gender;
            ret.CNIC = ret.CNIC;
            db.SaveChanges();

        }


    }
}