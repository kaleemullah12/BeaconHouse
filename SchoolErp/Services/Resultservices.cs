using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class Resultservices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void Result(Result rec)
        {

            db.Results.Add(rec);
            db.SaveChanges();

        }
    }
}