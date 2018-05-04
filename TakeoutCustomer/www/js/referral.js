function refpage() {
    refPageEvents();
}


function refPageEvents() {

    console.log("From ref page");


    $.ajax({
        url: checkRef,
        method: 'GET',
        contentType: "application/json",
        headers: {
            'Authorization': localStorage.getItem("access_token")
        },
        success: function (data) {
            $('#divShareReferral').attr('hidden', false);
            $('#divReferral').attr('hidden', true);
            console.log(data);
            $('#txtReferral1').val(data);
        },
        error: function (jqXHR) {
            $('#divShareReferral').attr('hidden', true);
            $('#divReferral').attr('hidden', false);
        }
    });


    $('#btnUseRef').on('click', function () {
        $.ajax({
            url: useRef + $('#txtReferral').val(),
            method: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                alert("Congrats! Your account has been activated");
                refPageEvents();
                //navigator.notification.alert(
                //    'Your Takeout account is now activated!',  // message
                //    alertDismissed,         // callback
                //    'Activaed',            // title
                //    'Done'                  // buttonName
                //);
            },
            error: function (jqXHR) {
                alert("Referral code is not correct!");
            }
        });

    })

    $('#btnRefShare').on('click', function () {
        console.log('CLicked', device.platform);
    });
    function alertDismissed() {
        console.log('from notification')
    }
}