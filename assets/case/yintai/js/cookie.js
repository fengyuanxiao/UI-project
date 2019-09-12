	function setCookie(name,key,time)
	{
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+time);
		document.cookie=name+'='+key+'; expires='+oDate;
		return document.cookie;	
	};
	

	function getCookie(reg)//获取cookie函数
	{
		var result=[];
		var str=document.cookie.split('; ');
		for(var i=0;i<str.length;i++)
		{
			var arr=str[i].split('=')
				if(reg.test(arr[0])){
					result.push(arr[1]);	
				}
					
		};
		return result;
	};
	

	function delCookie(name)//删除cookie函数
	{
		var reg=new RegExp('^'+name+'$');
		var key=getCookie(reg);
		setCookie(name,key,-1);		
	};
	