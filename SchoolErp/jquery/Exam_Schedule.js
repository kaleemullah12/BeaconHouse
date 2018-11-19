
$(document).ready(function () {
    clearform();
});


function clearform() {
    $("#E_Name").val('');
    $("#E_Cal").val('');
    $('#E_Cal').trigger('change');
    $("#E_Sec").val('');
    $('#E_Sec').trigger('change');
    $("#E_Sub").val('');
    $('#E_Sub').trigger('change');
    $("#E_Date").val('');
    $("#E_Stime").val('');
    $("#E_Etime").val('');
    



}

function Exam_Schedule() {
    debugger;
    //preventDefault();

    var name = $('#E_Name').val();
    var cl = $('#E_Cal option:selected').val();
    var sc = $('#E_Sec option:selected').val();
    var sb = $('#E_Sub option:selected').val();
    var dt = $('#E_Date').val();
    var stim = $('#E_Stime').val();
    var etim = $('#E_Etime').val();


    if (name == "") {
        ShowError("Please Enter  Name");
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
    if (dt == "") {
        ShowError("Please Enter Date");
        return;
    }
    if (stim == "") {
        ShowError("Please Enter Start Time");
        return;
    }
    if (etim == "") {
        ShowError("Please Enter Enter Time");
        return;
    }



    $.ajax({
        url: "/Exam/Exam_Schedule",
        type: "Post",

        data: {
            Name: name,
            Class_Id: cl,
            Section_Id: sc,
            Subject_Id: sb,
            Date: dt,
            Start_Time: stim,
            End_Time: etim,



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