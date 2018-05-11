function redeempage() {
    redeempageevents();
}

function redeempageevents() {
    console.log('Redeem Page');
    $('#qrcode').qrcode(localStorage.getItem('phone'));
}