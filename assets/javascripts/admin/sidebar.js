$(window).load(function() {
  var currentPage = location.pathname;

  var currentPageRouteList = currentPage.split('/');
  var route = '';
  var $currentLi;

  for (var i = 0; i < currentPageRouteList.length; i += 1) {
    route += currentPageRouteList[i] + '/';
    currentPageRouteList[i] = $('#control-menu .panel-collapse li>a[href^="'+ route.replace(/\/$/, '') +'"]').first();
  }

  i = currentPageRouteList.length - 1;

  while (true) {
    $currentLi = currentPageRouteList[i];
    i -= 1;
    if (i <= 0 || ($currentLi && $currentLi.length)) {
      break;
    }
  }

  $currentLi.addClass('active')
    .parents('div.panel-collapse').addClass('in')
    .siblings('a.control-menu-top').removeClass('collapsed');
});
