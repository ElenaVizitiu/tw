$(document).ready(function () {
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        var about = $('#about').offset().top;
        var subscribe = $('#subscribe').offset().top;

        if (height > about - 300 && height < subscribe - 400) {
            setTimeout(() => {
                $('#text-about').removeClass('in-view-about-text');
                $('#left-about').removeClass('in-view-left');
            }, 300);
        } else {
            setTimeout(() => {
                $('#text-about').addClass('in-view-about-text');
                $('#left-about').addClass('in-view-left');
            }, 300);
        }
    });
});