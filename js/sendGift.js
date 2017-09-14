$(
	function(){
		$.ajax({
			url:"registcommon.html",
			success:function(res){
				$("#_registBox").append(res);
				$(".toRegist").click(function(){
					$("#registBox").animate({
						right:0,
						
					}).css({
						"background":"#fff",
						"opacity":1
					});
					$("#bigBox").css({
						"display":"block"
					});
					$("#loginBox").animate({
						right:0,
					}).css({
						"background":"#fff",
						"opacity":1,
						"display":"none"
					});
				});
				$(".changToLogin").click(function(){
					$("#loginBox").css("display","block");
					$("#registBox").css("display","none");
					
					return false;
				})
				
			}
		});
		$.ajax({
			url:"logincommon.html",
			success:function(res){
				$("#_loginBox").append(res);
				$(".toLogin").click(function(){
					$("#loginBox").animate({
						right:0,
						
					}).css({
						"background":"#fff",
						"opacity":1
					});
					$("#bigBox").css({
						"display":"block"
					});
					$("#registBox").animate({
						right:0,
					}).css({
						"background":"#fff",
						"opacity":1,
						"display":"none"
					});
				});
				$(".changeToRigest").click(function(){
					$("#loginBox").css("display","none");
					$("#registBox").css("display","block");
					return false;
				});
				
			}
		});
		
		
		$(".hiddenNav_li").hover(function(){
			$(this).children().filter("ul").css("display","block");
			$(this).children().filter("p").css({
				"border-left":"1px solid #f4604b",
				"border-right":"1px solid #f4604b",
				"background":"#ffffff",
				"color":"#f4604b"
			})
			$(this).css("border","none");
			$(this).children().filter("p").children().filter("img").css("display","none")
		},function(){
			$(this).children().filter("ul").css("display","none");
			$(this).children().filter("p").css({
				"border-left":"",
				"border-right":"",
				"background":"",
				"color":""
			})
			$(this).css("border-left","1px dotted #ffffff");
			$(this).children().filter("p").children().filter("img").css("display","block")
		});//
		
		$(window).scroll(function(){
			var hei=$("#fourthFloor").offset().top+$("#fourthFloor").height();
			if($("body").scrollTop()>400&&$("body").scrollTop()<hei){
				$("#hiddenNav").css("display","block")
			}else{
				$("#hiddenNav").css("display","none")
			}
		});//固定导航块
		
		var page=0;
		var flag=true;
		$(".smallBtn").each(function(i){
			$(this).css("left",240+i*26)
		});
		function changePic(page){
			if(flag){
				$(".mainPic img").eq(page).css("display","block").animate({
					opacity:1
				},500).siblings("img").animate({
					opacity:0
				},500,function(){
					$(".mainPic img").eq(page).siblings("img").css("display","none");
					flag=true;
				})
				$(".smallBtn").eq(page).css("background","red").siblings(".smallBtn").css("background","#666666")
			}
			flag=false;
		}
		changePic(page)
		time=setInterval(changepage,3000);
		function changepage(){
			page++;
			if(page>2){
				page=0;
			}
			changePic(page)
		};
		$(".mainPic").mouseenter(function(){
			clearInterval(time)
			$(this).children().filter("div").css("display","block")
		}).mouseleave(function(){
			$(this).children().filter("div").css("display","none")
			time=setInterval(changepage,3000)
		});
		$(".mainPic div").hover(function(){
			$(this).css("opacity",0.4)
		},function(){
			$(this).css("opacity",0.8)
		});
		$(".leftBtn").on("click",function(){
			page--;
			if(page<0){
				page=2;
			}
			changePic(page);
		});
		$(".rightBtn").on("click",function(){
			page++;
			if(page>2){
				page=0;
			}
			changePic(page)
		});
		$(".mainPic span").click(function(){
			page=$(this).index()-5;
			changePic(page);
		})
		$(".smallBtn").hover(function(){
			$(this).css("background","red")
		},function(){
			$(this).siblings("span").css("background","#666666")
		});
		$("#recommend ul p").hover(function(){
			$(this).css("color","red")
		},function(){
			$(this).css("color","#666666")
		})
		//图片轮播块
		
		//图片块
		var zero=true,one=true,two=true,three=true,four=true;
		$(window).scroll(function(){
			var clientHei=document.documentElement.clientHeight||document.body.clientHeight;
			var zeroHei=$("#recommend").offset().top;
			var oneHei=$("#firstFloor").offset().top;
			var twoHei=$("#secondFloor").offset().top;
			var threeHei=$("#thirdFloor").offset().top;
			var fourHei=$("#fourthFloor").offset().top;
			if($("body").scrollTop()+clientHei>=zeroHei){
				if(zero){
						zero=false;
						$.ajax({
						url:"../js/SGimgInfo.js",
						success:function(res){
							var res=eval(res);
							for (var i=0,len=res.length;i<len;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" /><div>"+res[i].top+"</div><aside>"+
								res[i].info+"</aside><span>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf1"))
							};
							$(".detailInf1 li").click(function(){
								location.href="shopCar1.html"
							})
						}
					})//爆款推荐
				}
			}
			if($("body").scrollTop()+clientHei>=oneHei){
				if(one){
					one=false;
					$.ajax({
						url:"../js/SGimgInfo1.js",
						success:function(res){
							var res=eval(res);
							for (var i=0;i<2;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" style=width:580px; /><aside>"+
								" "+"</aside><span>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf2"))
							};
							for (var i=2;i<res.length;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" /><aside style='margin-left:0px;'>"+
								res[i].info+"</aside><span style='padding-left:0px;'>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf2"))
							}
							$(".detailInf2 li").click(function(){
								cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
								location.href="shopCar1.html"
							})
						}
					});
				}
			}//一楼
			if($("body").scrollTop()+clientHei>=twoHei){
				if(two){
					two=false;
					$.ajax({
						url:"../js/SGimgInfo2.js",
						success:function(res){
							var res=eval(res);
							for (var i=0;i<2;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" style=width:580px; /><aside>"+
								" "+"</aside><span>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf3"))
							};
							for (var i=2;i<res.length;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" /><aside style='margin-left:0px;'>"+
								res[i].info+"</aside><span style='padding-left:0px;'>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf3"))
							};
							$(".detailInf3 li").click(function(){
								cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
								location.href="shopCar1.html"
							})
						}
					});
				}
			}//二楼
			if($("body").scrollTop()+clientHei>=threeHei){
				if(three){
					three=false;
					$.ajax({
						url:"../js/SGimgInfo3.js",
						success:function(res){
							var res=eval(res);
							for (var i=0;i<2;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" style=width:580px; /><aside>"+
								" "+"</aside><span>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf4"))
							};
							for (var i=2;i<res.length;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" /><aside style='margin-left:0px;'>"+
								res[i].info+"</aside><span style='padding-left:0px;'>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf4"))
							};
							$(".detailInf4 li").click(function(){
								cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
								location.href="shopCar1.html"
							})
						}
					});
				}
			}//三楼
			if($("body").scrollTop()+clientHei>=fourHei){
				if(four){
					four=false;
					$.ajax({
						url:"../js/SGimgInfo4.js",
						success:function(res){
							var res=eval(res);
							for (var i=0;i<2;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" style=width:580px; /><aside>"+
								" "+"</aside><span>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf5"))
							};
							for (var i=2;i<res.length;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].info+" /><aside style='margin-left:0px;'>"+
								res[i].info+"</aside><span style='padding-left:0px;'>"+res[i].price+"</span><em>"+res[i].sellnum+"</em></li>").appendTo($(".detailInf5"))
							};
							$(".detailInf5 li").add($(".detailInf4 li")).add($(".detailInf3 li")).add($(".detailInf2 li")).add($(".detailInf1 li")).click(function(){
								cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
								location.href="shopCar1.html";
							})
						}
						
					});
				}
			}//四楼
			
		})//sroll
		
	}//function
)