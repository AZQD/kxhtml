$(function () {
    //左侧item的下标
    let currentIndex = 0;
    let deleteBtn = true;

    //切换左侧item
    $(".index-wrapper .content-box .huiBen-box .left").delegate(".page-item","click",function(){
        deleteBtn = true;
        let index = $(this).index();
        currentIndex = index;
        $('.index-wrapper .content-box .huiBen-box .left .page-item').removeClass('active').eq(index).addClass('active');
    });

    //添加item
    $('.index-wrapper .content-box .huiBen-box .left .add-item').unbind('click').bind('click', function(){
        $(this).before(
            '<div class="page-item"></div>'
        );
    });
    //删除item
    $('.index-wrapper .content-box .huiBen-box .middle .bottom-ctrl .right-ctrl .btn-delete').unbind('click').bind('click', function(){
        if(deleteBtn){
            $('.index-wrapper .content-box .huiBen-box .left .page-item').eq(currentIndex).remove();
            deleteBtn = false;
        }else {
            alert('请选择删除页面~');
        }
    });

    //切换右侧菜单
    $('.index-wrapper .menu-box .menu-item').unbind('click').bind('click', function () {
        let index = $(this).index();
        $('.index-wrapper .menu-box .menu-item').removeClass('active').eq(index).addClass('active');
        if (index === 0) {
            $('.index-wrapper .content-box .huiBen-box').show();
            $('.index-wrapper .content-box .other-box').hide();
        } else {
            $('.index-wrapper .content-box .huiBen-box').hide();
            $('.index-wrapper .content-box .other-box').show().html($(this).html());
        }
    });
});