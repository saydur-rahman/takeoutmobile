"use strict";
function storeLocatorpage() {
    storeLocatorPageEvents();
}


function storeLocatorPageEvents() {
    var dropdown = $("#country");

    var loadStores = function () {
        $('#divStores').html("");
        $.ajax({
            url: storeUrl + dropdown.val(),
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
                            <div class="card-content card-content-padding divAddress">`+ data[i].Address + `</div>
                            <a lat=` + data[i].GeoLocation.Latitude + ` long=` + data[i].GeoLocation.Longitude + ` class="button button-fill color-deeporange text-extrat-thiny center btn-view-map" style="margin-left: 25%;margin-top: 10px;margin-right: 25%;">Get Directions</a>
                            <a class="card-footer btn-phone" phone=` + phone + `>
                                <div class="row" style="margin-left: 8%">
                                    <div class="col-30"></div>
                                    <div class="col-20">
                                        <i class="flaticon-phone"></i>
                                    </div>
                                    <div class="col-50"><label class="divPhone">`+ phone + `</label></div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
`);
                    //href = "geo:`+ data[i].GeoLocation.Latitude + `, ` + data[i].GeoLocation.Longitude + `"
                    //href = "tel:`+ phone +`"
                }
            }
        });
    };



    $(document).on('click',
        '.btn-view-map',
        function () {
            localStorage.setItem("latitude", parseFloat($(this).attr('lat')));
            localStorage.setItem("longitude", parseFloat($(this).attr('long')));

            //console.log(localStorage.getItem("latitude") + ',' + localStorage.getItem("longitude"));

            var geocoords = localStorage.getItem("latitude") + ',' + localStorage.getItem("longitude");
            console.log(geocoords);


            var platform = device.platform.toLowerCase();
            console.log(platform);

            launchnavigator.navigate([localStorage.getItem("latitude"), localStorage.getItem("longitude")], {
            });

        });

    $(document).on('click', '.btn-phone', function () {
        let number = $(this).attr("phone");

        console.log(number);

        window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);

        function onSuccess(result) {
            console.log("Success:" + result);
        }

        function onError(result) {
            console.log("Error:" + result);
        }
    });


    function loadCountry(callback) {
        $.ajax({
            url: counUrl,
            method: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                dropdown.html('');
                console.log(data);
                for (let i = 0; i < data.length; i++)
                    dropdown.append('<option value="' + data[i].Id + '">' + data[i].Name + '</option>');

                callback();
            },
            error: function () { }
        });
    }

    loadCountry(loadStores);

    dropdown.on('change', function () {
        loadStores();
    });
}


