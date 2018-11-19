
$(document).ready(function () {
    clearform();
    GetList();
});


function clearform() {
    $('#C_Name').val('');
    $('#Fees').val('');
    $('#C_ID').val('');


}
function GetList() {
    debugger;
    $('#tbllist').html('');
    $.ajax({
        type: 'GET',
        dataType: 'html',
        //dataType: 'application/json',
        url: '/Class/GetList',
        success: function (result) {

            var result = JSON.parse(result);
            for (var i = 0 ; i < result.length ; i++) {
                AddOption = '<tr id=' + result[i].Class_Id + '><td>' + result[i].Name + '</td> <td>' + result[i].Fees + '</td>  <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Class_Id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].Class_Id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
                $('#tbllist').append(AddOption);
            }



        },
        error: function (error) {
        }
    });
}
function AddClass() {
    debugger;
    //preventDefault();
    var C_ID = $('#C_ID').val();
    var Cl_Name = $('#C_Name').val();
    var C_Fees = $('#Fees').val();
   

    if (Cl_Name == "") {
        ShowError("Please Enter Class Name");
        return;
    }
    if (C_Fees == "") {
        ShowError("Please Enter Fees");
        return;
    }
    

    $.ajax({
        url: "/Class/AddClass",
        type: "Post",

        data: {
            Class_Id:C_ID,
            Name: Cl_Name,
            Fees: C_Fees,
            

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                GetList();
                clearform();
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
function Delete(id) {
    debugger;
    $.ajax({
        url: "/Class/RemoveClass/" + id,
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
    $("#C_ID").focus();

    $.ajax({

        url: "/Class/GetClass/" + id,
        typr: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {
            debugger;
           
          
            $("#C_ID").val(result.Class_Id);
            $("#C_Name").val(result.Name);
            $("#Fees").val(result.Fees);
        },
        error: function (errormessage) {
            alert("Something is Wrong in Get Action");
        }
    });
}