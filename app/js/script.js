document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var destinationItem = null;

  $('#fullpage').fullpage({

  });

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

  $('.navbar a').hover(function (e) {
    $('body').addClass('is-nav-hovered');
  }, function (e) {
    $('body').removeClass('is-nav-hovered');
  });

});
