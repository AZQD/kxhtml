$(function(){
  $('.share-code-box .bottom-box .btn').unbind('click').bind('click', function(){
    $('.shade-wrap').show();
  });
  $('.shade-wrap').unbind('click').bind('click', function(){
    $('.shade-wrap').hide();
  });
});