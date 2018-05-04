'use strict';


var imageBaseUrl = "http://beta.bdtakeout.com/";
//var apiBaseUrl = "http://localhost:59198/";
var apiBaseUrl = "http://api.bdtakeout.com/";


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
$(document).on("ajaxStart", function (e) {
    myApp.showIndicator();
});
$(document).on("ajaxComplete", function () {
    myApp.hideIndicator();
});
$$(document).on("ajaxStart", function (e) {
    myApp.showIndicator();
});
$$(document).on("ajaxComplete", function () {
    myApp.hideIndicator();
});
$$('.panel-left').on('open', function (e) {

    if (localStorage.access_token == "" || localStorage.access_token == undefined || localStorage.access_token == 'undefined') {
        myApp.params.swipePanel = false;
    }
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
        dynamicNavbar: true
    });

    switch (page.name) {
        case "index":
            if (page.fromPage == 'undefined' || page.fromPage == undefined) {
                myApp.params.swipePanel = 'left';
                //alert("false");
            }
            else {
                //alert('left');
                myApp.params.swipePanel = false;
            }
            break;
        case "login":
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

        case "storeLocator":
            storeLocatorpage(page);
            break;
        case "map":
            mappage(page);
            break;
        case "about":
            //mappage(page);
            break;
        case "aboutUs":
            break;
        case "referral":
            refpage(page);
            break;
    }
});
var iSLoggedIn = function () {
    if (localStorage.getItem("access_token") === null) {
        //mainView.router.loadPage({ url: 'login.html', ignoreCache: true, reload: true });
        return false;
    } else {
        return true;
    }
}

console.log(iSLoggedIn());

if (!iSLoggedIn()) {

    mainView.router.loadPage({ url: 'index.html', ignoreCache: true, reload: false });
    //consolo.log(localStorage.getItem("fullname"));
    //$('#txtUserName').html(localStorage.getItem("fullname"));
}
else {
    //consolo.log(localStorage.getItem("fullname"));
    $('#txtUserName').html(localStorage.getItem("fullname"));
    mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: false, reload: true });
}








//navigator.Backbutton.goBack(function () {
//    console.log('success')
//}, function () {
//    console.log('fail')
//});



var regUrl = apiBaseUrl + "api/account/register";
var loginUrl = apiBaseUrl + "token";
var useInvoice = apiBaseUrl + "api/invoice/useinvoice/";
var currentPoint = apiBaseUrl + "api/invoice/getPoints";
var catagoryURL = apiBaseUrl + "api/menu/Catagory";
var finishedURL = apiBaseUrl + "api/menu/Finished/";
var userUrl = apiBaseUrl + "api/account/GetCustomerInfo";
var rateUrl = apiBaseUrl + "api/menu/rate/";
var storeUrl = apiBaseUrl + "api/storelocator/getall";
var addUrl = apiBaseUrl + "api/add";
var checkRef = apiBaseUrl + "api/referral/checkRef";
var useRef = apiBaseUrl + "api/referral/userReferral/";



// AND NOW WE INITIALIZE APP
myApp.init();



$('#btnStoreLocator').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'storeLocator.html', ignoreCache: true, reload: false });
});

$('#btnMenuSlide').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'catagories.html', ignoreCache: true, reload: false });
});

$('#btnHome').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: true, reload: false });
});

$('#btnLogout').on('click', function () {
    localStorage.clear();
    myApp.closePanel();
    mainView.router.loadPage({ url: 'login.html', ignoreCache: true, reload: true });
});

$('#btnAbout').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'about.html', ignoreCache: true, reload: false });
});

$('#btnAboutus').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'aboutUs.Html', ignoreCache: true, reload: false });
});

$('#btnReferralPage').on('click', function () {
    myApp.closePanel();
    mainView.router.loadPage({ url: 'referral.html', ignoreCache: true, reload: false });
});



//Back Button Function
$('.left').on('click', function () {
    if (!(page.name == 'login' || page.name == 'register'))
        mainView.router.back();
});


$('#leftRef').on('click', function () {
    mainView.router.loadPage({ url: 'dashboard.html', ignoreCache: true, reload: false });
});


function onBackKeyDown() {
    mainView.router.back();
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Register the event listener 
    document.addEventListener("backbutton", onBackKeyDown, false);
}