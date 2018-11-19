
$(document).ready(function () {
    clearform();
});


function clearform() {
    $('#p_name').val('');
    $('#CNIC').val('');
    $('#DOB').val('');
    $('#Cellnumb').val('');
    $('#password').val('');
    $('#gender').val('');
    $("#pgof").val('');
    $('#pgof').trigger('change');
    $("#pg").val('');
    $('#pg').trigger('change');
    $('#relation').val('');
    $('#addresses').val('');


}

function Addparent() {
    debugger;
    //preventDefault();

    var p_name = $('#p_name').val();
    var cnic = $('#CNIC').val();
    var dob = $('#DOB').val();
    var cellnumb = $('#Cellnumb').val();
    var pass = $('#password').val();
    var gender = $("input[name='Gender']:checked").val();
    var s_roll = $('#pgof option:selected').val();
    var link = $('#pg option:selected').val();
    var relation = $('#relation').val();
    var address = $('#addresses').val();

    if (p_name == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (cnic == "") {
        ShowError("Please Enter CNIC");
        return;
    }
    if (dob == "") {
        ShowError("Please Enter DOB");
        return;
    }
    if (cellnumb == "") {
        ShowError("Please Enter CELL NUMBER");
        return;
    }
    if (pass == "") {
        ShowError("Please Enter Password");
        return;
    }

    if (address == "") {
        ShowError("Please Enter Address");
        return;
    }
    if (gender == "") {
        ShowError("Please Enter Gender");
        return;
    }
    if (link == "") {
        ShowError("Please Enter P/G");
        return;
    }
    if (relation == "") {
        ShowError("Please Enter Relation");
        return;
    }
    if (s_roll == "") {
        ShowError("Please Enter S_Roll");
        return;
    }

    $.ajax({
        url: "/Parents/AddParent",
        type: "Post",

        data: {
            Name: p_name,
            CNIC: cnic,
            DOB: dob,
            Address: address,
            Cell_Number: cellnumb,
            Password: pass,
            Gender: gender,
            Stud_Roll_Number: s_roll,
            Parent_Guardian: link,
            Relation : relation,

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