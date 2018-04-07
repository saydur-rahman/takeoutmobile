
function registerpage() {
    registerpageevents();

    
}

function registerpageevents() {


    $("#btnReg").click(function () {
        
        console.log("clicked");
        var user = {};

        user.fullname = $('#txtName').val();
        user.email = $('#txtEmail').val();
        user.phoneNumber = $('#txtPhone').val();
        user.password = $('#txtPassword').val();
        user.confirmPassword = $('#txtConPassword').val();




        $.ajax({
            url: regUrl,
            method: 'POST',
            data: JSON.stringify(user),
            contentType: "application/json",
            success: function () {
                login(user.email, user.password);
            },
            error: function (data, textStatus, xhr) {
            }

        });
    });

    
}



