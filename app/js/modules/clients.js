window.clients = (function () {
  'use strict';

  var $ = window.jQuery;

  var $clients = $('.clients');

  var timeStamps = [];
  var positions = [];



  function scrollLeft() {
    $clientsLists.each(function (index) {
      var interval = 10 + index;
      var $list = $clientsLists.eq(index);
      var position = positions[index] || 0;

      timeStamps[index] = setInterval(function () {

        position -= 2;

        if (position <= 0) {
          position = 0;
        }
        positions[index] = position;

        $list.css('transform', 'translateX(-' + position + 'px)');
      }, interval);
    });
  }

  function scrollRight() {
    $clientsLists.each(function (index) {
      var interval = 10 + index;
      var $list = $clientsLists.eq(index);
      var maxPosition = this.scrollWidth - this.clientWidth;
      var position = positions[index] || 0;

      timeStamps[index] = setInterval(function () {

        position += 2;

        if (position >= maxPosition) {
          position = maxPosition;
        }
        positions[index] = position;

        $list.css('transform', 'translateX(-' + position + 'px)');
      }, interval);
    });
  }

  function clearTime() {
    for (var i = 0; i < timeStamps.length; i++) {
      clearInterval(timeStamps[i]);
    }
  }

  if ($clients.length) {
    var $clientsHoverLeft = $('.js-client-scroll-left');
    var $clientsHoverRight = $('.js-client-scroll-right');
    var $clientsLists = $('.clients__list');

    $clientsHoverLeft.on('mouseover', function () {
      scrollLeft();
    });

    $clientsHoverRight.on('mouseover', function () {
      scrollRight();
    });

    $clientsHoverLeft.on('mouseout', function () {
      clearTime();
    });

    $clientsHoverRight.on('mouseout', function () {
      clearTime();
    });
  }
})();
