(function () {
  'use strict';

  var menuBtn = document.getElementsByClassName('menu-btn')[0];

  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();

    document.body.classList.toggle('side-visible',
      !document.body.classList.contains('side-visible')
    );
  });

  hljs.initHighlightingOnLoad();
})();
