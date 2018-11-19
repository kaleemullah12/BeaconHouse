
$(document).ready(function () {
    clearform();
});


function clearform() {

    $("#CST_Sb").val('');
    $('#CST_Sb').trigger('change');
    $("#CST_Cl").val('');
    $('#CST_Cl').trigger('change');
    $("#CST_Sc").val('');
    $('#CST_Sc').trigger('change');
    $("#CST_St").val('');
    $('#CST_St').trigger('change');
   


}

function CST() {
    debugger;
    //preventDefault();


    var sub = $('#CST_Sb option:selected').val();
    var sec = $('#CST_Sc option:selected').val();
    var sat = $('#CST_St option:selected').val();
    var cal = $('#CST_Cl option:selected').val();
    

    if (sub == "") {
        ShowError("Please Enter  Subject");
        return;
    }
    if (cal == "") {
        ShowError("Please Enter Class");
        return;
    }
    if (sec == "") {
        ShowError("Please Enter Section");
        return;
    }
    if (sat == "") {
        ShowError("Please Enter Teacher");
        return;
    }
   


    $.ajax({
        url: "/Subject/CST",
        type: "Post",

        data: {
            Subject_Id: sub,
            Class_Id: cal,
            Section_Id: sec,
            Staff_Id: sat,
           


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