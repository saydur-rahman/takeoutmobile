
function registerpage() {
    myApp.params.swipePanel = false;
    registerpageevents();
}

function registerpageevents() {


    $("#btnReg").click(function () {

        $('#txtCode').css({
            "border": ""
        });
        $('#txtPhone').css({
            "border": ""
        });
        $('#txtName').css({
            "border": ""
        });
        $('#txtEmail').css({
            "border": ""
        });
        $('#txtPassword').css({
            "border": ""
        });
        $('#txtConPassword').css({
            "border": ""
        });



        console.log("clicked");
        var user = {};

        user.fullname = $('#txtName').val();
        user.email = $('#txtEmail').val();
        user.phoneNumber = $('#txtCode').find(":selected").val() + $('#txtPhone').val();
        user.password = $('#txtPassword').val();
        user.confirmPassword = $('#txtConPassword').val();


        if ($('#txtCode').find(":selected").val() === '') {
            alert("Country is required");
            $('#txtCode').css({
                "border": "solid orange"
            });
        }

        if ($('#txtPhone').val() === '') {
            alert("Phone number is required");
            $('#txtPhone').css({
                "border": "solid orange"
            });
        }

        if (user.fullname === '') {
            alert("Name is required");
            $('#txtName').css({
                "border": "solid orange"
            });
        }

        if (user.email === '') {
            alert("Email is required");
            $('#txtEmail').css({
                "border": "solid orange"
            });
        }

        if (user.password === '' || user.confirmPassword === '' || user.password !== user.confirmPassword) {
            alert("Password and confirm password don't match");
            $('#txtPassword').css({
                "border": "solid orange"
            });
            $('#txtConPassword').css({
                "border": "solid orange"
            });
        }



        if (user.fullname !== '' && user.email !== '' && user.phoneNumber !== '' && user.password !== '' && user.confirmPassword !== '' && user.password === user.confirmPassword) {


            

            $.ajax({
                url: regUrl,
                method: 'POST',
                data: JSON.stringify(user),
                contentType: "application/json",
                success: function () {
                    login(user.email, user.password);
                },
                error: function (data, textStatus, xhr) {
                    console.log('user', user);

                    let errorData = JSON.parse(data.responseText);


                    if (errorData.hasOwnProperty('ModelState')) {


                        let error = errorData.ModelState[""];
                        console.log(error);
                        alert("Email already taken");
                        $('#txtEmail').css({
                            "border": "solid orange"
                        });
                        $('#txtPhone').css({
                            "border": ""
                        });
                    }
                    else {
                        let error = errorData.Message;
                        console.log(error);
                        alert(error);
                        $('#txtPhone').css({
                            "border": "solid orange"
                        });
                    }


                    //alert(errorData.ModelState);
                }

            });
        }
    });


}



