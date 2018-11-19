$(document).ready(function () {
    debugger;
    clearform();
    GetList();
   
});


function clearform() {
    $('#enrollId').val('');
    $("#E_Roll").val('');
    $('#E_Roll').trigger('change');
    $("#E_Class").val('');
    $('#E_Class').trigger('change');
    $("#E_Staff").html('');
    $('#E_Startdate').val('');
    $('#E_Enddate').val('');


}

function Student_Enrolment() {
    debugger;
    //preventDefault();

    var id = $('#enrollId').val();
    var rl = $('#E_Roll option:selected').val();
    var cl = $('#E_Class option:selected').val();
    var sec = $('#E_Section option:selected').val();
    var st = $('#E_Staff option:selected').val();
    var date1 = $('#E_Startdate').val();
    var date2 = $('#E_Enddate').val();

    if (rl == "") {
        ShowError("Please Enter  Roll Number");
        return;
    }
    if (cl == "") {
        ShowError("Please Enter Class");
        return;
    }
    if (sec == "") {
        ShowError("Please Enter Section");
        return;
    }
    if (st == "") {
        ShowError("Please Enter Incharge Name");
        return;
    }
    if (date1 == "") {
        ShowError("Please Enter StartDate ");
        return;
    }

    if (date2 == "") {
        ShowError("Please Enter Enddate");
        return;
    }
   

    $.ajax({
        url: "/Students/Student_Enrolment",
        type: "Post",

        data: {
            Enrolment_Id: id,
            Stud_Id: rl,
            Class_Id: cl,
            Section_Id: sec,
            Staff_Id: st,
            Session_Start: date1,
            Session_End: date2,
            

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                clearform();
                GetList();
            } else  {
                ShowSuccess('Update SuccessFully');
                clearform();
                GetList();
            }
        },
        error: function (error) {
            ShowError('Error in saving');
        },

    });
}
function GetSection() {
    $("#E_Section").html('');
   
    var classId = $('#E_Class').val();
    $.ajax({
        url: "/Students/GetSection/" + classId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            debugger;
            $('#E_Section').append($("<option>Select.......</option>"));
            //$.each(data, function (index, value) {
            for (var i = 0; i < data.length; i++){

                $("#E_Section").append($("<option />").val(data[i].Sec_Id).text(data[i].Name));
            //});
            }
        },
        
    });
}
function GetStaff() {
    $("#E_Staff").html('');
    var Sectionid = $('#E_Section').val();
    $.ajax({
        url: "/Students/GetStaff/" + Sectionid,
        type: "GET",
        dataType: "json",
        success: function (data) {
            debugger;
            $('#E_Staff').append($("<option>Select.......</option>"));
            //$.each(data, function (index, value) {
            for (var i = 0; i < data.length; i++) {
              
                $("#E_Staff").append($("<option />").val(data[i].Staff_Id).text(data[i].Name));
                //});
            }
        },
        
    });
}
function GetList() {
    //debugger;
    $('#tbllist').html('');
    $.ajax({
        type: 'GET',
        dataType: 'html',
        //dataType: 'application/json',
        url: '/Students/StudentEnrolmentList',
        success: function (result) {
            debugger;
            var result = JSON.parse(result);

            for (var i = 0; i < result.length; i++) {
                AddOption = '<tr><td>' + result[i].StudentName + '</td> <td>' + result[i].ClassName + '</td> <td>' + result[i].SectionName + '</td> <td>' + result[i].StaffName + '</td> <td>' + result[i].Starttime + '</td> <td>' + result[i].Endtime + '</td><td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
                $('#tbllist').append(AddOption);
            }



        },
        error: function (error) {
        }
    });
}
function Delete(id) {
    debugger;
    $.ajax({
        url: "/Students/RemoveEnroll/" + id,
        type: "POST",

        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            if (result.msg == "Done") {
                ShowSuccess('Delete SuccessFully');
                GetList();
            }

        },
        Error: function (errormessage) {
            ShowError("You cannot Delete.");
        },
    });

}


function GetId(id) {
    
    $("#enrollId").focus();
  
    debugger;
    $.ajax({
        url: "/Students/GetEnroll/" + id,
        type: "GET",
        datatype: "json",
        success: function (result) {
            debugger;
            
            $("#enrollId").val(result.Enrolment_Id);
            $("#E_Roll").val(result.roll);
            $("#E_Class").val(result.Class_Id);
            
            $("#E_Section").append($("<option />").val(result.Section_Id).text(result.Section));
            $("#E_Staff").append($("<option />").val(result.Staff_Id).text(result.Staff));           
            $("#E_Startdate").val(result.Starttime);
            $("#E_Enddate").val(result.EndTime);

        },
        error: function (errormessage) {
            ShowError("Something is Wrong in Get Action");
        },
    });
}


