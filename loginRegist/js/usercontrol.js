window.onload=function(){
	var screenWid=document.documentElement.offsetWidth||document.body.offsetWidth;
	var oHtml=document.getElementsByTagName("html")[0];
	oHtml.style.fontSize=screenWid/640*100+"px";
};
$(
	function(){
		if(cookie.getCookie("userID")){
			$(".name").html(cookie.getCookie("userID"))
		};
		$(".choosePic").tap(function(){
			$("#wrap").add($("#cover")).css("display","block")
		});
		$.ajax({
			"url":"footerCommon.html",
			success:function(res){
				$(".footercontainer").append(res)
			}
		})//ajax加载底部公共文件
	}
)