"use strict";
jQuery(document).ready(function ($) {

    $(window).load(function () {
        $(".loaded").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
    });

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    // magnificPopup
    $('.portfolio-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    //---------------------------------------------
    // Counter 
    //---------------------------------------------

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });

    // main-menu-scroll
    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var height = 300;

        if (top > height) {
            jQuery('.navbar-fixed-top').addClass('menu-scroll');
        } else {
            jQuery('.navbar-fixed-top').removeClass('menu-scroll');
        }
    });

    // scrool Down
    $('.scrooldown a').bind('click', function () {
        $('html , body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 160
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Portfoliowork init
    jQuery('#portfoliowork').mixItUp({
        selectors: {
            target: '.tile',
            filter: '.filter'
        },
        animation: {
            animateResizeContainer: false,
            effects: 'fade scale'
        }
    });

    // dropdown menu
    $('.dropdown-menu').click(function (e) {
        e.stopPropagation();
    });

    //End
});

$(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("nav").addClass("small");
    } else {
        $("nav").removeClass("small");
    }
});



