
$(document).ready(function () {
    clearform();
});


function clearform() {
    $("#St_Id").val('');
    $('#St_Id').trigger('change');
    $('#date').val('');

    $('#gender').val('');




}

function Staff_Attendence() {
    debugger;
    //preventDefault();

    var stf = $('#St_Id option:selected').val();
    var gender = $("input[name='Gender']:checked").val();
    var dt = $('#date').val();


    if (stf == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (gender == "") {
        ShowError("Please Enter Status");
        return;
    }
    if (dt == "") {
        ShowError("Please Enter Date");
        return;
    }


    $.ajax({
        url: "/Staff/Staff_Attendence",
        type: "Post",

        data: {
            Staff_Id: stf,
            Status: gender,
            Date: dt,


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