function ShowError(message) {
    new PNotify({
        title: 'Error',
        text: message,
        addclass: 'bg-danger',
        delay: 3000
    });
}

function ShowSuccess(message) {
    new PNotify({
        text: message,
        addclass: 'bg-success',
        delay: 3000
    });
}

function formatErrorMessage(jqXHR, exception) {
    if (jqXHR.status === 0) {
        return ('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        return ('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}


function SlidDiv() {
    $("#divFilter").slideToggle();
}

function onlyNumbers(num) {
    if (/[^0-9]+/.test(num.value)) {
        num.value = num.value.replace(/[^0-9]*/g, "")
    }
}

function BlockUI(id) {
    // Light
    $('#' + id).block({
        message: '<i class="icon-spinner4 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none'
        }
    });
}