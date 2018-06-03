$(function () {
    $('.discount-wrapper .menu-box .part').unbind('click').click(function(){
       var index = $(this).index();
        $('.discount-wrapper .menu-box .part').removeClass('active').eq(index).addClass('active');
    });
});