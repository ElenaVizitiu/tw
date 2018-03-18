$(document).ready(function () {

    var menuShow = false;

    $('#menu').click(function () {
        $('#menu2').addClass('menu-active');
        setTimeout(() => {
            menuShow = true;
        }, 100);
    });
    $('#menu-sec').click(function () {
        $('#menu2').addClass('menu-active');
        setTimeout(() => {
            menuShow = true;
        }, 100);
    });
    $('#close-menu').click(function () {
        $('#menu2').removeClass('menu-active');
        menuShow = false;
    });

    $('.main-container').click(function () {
        if (menuShow) {
            $('#menu2').removeClass('menu-active');
            menuShow = false;
        }
    });
});