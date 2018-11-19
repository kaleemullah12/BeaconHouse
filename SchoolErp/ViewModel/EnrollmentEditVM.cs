using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.ViewModel
{
    public class EnrollmentEditVM
    {
        public int Enrol_ID { get; set; }
        public string classs { get; set; }
        public int classs_ID { get; set; }
        public string Section { get; set; }
        public int Section_ID { get; set; }
        public string Stud { get; set; }
        public int Stud_ID { get; set; }
        public string Staff { get; set; }
        public int Staff_ID { get; set; }
        public DateTime Sesstion_Start { get; set; }
        public DateTime Session_End { get; set; }

    }
}