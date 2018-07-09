window.mainNav = (function () {
  'use strict';

  var $ = window.jQuery;
  var mainNav = document.querySelector('.main-nav');

  if (!mainNav) {
    return false;
  }

  var mainNavItems = mainNav.querySelectorAll('.main-nav__item');
  var mainNavLinks = mainNav.querySelectorAll('.main-nav__link');

  mainNav.classList.remove('main-nav--no-js');

  function closeSubnav(excludeItem) {
    for (var i = 0; i < mainNavItems.length; i++) {
      if (mainNavItems[i] !== excludeItem) {
        mainNavItems[i].classList.remove('main-nav__item--opened');
      }
    }
  }

  $(mainNavLinks).on('click', function () {
    var item = $(this).closest('.main-nav__item').get(0);

    closeSubnav(item);

    if (item.classList.contains('main-nav__item--opened')) {
      item.classList.remove('main-nav__item--opened');
    } else {
      item.classList.add('main-nav__item--opened');
    }
  });

})();
