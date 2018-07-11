window.worksFilter = (function () {
  'use strict';

  var $ = window.jQuery;
  var $filter = $('.filter');
  // var $filterSelect = $('.filter__select');

  function getHashFilter() {
    // var hash = location.hash;
    // get filter=filterName
    var matches = location.hash.match(/filter=([^&]+)/i);
    var hashFilter = matches && matches[1];

    if (!hashFilter) {
      return '*';
    }
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
      });

      onHashchange();
    });

    // $filters = $filterSelect.on('change', function (event) {
    //   event.preventDefault();
    //   var filterAttr = this.value;
    //   // console.log(filterAttr)
    //   // set filter in hash
    //   location.hash = 'filter=' + encodeURIComponent(filterAttr);
    // });
  }

  // bind filter button click
  function onHashchange() {
    var hashFilter = getHashFilter();
    hashFilter = (hashFilter != '*') ? hashFilter : 'work-card';
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
      filter: '.' + hashFilter,
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    });
    $grid.on('arrangeComplete', function(event, filteredItems) {
      console.log(filteredItems);
    });
    // set selected class on button
    if (hashFilter) {
      $filters.find('.current').removeClass('current');
      $filters.find('[data-filter="' + hashFilter + '"]').closest('li').addClass('current');
    }
  }

  $(window).on('hashchange', onHashchange);
  // trigger event handler to init Isotope
})();
