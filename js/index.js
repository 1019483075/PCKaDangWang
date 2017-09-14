$(
	function(){
		
		$(".hotTag li").not(".red").hover(function(){
			$(this).css({
				"color":"red",
				"cursor":"pointer"
			})
		},function(){
			$(this).css("color","#666666")
		})
		$(".navList").each(function(i){
			$(".navList").eq(i).css("top",-(160+i*32)+"px")
		})
		$(".menu_nav").hover(function(){
			$(this).css("background-color","red")
			$(this).children().eq(1).css("display","block")
		},function(){
			$(this).css("background-color","");
			$(this).children().eq(1).css("display","none")
		})
		$(".navList li").not(".red").hover(function(){
			$(this).css({
				"background":"#999999",
				"color":"white",
				"cursor":"pointer"
			})
		},function(){
			$(this).css({
				"background":"",
				"color":"#666666"
			})
		});
		$(".navList li").filter(".red").hover(function(){
			$(this).css({
				"background":"#999999",
				"cursor":"pointer"
			})
		},function(){
			$(this).css({
				"background":"",
			
			})
		})
		//侧边栏导航块的js。
		var page=0;
		var flag=true;
		$(".smallBtn").each(function(i){
			$(this).css("left",350+i*26)
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
			if(page>4){
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
				page=4;
			}
			changePic(page);
		});
		$(".rightBtn").on("click",function(){
			page++;
			if(page>4){
				page=0;
			}
			changePic(page)
		});
		$(".mainPic span").click(function(){
			page=$(this).index()-7;
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
		$(".mCB_nav li").eq(0).css({
			"background":"red",
			"color":"#ffffff"
		})
		function change(i){
			$(".mCB_nav li").not($(".mCB_nav li").eq(i)).hover(function(){
				$(this).css({
					"background":"red",
					"color":"#ffffff"
				})
			},function(){
				$(this).css({
					"background":"",
					"color":""
				});
				
			});//
		};
		$("#recommend ul li").click(function(){
			location.href="shopCar1.html";
		})
		change(0)
		var T=$(".mCB_nav").offset().top
		$(window).scroll(function(){
			if($("body").scrollTop()>T-200){
				$(".mCB_nav").css({
					"position":"fixed",
					"top":0,
					"border-bottom":"1px solid #999"
				})
			}else{
				$(".mCB_nav").css({
					"position":"absolute",
					"border-bottom":"none",
					"top":0
				})
			}
		});//生日礼物导航块
		$(".mCB_nav li").click(function(){
			$("body").scrollTop($(".giftBox").eq($(this).index()).offset().top)
		})
		var flag1=true,flag2=true,flag3=true,flag4=true,flag5=true;
		$(window).scroll(function(){
			var birthGTop=$(".birthGift").offset().top;
			var newGTop=$(".newGift").offset().top;
			var girlGTop=$(".girlGift").offset().top;
			var boyGTop=$(".boyGift").offset().top;
			var doubleGTop=$(".doubleGift").offset().top;
			var hei=document.documentElement.clientHeight||document.body.clientHeight;
				if($("body").scrollTop()+hei>=birthGTop){
					if(flag1){
					flag1=false;
					$.ajax({
						url:"../js/imgInfo.js",
						success:function(res){
							var res=eval(res);
							$("<li><img src="+res[0].imgSrc+" title="+res[0].title+" style=width:585px;height:370px;"+"/></li>").appendTo($(".birthGift ul")).addClass("zero");
							for (var i=1;i<res.length;i++) {
								$("<li><img src="+res[i].imgSrc+" title="+res[i].title+" />"+"<span>"+res[i].price+"</span>"+"<i>"+res[i].num+"</i>"+
								"<p>"+res[i].info+"</p>"+"<div><img src="+res[i].xpSrc+" /><img src="+res[i].bySrc+" /></div>"+"</li>").appendTo($(".birthGift ul"));
								
							}
							var oImg=$(".birthGift ul li div img")
							for (var j=oImg.length;j>=0;j-- ) {
								if($(".birthGift ul li div img").eq(j).attr("src")=="/"){
									$(".birthGift ul li div img").eq(j).remove()
								}
							}
							$(".birthGift ul li").hover(function(){
								$(this).css("box-shadow","2px 2px 0px 0px rgba(234,217,217, 1)")
							},function(){
								$(this).css("box-shadow","")
							})
							
							$(".birthGift ul li").click(function(){
								//alert($(this).children().filter("img").eq(0).attr("src"));
								cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
								location.href="shopCar1.html";
								
							})
							
						}
					});//生日礼物
				}
				if($("body").scrollTop()>birthGTop){
					$(".mCB_nav li").eq(0).css({
						"background":"red",
						"color":"#ffffff"
					}).siblings("li").css({
						"background":"",
						"color":""
					})
					change(0);
					
				}
				if($("body").scrollTop()+hei>=newGTop){
					if(flag2){
						flag2=false;
						$.ajax({
							url:"../js/imgInfo1.js",
							success:function(res){
								var res=eval(res);
								$("<li><img src="+res[0].imgSrc+" title="+res[0].title+" style=width:585px;height:370px;"+"/></li>").appendTo($(".newGift ul")).addClass("zero");
								for (var i=1;i<res.length;i++) {
									$("<li><img src="+res[i].imgSrc+" title="+res[i].title+" />"+"<s>"+res[i].del+"</s>"+"<span>"+res[i].price+"</span>"+"<i>"+res[i].num+"</i>"+
									"<p>"+res[i].info+"</p>"+"<div><img src="+res[i].xpSrc+" /><img src="+res[i].bySrc+" /></div>"+"</li>").appendTo($(".newGift ul"));
									
								}
								var oImg=$(".newGift ul li div img")
								for (var j=oImg.length;j>=0;j-- ) {
									if($(".newGift ul li div img").eq(j).attr("src")=="/"){
										$(".newGift ul li div img").eq(j).remove()
									}
								}
								$(".newGift ul li").hover(function(){
									$(this).css("box-shadow","2px 2px 0px 0px rgba(234,217,217, 1)")
								},function(){
									$(this).css("box-shadow","")
								})
								$(".newGift ul li").click(function(){
									cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
									location.href="shopCar1.html";
								})
							}
						});
					}
				}//本周新品
			
				if($("body").scrollTop()>newGTop){
					$(".mCB_nav li").eq(1).css({
						"background":"red",
						"color":"#ffffff"
					}).siblings("li").css({
						"background":"",
						"color":""
					})
					/*$(".mCB_nav li").not($(".mCB_nav li").eq(1)).hover(function(){
						$(this).css({
							"background":"red",
							"color":"#ffffff"
						})
					},function(){
						$(this).css({
							"background":"",
							"color":""
						})
					})*/
					change(1)
				}
				if($("body").scrollTop()+hei>=girlGTop){
					if(flag3){
						flag3=false;
						$.ajax({
							url:"../js/imgInfo2.js",
							success:function(res){
								var res=eval(res);
								$("<li><img src="+res[0].imgSrc+" title="+res[0].title+" style=width:585px;height:370px;"+"/></li>").appendTo($(".girlGift ul")).addClass("zero");
								for (var i=1;i<res.length;i++) {
									$("<li><img src="+res[i].imgSrc+" title="+res[i].title+" />"+"<s>"+res[i].del+"</s>"+"<span>"+res[i].price+"</span>"+"<i>"+res[i].num+"</i>"+
									"<p>"+res[i].info+"</p>"+"<div><img src="+res[i].xpSrc+" /><img src="+res[i].bySrc+" /></div>"+"</li>").appendTo($(".girlGift ul"));
									
								}
								var oImg=$(".girlGift ul li div img")
								for (var j=oImg.length;j>=0;j-- ) {
									if($(".girlGift ul li div img").eq(j).attr("src")=="/"){
										$(".girlGift ul li div img").eq(j).remove()
									}
								}
								$(".girlGift ul li").hover(function(){
									$(this).css("box-shadow","2px 2px 0px 0px rgba(234,217,217, 1)")
								},function(){
									$(this).css("box-shadow","")
								});
								$(".girlGift ul li").click(function(){
									cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
									location.href="shopCar1.html";
								})
							}
						});
					}
				}//送女友礼物
				if($("body").scrollTop()>girlGTop){
					$(".mCB_nav li").eq(2).css({
						"background":"red",
						"color":"#ffffff"
					}).siblings("li").css({
						"background":"",
						"color":""
					})
					change(2)
				}
				if($("body").scrollTop()+hei>=boyGTop){
					if(flag4){
						flag4=false;
						$.ajax({
							url:"../js/imgInfo3.js",
							success:function(res){
								var res=eval(res);
								$("<li><img src="+res[0].imgSrc+" title="+res[0].title+" style=width:585px;height:370px;"+"/></li>").appendTo($(".boyGift ul")).addClass("zero");
								for (var i=1;i<res.length;i++) {
									$("<li><img src="+res[i].imgSrc+" title="+res[i].title+" />"+"<s>"+res[i].del+"</s>"+"<span>"+res[i].price+"</span>"+"<i>"+res[i].num+"</i>"+
									"<p>"+res[i].info+"</p>"+"<div><img src="+res[i].xpSrc+" /><img src="+res[i].bySrc+" /></div>"+"</li>").appendTo($(".boyGift ul"));
									
								}
								var oImg=$(".boyGift ul li div img")
								for (var j=oImg.length;j>=0;j-- ) {
									if($(".boyGift ul li div img").eq(j).attr("src")=="/"){
										$(".boyGift ul li div img").eq(j).remove()
									}
								}
								$(".boyGift ul li").hover(function(){
									$(this).css("box-shadow","2px 2px 0px 0px rgba(234,217,217, 1)")
								},function(){
									$(this).css("box-shadow","")
								});
								$(".boyGift ul li").click(function(){
									cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
									location.href="shopCar1.html";
								})
							}
						});
					}
				}//送男友礼物
				if($("body").scrollTop()>boyGTop){
					$(".mCB_nav li").eq(3).css({
						"background":"red",
						"color":"#ffffff"
					}).siblings("li").css({
						"background":"",
						"color":""
					})
					change(3)
				}
				if($("body").scrollTop()+hei>=doubleGTop){
					if(flag5){
						flag5=false;
						$.ajax({
							url:"../js/imgInfo4.js",
							success:function(res){
								var res=eval(res);
								$("<li><img src="+res[0].imgSrc+" title="+res[0].title+" style=width:585px;height:370px;"+"/></li>").appendTo($(".doubleGift ul")).addClass("zero");
								for (var i=1;i<res.length;i++) {
									$("<li><img src="+res[i].imgSrc+" title="+res[i].title+" />"+"<s>"+res[i].del+"</s>"+"<span>"+res[i].price+"</span>"+"<i>"+res[i].num+"</i>"+
									"<p>"+res[i].info+"</p>"+"<div><img src="+res[i].xpSrc+" /><img src="+res[i].bySrc+" /></div>"+"</li>").appendTo($(".doubleGift ul"));
									
								}
								var oImg=$(".doubleGift ul li div img")
								for (var j=oImg.length;j>=0;j-- ) {
									if($(".doubleGift ul li div img").eq(j).attr("src")=="/"){
										$(".doubleGift ul li div img").eq(j).remove()
									}
								}
								$(".doubleGift ul li").hover(function(){
									$(this).css("box-shadow","2px 2px 0px 0px rgba(234,217,217, 1)")
								},function(){
									$(this).css("box-shadow","")
								});
								$(".doubleGift ul li").click(function(){
									cookie.setCookie("imgsrc",$(this).children().filter("img").eq(0).attr("src"));
									location.href="shopCar1.html";
								})
							}
						});
					}
					if($("body").scrollTop()>=(doubleGTop+$(".doubleGift").height())){
							$(".mCB_nav").css({
								"position":"absolute",
								"border-bottom":"none",
								"top":0
							})
						}
					}//成双成对礼物
					if($("body").scrollTop()>doubleGTop){
					$(".mCB_nav li").eq(4).css({
						"background":"red",
						"color":"#ffffff"
					}).siblings("li").css({
						"background":"",
						"color":""
					})
					change(4)
				}
				
			}
		})//scroll;
		$(window).scroll(function(){
			if($("body").scrollTop()>300){
				$(".backTop").css("display","block")
			}else{
				$(".backTop").css("display","none")
			}
		});
		$(".oLi").hover(function(){
			$(this).css("color","red")
		},function(){
			$(this).css("color","")
		})
		$(".APP").hover(function(){
			$(this).css("color","red");
			$(this).children().filter("img").css("display","block")
		},function(){
			$(this).css("color","");
			$(this).children().filter("img").css("display","");
		});
		$(".backTop").hover(function(){
			$(this).children().filter("p").css("display","block");
		},function(){
			$(this).children().filter("p").css("display","none");
		});
		$(".backTop").click(function(){
				var end=document.documentElement.scrollTop||document.body.scrollTop;
				var step=end/20;
			time=setInterval(function(){
				end-=step;
				document.documentElement.scrollTop=document.body.scrollTop=end;
				if(document.documentElement.scrollTop=document.body.scrollTop<=0){
					clearInterval(time)
				}
			},5)
		});//回到顶部
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
		
		
	}
)