using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class ParentServices
    {


        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void AddParent(Parent_Record pec)
        {
            
            db.Parent_Records.Add(pec);
            db.SaveChanges();

        }
    }
}