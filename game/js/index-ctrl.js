$(function () {
    var initSecond = 3;//从第几秒倒计时
    var currentSecond;//当前秒数
    var stock = 3;//n*n矩阵(默认3*3)
    var maxStock = 9;//最大矩阵9*9
    if (Number(getParamByUrl('n')) && Number(getParamByUrl('n')) <= maxStock && (getParamByUrl('n') !== 'false')) {
        stock = Number(getParamByUrl('n'));
    }
    $('#currentTitle').html(stock + 'X' + stock);//title
    var beginTime;
    var endTime;
    //开始
    $('.index-wrapper .part1-box').unbind('click').bind('click', function () {
        gameFun();
    });
    //返回
    $('.index-wrapper .part3-box .jump-ctrl .left').unbind('click').bind('click', function () {
        $('.index-wrapper .part-box').hide().eq(0).show();
    });
    //再来
    $('.index-wrapper .part3-box .jump-ctrl .right').unbind('click').bind('click', function () {
        $('.index-wrapper .part-box').hide().eq(1).show();
        gameFun();
    });

    function gameFun() {
        currentSecond = initSecond;
        $('#item-ul').empty();//初始化
        $('.index-wrapper .part2-box .part2-warp .count-box .count').html(initSecond);//初始化
        $('.index-wrapper .part-box').hide().eq(1).show();
        $('.index-wrapper .part2-box .part2-warp .part2-middle').hide().eq(0).show();
        var timer = setInterval(function () {
            currentSecond--;
            if (currentSecond === 0) {//倒计时结束
                clearInterval(timer);
                currentSecond = initSecond;
                var numbersArr = [];
                for (var i = 0; i < stock * stock; i++) {
                    numbersArr.push(i + 1);
                }
                numbersArr = numbersArr.sort(function (a, b) {
                    return 0.5 - Math.random();
                });
                for (var j = 0; j < stock * stock; j++) {
                    $('#item-ul').append('' +
                        '<div class="item-li" num=' + numbersArr[j] + '>\n' +
                        '<div class="item-li-num">' + numbersArr[j] + '</div>\n' +
                        '</div>' +
                        '');
                }
                $('.index-wrapper .part2-box .part2-warp .part2-middle').hide().eq(1).show();
                var $itemUl = parseInt($('#game-box').width());//game-box的宽度
                var $itemLi = $('.index-wrapper .part2-box .part2-warp .game-box .item-ul .item-li');
                var currentNumFontSize = 1;
                if (stock > 5) {
                    currentNumFontSize = 0.5
                }
                $itemLi.css({
                    'width': $itemUl / stock + 'px',
                    'height': $itemUl / stock + 'px',
                    "fontSize": currentNumFontSize + 'rem'
                });
                beginTime = new Date();
                var clickOne = true;//第一次正确点击
                var currentNum = 1;//点击的数字
                var currentItem;//当前选中的元素
                var focusedItemIndex = 0;//光标停留的位置
                $itemLi.eq(focusedItemIndex).addClass('focused');
                $itemLi.unbind('click').bind('click', function () {
                    focusedItemIndex = $(this).index();
                    $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    currentItem = $(this);
                    checkItem(currentItem);
                });
                $(document).keydown(function (e) {
                    var e = e || event;
                    if (e.keyCode === 37) {//左
                        if (focusedItemIndex === 0) {
                            focusedItemIndex = stock * stock - 1;
                        } else {
                            focusedItemIndex--;
                        }
                        $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    }
                    if (e.keyCode === 39) {//右
                        if (focusedItemIndex === stock * stock - 1) {
                            focusedItemIndex = 0;
                        } else {
                            focusedItemIndex++;
                        }
                        $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    }
                    if (e.keyCode === 38) {//上
                        if (focusedItemIndex - stock < 0) {
                            focusedItemIndex = (focusedItemIndex + stock * (stock - 1));
                        } else {
                            focusedItemIndex -= stock;
                        }
                        $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    }
                    if (e.keyCode === 40) {//下
                        if (focusedItemIndex + stock >= stock * stock) {
                            focusedItemIndex = (focusedItemIndex + stock - stock * stock);
                        } else {
                            focusedItemIndex += stock;
                        }
                        $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    }
                    if (e.keyCode === 13) {//回车
                        checkItem($itemLi.eq(focusedItemIndex));
                    }
                });

                function checkItem(currentItem) {
                    if (clickOne) {//点击1
                        if (parseInt(currentItem.attr('num')) === 1) {
                            clickOne = false;
                            currentNum++;
                            currentItem.addClass('checked');
                        }
                    } else {
                        if (parseInt(currentItem.attr('num')) === currentNum) {
                            currentNum++;
                            currentItem.addClass('checked');
                            if (currentNum > stock * stock) { //选择数字完成
                                endTime = new Date();
                                $('.index-wrapper .part3-box .time .time-num').html((endTime - beginTime) / 1000);
                                setTimeout(function () {
                                    $('.index-wrapper .part-box').hide().eq(2).show();
                                }, 0);
                            }
                        }
                    }
                }
            } else {
                $('.index-wrapper .part2-box .part2-warp .count-box .count').html(currentSecond);
            }
        }, 1000);
    }
});