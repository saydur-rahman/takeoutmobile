
function finishedpage() {
    finishedPageEvents();
}

function finishedPageEvents() {

    String.prototype.trunc = String.prototype.trunc ||
        function (n) {
            return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
        };

    var urlCatId = localStorage.getItem("CatId");
    localStorage.removeItem("CatId");

    var loadFinished = function () {
        $('.divFinGrid').html("");
        $('.divFinTab').html("");


        $.ajax({
            url: finishedURL + urlCatId,
            method: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                console.log("fin from fin", data);

                for (let i = 0; i < data.length; i++) {

                    let selected1 = "";
                    let selected2 = "";
                    let selected3 = "";
                    let selected4 = "";
                    let selected5 = "";


                    if (data[i].Rating == 1)
                        selected1 = 'selected';
                    if (data[i].Rating == 2)
                        selected2 = 'selected';
                    if (data[i].Rating == 2)
                        selected3 = 'selected';
                    if (data[i].Rating == 4)
                        selected4 = 'selected';
                    if (data[i].Rating == 5)
                        selected5 = 'selected';

                    $('.divFinGrid').append(`
                <div id="list-restaurants">

                            <div class="restaurant">
                                <div class="row">
                                    <div class="col-100 row">
                                        <div class="restaurant-img col-50">
                                            <img src="`+ data[i].Image + `">
                                        </div>
                                        <div class="col-50"> 

                                            <div class="row">
                                                <label class="gray-text text-thiny col-70">Product Rating: </label>
                                                <select class="smart-select col-30 selectedRating">
                                                      <option `+ selected1 + ` value="1">1</option>
                                                      <option `+ selected2 + ` value="2">2</option>
                                                      <option `+ selected3 + ` value="3">3</option>
                                                      <option `+ selected4 + ` value="4">4</option>
                                                      <option `+ selected5 + ` value="5">5</option>
                                                </select> 
                                             </div>

                                        

                                            <div class="row">
                                                <label class="gray-text text-thiny col-80">Your Rating: </label>
                                                <div class="gray-text text-thiny col-20" >`+ data[i].CustomerRating + `</div>
                                             </div>
                                                

                                            <div class="gray-text text-thiny"><span class="black-text text-bold">Description: </span>`+ data[i].Desc.toString().trunc(25) + `...</div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-50">
                                        <h6>` + data[i].Name + `</h6>
                                    </div>
                                    <div class="col-50">
                                        <a href="#" finId=`+ data[i].FinId + ` class="button button-fill color-deeporange text-extrat-thiny btnRate">Rate this item</a>
                                    </div>
                                </div>
                            </div>

                        </div>
`);

                    $('.divFinTab').append(`
							<div class="col-50">
								<div class="restaurant-grid">
									<img src="`+ data[i].Image + `" alt="restaurant">
                                    <h6>`+ data[i].Name + `</h6>
                                
                                    <div class="row">
                                        <label class="gray-text text-thiny col-70">Rating: </label>
                                         <select class="gray-text text-thiny col-30" >
                                              <option `+ selected1 + ` value="1">1</option>
                                              <option  `+ selected2 + ` value="2">2</option>
                                              <option `+ selected3 + ` value="3">3</option>
                                              <option `+ selected4 + ` value="4">4</option>
                                              <option `+ selected5 + ` value="5">5</option>
                                         </select>            
                                     </div>
                                     
									
                                    <div class="row">
                                       <label class="gray-text text-thiny col-80">Your Rating: </label>
                                       <div class="gray-text text-thiny col-20" >`+ data[i].CustomerRating + `</div>
                                    </div>
									<a href="#" class="button button-fill color-deeporange text-extrat-thiny">Rate this item</a>
								</div>
							</div>
`);

                }
            },
            error: function () {

            }
        });
    }

    loadFinished();


    $(document).on("click", ".btnRate", function () {
        var finId = $(this).attr('finId');
        var rating = $(this).parent().parent().parent().find('.selectedRating').val();
        console.log(finId);
        $.ajax({
            url: rateUrl + finId + '/' + rating,
            method: 'POST',
            contentType: "application/json",
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                loadFinished();
            },
            error: function (data, textStatus, xhr) {
                console.log(data, xhr);
            }
        });
    });
}