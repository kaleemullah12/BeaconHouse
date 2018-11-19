
$(document).ready(function () {
    clearform();
});


function clearform() {
    $("#S_Roll").val('');
    $('#S_Roll').trigger('change');
    $('#date').val('');
   
    $('#gender').val('');
   
   


}

function AddAttendence() {
    debugger;
    //preventDefault();

    var s_roll = $('#S_Roll option:selected').val();
    var gender = $("input[name='Gender']:checked").val();
    var dt = $('#date').val();
   

    if (s_roll == "") {
        ShowError("Please Enter  Roll Number");
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
        url: "/Students/AddAttendence",
        type: "Post",

        data: {
            Stud_Id: s_roll,
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