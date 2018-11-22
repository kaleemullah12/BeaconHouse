
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


function GetSection() {
    $("#E_Section").html('');

    var classId = $('#E_Class').val();
    $.ajax({
        url: "/Students/GetSection/" + classId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            debugger;
            $('#E_Section').append($("<option>Select.......</option>"));
            //$.each(data, function (index, value) {
            for (var i = 0; i < data.length; i++) {

                $("#E_Section").append($("<option />").val(data[i].Sec_Id).text(data[i].Name));
                //});
            }
        },

    });
}

function GetStudent() {
   var sec_id= $('#E_Section').val();
    $.ajax({
        url: '/Students/GetStudAttend/' + sec_id,
        type: 'Get',
        dataType: 'Json',
        success: function (result) {
            debugger;
            for (var i = 0; i < result.length; i++){
                AddOption = "<tr><td><label>"+ result[i].Roll_Number +"</label></td><td>" + "<input type='checkbox' name='check' checked></td></tr>" 
                $('#attend').append(AddOption);


            }
        }

    });
}