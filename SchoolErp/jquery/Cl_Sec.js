var hashtable = [];
$(document).ready(function () {
    $('#up').hide();
    GetList();
});

function clear() {
    $('#section').val('');
    $('#Classid').val('');
    //hashtable.length = 0;
    hashtable = [];
    $("#container_List").empty();
    //$("#container_List").append('');
}
function GetList() {
    debugger;
    $('#tbllist').html('');
    $.ajax({
        type: 'GET',
        dataType: 'html',
        //dataType: 'application/json',
        url: '/Cl_Sec/GetList',
        success: function (result) {
            debugger;
            var result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
                AddOption = '<tr><td>' + result[i].Name + '</td> <td style="text-align:center">' + '<button id="loading" class="btn btn-sm" style="font-size:15px;color:red;hover:green" onclick=' + ' Delete' + '(' + result[i].Class_Id + ')><span class="glyphicon glyphicon-trash"></span></button> | <button id="Edit" class="btn btn-sm" style="font-size:20px;color:Aqua;" onclick=' + 'GetId' + '(' + result[i].Class_Id + ')>' + " " + '<span class="glyphicon glyphicon-edit"></span> </button></td> </tr>'
                $('#tbllist').append(AddOption);
            }



        },
        error: function (error) {
        }
    });
}

function Add() {
    var Section_Id = $('#section option:selected').val();
    var sectionName = $('#section option:selected').text();
    if (!Section_Id) {
        ShowError('Section is required!');
        return;
    }
    debugger;
   
    var isFound = 0;
    for (i = 0; i < hashtable.length; i++) {
        if (hashtable[i].Section_Id == Section_Id) {
            isFound = 1;
            hashtable[i].Section_Id = Section_Id;
           
            ShowSuccess('Section is Already Exit!');
        }
    }
    if (isFound == 0) {
        hashtable.push({ Section_Id: Section_Id, Name: sectionName });
        ShowSuccess('Section added!');
    }

    FillContainerFromArray();
}

function FillContainerFromArray() {
    debugger;
    var html = '';
    $("#container_List").empty();
    if (hashtable.length == 0) {
        html += "<tr><td>No item added</td></tr>";
    }
    for (i = 0; i < hashtable.length; i++) {
        html += '<tr>' +
            '<td>' + hashtable[i].Section_Id + '</td>' +
            '<td>' + hashtable[i].Name + '</td>' +
                      '<td class="text-right">' +
                           
            '&nbsp;&nbsp;<a href="javascript:;" onclick="DeleteActionItem(' + hashtable[i].Section_Id + ')"><i class="glyphicon glyphicon-trash" title="Delete"></i></a>' +
                      '</td>' +
                  '</tr>';
    }
    $("#container_List").append(html);
}


function DeleteActionItem(itemid) {
    for (i = 0; i < hashtable.length; i++) {
        debugger;
        if (hashtable[i].Section_Id == itemid) {
            ShowSuccess('item deleted!');
            hashtable.splice(i, 1);
            break;
        }
    }

    FillContainerFromArray();
  
}

function Save() {
    
    var classid = $('#Classid option:selected').val();
    if (classid == "") {
        ShowError("Please Enter Class");
        return;
    }
    debugger;
    $.ajax({
        url: "/Cl_Sec/Save",
        type: "Post",

        data: {
            Classid: classid,
            SectionList: hashtable
           },
       
        datatype: "json",
        success: function (data) {
            if (data.msg == "Save") {
                ShowSuccess('Save SuccessFully');
          //$("input[name='gender']:checked").val('Male');
                clear();
                GetList();
            } 
        },
        error: function (error) {
            ShowError("Error In saving");
        },
    });
}

function Delete(id) {
    debugger;
    $.ajax({
        url: "/Cl_Sec/RemoveCl_Sec/" + id,
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
            alert("You cannot Delete.");
        }
    });

}


function GetId(id) {
    debugger;
    hashtable = [];
    //$('#container_List').remove();
    //$("#txt1").css("border-color", "red");
    //$("#txt1").focus();
    //$("#txt2").css("border-color", "red");
    $("#Classid").focus();

    $.ajax({

        url: "/Cl_Sec/GetCl_Sec/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (result) {

            debugger;

            for (var i = 0; i < result.length; i++) {
                hashtable.push({ Section_Id: result[i].Sec_Id, Name: result[i].Name });
                $("#Classid").val(result[i].Class_Id);
                //$('#Id').val(result[i].CS_Id); 
            }

            FillContainerFromArray();
            $('#up').show();
            $('#sa').hide();
        },
        error: function (errormessage) {
            alert("Something is Wrong in Get Action");
        }
    });
}

function Update() {

    var classid = $('#Classid option:selected').val();
    if (classid == "") {
        ShowError("Please Enter Class");
        return;
    }
    debugger;
    $.ajax({
        url: "/Cl_Sec/Update",
        type: "Post",

        data: {

            Classid: classid,
            SectionList: hashtable
        },

        datatype: "json",
        success: function (data) {
            if (data.msg == "Done") {
                ShowSuccess('Update SuccessFully');
                //$("input[name='gender']:checked").val('Male');
                clear();
                GetList();
            }
            $('#sa').show();
            $('#up').hide();

        },
        error: function (error) {
            ShowError("Error In saving");
        },
    });
}


