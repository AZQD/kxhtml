$(function () {
    let $topBox = $('#topBox'),
        $leftBox = $('#leftBox'),
        $rightBox = $('#rightBox'),
        initRightLeft = 0,//rightBox的left值；
        initRightTop = 0,//rightBox的top值；
        initAnimateTime = 5,//初始化动画时间
        keyMoveTime = 0.2,//按键按完之后移动的时间
        eachStageLen = 1773,//每个阶段的宽度
        eachRowLen = 100,//每一行的高度
        WindowLWidth = $(window).width(),
        percentage = 3,//每次水平移动屏幕宽度的1/n
        eachColumnLen = WindowLWidth / percentage,//每水平移动一次的宽度
        totalStage = 6,//阶段总数
        age = Number(getParamByUrl('age')) || 0; //年龄

    animateLeft(eachStageLen * (totalStage - 1), initAnimateTime, initPoint);

    function initPoint() {
        let len = eachRowLen * age;
        let maxWidth = $topBox.children('.topImg').width() - WindowLWidth;
        if (len >= maxWidth) {
            len = maxWidth;
        }
        animateLeft(len, keyMoveTime, function () {
            keyCodeFun();
        });
    }

    function animateLeft(moveWidth, time = keyMoveTime, callback) {//移动的宽度, 动画时间，回调函数
        $topBox.stop(true).animate({
            left: -moveWidth
        }, time * 1000, 'linear');
        $rightBox.stop(true).animate({
            left: -moveWidth
        }, time * 1000, 'linear', function () {
            callback && callback();
        });
    }

    function animateTop(moveHeight, time = keyMoveTime, callback) {//移动的高度, 动画时间，回调函数
        $leftBox.stop(true).animate({
            top: -moveHeight
        }, time * 1000, 'linear');
        $rightBox.stop(true).animate({
            top: -moveHeight
        }, time * 1000, 'linear');
    }

    let leftBtn = true;
    let rightBtn = true;
    let topBtn = true;
    let bottomBtn = true;

    function keyCodeFun() {
        $(document).keydown(function (e) {
            e = e || event;
            if (e.keyCode === 37) {//左
                if (leftBtn) {
                    initRightLeft = Math.abs(parseFloat($rightBox.css('left')));
                    if (initRightLeft >= eachColumnLen) {
                        animateLeft(initRightLeft - eachColumnLen);
                    } else {
                        animateLeft(0);
                    }
                    leftBtn = false;
                    setTimeout(function () {
                        leftBtn = true;
                    }, keyMoveTime * 1000);
                }
            }
            if (e.keyCode === 39) {//右
                if (rightBtn) {
                    initRightLeft = Math.abs(parseFloat($rightBox.css('left')));
                    if (initRightLeft + eachColumnLen + WindowLWidth <= $topBox.children('.topImg').width()) {
                        animateLeft(initRightLeft + eachColumnLen);
                    } else {
                        animateLeft($topBox.children('.topImg').width() - WindowLWidth);
                    }
                    rightBtn = false;
                    setTimeout(function () {
                        rightBtn = true;
                    }, keyMoveTime * 1000);
                }
            }
            if (e.keyCode === 38) {//上
                if (topBtn) {
                    initRightTop = Math.abs(parseFloat($rightBox.css('top')));
                    if (initRightTop - eachRowLen >= 0) {
                        animateTop(initRightTop - eachRowLen);
                    } else {
                        animateTop(0);
                    }
                    topBtn = false;
                    setTimeout(function () {
                        topBtn = true;
                    }, keyMoveTime * 1000);
                }
            }
            if (e.keyCode === 40) {//下
                if (bottomBtn) {
                    initRightTop = Math.abs(parseFloat($rightBox.css('top')));
                    let clientHeight = $(window).height() - $topBox.height();
                    let partBHeight = $('.index-wrapper .content-box .partB').height();
                    if (initRightTop + eachRowLen + clientHeight <= partBHeight) {
                        animateTop(initRightTop + eachRowLen);
                    } else {
                        animateTop(partBHeight - clientHeight);
                    }
                    bottomBtn = false;
                    setTimeout(function () {
                        bottomBtn = true;
                    }, keyMoveTime * 1000);
                }
            }
        });
    }

});