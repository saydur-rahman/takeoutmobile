
function catagorypage() {
    catagoryPageEvents();
}


function catagoryPageEvents() {
    var loadCats = function() {
        $.ajax({
            url: catagoryURL,
            method: 'GET',
            contentType: "application/json",
            success: function(data) {

            },
            error: function() {

            }
        });
    }
}