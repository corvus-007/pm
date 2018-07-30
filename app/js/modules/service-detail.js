window.serviceDetail = (function () {
  'use strict';

  var $ = window.jQuery;
  var $serviceDetail = $('.service-detail');
  var $picture = $('.service-detail__picture');
  var abbr = '';

  if ($serviceDetail.length) {
    var $title = $('.service-detail__title');
    abbr = $title.text().split(' ').reduce(function (accumulator, currentVal) {
      accumulator += currentVal.charAt(0).toUpperCase();
      return accumulator;
    }, '');
    $('<span>', {
      class: 'service-detail__abbr',
      text: abbr.substr(0, 2)
    }).appendTo($picture);
  }
})();
