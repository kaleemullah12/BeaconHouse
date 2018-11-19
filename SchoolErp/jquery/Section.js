
$(document).ready(function () {
    clearform();
});


function clearform() {
    $('#S_Name').val('');
   
    $("#S_Staff").val('');
    $('#S_Staff').trigger('change');
   


}

function AddSection() {
    debugger;
    //preventDefault();

    var name = $('#S_Name').val();
   
    
   
    var st = $('#S_Staff option:selected').val();
    

    if (name == "") {
        ShowError("Please Enter  Name");
        return;
    }
    if (st == "") {
        ShowError("Please Enter Incharge name");
        return;
    }
      
   

    $.ajax({
        url: "/Class/AddSection",
        type: "Post",

        data: {
            Name: name,
           
            Staff_Id: st,
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