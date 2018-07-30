window.clients = (function () {
  'use strict';

  var $ = window.jQuery;

  if (window.matchMedia("(min-width: 1024px)").matches) {
    $('.clients').imagesLoaded(function () {
      $(".clients__line").each(function (index, clientsLine) {
        var clientsListWrapper = clientsLine.querySelector(".clients__list-wrapper");
        var clinetsList = clientsLine.querySelector(".clients__list");
        var clinetsListCloneLeft = clinetsList.cloneNode(true);
        var clinetsListCloneRight = clinetsList.cloneNode(true);

        clinetsListCloneLeft.classList.add(
          "clients__list--clone",
          "clients__list--left"
        );
        clinetsListCloneRight.classList.add(
          "clients__list--clone",
          "clients__list--right"
        );
        clientsListWrapper.insertBefore(clinetsListCloneLeft, clinetsList);
        clientsListWrapper.insertBefore(clinetsListCloneRight, null);

        var avgWidth = clientsLine.scrollWidth - clientsLine.clientWidth;
        clientsLine.addEventListener("scroll", function (event) {
          if (clientsLine.scrollLeft >= avgWidth) {
            clientsLine.scrollLeft =
              clientsLine.scrollWidth / 3 +
              (clinetsList.scrollWidth - clientsLine.clientWidth);
          }
          if (clientsLine.scrollLeft <= 0) {
            clientsLine.scrollLeft = clientsLine.scrollWidth / 3;
          }
        });

        function getCenterScrollPosition() {
          // return clientsLine.scrollWidth / 2 - clientsLine.clientWidth / 2;
          return clientsLine.scrollWidth / 3;
        }

        clientsLine.scrollLeft = getCenterScrollPosition();

        var requestId;
        var request20;
        var requestArr = [];

        $(".js-client-scroll-left").on("mouseover", function () {
          requestId = requestAnimationFrame(function animate() {
            clientsLine.scrollLeft += 2 + index;
            request20 = requestAnimationFrame(animate);
            requestArr.push(request20);
          });
        });

        $(".js-client-scroll-left").on("mouseout", function () {
          for (var req of requestArr) {
            cancelAnimationFrame(req);
          }
          cancelAnimationFrame(requestId);
          requestArr.length = 0;
        });

        $(".js-client-scroll-right").on("mouseover", function () {
          requestId = requestAnimationFrame(function animate() {
            clientsLine.scrollLeft -= 2 + index;
            request20 = requestAnimationFrame(animate);
            requestArr.push(request20);
          });
        });

        $(".js-client-scroll-right").on("mouseout", function () {
          for (var req of requestArr) {
            cancelAnimationFrame(req);
          }
          cancelAnimationFrame(requestId);
          requestArr.length = 0;
        });
      });
    });
  }
})();
