$(function() {
	$.get('module/header.html',function(data){
		$(".header").html(data);
	})

	$.get('module/footer.html',function(data){
		$(".footer").html(data);
	})

	$.get('module/sidebar.html',function(data){
		$(".sidebar").html(data);
	})


});
 $('body').on('click','.toggle-btn',function(){
    if ($('.header').hasClass('active')) {
        $('.header').removeClass('active')
        $('.overlay').hide();
    }else{
        $('.header').addClass('active');
        $('.overlay').show();
    }
});
$("body").on('click','.overlay',function(){
    console.log('dddd');
     $('.header').removeClass('active');
     $('.overlay').hide();
});