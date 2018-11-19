using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.Services
{
    public class Eventservices
    {
        InvictusSchoolEntities db = new InvictusSchoolEntities();
        // GET: StudentServices
        public void Event(Event rec)
        {

            db.Events.Add(rec);
            db.SaveChanges();

        }
    }
}