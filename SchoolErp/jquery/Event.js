
$(document).ready(function () {
    clearform();
});


function clearform() {
    $('#E_Name').val('');
    $('#E_Date').val('');
    $('#E_Detail').val('');



}

function Event() {
    debugger;
    //preventDefault();

    var name = $('#E_Name').val();
    var dt = $('#E_Date').val();
    var det = $('#E_Detail').val();


    if (name == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (dt == "") {
        ShowError("Please Enter Date");
        return;
    }
    if (det == "") {
        ShowError("Please Enter Some Detail");
        return;
    }



    $.ajax({
        url: "/Event/Event",
        type: "Post",

        data: {
            Name: name,
            Date: dt,
            Detail: det

        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: "json",
        success: function (data) {
            if (data.msg == "save") {
                ShowSuccess('Save SuccessFully');
                clearform();
            }
        },
        error: function (error) {
            ShowError('Error in saving');
        },

    });
}