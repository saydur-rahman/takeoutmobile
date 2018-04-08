

var apiBaseUrl = "http://localhost:59198/";

/*===============================================*/
/* APP INIT                                          */
/*===============================================*/
var myApp = new Framework7({
    material: true,
    init: false,
    swipePanel: "left",
    toast: {
        closeTimeout: 3000,
        closeButton: true
    }
});

/*===============================================*/
/* EXPORT SELECTORS ENGINE                          */
/*===============================================*/
var $$ = Dom7;

/*===============================================*/
/* ADD VIEW                                           */
/*===============================================*/
var mainView = myApp.addView(".view-main", {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

/*=========================================================*/
/* SHOW/HIDE PRELOADER FOR REMOTE AJAX LOADED PAGES           */
/*=========================================================*/
$$(document).on("ajaxStart", function (e) {
    myApp.showIndicator();
});
$$(document).on("ajaxComplete", function () {
    myApp.hideIndicator();
});

/*==================================================================*/
/* PAGE INIT : HERE, YOU CAN WRITE YOUR CUSTOM JAVASCRIPT/JQUERY    */
/*==================================================================*/
$$(document).on("pageInit", function (e) {
    /* SLIDE SLICK */
    /*================================*/
    var page = e.detail.page;
    var slickOpts = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        centerPadding: "15px",
        adaptiveHeight: true
    };
    $("#walkthrough-items").slick(slickOpts);

    /* CALENDAR */
    /*================================*/
    var calendarDefault = myApp.calendar({
        input: "#calendar-default"
    });
    var pickerDescribe = myApp.picker({
        input: "#picker-time",
        cols: [
            {
                textAlign: "left",
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            {
                values: ("PM AM").split(" ")
            },
        ]
    });

    
    var mainView = myApp.addView('.view-main', {
        // Enable dynamic Navbar
        dynamicNavbar: false
    });
    switch (page.name) {
        case "loginpage":
            loginpage(page);
            break;

        case "register":
            registerpage(page);
            break;

        case "dashboard":
            dashboardpage(page);
            break;

        case "categories":
            catagorypage(page);
            break;

        case "finished":
            finishedpage(page);
            break;
    }
});

var regUrl = apiBaseUrl + "api/account/register";
var loginUrl = apiBaseUrl + "token";
var useInvoice = apiBaseUrl + "api/invoice/useinvoice/";
var currentPoint = apiBaseUrl + "api/invoice/getPoints";
var catagoryURL = apiBaseUrl + "api/menu/Catagory";
var finishedURL = apiBaseUrl + "api/menu/Finished/";
var userUrl = apiBaseUrl + "api/account/GetCustomerInfo";
var rateUrl = apiBaseUrl + "api/menu/rate/";


// AND NOW WE INITIALIZE APP
myApp.init();


$('#btnStoreLocator').on('click', function () {
    mainView.router.loadPage({ url: '#', ignoreCache: true, reload: true });
});

$('#btnMenuSlide').on('click', function () {
    mainView.router.loadPage({ url: 'catagories.html', ignoreCache: true, reload: false });
});

$('#btnHome').on('click', function () {
    mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: true, reload: false });
});



