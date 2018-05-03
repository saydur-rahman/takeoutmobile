
function dashboardpage() {
    
    dashboardpageevents();

}

function dashboardpageevents() {
    "use strict";

    var getPoint = function () {

        console.log(localStorage.getItem("access_token"));
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
                    mainView.router.loadPage({ url: 'index.html', ignoreCache: true, reload: true });
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
                    alert("You received " + data.Points + " Points");
                    getPoint();
                    $('#txtInv').val("");
                },
                error: function (data, textStatus, xhr) {
                    //mainView.router.loadPage({ url: 'index.html', ignoreCache: true, reload: false });
                    console.log(data, xhr);
                    alert("Not a valid invoice number!");
                }
            });
        }
    }


    var loadAdd = function (callback) {
        $('#divAdds').html("");
        if (iSLoggedIn()) {
            $.ajax({
                url: addUrl,
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem("access_token")
                },
                success: function (data) {
                    console.log(data);
                    $('#message').html(data.fOffer.message);

                    for (let i = 0; i < data.fpaAdds.length; i++) {
                        $('#divAdds').append(`
                    <img class="mySlides" src="`+ imageBaseUrl + `images/advertiseimage/` + data.fpaAdds[i].image + `" style="width:100%; display: none; height:195px;">
`);
                        
                    }
                    callback();
                }
            });
        }
    }


    getPoint();
    loadAdd(carousel);



    $("#btnAddInv").on("click",
        function () {

            let inv = $("#txtInv").val();

            postPoint(inv);
        });


    $('#btnMenu').on("click",
        function () {
            mainView.router.loadPage({ url: 'catagories.html', ignoreCache: true, reload: true });
        });

    


    //document.addEventListener("deviceready", carousel, false);
    var myIndex = 0;

    function carousel() {
        
        var i;
        var x = $(document).find('.mySlides');
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) { myIndex = 1 }
        x[myIndex - 1].style.display = "block";
        setTimeout(carousel, 2000); // Change image every 2 seconds
    }
    
    
}
