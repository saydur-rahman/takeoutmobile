
function loginpage() {
    myApp.params.swipePanel = false;
    loginPageEvents();
}



function login(username, password) {
    console.log("login clicked!");
    let loginData = {
        username: username,
        password: password,
        grant_type: 'password'
    }

    var loadUser = function () {
        $.ajax({
            url: userUrl,
            method: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                localStorage.setItem("fullname", data.Fullname);
                $('#txtUserName').html(localStorage.getItem("fullname"));
                console.log("from login success", data);
                myApp.params.swipePanel = 'left';
            },
            error: function () {
                alert("Username or password incorrect!");
            }

        });
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

            loadUser();
            
            mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: true, reload: true });
        },
        error: function (data) {
            console.log(data);
            alert("Username or password incorrect!");
            console.log("incorrect login");
        }
    });

}
function loginPageEvents() {
    $('#btnLogin').click(function () {
        login($('#txtEmailLogin').val(), $('#txtPasswordLogin').val());
    });
}