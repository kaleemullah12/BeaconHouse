$(document).ready(function () {
    clearform();
    GetList();
   
   
});


function clearform() {
    $('#Stud_Id').val('');
$('#password').val('');
     $('#st_name').val('');
     $('#father_name').val('');
     $('#Rollno').val('');
     $('#DOB').val('');
     $('#address').val('');
    //$("input[name='Gender']:checked").val('');
    
   

  
}

function Addstudent() {
    debugger;
    //preventDefault();
    var Stud_Id = $('#Stud_Id').val();
    var st_name = $('#st_name').val();
    var father = $('#father_name').val();
    var Rollno = $('#Rollno').val();
    var DOB = $('#DOB').val();
    var address = $('#address').val();
    var gender = $("input[name='Gender']:checked").val();
    var password = $('#password').val();

    if (st_name == "") {
        ShowError("Please Enter Student Name");
        return;
    }
    if (father == "") {
        ShowError("Please Enter Father Name");
        return;
    }
    if (Rollno == "") {
        ShowError("Please Enter Roll No");
        return;
    }
    if (DOB == "") {
        ShowError("Please Enter DOB");
        return;
    }
    if (address == "") {
        ShowError("Please Enter Address");
        return;
    }

    if (password == "") {
        ShowError("Please Enter Student Password");
        return;
    }
    if (gender == "") {
        ShowError("Please Enter Gender");
        return;
    }
  
            
    $.ajax({
        url: "/Students/AddStudent",
        type: "Post",

        data: {
            Stud_Id: Stud_Id,
            Name: st_name,
            Roll_Number: Rollno,
            Father_Name: father,
            DOB: DOB,
            Address: address,
            Password: password,
            Gender: gender,

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                clearform();
                GetList();
                //$('#gender').prop("checked", true);
                //$("input[name='gender']:checked").val('Male');
            } else if (data.data == "Edit") {
                ShowSuccess('Updated SuccessFully');
                clearform();
                GetList();
                //$('#gender').prop("checked", true);
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
        url: '/Students/StudentList',
        success: function (result) {

            var result = JSON.parse(result);
            for (var i = 0 ; i < result.length ; i++) {
                AddOption = '<tr id=' + result[i].stud_id + '><td>' + result[i].Name + '</td> <td>' + result[i].Father_Name + '</td> <td>' + result[i].Roll_Number + '</td> <td>' + result[i].DOB + '</td> <td>' + result[i].Address + '</td> <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Stud_Id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].Stud_Id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
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
        url: "/Students/RemoveStudent/" + id,
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
    //$("#txt1").css("border-color", "red");
    //$("#txt1").focus();
    //$("#txt2").css("border-color", "red");
    $("#Stud_Id").focus();
   
    $.ajax({

        url: "/Students/GetStudent/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
           
           
            $("#Stud_Id").val(result.Stud_Id)
            $("#st_name").val(result.Name);
            $("#father_name").val(result.Father_Name);
            $("#Rollno").val(result.Roll_Number);
           
            $("#DOB").val(result.DOB);
            $("#password").val(result.Password);
            $("#address").val(result.Address);
           // debugger;
            //alert("rightway");
           if (result.Gender.toUpperCase() === "MALE") {
                $('#gender').prop("checked", true);
            }
            else
            {
                $('#gender1').prop("checked", true);
            }
            

        },
        error: function (errormessage) {
            alert("Something is Wrong in Get Action");
        }
    });
}

