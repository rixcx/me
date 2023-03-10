$(window).on('load',function(){
  $('.nav').removeClass('preload');
});

$('.header__togglebtn').click (function(){
  $(this).toggleClass('active');
  $('.nav').toggleClass('open');
});

$('.nav__list a').click (function(){
  $('.header__togglebtn').removeClass("active");
  $('.nav').removeClass('open');
});

$(function(){
  $('a[href^="#"]').click (function(){
    var headerheight= 63;
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerheight;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});