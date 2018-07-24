document.addEventListener('DOMContentLoaded', function () {
  var $ = window.jQuery;

  svg4everybody();

  if (window.matchMedia("(max-width: 1023px)").matches && document.body.classList.contains('homepage')) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      if (scrolled > 0) {
        $('.main-header').addClass('main-header--sticky');
      } else {
        $('.main-header').removeClass('main-header--sticky');
      }
    });
  }

  $('.navbar-toggle').on('click', function (event) {
    event.preventDefault();
    $('body').toggleClass('is-navbar-opened');
    $('.navbar').toggleClass('navbar--opened');
    $('.navbar-toggle').toggleClass('navbar-toggle--fired');
  });

  if (window.matchMedia("(min-width: 1024px)").matches) {
    $('#fullpage').fullpage({
      scrollingSpeed: 1100,
      onLeave: function (origin, destination) {
        if (destination.isLast) {
          $('body').addClass('is-last-section');
        } else {
          $('body').removeClass('is-last-section');
        }
      }
    });
  }

  $('.section-intro').on("mousemove", function (e) {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      var w = $('.section-intro').width(),
        h = $('.section-intro').height(),
        x = e.clientX,
        y = e.clientY,
        indX = Math.ceil(x / (w / 5)),
        indY = Math.ceil(y / (h / 4));
      if (!indX || !indY) {
        return false;
      }
      var ind = ((indY - 1) * 5) + indX;
      $('.section-intro-main-image').attr('class', 'section-intro__main-image section-intro-main-image section-intro-main-image--' + ind);
    }
  });

  $('.main-nav__link, .main-nav__submenu').hover(function (e) {
    $('body').addClass('is-nav-hovered');
  }, function (e) {
    $('body').removeClass('is-nav-hovered');
  });
});
