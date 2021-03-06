;
(function() {
    /*放大镜效果 开始*/
    class scale {
        constructor() {
            this.spic = $('.left_pic');
            this.bpic = $('.big_fang img');
            this.sf = $('.sm_fang');
            this.bf = $('.big_fang');
            this.list = $('#smallPic li');
            this.ul = $('#smallPic');
        }
        init() {
            let _this = this;
            this.spic.hover(function() {
                _this.over();
            }, function() {
                _this.out();
            });

            this.list.on('click', function() {
                _this.liclick(this); //this:当前操作的li元素
            });
        }
        over() {
            let _this = this;
            this.sf.css('display', 'block');
            this.bf.css('display', 'block');
            //计算小放的尺寸和比例
            this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width());
            this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height());
            this.bili = this.bpic.width() / this.spic.width();
            this.spic.on('mousemove', function(e) {
                _this.move(e);
            });
        }
        out() {
            this.sf.css('display', 'none');
            this.bf.css('display', 'none');
        }
        move(e) {
            let l = e.pageX - this.spic.offset().left - this.sf.width() / 2;
            let t = e.pageY - this.spic.offset().top - this.sf.height() / 2;
            if (l <= 0) {
                l = 0
            } else if (l >= this.spic.width() - this.sf.width()) {
                l = this.spic.width() - this.sf.width()
            }

            if (t <= 0) {
                t = 0
            } else if (t >= this.spic.height() - this.sf.height()) {
                t = this.spic.height() - this.sf.height()
            }
            this.sf.css({
                left: l,
                top: t
            });
            this.bpic.css({
                left: -this.bili * l,
                top: -this.bili * t
            })
        }
        liclick(li) {
            let $imgurl = $(li).find('img').attr('src');
            this.spic.find('img').attr('src', $imgurl);
            this.bpic.attr('src', $imgurl);
        }


    }

    new scale().init();







})();