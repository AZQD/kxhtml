$(function () {
    var leftFlag = true;
    var leftIndex = 0;
    var $leftItems = $("#container .body-wrap .part-left .info-bottom .info-item");
    var leftItemLth = $leftItems.length;
    var rightIndex = 0;
    var $rightItems = $("#container .body-wrap .part-right .info-right");
    var rightItemHeight = $rightItems.eq(0).innerHeight()
    var rightItemLth = $rightItems.length;

    $(document).keydown(function (e) {
        var e = e || event;
        //左侧菜单
        if (leftFlag) {
            if (e.keyCode == 37 || e.keyCode == 38) {
                leftIndex = (leftIndex == 0 ? (leftItemLth - 1) : (--leftIndex));
            } else if (e.keyCode == 39 || e.keyCode == 40) {
                leftIndex = (leftIndex >= (leftItemLth - 1) ? 0 : (++leftIndex));
            }
            console.log('左侧menu', leftIndex);
            $leftItems.removeClass('active').eq(leftIndex).addClass('active');
            // 回车事件
            if (e.keyCode == 13) {
                leftFlag = false;
                $rightItems.children('.right-box').removeClass('active').eq(rightIndex).addClass('active');
            }
            //右侧菜单
        } else {
            //左
            if (e.keyCode == 37) {
                rightIndex = (rightIndex == 0 ? (rightItemLth - 1) : (--rightIndex));
                //上
            } else if (e.keyCode == 38) {

                if (rightIndex - 3 < 0) {
                    if (rightIndex == 2) {
                        if (rightItemLth % 3 == 0) {
                            rightIndex = rightItemLth - 1;
                        } else if (rightItemLth % 3 == 1) {
                            rightIndex = rightItemLth - 2;
                        } else if (rightItemLth % 3 == 2) {
                            rightIndex = rightItemLth - 3;
                        }
                    } else if (rightIndex == 1) {
                        if (rightItemLth % 3 == 0) {
                            rightIndex = rightItemLth - 2;
                        } else if (rightItemLth % 3 == 1) {
                            rightIndex = rightItemLth - 3;
                        } else if (rightItemLth % 3 == 2) {
                            rightIndex = rightItemLth - 1;
                        }
                    } else {
                        if (rightItemLth % 3 == 0) {
                            rightIndex = rightItemLth - 3;
                        } else if (rightItemLth % 3 == 1) {
                            rightIndex = rightItemLth - 1;
                        } else if (rightItemLth % 3 == 2) {
                            rightIndex = rightItemLth - 2;
                        }
                    }
                } else {
                    rightIndex -= 3;
                }

                //右
            } else if (e.keyCode == 39) {
                rightIndex = (rightIndex >= (rightItemLth - 1) ? 0 : (++rightIndex));
                //下
            } else if (e.keyCode == 40) {
                if ((rightIndex + 3) > (rightItemLth - 1)) {
                    if (rightIndex % 3 == 1) {
                        rightIndex = 1;
                    } else if (rightIndex % 3 == 2) {
                        rightIndex = 2;
                    } else {
                        rightIndex = 0;
                    }
                } else {
                    rightIndex += 3;
                }
            }
            console.log('右侧item', rightIndex);
            if ($rightItems.children('.right-box').eq(rightIndex).hasClass('locked')) {
                $rightItems.children('.right-box').removeClass('active active-locked').eq(rightIndex).addClass('active active-locked');
            } else {
                $rightItems.children('.right-box').removeClass('active active-locked').eq(rightIndex).addClass('active');
            }
            // 回车事件
            if (e.keyCode == 13) {
                console.log('选中当前项');
            }
            if (e.keyCode == 4 || e.keyCode == 27) {
                leftFlag = true;
                rightIndex = 0;
                $('.part-right').scrollTop(0);
                $rightItems.children('.right-box').removeClass('active active-locked');
            }

            if ($rightItems.children('.right-box').eq(rightIndex).offset().top < 0) {
                $('.part-right').scrollTop($('.part-right').scrollTop() - rightItemHeight);
            }
            if ($rightItems.children('.right-box').eq(rightIndex).offset().top > rightItemHeight * 3) {
                $('.part-right').scrollTop($('.part-right').scrollTop() + rightItemHeight);
            }

            //下
            if (e.keyCode == 39 || e.keyCode == 40) {
                if (rightIndex == 0 || rightIndex == 1 || rightIndex == 2) {
                    $('.part-right').scrollTop(0);
                }
            }
            if (e.keyCode == 37 || e.keyCode == 38) {
                if (rightIndex == rightItemLth - 1 || rightIndex == rightItemLth - 2 || rightIndex == rightItemLth - 3) {
                    $('.part-right').scrollTop($('.part-right').height() * 99);
                }
            }
        }
        return false;
    });
});