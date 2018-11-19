using SchoolErp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolErp.ViewModel
{
    public class Class_SectionVM
    {
        public int Classid { get; set; }
        public List<Section> SectionList { get; set; }
    }
}