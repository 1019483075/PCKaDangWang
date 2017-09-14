$(
	function(){
		$(".logo").click(function(){
			location.href="index.html";
		});
		var perPho1=/(^0[0-9]{2,3}-[0-9]{7,8}$)|(^1[3578][0-9]{9}$)/;
		var flag2=false,flag3=false;
		$("#saveAddress").click(function(){
			var flag=true,flag4=true,flag5=true,flag6=true;
			if($("#person").val().replace(/\s+/g,"")==""){
				$("#person").css("border","2px solid red")
				flag=false;
			}else{
				$("#person").css("border","")
				flag=true;
			};//
			if($("#personArea").val()=="-请选择-"){
				flag4=false;
				$("#personArea").css("border","2px solid red")
			}else{
				
				$("#personArea").css("border","")
				flag4=true;
			};//
			if($("#personAddress").val().replace(/\s+/g,"")==""){
				flag5=false;
				$("#personAddress").css("border","2px solid red")
			}else{
				$("#personAddress").css("border","");
				flag5=true;
			};//
			if(!perPho1.test($("#personPhone1").val().replace(/\s+/g))){
				$("#personPhone1").css("border","2px solid red");
				flag6=false;
			}else{
				$("#personPhone1").css("border","");
				flag6=true;
			}
			if(flag&&flag4&&flag5&&flag6){
				alert("保存成功")
				flag2=true;
			}
		})//保存地址
		
		var mailReg=/^\w+@[a-zA-Z0-9]+\.[a-z]{2,4}$/;
		var perTel=/^1[3578][0-9]{9}$/;
		$(".saveInfo").click(function(){
			var flag1=true,flag7=true;flag8=true;
			if($("#personName").val().replace(/\s+/g,"")==""){
				$("#personName").css("border","2px solid red")
				flag1=false;
			}else{
				$("#personName").css("border","")
				flag1=true;
			};//
			if(!perTel.test($("#personTel").val().replace(/\s+/g))){
				$("#personTel").css("border","2px solid red");
				flag7=false;
			}else{
				$("#personTel").css("border","");
				flag7=true;
			};//
			if(!mailReg.test($("#personMail").val())){
				$("#personMail").css("border","2px solid red");
				flag8=false;
			}else{
				$("#personMail").css("border","");
				flag8=true;
			};//
			if(flag1&&flag7&&flag8){
				alert("保存成功");
				flag3=true;
			};//
			$("#backCar").click(function(){
				location.href="shopCar2.html";
			
			})//修改
		});
		if(document.cookie){
			var res=document.cookie.replace(/\s+/g,"").split(";");
			var re=/ood/g;
			for (var i=0;i<res.length;i++) {
				if(re.test(res[i])){        //判断这个cookie值是不是选购的物品信息
					var arr=res[i].split("=");
					var arr1=JSON.parse(arr[1]);
					$("<tr>"+"<td style='width:320px;' class='first'><img src="+arr1.imgSrc+" class='pic' /><p>"+
					arr1.goodName+"</p></td><td>"+arr1.price+"</td><td>"+arr1.goodNum+"</td><td>"
					+"<td class='last'>"+parseInt(arr1.price)*parseInt(arr1.goodNum)+".00</td></tr>").appendTo($("#tbd1"))
				};
			};
		};
		var sum=0;
		$("#tbd1 .last").each(function(i){
			sum+=parseFloat($("#tbd1 .last").eq(i).html());
		});
		$(".totalmoney").html(sum+".00");
		$("#yourpay").html(sum+".00");
		
		$.ajax({
			url:"../js/region.json",
			success:function(res){
				for (var i=0;i<res.regions.length;i++) {
					$("<option value="+res.regions[i].name+">"+res.regions[i].name+"</option>").appendTo($("#personArea"))
				}
				
				$("#personArea").change(function(){
					
					for (var j=0;j<res.regions.length;j++){
						if($("#personArea").val()==res.regions[j].name){
							$("#area").children().not($("#choo")).remove();
							for (var n=0;n<res.regions[j].regions.length;n++) {
								$("<option value="+res.regions[j].regions[n].name+">"+
								res.regions[j].regions[n].name+"</option>").appendTo($("#area"))
							}
						}
					}
				});
				$("#area").change(function(){
					for (var j=0;j<res.regions.length;j++) {
						for (var i=0;i<res.regions[j].regions.length;i++) {
							if($("#area").val()==res.regions[j].regions[i].name){
								$("#area1").children().not($("#choo1")).remove();
								for (var m=0;m<res.regions[j].regions[i].regions.length;m++){
									$("<option value="+res.regions[j].regions[i].regions[m].name+">"+
									res.regions[j].regions[i].regions[m].name+"</option>").appendTo($("#area1"))
								}
								
							}
						}
					}
				})
			}
		});
		$("#sub").click(function(){
			if(flag2&&flag3){
				cookie.setCookie("totalPrice",$("#yourpay").html());
				location.href="choosePay.html";
			}else{
				alert("请先填写完整的信息");
			}
		})//如果信息完整的话才可以去支付;
	}//function
)
				