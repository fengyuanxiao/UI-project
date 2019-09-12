// JavaScript Document

/*用户注册=================================*/


(function(){

	function showChange(){
		aComen.eq(3).show();
		oCheck1.hide();
	};
	var aComen=$('#login .wrap .write .comen');
	var oCheck1=$('#login .wrap .write .comen .check1');
	var aInput=$('#login .wrap .write .comen input');
	var aTip=$('#login .wrap .write .comen .tip');
	var addImg='<img src="../images/tip.jpg" style="display:inline-block; vertical-align:middle;"/>'
	var trueImg='<img src="../images/ti0.jpg" style="display:inline-block; vertical-align:middle; margin-right:6px;"/>'
	//console.log(aInput);
	
	
	/*手机邮箱验证========*/
	var numReg=/^\d+$/;//验证是否为纯数字；
	var pReg=/^1[34578]\d{9}$/;//手机号码验证
	var mReg= /^\w+@[a-zA-Z]{2,}\.\w{3,5}$/;//邮箱验证；
	var tm=0;//确定手机是否被验证过；
	var pm=0;//确定密码是否符合要求；
	var rpm=0;//确定重复密码是否符合要求；
	var cm=0;//确定验证码是否合格；
	aInput.eq(0).focus(function(){
		var value=aInput.eq(0).val();
		if(value==''){
			aTip.eq(0).html(addImg+'请输入您的手机号/E-mail！').css({color:"#666"});
		};
		if(tm==1){
			aTip.eq(0).html('手机号/E-mail用于登陆和找回密码，请正确填写').css({color:"#999"});
		};
	});
	aInput.eq(0).blur(function(){
		var value=aInput.eq(0).val();
		if(pReg.test(value)){
			aTip.eq(0).html(trueImg+'该手机号可以使用').css({color:"#666"});
			tm=1;
			showChange();
		}else if(mReg.test(value)){
			aTip.eq(0).html(trueImg+'该E-mail可以使用').css({color:"#666"});
			tm=1;
			showChange();
		}else{tm=0};
	});
		
	
	
	
	aInput.eq(0).keydown(function(){
		tm=0;
		var value=aInput.eq(0).val();
		if(numReg.test(value)){
			aTip.eq(0).html(addImg+'请输入正确的的手机号码！').css({color:"#666"});
		}else{
			aTip.eq(0).html(addImg+'E-mail格式不正确！').css({color:"#666"});
		};
	});
	
	
	/*登录密码========*/
	var oUl=$('#login .wrap .write .pass .safe');
	var aI=$('#login .wrap .write .pass .safe .r i');
	var psReg=/^\w{6,16}$/;
	
	aInput.eq(1).focus(function(){
		pm=0;
		var value=aInput.eq(1).val();
		if(value==''){
			aTip.eq(1).html('6-16个字符，可使用字母、数字、符号任意组合').css({color:"#999"});
		}		
	});
	
	
	
	aInput.eq(1).blur(function(){
		var value=aInput.eq(1).val();
		if(value==''){
			aTip.eq(1).html(addImg+'密码不能为空！').css({color:"#666"});
			pm=0
		}
		else if(!psReg.test(value)){
			aTip.eq(1).html(addImg+'长度为6-16个字符，请确认！').css({color:"#666"});
			pm=0;
		}
		else{pm=1;}
	});
	
	
	
	aInput.eq(1).keydown(function(){
		//alert(0)
		var value=aInput.eq(1).val();
		if(value.length>=6&&value.length<7&&psReg.test(value)){
			togerDown(0);
		}
		else if(value.length>=7&&value.length<11&&psReg.test(value)){
			togerDown(1);
		}
		else if(value.length>=11&&value.length<17&&psReg.test(value)){
			togerDown(2);
		}
		
		function togerDown(i){
			//alert(0)
			aTip.eq(1).html(oUl);
			oUl.show();
			aI.removeClass('cursor');
			aI.eq(i).addClass('cursor');
			pm=1;
		}
		
	});
	
	/*确认密码========*/
	aInput.eq(2).focus(function(){
		console.log(pm);
		var value=aInput.eq(2).val();
		switch(pm){
			case 0:
			if(value==''){
				aTip.eq(2).html('请再次输入您设置的密码').css({color:'#999'});
			};
			
			break;
			case 1:
			if(value==''){
				aTip.eq(2).html(addImg+'重复密码不能为空！').css({color:'#666'});
			}
			break;
		}
		
		
	});
	
	aInput.eq(2).blur(function(){
		var value=aInput.eq(2).val();
		var pvalue=aInput.eq(1).val();
		if(value==pvalue){
			aTip.eq(2).html('');
			rpm=1;
		}
	});
	
	aInput.eq(2).keydown(function(){
		aTip.eq(2).html(addImg+'两次密码不一致，请确认！').css({color:'#999'});
	});

	/*随机验证码校验============*/
	/*随机生成验证码========*/
	function changOne(){
		var str='';
		var oInum=$('#login .wrap .write .piccheck .change i');
		for(var i=0;i<4;i++){
			str+=parseInt(Math.random()*10)+'';
		}
		//console.log(str);
		oInum.html(str);
	}
	changOne();
	var oChanga=$('#login .wrap .write .piccheck .change a');
	oChanga.click(changOne);

	//console.log(aInput.eq(3));
	aInput.eq(3).blur(function(){
		var vali=$('#login .wrap .write .piccheck .change i').text();
		var value=aInput.eq(3).val();
		//console.log(vali,value);
		if(vali==value){
			cm=1;
		}else{
			cm=0;
		}
	});
	var oSumbtn=$('#login .wrap .write .subm .btn');
	var resm=0;
	
	oSumbtn.click(function(){
		resm=tm+pm+cm+rpm;
		//console.log(resm);
		if(resm==4){
			//alert('注册成功');
			/*把注册号的用户名和密码写入cookie============*/
			var strUsername=$('#login .wrap .write .comen input').eq(0).val();
			var strPassword=$('#login .wrap .write .comen input').eq(1).val();
			console.log(strUsername,strPassword);
			setCookie('user1','{"name":"'+strUsername+'","password":"'+strPassword+'"}',7);
			window.open('load.html');
			

		}
	});

	
	




	
})();



