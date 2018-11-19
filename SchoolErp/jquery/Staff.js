
$(document).ready(function () {
    clearform();
    GetList();
});


function clearform() {
    $('#S_Id').val('');
    $('#S_Name').val('');
    $('#S_CNIC').val('');
    $('#S_DOB').val('');
    $('#S_Cellnumb').val('');
    $('#S_Salary').val('');
    $('#gender').val('');
    $("#S_Designation").val('');
    $('#S_Designation').trigger('change');
    $("#S_Qualification").val('');
    $('#S_Qualification').trigger('change');
    $('#S_Detail').val('');
    $('#S_Address').val('');


}

function AddStaff() {
    debugger;

    //preventDefault();
    var S_Id = $('#S_Id').val();
    var name = $('#S_Name').val();
    
    var cnic = $('#S_CNIC').val();
    var dob = $('#S_DOB').val();
    var cellnumb = $('#S_Cellnumb').val();
    var salary = $('#S_Salary').val();
  
    var gender = $("input[name='Gendr']:checked").val();
   // var radios = $("input[type='radio']");
   //var det= radios.filter(":checked");
    var Des = $('#S_Designation option:selected').val();
    var Qualif = $('#S_Qualification option:selected').val();
    var Det = $('#S_Detail').val();
    var address = $('#S_Address').val();

    if (name == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (cnic == "") {
        ShowError("Please Enter CNIC");
        return;
    }
    if (dob == "") {
        ShowError("Please Enter DOB");
        return;
    }
    if (cellnumb == "") {
        ShowError("Please Enter CELL NUMBER");
        return;
    }
    if (salary == "") {
        ShowError("Please Enter Salary");
        return;
    }

    if (Des == "") {
        ShowError("Please Enter Designation");
        return;
    }
    if (gender == "") {
        ShowError("Please Enter Gender");
        return;
    }
    if (Qualif == "") {
        ShowError("Please Enter Qualification");
        return;
    }
    if (address == "") {
        ShowError("Please Enter Address");
        return;
    }
    if (Det == "") {
        ShowError("Please Enter Detail");
        return;
    }

   



    $.ajax({
        url: "/Staff/AddStaff",
        type: "Post",

        data: {
            Staff_Id:S_Id,
            Name: name,
            CNIC: cnic,
            DOB: dob,
            Address: address,
            Cell_Number: cellnumb,
            Salary: salary,
            Qualification_Id: Qualif,
            Designation_Id: Des,
            Detail: Det,
            Gender: gender,

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                clearform();
                GetList();
            } else {
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
function GetList() {
    //debugger;
    $('#tbllist').html('');
    $.ajax({
        type: 'GET',
        dataType: 'html',
        //dataType: 'application/json',
        url: '/Staff/StaffList',
        success: function (result) {

            var result = JSON.parse(result);
            debugger;
            for (var i = 0; i < result.length; i++) {
                AddOption = '<tr id=' + result[i].Staff_id + '><td>' + result[i].Name + '</td> <td>' + result[i].Cell_Number + '</td> <td>' + result[i].Address + '</td> <td>' + result[i].CNIC + '</td> <td>' + result[i].Qualification1 + '</td> <td>' +/* result[i].Detail + '</td> <td>' +*/ /*'</td> <td>' +*//* result[i].Salary + '</td> <td>' +*//* result[i].DOB + '</td> <td>' +*/ result[i].design + '</td> <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Staff_Id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].Staff_Id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
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
        url: "/Staff/RemoveStaff/" + id,
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
            alert("You cannot Delete.");
        }
    });

}

function GetId(id) {
    debugger;
   
    $("#S_Id").focus();

    $.ajax({

        url: "/Staff/GetStaff/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            debugger;
            $('#S_Id').val(result.Staff_Id);
            //$("#Staff_Id").val(result.Staff_Id)
            $("#S_Name").val(result.Name);
            $("#S_CNIC").val(result.CNIC);
            $("#S_DOB").val(result.dob);
            

            $("#S_Cellnumb").val(result.Cell_Number);
            $("#S_Qualification").val(result.Qualification_Id);
            $("#S_Designation").val(result.Designation_Id);
            $("#S_Address").val(result.Address);
            $("#S_Salary").val(result.Salary);
            $("#S_Detail").val(result.Detail);
            //debugger;
            //alert("rightway");
            if (result.Gender.toUpperCase() === "MALE") {
                $('#gen1').prop("checked", true);
            }
            else {
                $('#gen2').prop("checked", true);
            }

        },
        error: function (errormessage) {
            alert("Something is Wrong in Get Action");
        }
    });
}
