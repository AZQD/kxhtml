$(function() {
	
	$.get('module/public-header.html',function(res){
		$('.public-header').html(res)
		$(".header .nav").on('click',function(){
			if ($(this).parents('.header').hasClass('sideBarAnimate')) {
				$(this).parents('.header').removeClass('sideBarAnimate')
				$(this).find("span").css("width","100%");
				$(".kx-column-nav").css('right', '-50%');
				$(".footer").removeClass('sideBarAnimate')
				$(".body-wrap").removeClass('sideBarAnimate')
			}else{
				$(this).parents('.header').addClass('sideBarAnimate')
				$(this).find("span").eq(1).css('width','75%');
				$(this).find("span").eq(2).css('width','50%');
				$(".kx-column-nav").css('right', '0');
				$(".footer").addClass('sideBarAnimate')
				$(".body-wrap").addClass('sideBarAnimate')

			}
			
		})

		$(".kx-column-nav .kx-column-main > ul > li > a").click(function(event) {
			if ($(this).siblings('ul').is(':visible')) {
				$(this).siblings('ul').stop(true, true).slideUp();
				$(this).removeClass('active')
				
			}else{
				$(this).siblings('ul').stop(true, true).slideDown().parents('li').siblings().find('ul').stop(true, true).slideUp();
				$(this).addClass('active').parents('li').siblings().find('a').removeClass('active');
			}
		});
	});
	$.get('module/public-footer.html',function(res){
		$('.public-footer').html(res)

	})


	

});	