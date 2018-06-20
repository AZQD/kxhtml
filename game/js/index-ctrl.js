$(function () {
    var initSecond = 3;//从第几秒倒计时
    var currentSecond;
    var stock = 3;
    var beginTime;
    var endTime;
    //开始
    $('.index-wrapper .part1-box').unbind('click').bind('click', function(){
        gameFun();
    });

    //返回
    $('.index-wrapper .part3-box .jump-ctrl .left').unbind('click').bind('click', function(){
       $('.index-wrapper .part-box').hide().eq(0).show();
    });
    //再来
    $('.index-wrapper .part3-box .jump-ctrl .right').unbind('click').bind('click', function(){
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
            currentSecond -- ;
            if (currentSecond === 0){
                clearInterval(timer);
                currentSecond = initSecond;
                var numbersArr = [];
                for(var i = 0; i<stock*stock; i++){
                    numbersArr.push(i+1);
                }
                numbersArr = numbersArr.sort(function (a, b) {
                    return 0.5 - Math.random();
                });
                for(var i = 0; i<stock*stock; i++){
                    $('#item-ul').append('' +
                        '<div class="item-li" num='+numbersArr[i]+'>\n' +
                        '<div class="item-li-num">'+numbersArr[i]+'</div>\n' +
                        '</div>' +
                        '');
                }
                $('.index-wrapper .part2-box .part2-warp .part2-middle').hide().eq(1).show();
                beginTime = new Date();
                var clickOne = true;//第一次正确点击
                var currentNum = 1;
                $('.index-wrapper .part2-box .part2-warp .game-box .item-ul .item-li').unbind('click').bind('click', function(){
                    if(clickOne){//点击1
                        if($(this).attr('num') == 1){
                            clickOne = false;
                            currentNum ++;
                            $(this).addClass('checked');
                        }
                    }else {
                        if(parseInt($(this).attr('num')) == currentNum){
                            currentNum ++;
                            $(this).addClass('checked');
                            if(currentNum>stock*stock){ //选择数字完成
                                endTime = new Date();
                                $('.index-wrapper .part3-box .time .time-num').html((endTime - beginTime)/1000);
                                setTimeout(function () {
                                    $('.index-wrapper .part-box').hide().eq(2).show();
                                }, 0);
                            }
                        }
                    }
                });
            }else {
                $('.index-wrapper .part2-box .part2-warp .count-box .count').html(currentSecond);
            }
        }, 1000);
    }
});