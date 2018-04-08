﻿
function catagorypage() {
    catagoryPageEvents();
}


function catagoryPageEvents() {
    var loadCats = function () {
        $('#divCats').html("");
        $.ajax({
            url: catagoryURL,
            method: 'GET',
            contentType: "application/json",
            headers: {
                'Authorization': localStorage.getItem("access_token")
            },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    $('#divCats').append(`
            <div href=# class="row" id='divSingleCat'>
				<div class="col-50">
					<div class="food-category">
                        <img class="icon-category" src="` + data[i].Image + `" />
						<div class="color-deeporange text-thiny">
							` + data[i].Name + `
						</div>
						<div class="text-extrat-thiny gray-text row">
                            <span class="col-50"></span>
							<button CatId=`+ data[i].CatId + ` class="btnCat button button-fill color-orange text-thiny center col-50">Enter</button>
						</div>
					</div>
				</div>
			</div>

                  
`);
                }
            },
            error: function () {

            }
        });
    }

    loadCats();


    $(document).on("click", '.btnCat', function () {
        var catId = $(this).attr("CatId");
        console.log(catId);
        localStorage.setItem("CatId", catId);
        mainView.router.loadPage({ url: 'finished.html', ignoreCache: true, reload: true });
    });
}