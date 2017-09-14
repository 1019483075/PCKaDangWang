$(
	function(){
		
		var screenWid=document.documentElement.offsetWidth||document.body.offsetWidth;
		var oHtml=document.getElementsByTagName("html")[0];
		oHtml.style.fontSize=screenWid/640*100+"px";
		$.ajax({
			"url":"footerCommon.html",
			success:function(res){
				$(".footercontainer").append(res)
			}
		});//ajax加载底部公共文件
		var mySwiper=new Swiper(".swiper-container",{
			pagination:".swiper-pagination",
		})
		//var myScroll=new IScroll("#wrapper");
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getclass.php",//获取商品类
			async:true,
			success:function(res){
				var res=eval(res)
				//console.log(res);
				for (var i=0;i<res.length;i++) {
					$("<li class='iconfont  test' flag='true'>"+res[i].icon+"</li>").appendTo($(".nav"))
				};
				$(".nav li").tap(function(){
					var oLeft=$(this).offset().left;
					var oWid=$(this).width();
					$(".active").css("left",oLeft+oWid/2-8+"px");
					$(this).css("color","white").siblings().css("color","");
					if($(this).attr("flag")){
						$(this).attr("flag",false);
						var oUl=$("<ul class='liWrap'></ul>");
						
						$.ajax({
							url:"http://datainfo.duapp.com/shopdata/getGoods.php",
							data:({
								"pageCode":"0",
								"classID":res[$(this).index()].classID,
								"linenumber":10,
							}),
							dataType:"jsonp",
							success:function(res){
								for (var j=0;j<res.length;j++) {
									$("<li goodsID="+res[j].goodsID+"><div class='imgwrap'><img src="+res[j].goodsListImg+" /></div><p class='introduce'>"+res[j][2]+"</p><div class='price'><span> ￥"+res[j].price+"</span><span><s>"+res[j].discount+"</s></span></div></li>").appendTo(oUl);
								};
								if(res.length>4){
									$("<li class='bottomLi'></li>").appendTo(oUl);
								}
								oUl.appendTo($("#wrapper"));
								oUl.css("display","block").siblings().css("display","none");//
								$(".liWrap li").tap(function(){
								cookie.setCookie("goodsID",$(this).attr("goodsID"));
								$.ajax({
									url:"http://datainfo.duapp.com/shopdata/getGoods.php",
									dataType:"jsonp",
									data:({
										"goodsID":$(this).attr("goodsID"),
									}),
									success:function(dat){
										//console.log(dat);
										$(".swiper-wrapper").html("");
										var data=eval(dat[0][4]) 
										for (var i=0;i<data.length;i++) {
											$("<div class='swiper-slide'><img src="+data[i]+" /></div>").appendTo($(".swiper-wrapper"));
										}
										$("#title").html(dat[0][2]);
										$(".oldprice").html("￥"+dat[0][8])
										$(".nowprice").html("<s>"+dat[0][6]+"</s>");
										$(".buynum").html("购买人数："+dat[0].buynumber)
										
										$(".container").css("display","none").attr("id","");
										$(".container2").css("display","block").attr("id","act");;
										mySwiper.update();
										$(".bigpic").attr("src",dat[0].goodsListImg)//商品详情页的大图片
										$(".infoList").html("");
										var info=dat[0].detail.split("。")
										console.log(info)
										for (var i=0;i<info.length;i++) {
											$("<li>"+info[i]+"</li>").appendTo($(".infoList"))
										}
									}
								})	
							})
							}
						});
						
					}
					
					
				})
				if($(".nav li").eq(0).attr("flag")){
					$(".nav li").eq(0).attr("flag",false).css("color","white");
					$.ajax({
						url:"http://datainfo.duapp.com/shopdata/getGoods.php",
						data:({
							"pageCode":"0",
							"classID":res[0].classID,
							"linenumber":10,
						}),
						dataType:"jsonp",
						success:function(res){
							//console.log(res);
							for (var j=0;j<res.length;j++) {
								$("<li  goodsID="+res[j].goodsID+"><div class='imgwrap'><img src="+res[j].goodsListImg+" /></div><p class='introduce'>"+res[j][2]+"</p><div class='price'><span> ￥"+res[j].price+"</span><span><s>"+res[j].discount+"</s></span></div></li>").appendTo($(".liWrap"))
								
							};
							$("<li class='bottomLi'></li>").appendTo($(".liWrap"));
							
							$(".liWrap li").tap(function(){
								cookie.setCookie("goodsID",$(this).attr("goodsID"));
								$.ajax({
									url:"http://datainfo.duapp.com/shopdata/getGoods.php",
									dataType:"jsonp",
									data:({
										"goodsID":$(this).attr("goodsID"),
									}),
									success:function(dat){
										
										$(".swiper-wrapper").html("");
										var data=eval(dat[0][4]) 
										for (var i=0;i<data.length;i++) {
											$("<div class='swiper-slide'><img src="+data[i]+" /></div>").appendTo($(".swiper-wrapper"));
										}
										$("#title").html(dat[0][2]);
										$(".oldprice").html("￥"+dat[0][8])
										$(".nowprice").html("<s>"+dat[0][6]+"</s>");
										$(".buynum").html("购买人数："+dat[0].buynumber)
										
										$(".container").css("display","none").attr("id","");
										$(".container2").css("display","block").attr("id","act");
										mySwiper.update();
										$(".bigpic").attr("src",dat[0].goodsListImg)//商品详情页的大图片
										$(".infoList").html("");
										var info=dat[0].detail.split("。")
										console.log(info)
										for (var i=0;i<info.length;i++) {
											$("<li>"+info[i]+"</li>").appendTo($(".infoList"))
										}
									}
								})	
							})
							
						}
					})
				}
				
			}
		});//商品列表
		$(".detail").tap(function(){
			$(".container").css("display","none").attr("id","");
			$(".container3").css("display","block").attr("id","act");
		
		})
		$(".a1").tap(function(){
			$(".container").css("display","none").attr("id","");
			$(".container1").css("display","block").attr("id","act");
		
		})
		$(".a2").tap(function(){
			$(".container").css("display","none").attr("id","");
			$(".container2").css("display","block").attr("id","act");
			
				
			
		});//
		$(".btn").tap(function(){
			$(".container").css("display","none").attr("id","");
			$(".container4").css("display","block").attr("id","act");
			
		})
		
		$.ajax({
			type:"get",
			url:"footerCommon.html",
			async:true,
			success:function(res){
				
				$(res).appendTo($(".footercontainer4"))
			}
		});//加载底部公共文件
		
		//添加到购物车
		$(".addToCar").tap(function(){//添加到购物车
			if(cookie.getCookie("username")){
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
					data:({
						"goodsID":cookie.getCookie("goodsID"),
					}),
					dataType:"jsonp",
					success:function(res){
						console.log(res);
						$("<li class='outLi'><ul class='inUl'><li><img src="+res[0].goodsListImg+" /></li><li><p>"+res[0][2]+"</p><p>单价: ￥<b class='b'>"+res[0][6]+"</b></p><p class='numcontainer'>数量: <span class='minus' goodsid="+res[0].goodsID+">-</span><input type='text' value='1' class='num'/><span class='add' goodsid="+res[0].goodsID+">+</span></p></li><li class='iconfont   del' goodsid="+res[0].goodsID+">&#xe68d;</li></ul></li>").appendTo($(".outUl"));
						$(".kind").html(parseInt($(".kind").html())+1);
						$(".add").add($(".minus")).off();//先清除加和减2个按钮的点击事件，不然点一下会触发多次点击效果
						totalnum();
						totalpri();
						del();
						add();
						minus();
						changeVal();
						$.ajax({
							url:"http://datainfo.duapp.com/shopdata/updatecar.php",
							data:({
								"userID":cookie.getCookie("username"),
								"goodsID":cookie.getCookie("goodsID"),
								"number":1,
							}),
						});//更新购物车
						
					}
				});
			}else{
				alert("请先登录");
				location.href="index.html";
			}
			
			
		})
		//计算总的商品数量
		function totalnum(){
			var sum=0;
			$(".num").each(function(i){
				sum+=parseInt($(this).val());
			});
			$(".goodsNum").html(sum);
		}
		//计算总的价格
		function totalpri(){
			var sum=0;
			$(".num").each(function(i){
				sum+=parseInt($(this).val())*parseInt($(this).parent().prev().find("b").html())
			});
			$(".totalPrice").html("￥"+sum)
		}
		//删除
		function del(){
			$(".del").tap(function(){
				$(this).parent().parent().remove();
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:({
						"userID":cookie.getCookie("username"),
						"goodsID":$(this).attr("goodsid"),
						"number":0,
					}),
					success:function(res){
						
					},//更新购物车
					
				});
				totalnum();
				totalpri();
				
				$(".kind").html($(".outLi").length)
			})
		}
		//改变value值
		function changeVal(){
			$(".num").change(function(){
				if(parseInt($(this).val())>=1){
					$.ajax({
						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
						data:({
							"userID":cookie.getCookie("username"),
							"goodsID":$(this).attr("goodsid"),
							"number":$(this).val(),
						}),
						success:function(res){
							
						},//更新购物车
						
					});
					totalnum();
					totalpri();
				}else{
					$(this).val(1);
					$.ajax({
						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
						data:({
							"userID":cookie.getCookie("username"),
							"goodsID":$(this).attr("goodsid"),
							"number":1,
						}),
						success:function(res){
							
						},//更新购物车
						
					});
					totalnum();
					totalpri();
				}
			})
		}
		//	数量加
		function add(){
			$(".add").tap(function(){
				//alert(1)
				
				$(this).prev().val(parseInt($(this).prev().val())+1);
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:({
						"userID":cookie.getCookie("username"),
						"goodsID":$(this).attr("goodsid"),
						"number":$(this).prev().val(),
					}),
					success:function(res){
						
					},//更新购物车
					
				});
				totalnum();
				totalpri();
				
			})
		}
		//数量减
		function minus(){
			$(".minus").tap(function(){
				
				if(parseInt($(this).next().val())>1){
					$(this).next().val(parseInt($(this).next().val())-1);
					$.ajax({
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:({
						"userID":cookie.getCookie("username"),
						"goodsID":$(this).attr("goodsid"),
						"number":$(this).next().val(),
					}),//更新购物车
				
					
				});
					totalnum();
					totalpri();
				}
			})
		};
		function shopcar(){
			if(cookie.getCookie("username")){
				$.ajax({
					type:"get",
					dataType:"jsonp",
					data:({
						"userID":cookie.getCookie("username"),
					}),
					url:"http://datainfo.duapp.com/shopdata/getCar.php",
					async:true,
					success:function(res){
						console.log(res);
						for(var i=0;i<res.length;i++){
							$(
								"<li class='outLi'><ul class='inUl'><li><img src="+res[i].goodsListImg+" /></li><li><p>"+res[i][2]+"</p><p>单价: ￥<b class='b'>"+res[i][4]+"</b></p><p class='numcontainer'>数量: <span class='minus' goodsid="+res[i].goodsID+">-</span><input type='text' value="+res[i].number+" class='num'/><span class='add' goodsid="+res[i].goodsID+">+</span></p></li><li class='iconfont   del' goodsid="+res[i].goodsID+">&#xe68d;</li></ul></li>"
							).appendTo($(".outUl"));
							$(".kind").html(parseInt($(".kind").html())+1);
							
						};
						if(res.length>=1){
							$(".kind").html(res.length)
						}else{
							$(".kind").html("0")
						}
						
						totalnum();
						totalpri();
						del();
						add();
						minus();
						changeVal();
						
					}
				});//查看购物车
			}
		};
		shopcar();
	}
)