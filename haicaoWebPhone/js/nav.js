$(function(){
  $(".nav-zhezhao").hide(0);
				var navFlag = true;
		function close(e){
			if(e && e.stopPropagation){
				//W3C取消冒泡事件
				e.stopPropagation();
				}else{
				//IE取消冒泡事件
				window.event.cancelBubble = true;
				};
			window.clearInterval(timer)
			// 左边菜单栏动画
			$(".nav-list").toggleClass("nav-list-show");
			$(".section .fp-tableCell").find(".content").toggleClass("zhezhao-translate");
			//菜单列表动画
			if (navFlag == true) {
				//第一次点击让整个导航宽度为100%；
				$(".main-nav").css('width','100%');
				// 第一次点击出现遮罩层
	
								$(".nav-zhezhao").show(0);
								$(".nav-zhezhao").addClass('zhezhao-show');
				// $(".nav-zhezhao").show(500);
								//第一次点击菜单按钮变关闭按钮
								$(".nav-button i").hide(500, function() {h
									$(".nav-button i").toggleClass("baise");
									$(".nav-button i").removeClass('icon-caidan');
									$(".nav-button i").addClass('icon-cheng1');
									// $(".nav-button i").show(500);
								});
								// 第一点击菜单按钮开变关
								$(".nav-button .spanbox").removeClass("to-on");
								$(".nav-button .spanbox").addClass("to-off");
								navFlag = false;
								return navFlag;
			}else {
				//第二次点击让整个导航宽度为0；是为了不让它挡住触摸屏
				// $(".main-nav").animate({
		//                 "width":"0px",
		//             },1000);
				// 第二次点击关闭遮罩层
								$(".nav-zhezhao").removeClass('zhezhao-show');
								var timer = setTimeout(function(){
									$(".nav-zhezhao").hide();
								}, 1000)
				// $(".nav-zhezhao").hide();
								//第二次点击关闭按钮变菜单按钮
								$(".nav-button i").hide(500, function() {
									$(".nav-button i").toggleClass("baise");
									$(".nav-button i").removeClass('icon-cheng1');
									$(".nav-button i").addClass('icon-caidan');
									$(".nav-button i").show(500);
								});
								//第二次点击菜单按钮关变开
								$(".nav-button .spanbox").removeClass("to-off");
								$(".nav-button .spanbox").addClass("to-on");
	
								$(".main-nav").css('width','0');
	
								navFlag = true;
								return navFlag;
			};
		}
	$(".nav-button").on('click',close);

$('.main-nav').click(function(e){
	console.log(132131)
   		window.clearInterval(timer)
					// 左边菜单栏动画
					$(".nav-list").toggleClass("nav-list-show");
					$(".section .fp-tableCell").find(".content").toggleClass("zhezhao-translate");
					//菜单列表动画
			   	//第二次点击让整个导航宽度为0；是为了不让它挡住触摸屏
						// $(".main-nav").animate({
				//                 "width":"0px",
				//             },1000);
	
						// 第二次点击关闭遮罩层
						$(".nav-zhezhao").removeClass('zhezhao-show');
						var timer = setTimeout(function(){
							$(".nav-zhezhao").hide();
						}, 1000)
		// $(".nav-zhezhao").hide();
						//第二次点击关闭按钮变菜单按钮
						$(".nav-button i").hide(500, function() {
							$(".nav-button i").toggleClass("baise");
							$(".nav-button i").removeClass('icon-cheng1');
							$(".nav-button i").addClass('icon-caidan');
							$(".nav-button i").show(500);
						});
						//第二次点击菜单按钮关变开
						$(".nav-button .spanbox").removeClass("to-off");
						$(".nav-button .spanbox").addClass("to-on");
						$(".main-nav").css('width','0');
						navFlag = true;
						return navFlag;
})
$('.nav-list').click(function(e){
	if(e && e.stopPropagation){
		//W3C取消冒泡事件
		e.stopPropagation();
		}else{
		//IE取消冒泡事件
		window.event.cancelBubble = true;
		};
})
	// 点击遮罩层相当于点击关闭按钮
	// 点击黑色遮罩也可以关闭菜单
	$(".nav-zhezhao").on("click",function(e){
		if(e && e.stopPropagation){
			//W3C取消冒泡事件
			e.stopPropagation();
			}else{
			//IE取消冒泡事件
			window.event.cancelBubble = true;
			};
					// 左侧菜单栏裂变显示与隐藏
					$(".nav-list").toggleClass("nav-list-show");
					// 遮罩层下边的内容缓动
					$(".section .fp-tableCell").find(".content").toggleClass("zhezhao-translate");
 
					if(navFlag == false) {

						// 点击遮罩层，遮罩消失
	                $(".nav-zhezhao").removeClass('zhezhao-show');
									var timer = setTimeout(function(){
              			$(".nav-zhezhao").hide();
            			}, 1000)
            			// $(".nav-zhezhao").hide();

		                //点击遮罩层关闭按钮变菜单按钮
		                //字体图标版本
		                // $(".nav-button i").fadeOut(500, function() {s
		                // 	$(".nav-button i").toggleClass("baise");
		                // 	$(".nav-button i").removeClass('icon-cheng1');
		                // 	$(".nav-button i").addClass('icon-caidan');
		                // 	$(".nav-button i").fadeIn(500);
		                // });

		                //第二次点击菜单按钮关变开
		                $(".nav-button .spanbox").removeClass("to-off");
		                $(".nav-button .spanbox").addClass("to-on");

            $(".main-nav").css('width','0');

		                navFlag = true;
		                return navFlag;

					}


	})
	$(".nav-list li.list a").on('click',function(){

		$(this).addClass('active').siblings('.list').removeClass('active')
		// 点击菜单列表相当于点击关闭菜单按钮
					// 左侧菜单栏裂变显示与隐藏
					$(".nav-list").toggleClass("nav-list-show");
					// 遮罩层下边的内容缓动
					$(".section .fp-tableCell").find(".content").toggleClass("zhezhao-translate");

					if(navFlag == false) {

						// 点击遮罩层，遮罩消失
	                $(".nav-zhezhao").removeClass('zhezhao-show');
									var timer = setTimeout(function(){
										$(".nav-zhezhao").hide();
									}, 1000)

            			// $(".nav-zhezhao").hide();

		                //点击遮罩层关闭按钮变菜单按钮
		                //字体图标版本
		                // $(".nav-button i").fadeOut(500, function() {s
		                // 	$(".nav-button i").toggleClass("baise");
		                // 	$(".nav-button i").removeClass('icon-cheng1');
		                // 	$(".nav-button i").addClass('icon-caidan');
		                // 	$(".nav-button i").fadeIn(500);
		                // });

		                //第二次点击菜单按钮关变开
		                $(".nav-button .spanbox").removeClass("to-off");
		                $(".nav-button .spanbox").addClass("to-on");

            				$(".main-nav").css('width','0');

		                navFlag = true;
		                return navFlag;

					}
	})

})