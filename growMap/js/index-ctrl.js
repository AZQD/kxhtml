$(function () {
    let $topBox = $('#topBox'),
        $leftBox = $('#leftBox'),
        $rightBox = $('#rightBox'),
        initRightLeft = 0,//rightBox的left值（已转换为正整数）；
        initAnimateTime = 5,//初始化动画时间
        eachStageLen = 444,//每个阶段的宽度
        eachRowLen = 30,//每一行的高度
        currentRow = 0,//当前在第几行
        $WindowLWidth = $(window).width(),
        percentage = 3,//每次水平移动屏幕宽度的1/n
        eachColumnLen = $WindowLWidth / percentage,//每水平移动一次的宽度
        horizontalIndex = 0,//水平移动的下标
        totalStage = 6,//阶段总数
        age = Number(getParamByUrl('age')) || 0; //年龄

    animateLeft(eachStageLen * (totalStage - 1), initAnimateTime, initPoint);

    function initPoint() {
        animateLeft(eachStageLen * age, 1, function () {
            initRightLeft = Math.abs(parseFloat($rightBox.css('left')));
            keyCodeFun();
        });
    }

    function animateLeft(moveWidth, time = 0.2, callback) {//移动的宽度, 动画时间，回调函数
        $topBox.stop(true).animate({
            left: -moveWidth
        }, time * 1000, 'linear');
        $rightBox.stop(true).animate({
            left: -moveWidth
        }, time * 1000, 'linear', function () {
            callback && callback();
        });
    }

    function animateTop(currentRow, time = 0.2, callback) {//当前在第几行, 动画时间，回调函数
        $leftBox.stop(true).animate({
            top: -eachRowLen * currentRow
        }, time * 1000, 'linear');
        $rightBox.stop(true).animate({
            top: -eachRowLen * currentRow
        }, time * 1000, 'linear');
    }

    function keyCodeFun() {
        $(document).keydown(function (e) {
            e = e || event;
            if (e.keyCode === 37) {//左
                let leftNum = initRightLeft / eachColumnLen;
                if ((horizontalIndex + 1) <= leftNum) {
                    horizontalIndex++;
                    animateLeft(initRightLeft - eachColumnLen * horizontalIndex);
                } else {
                    animateLeft(0);
                    initRightLeft = 0;
                    horizontalIndex = 0;
                }
            }
            if (e.keyCode === 39) {//右
                let rightNum = ($topBox.children('.topImg').width() - initRightLeft) / eachColumnLen;
                if ((Math.abs(horizontalIndex - 1)) <= rightNum) {
                    horizontalIndex--;
                    animateLeft(initRightLeft - eachColumnLen * horizontalIndex);
                }
            }
            if (e.keyCode === 38) {//上
                if (currentRow > 0) {
                    currentRow--;
                    animateTop(currentRow);
                }
            }
            if (e.keyCode === 40) {//下
                if ((currentRow + 1) * eachRowLen < $('.index-wrapper .content-box .partB').height()) {
                    currentRow++;
                    animateTop(currentRow);
                }
            }
        });
    }

});