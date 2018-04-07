
function loginpage() {
    LoginPageEvents();
}
function LoginPageEvents() {

    $('#btnLogin').on('click', function () {

        //window.onload = function () { document.addEventListener("deviceready", onDeviceReady, false); }

        //function onDeviceReady() {

        //console.log("Login CLicked", $('#txtEmail').val() + $('#txtPassword').val());

        login($('#txtEmail').val(), $('#txtPassword').val());
        ////}
    });


    //$('#btnLogin').on('click', function () {
    //    var url = "http://blog.doctorola.com/wp-json/posts?page="  + "&filter[posts_per_page]=5&filter[order]=DESC";
    //    $.ajax({
    //        url: url,
    //        method: "GET",
    //        dataType: "json",
    //        async: false,
    //        success: function (data) {
    //            mainView.router.loadPage({ url: 'restaurants.html', ignoreCache: true, reload: true })
    //        },
    //        complete: function () {

    //        }
    //    });
    //});
    //$('#btnFB').on('click', function () {
    //    //FB.getLoginStatus(function (response) {
    //    //    statusChangeCallback(response);
    //    //    if (response.connected != 'connected')
    //    //    {
    //    //        FB.login();
    //    //    }
    //    //});
    //    //keytool - exportcert - alias androiddebugkey - keystore "C:\Users\USERNAME\.android\debug.keystore" | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" sha1 - binary | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" base64
    //    facebookConnectPlugin.login([
    //        "email",
    //        "user_birthday",
    //        "user_groups",
    //        "user_education_history",
    //        "user_likes",
    //        "user_work_history",
    //        "user_location",
    //        "user_photos"
    //    ],
    //        onLoginSuccess,
    //        onLoginFail);
    //    function onLoginSuccess() {

    //        // console.log('LOGIN SUCCESS');
    //        var apiRoute = "me/?fields=id,name,birthday,education,email,work,location,hometown,picture.width(720).height(720)";
    //        facebookConnectPlugin.api(apiRoute, ["user_birthday"], onDataReceiveSuccess, onDataReceiveFail);
    //    }

    //    function onLoginFail(error) {
    //        // console.log('Login failed:', error);
    //    }
    //});
}


var login = function (username, password) {

    let loginData = {
        username: username,
        password: password,
        grant_type: 'password'
    }

    $.ajax({
        url: loginUrl,
        method: 'POST',
        contentType: "application/json",
        data: loginData,
        success: function (data) {

            localStorage.setItem("access_token", data.token_type + ' ' + data.access_token);
            console.log(localStorage.getItem("access_token"));
            localStorage.setItem("username", data.userName);


            mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: true, reload: true });
        },
        error: function (data, textStatus, xhr) {
            console.log(data, xhr);
        }
    });
}
