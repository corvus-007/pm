window.worksFilter = (function () {
  'use strict';

  var $ = window.jQuery;
  var $filter = $('.filter');

  function getHashFilter() {
    var matches = location.hash.match(/filter=([^&]+)/i);
    var hashFilter = matches && matches[1];
    return hashFilter && decodeURIComponent(hashFilter);
  }

  if ($filter.length) {
    var $grid = $('.works__list');
    var $filters;
    var isIsotopeInit = false;

    $grid.imagesLoaded(function () {
      $filters = $filter.on('click', 'a', function (event) {
        event.preventDefault();
        var filterAttr = $(this).data('filter');
        // set filter in hash
        location.hash = 'filter=' + encodeURIComponent(filterAttr);
        $('.work-card').removeClass('work-card--filtered');
      });

      $(window).on('hashchange', onHashchange);
      // trigger event handler to init Isotope
      onHashchange();
    });
  }

  // bind filter button click
  function onHashchange() {
    var hashFilter = getHashFilter();
    if (!hashFilter && isIsotopeInit) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $grid.isotope({
      layoutMode: 'vertical',
      percentPosition: true,
      stagger: 30,
      itemSelector: '.work-card',
      filter: hashFilter,
      transitionDuration: 0,
    });

    $grid.on('arrangeComplete', function (event, filteredItems) {
      $('.work-card').removeClass('work-card--filtered');
      $(filteredItems).each(function () {
        $(this.element).addClass('work-card--filtered');
      });
    });

    $grid.on('layoutComplete', function (event, laidOutItems) {
      window.worksList.findActiveSection();
    });

    // set selected class on button
    if (hashFilter) {
      $filters.find('.current').removeClass('current');
      $filters.find('[data-filter="' + hashFilter + '"]').closest('li').addClass('current');
    }
  }
})();
