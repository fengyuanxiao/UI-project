



(function(){
var addImg='<img src="../images/tip.jpg" style="display:inline-block; vertical-align:middle;"/>'
var pReg=/^1[34578]\d{9}$/;//手机号码验证
var mReg= /^\w+@[a-zA-Z]{2,}\.\w{3,5}$/;//邮箱验证；
var aInput=$('#login .wrap .write .comen input');
var aTip=$('#login .wrap .write .comen .tip');

/*手机邮箱验证----*/
//console.log(aInput.eq(0));
aInput.eq(0).focus(function(){
	aTip.eq(0).html('请输入E-mail或手机号码').css({color:"#999"});
});
aInput.eq(0).blur(function(){
	var value=aInput.eq(0).val();
	if(pReg.test(value)||mReg.test(value)){
		aTip.eq(0).html('');
	}else{
	aTip.eq(0).html(addImg+'请输入正确的E-mail或已验证的手机号码！').css({color:"#666"});

	}
});

/*登录密码验证----*/
var psReg=/^\w{6,16}$/;
aInput.eq(1).focus(function(){
	aTip.eq(1).html('请输入登录密码').css({color:"#999"});
});
aInput.eq(1).blur(function(){
	var value=aInput.eq(1).val();
	if(psReg.test(value)){
		aTip.eq(1).html('');
	}else{
	aTip.eq(1).html(addImg+'密码可由字母、数字、特殊符号组成，长度为6-16个字符！').css({color:"#666"});

	}
});
/*获取cookie操作----*/


/*封装获取cookie的函数*/
function getUserCookie(){
	var reg=/^user1$/;
	var result=getCookie(reg);

	//console.log(result);
	var len=result.length;
	for(var i=0;i<len;i++){
		result=JSON.parse(result[i]);
	}
	return result;
}
//console.log(getUserCookie());

aInput.eq(0).val(getUserCookie().name);
aInput.eq(1).val(getUserCookie().password);



var oLoadBTn=$('#login .wrap .write .subm .btn');
oLoadBTn.click(function(){
	var tvalue=aInput.eq(0).val();
	var pvalue=aInput.eq(1).val();
	if(tvalue==getUserCookie().name&&pvalue==getUserCookie().password){

		setCookie('loaduser','{"name":"'+getUserCookie().name+'","password":"'+getUserCookie().password+'"}',7);
		window.open('index.html');
	}

});



})();
