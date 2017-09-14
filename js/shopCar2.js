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
				});
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
		});//登录和注册页面；
		
		$(".toLogin").hover(function(){
			$(this).html("<u>登录</u>")
		},function(){
			$(this).html("登录")
		});//
		
		$(window).scroll(function(){
			if($("body").scrollTop()>100){
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
		
		$(".logo").click(function(){
			location.href="index.html";
		})
		
		/*购物车操作块代码*/
		
		if(document.cookie){
			cookie.removeCookie("isno")
			var reg=/\s+/g;
			var res=document.cookie.replace(reg,"").split(";");
			var re=/ood/g;
			for (var i=0;i<res.length;i++) {
				if(re.test(res[i])){
					var arr=res[i].split("=");
					var arr1=JSON.parse(arr[1]);
					
					
					$("<tr><td class='first' style='width:140px;'><input type='checkbox' class='isBuy' checked='checked' />"+
					"<img src="+arr1.imgSrc+" /></td><td style='width:196px;'><p>"+arr1.goodName+"</p></td><td width='90px'>"+
					arr1.price+"</td><td width='110px'><input type='number' min='1' value="+arr1.goodNum+" class='changenum'></td>"+
					"<td width='80px'>"+arr1.totalprice+"</td> <td class='last del'>删除</td></tr>").appendTo($("#tbd"));
					
				};
			};//把是商品信息的cookie取出来添加到购物车
		}else{
			$("noGoods").css("display","block");
			$("content").css("display","none")
		};
		var oAllChoose=document.getElementById("allchoose");
		oAllChoose.onclick=function(){
			var aIsBuy=document.getElementsByClassName("isBuy");
			for (var i=aIsBuy.length-1;i>=0;i--) {
				if(oAllChoose.checked){
					aIsBuy[i].checked=true;
					$(".goAcount").attr("disabled",false).css("background","")
				}else{
					aIsBuy[i].checked=false;
					$(".goAcount").attr("disabled",true).css("background","#DEDEDE")
				};
			};
			totalALl();
			goJs();
		}//全选
		var tab=document.getElementById("tab")
		function total(){
			for (var i=2;i<tab.rows.length-1;i++) {
				tab.rows[i].cells[4].innerHTML=parseFloat(tab.rows[i].cells[2].innerHTML)*parseInt(tab.rows[i].cells[3].children[0].value)+".00"
			}
		}//价格小计
		$(".changenum").change(function(){
			total();
			totalALl();
		});//实现每种商品价格的统计
		function totalALl(){
			var sum=0;
			var aIsBuy=document.getElementsByClassName("isBuy");
			for (var i=0;i<aIsBuy.length;i++) {
				if(aIsBuy[i].checked){
					sum+=parseInt(aIsBuy[i].parentNode.parentNode.children[4].innerHTML)
				}
			}
			document.getElementById("totalPrice").innerHTML="￥"+sum+".00"
		}//价格的总计
		totalALl()
		$(".del").click(function(){
				var str=$(this).parent().children().eq(1).children().eq(0).html().replace(/\s+/g,"");
				var reg=/\s+/g;
				if(document.cookie){
					var res=document.cookie.replace(reg,"").split(";");
					var re=/ood/g;
					for(var j=0;j<res.length;j++){
						if(re.test(res[j])){
							var arr2=res[j].split("=");
							//console.log(arr2)
							var q=JSON.parse(arr2[1])
							if(str==q.goodName.replace(/\s+/g,"")){
								cookie.removeCookie(arr2[0])
							}
						}
					}
				};//点击删除的时候删除对应的cookie
				
			$(this).parent().remove();
			totalALl();
			goJs();
			if(document.getElementById("tab").rows.length==3){
				
				$("#content").add($(".nowLogin")).css("display","none");
				$("#noGoods").css("display","block");
				
			}else{
				$("#content").add($(".nowLogin")).css("display","block");
				$("#noGoods").css("display","none");
				
			}
		}).hover(function(){
			$(this).html("<u>删除</u>")
		},function(){
			$(this).html("删除")
		});//
		$(".isBuy").click(function(){
			totalALl();
			goJs();
		});
		function goJs(){
			if($("#totalPrice").html()=="￥0.00"){
				$(".goAcount").attr("disabled",true).css("background","#DEDEDE")
			}else{
				$(".goAcount").attr("disabled",false).css("background","")
			}
		};
		$(".goAcount").click(function(){
			/*var res=document.cookie.replace(reg,"").split(";");
			for (var i=0;i<res.length;i++) {
				var arr3=res[i].split("=");
				cookie.setCookie("info"+i,arr3[1]);
				cookie.removeCookie(arr3[0]);
			}*/
			location.href="shopCar3.html";
		});
		
	}//
)
