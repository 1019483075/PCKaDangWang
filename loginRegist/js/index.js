window.onload=function(){
	var screenWid=document.documentElement.offsetWidth||document.body.offsetWidth;
	var oHtml=document.getElementsByTagName("html")[0];
	oHtml.style.fontSize=screenWid/640*100+"px";

	var mySwiper=new Swiper(".swiper-container",{
		hashnav:true,
	});
	document.getElementById("wrapper").onmousemove=function(e){
		var e=e||event;
		return false;
	}
}
$(
	function(){
		var mySwiper=new Swiper(".swiper-container",{
			hashnav:true,
		});
		var myScroll=new IScroll("#wrapper",{
			
		})
		$(".sureRegist").tap(function(){
			$.ajax({
			 	type:"get",
			 	url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			 	async:true,
			 	data:({
			 		"status":"register",
			 		"userID":$("#username").val(),
			 		"password":$("#pwd").val(),
			 	}),
			 	success:function(res){
			 		if(res==0){
			 			alert("该用户也被注册")
			 		}else if(res==1){
			 			/*window.location.href="http://127.0.0.1:8020/loginRegist/index.html#slide2";
			 			window.location.reload(true);*/
			 			mySwiper.slideTo(1,300)
			 		}
			 	}
			 });
		});
		$(".login").tap(function(){
			
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				async:true,
				data:({
					"status":"login",
					"userID":$(".username").val(),
					"password":$(".password").val(),
				}),
				success:function(res){
					//alert(1)
					if(res==0){
						alert("用户名不存在");
					}else if(res==2){
						alert("用户名与密码不符");
					}else{
						if($("#remember").prop("checked")){
							cookie.setCookie("username",$(".username").val(),7);
							cookie.setCookie("password",$(".password").val(),7)
						}else{
							if(cookie.getCookie("username")){
								cookie.removeCookie("username");
								cookie.removeCookie("password",$(".password").val(),7)
							}
							cookie.setCookie("username",$(".username").val())
							location.href="goodsList.html";
						}
						
						
					}
				}
			});
		});
		if(cookie.getCookie("username")){
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/getuser.php",
				dataType:"jsonp",
				data:({"userID":cookie.getCookie("username")}),
				success:function(res){
					console.log(res)
					$(".username").val(res[0].userID);
					$(".password").val(cookie.getCookie(".password"));
					$.ajax({
						type:"get",
						url:"http://datainfo.duapp.com/shopdata/userinfo.php",
						async:true,
						data:({
							"status":"login",
							"userID":$(".username").val(),
							"password":$(".password").val(),
						}),
						success:function(res){
							//location.href="goodsList.html";
						},
					});
				},
			})
		};//
		//显示密码
		$(".showPwd").change(function(){
			if($(this).attr("checked")){
				$(".password").attr("type","text")
			}else{
				$(".password").attr("type","password")
			};
		});
		$(".regist").tap(function(){
			mySwiper.slideTo(0,300)
		});
		$(".toLogin").tap(function(){
			mySwiper.slideTo(1,300)
		});
		$(".exitLogin").tap(function(){
			if(cookie.getCookie("username")){
				cookie.removeCookie("username")
			};
		})
		$(".luckyDraw").tap(function(){
			if(cookie.getCookie("username")){
				$.ajax({
					type:"get",
					url:"http://datainfo.duapp.com/lottery/fruitsubmit.php",
					async:true,
					data:({
						"userID":cookie.getCookie("username"),
						"fruit":2,
					}),
					success:function(res){
						if(res==0){
							alert("您已抽过奖")
						}else{
							$(".luckyDraw").attr("id","rotate")
						}
					}
				});
			}else{
				alert("请先登录");
			};//
			
			
		});
		//获取中奖名单
		$.ajax({
			url:" http://datainfo.duapp.com/lottery/getsuerfr.php",
			dataType:"jsonp",
			success:function(res){
				//console.log(res);
				for (var i=0;i<res.length;i++) {
					$("<li>恭喜"+res[i].userID+"中奖"+"   "+res[0].timer+"</li>").appendTo($("#wrapper ul"))
				};
				myScroll.refresh();
			}
		});
		
		
	}
	
)