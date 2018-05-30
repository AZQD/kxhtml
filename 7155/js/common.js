$(function() {
	$.get("module/public-header.html",function(res){
		$(".public-header").html(res);
	})
	$.get("module/public-footer.html",function(res){
		$(".public-footer").html(res);
	})
});