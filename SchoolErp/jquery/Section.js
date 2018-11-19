
$(document).ready(function () {
    GetList();
    clearform();
});


function clearform() {
    $('#S_Name').val('');
    $('#S_ID').val('');

    $("#S_Staff").val('');
    $('#S_Staff').trigger('change');
   


}

function AddSection() {
    debugger;
    //preventDefault();
    var S_ID = $('#S_ID').val();
    var name = $('#S_Name').val();
   
    
   
    var st = $('#S_Staff option:selected').val();
    

    if (name == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (st == "") {
        ShowError("Please Enter Incharge name");
        return;
    }
      
   

    $.ajax({
        url: "/Class/AddSection",
        type: "Post",

        data: {
            Name: name,
            Section_Id:S_ID,
            Staff_Id: st,
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                clearform();
                GetList();
            } else {
                ShowSuccess('Updated SuccessFully');
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
    debugger;
    $('#tbllist').html('');
    $.ajax({
        type: 'GET',
        dataType: 'html',
        //dataType: 'application/json',
        url: '/Class/GetSection',
        success: function (result) {

            var result = JSON.parse(result);
            debugger;
            for (var i = 0; i < result.length; i++) {
                AddOption = '<tr id=' + result[i].Section_Id + '><td>' + result[i].Name + '</td> <td>' + result[i].Staff + '</td>  <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Section_Id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].Section_Id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
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
        url: "/Class/RemoveSection/" + id,
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
        }
    });
}


function GetId(id) {
    debugger;
    //$("#txt1").css("border-color", "red");
    //$("#txt1").focus();
    //$("#txt2").css("border-color", "red");
    $("#S_ID").focus();

    $.ajax({

        url: "/Class/GetEdit/" + id,
        typr: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            debugger;


            $("#S_ID").val(result.Section_Id);
            $("#S_Name").val(result.Name);
            $("#S_Staff").val(result.Staff_Id);
        },
        error: function (errormessage) {
            alert("Something is Wrong in Get Action");
        }
    });
}