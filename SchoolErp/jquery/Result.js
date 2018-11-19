
$(document).ready(function () {
    clearform();
});


function clearform() {
    $("#R_Roll").val('');
    $('#R_Roll').trigger('change');
    $("#R_Cal").val('');
    $('#R_Cal').trigger('change');
    $("#R_Sec").val('');
    $('#R_Sec').trigger('change');
    $("#R_Sub").val('');
    $('#R_Sub').trigger('change');
    $("#Om").val('');
    $("#Tm").val('');
  




}

function Result() {
    debugger;
    //preventDefault();

    var rl = $('#R_Roll option:selected').val();
    var cl = $('#R_Cal option:selected').val();
    var sc = $('#R_Sec option:selected').val();
    var sb = $('#R_Sub option:selected').val();
    var Ob = $('Om').val();
    var T = $('#Tm').val();
    


    if (rl == "") {
        ShowError("Please Enter  Roll Number");
        return;
    }
    if (cl == "") {
        ShowError("Please Enter Class");
        return;
    }
    if (sc == "") {
        ShowError("Please Enter Section");
        return;
    }
    if (sb == "") {
        ShowError("Please Enter Subject");
        return;
    }
    if (Ob == "0") {
        ShowError("Please Enter Obtained Marks");
        return;
    }
    if (T == "0") {
        ShowError("Please Enter Total Marks");
        return;
    }
    



    $.ajax({
        url: "/Exam/Result",
        type: "Post",

        data: {
            Stud_Id: rl,
            Class_Id: cl,
            Section_Id: sc,
            Subject_Id: sb,
            Obtained_Marks: O,
            Total_Marks: T,
            



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