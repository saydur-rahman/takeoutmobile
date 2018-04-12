"use strict";
function storeLocatorpage() {
    storeLocatorPageEvents();
}


function storeLocatorPageEvents() {

    var loadStores = function () {
        $('#divStores').html("");
        $.ajax({
            url: storeUrl,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let phone = {};

                    if (data[i].Country === 'Bangladesh') {
                        phone = '+88' + data[i].Phone;
                    }
                    else if (data[i].Country === 'Srilanka') {
                        phone = '+94' + data[i].Phone;
                    }

                    $('#divStores').append(`
                    <div class="row card" style="margin-bottom: 10px">
                    <div id="list-restaurants">
                        <div class="card">
                            <div class="card-header color-deeporange text-bold text-center row">
                                <label style="margin-left: 25%" class="divName">Takeout `+ data[i].Name + `</label>

                            </div>
                            <div class="card-content card-content-padding divAddress">Abedin Tower, 1st Floor, Road No 17, Plot No.35 Kemal Ataturk Avenue, Banani, Dhaka 1213, Bangladesh</div>
                            <a href = "geo:`+ data[i].GeoLocation.Latitude + `,` + data[i].GeoLocation.Longitude + `" lat=` + data[i].GeoLocation.Latitude + ` long=` + data[i].GeoLocation.Longitude + ` class="button button-fill color-deeporange text-extrat-thiny center" style="margin-left: 25%;margin-top: 10px;margin-right: 25%;">View on map</a>
                            <a class="card-footer" href="tek:`+ phone +`">
                                <div class="row" style="margin-left: 8%">
                                    <div class="col-30"></div>
                                    <div class="col-20">
                                        <i class="flaticon-phone"></i>
                                    </div>
                                    <div class="col-50"><label class="divPhone">`+ phone +`</label></div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
`);
                    //href = "geo:`+ data[i].GeoLocation.Latitude + `, ` + data[i].GeoLocation.Longitude + `"
                }
            }
        });
    }

    loadStores();

    $(document).on('click',
        '.btn-view-map',
        function() {
            localStorage.setItem("latitude", parseFloat($(this).attr('lat')));
            localStorage.setItem("longitude", parseFloat($(this).attr('long')));

            mainView.router.loadPage({ url: 'map.html', ignoreCache: true, reload: true });

            console.log(localStorage.getItem("latitude") + ' ' + localStorage.getItem("longitude"));
        });
}


