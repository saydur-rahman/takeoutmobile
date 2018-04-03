
function loginpage() {
    LoginPageEvents();
}
function LoginPageEvents()
{
    $('#btnLogin').on('click', function () {
        var url = "http://blog.doctorola.com/wp-json/posts?page="  + "&filter[posts_per_page]=5&filter[order]=DESC";
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                mainView.router.loadPage({ url: 'restaurants.html', ignoreCache: true, reload: true })
            },
            complete: function () {
                
            }
        });
    });
    $('#btnFB').on('click', function () {
        //FB.getLoginStatus(function (response) {
        //    statusChangeCallback(response);
        //    if (response.connected != 'connected')
        //    {
        //        FB.login();
        //    }
        //});
        facebookConnectPlugin.login([
            "email",
            "user_birthday",
            "user_groups",
            "user_education_history",
            "user_likes",
            "user_work_history",
            "user_location",
            "user_photos"
        ],
            onLoginSuccess,
            onLoginFail);
        function onLoginSuccess() {

            // console.log('LOGIN SUCCESS');
            var apiRoute = "me/?fields=id,name,birthday,education,email,work,location,hometown,picture.width(720).height(720)";
            facebookConnectPlugin.api(apiRoute, ["user_birthday"], onDataReceiveSuccess, onDataReceiveFail);
        }

        function onLoginFail(error) {
            // console.log('Login failed:', error);
        }
    });
}
