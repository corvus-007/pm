window.worksList = (function () {
  'use strict';

  var $ = window.jQuery;
  var $worskList = $('.works__list');

  if (!$worskList.length) {
    return;
  }

  var getVH = function (val) {
    return (val / 810) * $(window).height();
  };

  var findActiveSection = function () {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    var sections = {};
    var min = Math.abs($(window).scrollTop() - $('.work-card').first().offset().top);
    $('.work-card').each(function (num, el) {
      var offset = Math.abs($(window).scrollTop() - $(el).offset().top);
      sections[offset] = $(el);
      if (offset < min) {
        min = offset;
      }
      var bottomOffset = Math.abs($(window).scrollTop() + $(window).outerHeight() - ($(el).offset().top + $(el).outerHeight()));
      sections[bottomOffset] = $(el);
      if (bottomOffset < min) {
        min = bottomOffset;
      }
    });
    if (!sections[min].hasClass('work-card--current')) {
      $('.work-card').removeClass('work-card--current');
      sections[min].addClass('work-card--current');
    }
  };

  findActiveSection();

  window.addEventListener('scroll', function () {
    findActiveSection();

    if (window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    $('.work-card').each(function (num, el) {
      var elHeight = $(el).outerHeight(),
        elTop = $(el).offset().top,
        elBottom = elTop + elHeight,
        scrollTop = $(window).scrollTop(),
        scrollBottom = scrollTop + $(window).outerHeight(),
        scrollHeight = $(window).height(),
        offset = scrollTop - elTop,
        bottomOffset = scrollBottom - elBottom;

      if (offset < elHeight && bottomOffset + elHeight > 0) {
        var h = elBottom - (elTop - scrollHeight);
        var k = (scrollTop - (elTop - scrollHeight)) / h;
        if (!$(el).index()) {
          k = scrollTop / elBottom;
        }
        if (k >= 0 && k <= 1) {
          if ($(el).hasClass('n1')) {
            var v = -getVH(80) * k;
            $(el).find('.work-card__body').css('transform', 'translateY(' + v + 'px)');
          }
          if ($(el).hasClass('n2')) {
            var v1 = getVH(100) * k;
            var v2 = getVH(200) * k;
            $(el).find('.work-card__picture').css('transform', 'translateY(' + v1 + 'px)');
            $(el).find('.work-card__body').css('transform', 'translateY(' + v2 + 'px)');
          }
          if ($(el).hasClass('n3')) {
            var v = -getVH(100) * k;
            $(el).find('.work-card__picture').css('transform', 'translateY(' + v + 'px)');
          }

          if ($(el).hasClass('n4')) {
            var v = getVH(50) * k;
            $(el).find('.work-card__body').css('transform', 'translateY(' + v + 'px)');
          }
          if ($(el).hasClass('n5')) {
            var v1 = -getVH(50) * k;
            var v2 = getVH(200) * k;
            $(el).find('.work-card__picture').css('transform', 'translateY(' + v1 + 'px)');
            $(el).find('.work-card__body').css('transform', 'translateY(' + v2 + 'px)');
          }
          if ($(el).hasClass('n6')) {
            var v = getVH(150) * k;
            $(el).find('.work-card__body').css('transform', 'translateY(' + v + 'px)');
          }
        }
      }
    });
  });
})();
