$(function () {
    // 获取当前屏幕的高度
    let fullpageHeight = $(window).outerHeight()
    // 声明一个节流阀
    let flag = true;
    // 声明

    var myFullpage = new fullpage('#fullpage', {
        // 导航
        navigation: true,
        // 导航位置
        navigationPosition: 'right',
        // 每个section的锚点名称
        anchors: ['firstPage', 'secondPage'],
        fitToSection: false,
        // 每个section的背景颜色
        sectionsColor: ["rgb(250, 221, 103)", "rgb(132, 162, 212)", "rgb(239, 103, 77)", "rgb(255, 238, 221)", "#d04759", "#84d9ed", "#8ac060"],
        // 为了让easing起作用，需要 css3: false
        css3: false,
        // 设置动画效果
        easing: "easeInQuart",
        // 滚动速度
        scrollingSpeed: 1200,

        // 当滚到某一屏幕后开始执行的回调函数
        afterLoad: function (origin, destination, direction) {
            if (destination["index"] == 0) {
                // 每当到达页面动画完成时显示keepgo按钮
                $(".keep-go").fadeIn()
            }

            // 如果是从第一个section出发到达第二个section
            // 这里需要注意一个问题：我们一打开页面时，afterLoad事件也会触发，但是origin(上一个页面)是不存在的，所以值为null
            // 但是值为null的话，下面origin.index就会报错，所以我们在这里将 origin&& 放到前面，如果为null，直接false，不会接着判断orgin.index，就避免了报错的问题
            if (origin && origin["index"] == 0 && destination["index"] == 1 && flag == true) {
                $(".section2-computer-search").fadeIn("slow").animate({ "right": 370 }, 1500, function () {
                    // 显示文字图片
                    $(this).children().eq(1).fadeIn(500, function () {
                        $(this).parent().hide()
                        // 完整版搜索框  往右上角走，同时缩小
                        $(".section2-computer-together").show().animate({
                            height: 30,
                            right: 250,
                            bottom: 452
                        }, 800)
                        // 让8个小沙发显示并变大
                        $(".section2-computer-sofas").animate({
                            opacity: 1,
                            height: 218
                        }, 800, function () {
                            // 让那个要移动的小沙发和白色背景显示
                            $(".section2-computer-sofa2").show()
                            $(".section2-computer-cover").show()
                            // 关闭节流阀
                            flag = false; // 说明第二屏所有动画执行完毕
                            // 每当到达页面动画完成时显示keepgo按钮
                            $(".keep-go").fadeIn()
                        })
                        // 上面的文字，让定位的文字慢慢淡出，显示出后面的白色文字
                        $(".section2-title").children().eq(1).fadeOut()
                    })
                })
            }

            // 从第四屏离开，到达第五屏
            if (origin && origin["index"] == 3 && destination["index"] == 4) {
                // 提高手的位置
                $(".section5-hand").animate({
                    bottom: 0
                }, 1000, function () {
                    // 点击鼠标
                    $(".section5-mouse").hide()
                    // 沙发掉下
                    $('.section5-sofa-top').show().animate({
                        top: fullpageHeight - 400
                    }, 1000, function () {
                        // 让账单和沙发出来
                        $(".section5-paper").animate({
                            top: -110
                        })
                        $(".section5-sofa").animate({
                            top: 165
                        }, function () {
                            // 每当到达页面动画完成时显示keepgo按钮
                            $(".keep-go").fadeIn()
                        })
                    })
                })
            }

            // 到达第七屏
            if (origin && origin["index"] == 5 && destination["index"] == 6) {
                // 插入五星
                $(".section7-star").animate({
                    width: 98
                }, 1000, function () {
                    // 显示好评
                    $(".section7-nice").fadeIn(1000, function () {
                        // 每当到达页面动画完成时显示keepgo按钮
                        $(".keep-go").fadeIn()
                    })
                })
            }

            // 从最后一个回到第一个
            if (origin && origin["index"] == 7 && destination["index"] == 0) {
                location.reload()
            }
        },
        // 写一个从第二屏幕离开，正要去往第三屏幕的函数
        onLeave: function (origin, destination, direction) {
            // 每当离开时隐藏keepgo按钮
            $(".keep-go").fadeOut()

            if (origin && origin["index"] == 1 && destination["index"] == 2 && flag == false) {
                // 让沙发从第二屏幕到第三屏幕
                $(".section2-computer-sofa2").animate({
                    // 如何在不同分辨率下，让沙发的位置能刚好重叠呢？
                    // ：利用第三屏整个屏幕的高度 - 沙发应该距离底部的距离(也就是盒子距离底部的50 + 沙发距离盒子底部的200) = 第二屏沙发要到达的bottom值
                    bottom: -(fullpageHeight - 250),
                    height: 166,
                    left: 260
                }, 2000, function () {
                    $(".section3-select img:first-child").fadeIn(500)
                    $(".section3-select img:last-child").fadeIn(500, function () {
                        // 每当到达页面动画完成时显示keepgo按钮
                        $(".keep-go").fadeIn()
                    })
                })
            }
            // 从第三屏离开，去往第四屏时
            if (origin && origin["index"] == 2 && destination["index"] == 3) {
                $(".section2-computer-sofa2").hide()
                // 显示倾斜沙发
                $(".section3-sofa3").show().animate({
                    bottom: -(fullpageHeight - 240) - 50,
                    left: 247
                }, 2000, function () {
                    $(this).hide()
                    // 显示出和购物车一体的沙发
                    $(".cartwithsofa-sofa").show()
                    // 购物车移动出去
                    $(".cartwithsofa").animate({
                        left: "130%"
                    }, 2000, function () {
                        // 让中间小电脑显示
                        $(".section4_note").fadeIn("slow", function () {
                            // 让小电脑上的文字显示
                            $(this).children().eq(1).fadeIn("slow")
                            // 让小电脑上面的文字替换
                            $(".section4-words2").fadeIn("slow", function () {
                                // 每当到达页面动画完成时显示keepgo按钮
                                $(".keep-go").fadeIn()
                            })
                        })

                    })
                })
            }

            // 从第五屏离开，正去往第六屏时
            if (origin && origin["index"] == 4 && destination["index"] == 5) {
                // 让第五屏的沙发掉下来
                $(".section5-sofa").css("zIndex", 2).animate({
                    top: 421 + fullpageHeight - 480,
                    width: 60
                }, 1500)
                // 让盒子去接
                $(".section6-box").show().animate({
                    left: "26%",
                    bottom: 420
                }, 1500, function () {
                    // 隐藏沙发
                    $(".section5-sofa").hide()
                    // 将盒子放入车中
                    $(this).animate({
                        width: 60,
                        bottom: 40,
                        left: "40%"
                    }, function () {
                        // 隐藏盒子
                        $(this).hide()
                        // 显示目的地
                        $(".section6-target").show()
                        $('.section6').animate({
                            backgroundPositionX: "100%"
                        }, 3000, function () {
                            // 送货人出现
                            $(".section6-man").animate({
                                width: 252,
                                bottom: 111
                            }, 1000, function () {
                                $(this).animate({
                                    left: 110
                                }, 500, function () {
                                    // 清收货
                                    $(".section6-takeit").fadeIn()
                                    // 开门
                                    $(".section6-opendoor").animate({
                                        bottom: 116
                                    }).delay(1200).show(30, function () {
                                        // 女人出现
                                        $(".section6-woman").animate({
                                            opacity: 1,
                                            height: 294
                                        }, 1000, function () {
                                            $(this).animate({
                                                right: 400
                                            }, 1000)
                                            // 到达目的地，变化title
                                            $('.section6-title').children().eq(0).fadeOut(function () {
                                                // 每当到达页面动画完成时显示keepgo按钮
                                                $(".keep-go").fadeIn()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        }
    })

    // 鼠标移入btn，换个路径
    $(".section8-center").hover(function () {
        $(this).children().eq(0).attr("src", "./images/section8_btngif.gif")
    }, function () {
        $(this).children().eq(0).attr("src", "./images/section8_btn.png")
    })

    // 让手的图片跟随鼠标移动

    $(".section8").on("mousemove", movehand)
    function movehand(e) {
        let distanceX = e.clientX
        let distanceY = e.clientY
        if (distanceY < fullpageHeight - 448) {
            distanceY = fullpageHeight - 448
        }
        $(".section8-hand").css({
            top: distanceY + 5,
            left: distanceX - 80
        })
    }
    $(".section8-again").on("click", clickAgain)
    function clickAgain() {
        fullpage_api.moveTo('firstPage');
    }
    // 点击继续往下
    $(".keep-go").on("click", movedown)
    function movedown() {
        fullpage_api.moveSectionDown()
    }
})

