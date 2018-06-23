$(function () {
    var initSecond = 3;//从第几秒倒计时
    var currentSecond;//当前秒数
    var stock = 3;//默认3*3矩阵
    var minStock = 2;//最大矩阵2*2
    var maxStock = 9;//最大矩阵9*9
    var paramN = Number(getParamByUrl('n'));
    if (paramN && paramN >= minStock && paramN <= maxStock) {
        stock = paramN;
    }
    $('#currentTitle').html(stock + 'X' + stock);//title
    $('#maxNumber').html(stock * stock);
    var beginTime;
    var endTime;
    var enterKeyCodeBtn = 1;//回车按钮控制 1：开始；2：选择元素；3：再来；
    var focusedOne = true;//第一次获取光标
    var initKeyCodeFocus = false;

    //开始
    $('.index-wrapper .part1-box').unbind('click').bind('click', function () {
        console.log('enterKeyCodeBtn',enterKeyCodeBtn);
        enterKeyCodeBtn = 2;
        gameFun();
    });
    $(document).keydown(function (e){
        if(enterKeyCodeBtn === 1){
            var e = e || event;
            console.log('enterKeyCodeBtn',enterKeyCodeBtn);
            if (e.keyCode === 13 || e.keyCode === 23) {//回车&OK
                enterKeyCodeBtn = 2;
                focusedOne = false;//如果初始化是按键模式，则初始化已经获取光标
                initKeyCodeFocus = true;
                gameFun();
            }
        }
    });

    //返回
    $('.index-wrapper .part3-box .jump-ctrl .left').unbind('click').bind('click', function () {
        enterKeyCodeBtn = 1;
        $('.index-wrapper .part-box').hide().eq(0).show();
    });
    $(document).keydown(function (e){
        if(enterKeyCodeBtn === 3){
            var e = e || event;
            console.log('enterKeyCodeBtn',enterKeyCodeBtn);
            if (e.keyCode === 4 || e.keyCode === 27) {
                enterKeyCodeBtn = 1;
                $('.index-wrapper .part-box').hide().eq(0).show();
            }
        }
    });

    //再来
    $('.index-wrapper .part3-box .jump-ctrl .right').unbind('click').bind('click', function () {
        console.log('enterKeyCodeBtn',enterKeyCodeBtn);
        enterKeyCodeBtn = 2;
        $('.index-wrapper .part-box').hide().eq(1).show();
        gameFun();
    });
    $(document).keydown(function (e){
        if(enterKeyCodeBtn === 3){
            var e = e || event;
            console.log('enterKeyCodeBtn',enterKeyCodeBtn);
            if (e.keyCode === 13 || e.keyCode === 23) {//回车&OK
                enterKeyCodeBtn = 2;
                $('.index-wrapper .part-box').hide().eq(1).show();
                gameFun();
            }
        }
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
                numbersArr = numbersArr.sort(function (a, b) {
                    return 0.5 - Math.random();
                });
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
                var finalNeedLenTh;
                var itemUlWidth = parseInt($('#game-box').width());//game-box的宽度
                var itemClientHeight = $(window).height() - $('#tips-box').height() - $('#ctrl-box').height();
                var currentNumFontSize = 1;
                if(itemUlWidth>=itemClientHeight){//横屏
                    finalNeedLenTh = itemClientHeight - 50;
                    if (stock > 4) {
                        currentNumFontSize = 0.1
                    }
                }else {//竖屏
                    finalNeedLenTh = itemUlWidth;
                    if (stock > 5) {
                        currentNumFontSize = 0.5
                    }
                }
                $('#game-box').width(finalNeedLenTh).css('margin', '0 auto');

                // $('#game-box').width(itemUlWidth/2)
                // itemUlWidth = itemUlWidth/2;
                var $itemLi = $('.index-wrapper .part2-box .part2-warp .game-box .item-ul .item-li');

                console.log(123,currentNumFontSize);
                $itemLi.css({
                    'width': finalNeedLenTh / stock + 'px',
                    'height': finalNeedLenTh / stock + 'px',
                    "fontSize": currentNumFontSize + 'rem'
                });
                beginTime = new Date();
                var clickOne = true;//第一次正确点击
                var currentNum = 1;//点击的数字
                var focusedItemIndex = 0;//光标停留的位置
                $itemLi.unbind('click').bind('click', function () {
                    focusedOne = false;//点击后获取到光标
                    focusedItemIndex = $(this).index();
                    $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    checkItem($(this));
                });
                if(initKeyCodeFocus){//初始化是按键点击的开始，则有默认光标
                    $itemLi.removeClass('focused').eq(0).addClass('focused');
                }
                $(document).keydown(function (e) {
                    if(enterKeyCodeBtn === 2){
                        if (focusedOne) {//点击任意键获取光标
                            focusedOne = false;
                            focusedItemIndex = 0;
                            $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                        } else {
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
                            if (e.keyCode === 13 || e.keyCode === 23) {//回车&OK
                                checkItem($itemLi.eq(focusedItemIndex));
                            }
                        }
                    }
                });

                function checkItem(thisItem) {
                    if (clickOne) {//点击1
                        if (parseInt(thisItem.attr('num')) === 1) {
                            clickOne = false;
                            currentNum++;
                            thisItem.addClass('checked');
                        }
                    } else {
                        if (parseInt(thisItem.attr('num')) === currentNum) {
                            currentNum++;
                            thisItem.addClass('checked');
                            if (currentNum > stock * stock) { //选择数字完成
                                endTime = new Date();
                                $('.index-wrapper .part3-box .time .time-num').html((endTime - beginTime) / 1000);
                                setTimeout(function () {
                                    enterKeyCodeBtn = 3;
                                    console.log('enterKeyCodeBtn',enterKeyCodeBtn);
                                    $('.index-wrapper .part-box').hide().eq(2).show();
                                }, 0);
                            }
                        }
                    }
                    console.log('enterKeyCodeBtn',enterKeyCodeBtn);
                }
            } else {
                $('.index-wrapper .part2-box .part2-warp .count-box .count').html(currentSecond);
            }
        }, 1000);
    }
});