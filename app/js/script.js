document.addEventListener('DOMContentLoaded', function () {
  var $ = window.jQuery;

  svg4everybody();

  makeResponsiveTables();

  $('input[type="tel"]').inputmask({
    "mask": "+7 (999) 999-99-99"
  });

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

    // Фиксит нажатие таба на элементах формы
    $('.section-contact-form').on('keydown', 'input, textarea, button', function (event) {
      if (event.keyCode === 9) {
        event.stopPropagation();
      }
    });
  }

  $('.homepage').on('click', '.main-header__to-order, .section-intro__to-order', function (event) {
    event.preventDefault();

    if (window.matchMedia("(min-width: 1024px)").matches) {
      $.fn.fullpage.moveTo(3);
    } else {
      $('.section-contact')[0].scrollIntoView({
        behavior: 'smooth'
      });
    }
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

  $('.main-nav__link, .main-nav__submenu').hover(function (e) {
    $('body').addClass('is-nav-hovered');
  }, function (e) {
    $('body').removeClass('is-nav-hovered');
  });

  $('.service-detail__to-back, .work-detail__to-back').on('click', function (event) {
    event.preventDefault();
    window.history.back();
  });
});

function makeResponsiveTables() {
  var switched = false;
  var updateTables = function () {
    if (($(window).width() < 767) && !switched) {
      switched = true;
      $("table.responsive").each(function (i, element) {
        splitTable($(element));
      });
      return true;
    } else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("table.responsive").each(function (i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).on('load', updateTables);
  $(window).on("redraw", function () {
    switched = false;
    updateTables();
  }); // An event to listen for
  $(window).on("resize", updateTables);


  function splitTable(original) {
    original.wrap("<div class='table-wrapper' />");

    var copy = original.clone();
    copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
    copy.removeClass("responsive");

    original.closest(".table-wrapper").append(copy);
    copy.wrap("<div class='pinned' />");
    original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
  }

  function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
  }

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
      tr_copy = copy.find('tr'),
      heights = [];

    tr.each(function (index) {
      var self = $(this),
        tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }
}
