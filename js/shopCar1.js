$(
	function(){
		$(".bigPic img").attr("src",cookie.getCookie("imgsrc"));
		
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
		/* 放大镜块*/
		$(".tellpartent").click(function(){
			$(".share").css("display","block");
			setTimeout(function(){
				$(".share").hide(400)
			},4000)
		});
		$(".tellpartent .li2").hover(function(){
			$(this).css("border-bottom","1px solid #666666");
		},function(){
			$(this).css("border-bottom"," none");
		})
		$(".share .li1").click(function(){
			location.href="http://service.weibo.com/share/share.php?appkey=3775846575&uid=1253693852&url=http%3A%2F%2Fwww.kadang.com%2Fproduct%2F2856.html%3Fref_wbt%3D4.2-1-4-1.5.116.2%26ref_refer%3D%252Fproduct%252F6073%252Ehtml&title=柔情之美%20925纯银项链%20镶嵌施华洛世奇锆石%20展现女性柔美-卡当为爱用心定制&pic=http%3A%2F%2Fimg2.i.kadang.cn%2Fupload%2F1%2Fstore%2Fgoods%2F5%2F2015%2F08%2F5_cc3374205536c6a336ca2882c2537f14.jpg_max.jpg#_loginLayer_1463813515182"
		});
		$(".share .li2").click(function(){
			location.href="http://share.v.t.qq.com/index.php?c=share&a=index&site=http%3A%2F%2Fwww.kadang.com&url=http%3A%2F%2Fwww.kadang.com%2Fproduct%2F2856.html%3Fref_wbt%3D4.2-1-4-1.5.116.2%26ref_refer%3D%252Fproduct%252F6073%252Ehtml&title=柔情之美%20925纯银项链%20镶嵌施华洛世奇锆石%20展现女性柔美-卡当为爱用心定制&pic=http%3A%2F%2Fimg2.i.kadang.cn%2Fupload%2F1%2Fstore%2Fgoods%2F5%2F2015%2F08%2F5_cc3374205536c6a336ca2882c2537f14.jpg_max.jpg"
		});//告诉小伙伴
		$(".smallPic img").click(function(){
			$(".bigPic img").attr("src",$(this).attr("src"))
		});
		$(".bigPic").hover(function(){
			$(".move").css("display","block");
			$(this).children().eq(0).css({
				"width":"720px",
				"height":"720px"
			})
		},function(){
			$(".move").css("display","");
			$(this).children().eq(0).css({
				"width":"360px",
				"height":"360px",
				"left":0,
				"top":0,
			})
		}).mousemove(function(e){
			var L=e.pageX-$(this).offset().left-$(".move").width()/2;
			var T=e.pageY-$(this).offset().top-$(".move").height()/2;
			if(L<=0){
				L=0;
			}else if(L>=$(this).width()-$(".move").width()){
				L=$(this).width()-$(".move").width();
			}
			if(T<=0){
				T=0;
			}else if(T>=$(this).height()-$(".move").height()){
				T=$(this).height()-$(".move").height();
			};
			$(".move").css({
				"left":L+"px",
				"top":T+"px"
			});
			$(".bigPic img").css({
				"left":-2*L+"px",
				"top":-2*T+"px"
			})

		})
		//right块的js
		$(".right img").hover(function(){
			$(this).css({
				"cursor":"pointer",
				"box-shadow":"0 0 2px 1px rgba(255,33,33,1)"
			})
		},function(){
			$(this).css({
				"box-shadow":"",
			})
		});//
		var flag=true;
		$(".right .topBtn").click(function(){
			if(flag){
				flag=false;
				$(".picBox ul").animate({
					top:"-140px"
				},200,function(){
					$(".picBox ul").children().eq(0).appendTo($(".picBox ul"));
					$(".picBox ul").css("top",0);
					flag=true;
				})
			}
			
		}).hover(function(){
			$(this).css("background-position","-1px -48px")
		},function(){
			$(this).css("background-position","-1px -1px")
		});//
		$(".right .botBtn").click(function(){
			if(flag){
				flag=false;
				$(".picBox ul").children().last().prependTo($(".picBox ul"));
				$(".picBox ul").css("top","-140px").animate({
					top:0
				},200,function(){
					flag=true;
				})
			}
			
		}).hover(function(){
			$(this).css("background-position","-46px -48px")
		},function(){
			$(this).css("background-position","-46px -1px")
		});//
	
		/*选择款式*/
		
		var flag1=false;
		$(".chooseStyle ul li").click(function(){
			$(this).css("border","1px solid red").siblings().filter("li").css("border","1px solid #dedede");
			$(this).addClass("yes").siblings().filter("li").removeClass("yes");
			cookie.setCookie("isno",$(this).html());
			flag1=true;
			
		});//
		
		function aaa(){
			var sum=0;
			var sum1=0;
			$(".changenum").each(function(i){
				sum+=parseInt($(".changenum").eq(i).val())
			})
			$("#goodnum").html(sum);
			
			$(".pri").each(function(i){
				sum1+=parseInt($(".pri").eq(i).html())
			})
			$("#totalmoney").html(sum1+".00")
			
		}//计算购物车中的总的价格和数量
		aaa();
		function remov(){
			$(".del").click(function(){
				$(this).parent().remove();
				aaa();
				
			//cookie.removeCookie("goods"+$(this).parent().index());
			})
		}//点击删除
		function chaNum(){
			$(".changenum").change(function(){
				$(this).siblings().filter(".pri").html(parseInt($(this).siblings().filter("b").html())*parseInt($(this).val())+".00元");
				aaa();
			})
		};//
		chaNum()
		$(".buyCar").click(function(){
			if(flag1){
				$("#bigBox").add($("#sureInfo")).css("display","block");
				/**/
				$("<div class='infoBox'><img src="+$(".bigPic img").attr("src")+" />"+"<b>"+$(".danjia").html()+"</b>"+"<p>"+$(".goodsName").html()+"<br /> 款式："+cookie.getCookie("isno")+
				"</ p><div class='del'>删除</div><input type='number' class='changenum' value="+$("#choosenum").val()+" min=1 /><aside class='pri'>"+
				parseInt($(".danjia").html()*parseInt($("#choosenum").val()))+".00元</aside></div>").prependTo($("#buyCarBox"))
				aaa();
				remov();
				chaNum();
			}else{
				alert("请选择一种款式")
			}
		
		}).hover(function(){
			$(this).css("background","#b6adad")
		},function(){
			$(this).css("background","")
		})//加入购物车点击
	
		$("#close").add($(".stillBuy")).click(function(){
			$("#sureInfo").add($("#bigBox")).css("display","none")
		})
	
	
		$(".account").add($(".custom")).hover(function(){
			$(this).css("background","red")
		},function(){
			$(this).css("background","")
		}).click(function(){
			/**/
			if(flag1){
				$("#bigBox").add($("#sureInfo")).css("display","block");
				/**/
				$("<div class='infoBox'><img src="+$(".bigPic img").attr("src")+" />"+"<b>"+$(".danjia").html()+"</b>"+"<p>"+$(".goodsName").html()+"<br /> 款式："+cookie.getCookie("isno")+
				"</ p><div class='del'>删除</div><input type='number' class='changenum' value="+$("#choosenum").val()+" min=1 /><aside class='pri'>"+
				parseInt($(".danjia").html()*parseInt($("#choosenum").val()))+".00元</aside></div>").prependTo($("#buyCarBox"))
				aaa();
				remov();
				chaNum();
				setcookie();
			}else{
				alert("请选择一种款式")
			}
			
		})
	
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
		
		$(".car").click(function(){
			$("#buyCarBox").animate({
				"width":"250px"
			},400)
			
		});
		$("#clos").click(function(){
			$("#buyCarBox").stop().animate({
				"width":"0px"
			},400).css("overflow","hidden")
			})
		//去结算
		function setcookie(){
			$(".infoBox").each(function(i){
				cookie.setCookie("goods"+i,JSON.stringify({
					'goodName':$('.infoBox').eq(i).children().filter('p').html(),
					'imgSrc':$('.infoBox').eq(i).children().filter('img').attr('src'),
					'goodNum':$('.infoBox').eq(i).children().filter('input').val(),
					'price':$('.infoBox').eq(i).children().filter('b').html(),
					'totalprice':$('.infoBox').eq(i).children().filter('.pri').html()
				}))
			});
			location.href="shopCar2.html";
		};//商品列表;
		$(".quJS").click(function(){
			setcookie();
		});
		
		
		
	}//function
)