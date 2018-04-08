function dashboardpage() {
    dashboardpageevents();

}

function dashboardpageevents() {

    var iSLoggedIn = function () {
        if (localStorage.getItem("access_token") == null) {
            mainView.router.loadPage({ url: 'login.html', ignoreCache: true, reload: true });
            return false;
        } else {
            return true;
        }
    }


    var getPoint = function () {
        if (iSLoggedIn()) {
            $.ajax({
                url: currentPoint,
                method: 'GET',
                contentType: "application/json",
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                },
                success: function (data) {
                    console.log(data);
                    localStorage.setItem("points", data);
                    $('.points').html(JSON.stringify(data));
                },
                error: function (data, textStatus, xhr) {
                    console.log(data, xhr);
                }
            });
        }
    }

    var postPoint = function (invNo) {
        if (iSLoggedIn()) {
            $.ajax({
                url: useInvoice + invNo,
                method: 'GET',
                contentType: "application/json",
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                },
                success: function (data) {
                    console.log(data);
                    getPoint();
                },
                error: function (data, textStatus, xhr) {
                    console.log(data, xhr);
                }
            });
        }
    }


    getPoint();


    $("#btnAddInv").on("click",
        function () {
            let inv = $("#txtInv").val();

            postPoint(inv);
        });


    $('#btnMenu').on("click",
        function () {
            mainView.router.loadPage({ url: 'catagories.html', ignoreCache: true, reload: true });
        });
}
