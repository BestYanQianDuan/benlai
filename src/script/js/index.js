;
(function() {



    /*轮播图效果 开始*/
    function slideshow() {
        //获取元素
        var bannerPic = document.querySelector('.index_banner');
        var picLi = document.querySelectorAll('.banner_pic a');
        var btnLi = document.querySelectorAll('.index_wraper ul li');
        var btnLeft = document.querySelector('#btn_left');
        var btnRight = document.querySelector('#btn_right');
        var timer = null;

        var num = 0; //定义变量，存放索引


        //给btnLi添加鼠标移入事件
        for (var i = 0; i < btnLi.length; i++) {
            btnLi[i].index = i; //自定义索引
            btnLi[i].onmouseover = function() {
                num = this.index; //当前的按钮的索引
                for (var j = 0; j < btnLi.length; j++) {
                    btnLi[j].className = '';
                    picLi[j].style.display = "none";
                }
                btnLi[num].className = 'active'; //当前的按钮
                picLi[num].style.display = "block";
            };
        }

        //按钮显示和隐藏。
        bannerPic.onmouseover = function() {
            btnLeft.style.display = 'block';
            btnRight.style.display = 'block';
            clearInterval(timer);
        };

        bannerPic.onmouseout = function() {
            btnLeft.style.display = 'none';
            btnRight.style.display = 'none';
            timer = setInterval(function() {
                btnRight.onclick();
            }, 3000);
        };

        //箭头添加事件
        btnRight.onclick = function() {
            num++;
            if (num > 5) {
                num = 0;
            }
            for (var j = 0; j < btnLi.length; j++) {
                btnLi[j].className = '';
                picLi[j].style.display = "none";
            }
            btnLi[num].className = 'active';
            picLi[num].style.display = "block";
        }


        btnLeft.onclick = function() {
            num--;
            if (num < 0) {
                num = 5;
            }
            for (var j = 0; j < btnLi.length; j++) {
                btnLi[j].className = '';
                picLi[j].style.display = "none";
            }
            btnLi[num].className = 'active';
            picLi[num].style.display = "block";
        }


        //自动轮播
        timer = setInterval(function() {
            btnRight.onclick();
        }, 3000);
    }

    slideshow();
    /*轮播图 结束*/





    /*楼层监听 开始*/
    function monitor() {

        var $loutinav = $('#nav_left');
        var $loutiLi = $('#nav_left a').not(".ico1");
        var $louceng = $('.louceng');

        //添加滚轮事件，显示隐藏楼梯导航
        $(window).on('scroll', function() {
            var $top = $(window).scrollTop(); //滚动条的距离
            if ($top >= 500) {
                $loutinav.show();
            } else {
                $loutinav.hide();
            }

            //拖动滚动条，对应的楼梯添加类名，楼梯到了那块区域。
            $louceng.each(function(index, element) {
                var $loucentTop = $(element).offset().top; //每个楼层的top值。
                if ($loucentTop > $top - 500) {
                    $loutiLi.removeClass('active'); //每次触发滚轮事件，移除所有楼梯的类。
                    $loutiLi.eq(index - 1).addClass('active');
                    return false; //遍历一次，终止循环。
                }
            });



        });

        //点击楼梯导航,楼层跳到对应的位置。

        $loutiLi.on('click', function() {
            //$(this).index():当前点击的楼梯的索引。
            $(this).addClass('active').siblings().removeClass('active'); //当前的元素添加类，其他的兄弟元素移除类。
            var $top = $louceng.eq($(this).index()).offset().top;
            //document.documentElement.scrollTop
            //document.body.scrollTop
            $('html,body').animate({ //赋值注意内部的属性。
                scrollTop: $top
            });
        });

        //回到顶部
        $('.ico1').on('click', function() {
            $('html,body').animate({ //赋值注意内部的属性。
                scrollTop: 0
            });
        });
    }
    monitor();
    /*楼层监听 结束*/




    /*蔬菜板块数据渲染 开始*/
    $.ajax({
        url: 'http://10.31.163.35/work/projectname/php/vgdata.php',
        success: function(data) {
            var arrdata = JSON.parse(data);
            var $html = '';
            $.each(arrdata, function(index, value) {
                $html += `
                <li>    
                    <div class="box">
                        <p class="pic">
                            <a href="details.html">
                                <img src="${value.url}">
                            </a>
                        </p>
                        <p class="name">
                            <a href="details.html">
                                <font>${value.name}</font><span>${value.describe}</span>
                            </a>
                        </p>
                        <p class="price">${value.price}<span></span></p>
                        <p class="btn">
                           <a class="ico30"></a>
                        </p>
                    </div>
                </li>
                `;
            });
            $('.vg_list').html($html);
        }
    });






    /*蔬菜板块数据渲染 结束*/




})();