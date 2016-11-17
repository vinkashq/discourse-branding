(function ($) {
  'use strict';

  $(window).scroll(function(){
    var fromTop = $(window).scrollTop();
    var margin = 60 - fromTop;
    if(margin < 0) {
       margin = 0;
    }
    $("header.d-header").css('margin-top', margin + 'px');
  });

})(jQuery);
