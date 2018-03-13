$(document).ready(function () {
    $('#down-arrow').click(function () {
        document.getElementById('about').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    });
    $('#home-menu').click(function () {
        document.getElementById('home').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
        $('#menu2').removeClass('menu-active');
    });
    $('#about-menu').click(function () {
        document.getElementById('about').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
        $('#menu2').removeClass('menu-active');
    });
    
    var scrollEnought = false;

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        var about = $('#about').offset().top;
        var feature = $('#feature').offset().top;
        var contact = $('#contact').offset().top;
    
        if (height  >= about - 150) {
            $('.navbar2').addClass('in-view-menu');
            if (height  > about - 150 && height < feature) {
                setTimeout(() => {
                    $('#about-section-menu').removeClass('next-menu-section');
                    $('#feature-section-menu').removeClass('active-menu-section');
                    $('#about-section-menu').addClass('active-menu-section');
                }, 50);
            }
            if (height  >= feature - 80 && height < contact - 80) {
                setTimeout(() => {
                    $('#about-section-menu').addClass('next-menu-section');
                    $('#feature-section-menu').addClass('active-menu-section');
                }, 50);
            }
            if (height < contact - 80) {
                $('#feature-section-menu').removeClass('next-menu-section');
                $('#contact-section-menu').removeClass('active-menu-section');
            }
            if (height  >= contact - 80) {
                setTimeout(() => {
                    $('#feature-section-menu').addClass('next-menu-section');
                    $('#contact-section-menu').addClass('active-menu-section');
                }, 50);
            }
        } else {
            $('.navbar2').removeClass('in-view-menu');
            $('#about-section-menu').removeClass('active-menu-section');
        }
    });
});