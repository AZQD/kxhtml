$(function () {
    if (getParamByUrl('type') == 2) {
        $('.index-wrapper .part-box').eq(1).show();
    } else if(getParamByUrl('type') == 3) {
        $('.index-wrapper .part-box').eq(2).show();
    }else {
        $('.index-wrapper .part-box').eq(0).show();
    }

    //第一个遮罩
    $('.index-wrapper .part1-box .part1-shade .part1-content .pause-icon').unbind('click').bind('click', function () {
        $(this).hide();
        $('.index-wrapper .part1-box .part1-shade .part1-content .tips-box').show();
    });
    $('.index-wrapper .part1-box .part1-shade .part1-content .tips-box .close-icon').unbind('click').bind('click', function () {
        $('.index-wrapper .part1-box .part1-shade .part1-content .pause-icon').show();
        $('.index-wrapper .part1-box .part1-shade .part1-content .tips-box').hide();
    });
});