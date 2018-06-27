let jsonData = {
    innerImg: 'images/index/img.png',
    code: 'images/index/code.png',
    infoTitle: '两个小朋友',
    infoContent: '篱落疏疏一径深，树头花落未成阴。 儿童急走追黄蝶，飞入菜花无处寻。'
};
let contentBoxBg, innerBoxBgColor, innerImgBg;
let type = getParamByUrl('type');
switch (type) {
    case '2':
        contentBoxBg = `images/index/bg${type}.png`;
        innerImgBg = `images/index/img-bg${type}.png`;
        innerBoxBgColor = '#f6dcc6';
        break;
    case '3':
        contentBoxBg = `images/index/bg${type}.png`;
        innerImgBg = `images/index/img-bg${type}.png`;
        innerBoxBgColor = '#c2e5e6';
        break;
    case '4':
        contentBoxBg = `images/index/bg${type}.png`;
        innerImgBg = `images/index/img-bg${type}.png`;
        innerBoxBgColor = '#c3b1cd';
        break;
    case '5':
        contentBoxBg = `images/index/bg${type}.png`;
        innerImgBg = `images/index/img-bg${type}.png`;
        innerBoxBgColor = '#f9d3c7';
        break;
    case '6':
        contentBoxBg = `images/index/bg${type}.png`;
        innerImgBg = `images/index/img-bg${type}.png`;
        innerBoxBgColor = '#e1eee0';
        break;
    default:
        contentBoxBg = `images/index/bg1.png`;
        innerImgBg = `images/index/img-bg1.png`;
        innerBoxBgColor = '#d1ebf7';
}

$(function () {
    //容器背景图
    $('.index-wrapper .content-box').css({
        'background': `url(${contentBoxBg}) no-repeat center center`,
        'backgroundSize': '100% 100%'
    });
    //内部div的背景色
    $('.index-wrapper .content-box .inner-box').css({
        'background': innerBoxBgColor
    });
    //内部图片的背景图
    $('.index-wrapper .content-box .inner-box .img-bg-box .img-bg').attr({
        'src': innerImgBg
    });
    //内部图片
    $('.index-wrapper .content-box .inner-box .img-box .img').attr({
        'src': jsonData.innerImg
    });
    //二维码图片
    $('.index-wrapper .content-box .inner-box .desc-box .right .code').attr({
        'src': jsonData.code
    });
    //info-title
    $('.index-wrapper .content-box .inner-box .desc-box .left .title').html(jsonData.infoTitle);
    //info-content
    $('.index-wrapper .content-box .inner-box .desc-box .left .content').html(jsonData.infoContent);
    $('.index-wrapper').show();
});