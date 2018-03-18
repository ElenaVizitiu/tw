$('.contact--card-main-section-btn').click(function(){

    var title = $(this).parents('section').children('.contact--card-main-section-title');
    var nav = $(this).parents().parents('.contact--card').children('nav');

    $(this).toggleClass('active');
    $(title).toggleClass('active');
    $(nav).toggleClass('active');
  });