$(
	function(){
		$(".logo").click(function(){
			location.href="index.html";
		})
	
	if(cookie.getCookie("totalPrice")){
		$("#totalPrice").html(cookie.getCookie("totalPrice"));
	}else{
		$(("#totalPrice")).html("0.00")
	}
		
	
	}
)