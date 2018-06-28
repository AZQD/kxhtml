let jsonData = {
    topic:'宝宝3岁了，身体素质达标么？',
    img:'images/index/img.png',
    question:[
        {
            title:'当上下楼时,「孩子」能否双脚交替',
            desc:'当孩子找过2.5岁时，对自己身体的掌控能力更强了，表现为：可以交替双脚上下楼梯、跑步转大弯、判断迎面而来的妈妈的距离等。如果孩子超过3岁还不能双脚交替上下楼梯，有可能是孩子平时上下楼梯练习较少所以但却，也有可能是孩子平衡能力（视觉的空间感知能力）需要锻在确保安全的情况下，上下楼梯对三岁的孩子来是个非常好的练习身体平衡的活动。',
            answers:[
                {
                    answer:'完全没有问题',
                },
                {
                    answer:'大多时候OK',
                },
                {
                    answer:'有时可以有时不行',
                },
                {
                    answer:'偶尔能行',
                },
                {
                    answer:'无法做到',
                }
            ]
        },
        {
            title:'当上下楼时,「孩子」能否双脚交替',
            desc:'当孩子找过2.5岁时，对自己身体的掌控能力更强了，表现为：可以交替双脚上下楼梯、跑步转大弯、判断迎面而来的妈妈的距离等。如果孩子超过3岁还不能双脚交替上下楼梯，有可能是孩子平时上下楼梯练习较少所以但却，也有可能是孩子平衡能力（视觉的空间感知能力）需要锻在确保安全的情况下，上下楼梯对三岁的孩子来是个非常好的练习身体平衡的活动。',
            answers:[
                {
                    answer:'完全没有问题',
                },
                {
                    answer:'大多时候OK',
                },
                {
                    answer:'有时可以有时不行',
                },
                {
                    answer:'偶尔能行',
                },
                {
                    answer:'无法做到',
                }
            ]
        }
    ]
};

$(function(){
    //标题
    $('#currentTitle').html(jsonData.topic);
    //顶部话题
    $('.index-wrapper .content-box .topic').html(jsonData.topic);
    //头图
    $('.index-wrapper .content-box .img-box .img').attr('src', jsonData.img);

    questionFun(0);
    /**
     * 当前是第几道题
     * @param index
     */
    function questionFun(index) {
        //title
        $('.index-wrapper .content-box .question-box .title').html(jsonData.question[index].title);
        //当前题目num
        $('.index-wrapper .content-box .question-box .num-ctrl .cur-num').html(index+1);
        //总题目num
        $('.index-wrapper .content-box .question-box .num-ctrl .total-num').html(jsonData.question.length);
        //描述
        $('.index-wrapper .content-box .question-box .desc').html(jsonData.question[index].desc);
        //选项
        let $answers = $('.index-wrapper .content-box .question-box .answers');
        $answers.empty();
        for(let i = 0; i<jsonData.question[index].answers.length; i++){
            $answers.append(
                '<div class="item">'+jsonData.question[index].answers[i].answer+'</div>'
            );
        }
    }
});