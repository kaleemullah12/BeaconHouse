using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class CSTservices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void CST(CST rec)
        {

            db.CSTs.Add(rec);
            db.SaveChanges();

        }
    }
}