$(document).ready(function () {
    GetList();
    clearform();
    
});


function clearform() {
    $('#D_Name').val('');
    



}

function AddDesignation() {
    debugger;
    //preventDefault();

    var Des = $('#D_Name').val();
    


    if (Des == "") {
        ShowError("Please Enter Designation");
        return;
    }
    


    $.ajax({
        url: "/Staff/AddDesignation",
        type: "Post",

        data: {
            Name: Des,
            


        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
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
        url: '/Staff/DesignationList',
        success: function (result) {

            var result = JSON.parse(result);
            debugger;
            for (var i = 0; i < result.length; i++) {
                AddOption = '<tr id=' + result[i].Des_Id + '><td>' + result[i].Name + '</td> <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Des_Id + ')><span class="glyphicon glyphicon-trash"></span></button></td> </tr>'
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
        url: "/Staff/RemoveDesignation/" + id,
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