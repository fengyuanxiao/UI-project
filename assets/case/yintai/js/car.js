/*购物车-============================================*/
(function(){


	/*选中的商品动态的添加到购物车内==*/
	var reg=/^shop\d+$/;
	var recived=getCookie(reg);
	//console.log(typeof recived[0]);

	var len=recived.length;
	//console.log(len);
	var oMove=$('#shoppingbag .w .carbox .carmove');
	for(var i=0;i<len;i++){
		var oMovecreate=$('<li class="moveitem"><div class="l input"><input type="checkbox"/></div><dl class="l">   <dt class="l"><img src="'+JSON.parse(recived[i]).src+'"/></dt><dd class="l"><a href="#">'+JSON.parse(recived[i]).name+'</a><p>颜色：蓝色 &nbsp;&nbsp;尺寸：46*31*28.5*12 cm</p></dd></dl><div class="l price">￥'+JSON.parse(recived[i]).price+'</div><div class="comment l"><ul class="comment-all"><li class="l all-l">-</li><li class="l all-c">1</li><li class="l all-r">+</li></ul></div><div class="credit l">198</div><div class="close l"><a href="#">删除商品<span>'+JSON.parse(recived[i]).number+'</span></a></div></li>');

		//console.log(JSON.parse(recived[i]));
	
	oMovecreate.appendTo(oMove);
	}
	/*删除购物车内的商品==*/
	
	var oResult=$('#shoppingbag .w .accountbox .result span.number');
	var aMoveCreate=$('#shoppingbag .w .carbox .carmove .moveitem');
	var aClosea=$('#shoppingbag .w .carbox .carmove .moveitem .close a');
	var aSpan=$('#shoppingbag .w .carbox .carmove .moveitem .close a span');
	oResult.html(countResult());
		aClosea.click(function(){
			var index=aClosea.index(this);
			//console.log(index);
			var oSpanNum=aSpan.eq(index).text();
			aMoveCreate.eq(index).remove();
			delCookie('shop'+oSpanNum);
			oResult.html(countResult());	
		});
		
	
	
	
	/*复选框全选效果==*/
	var oInput=$('#shoppingbag .w .carbox .carnav .one input');
	var aInput=$('#shoppingbag .w .carbox .carmove .moveitem .input input');
	//console.log(oInput)
	oInput.click(function(){
		var check=oInput.prop('checked');
		//console.log(check)
		if(check){
			aInput.prop({checked:true});
		}else{
			aInput.prop({checked:false})
		}
		
	});



	/*增减数量的函数==*/
	var oBtnl=$('#shoppingbag .w .carbox .carmove .moveitem .comment .comment-all li.all-l');
	var oBtnr=$('#shoppingbag .w .carbox .carmove .moveitem .comment .comment-all li.all-r');
	var oBtnc=$('#shoppingbag .w .carbox .carmove .moveitem .comment .comment-all li.all-c');
	
	oBtnr.click(function(){

		var index=oBtnr.index(this);
		var iNow=parseInt(oBtnc.eq(index).html());
		//console.log(index);
		iNow++;
		oBtnc.eq(index).html(iNow);
		oResult.html(countResult());
	});

	oBtnl.click(function(){

		var index=oBtnl.index(this);
		var iNow=parseInt(oBtnc.eq(index).html());
		//console.log(index);
		iNow--;
		if(iNow<=1){
			iNow=1;
		}
		oBtnc.eq(index).html(iNow);
		oResult.html(countResult());
	});
	
	/*封装一个计算最终价格的函数*/
	function countResult(){
		var aBtnc=$('#shoppingbag .w .carbox .carmove .moveitem .comment .comment-all li.all-c');
		var aPrice=$('#shoppingbag .w .carbox .carmove .moveitem .price');
		var len=aPrice.size();
		var result=0;
		for(var i=0;i<len;i++){
			var naBtn=parseInt(aBtnc.eq(i).html());
			var naPrice=parseInt(aPrice.eq(i).html().slice(1));
			//console.log(typeof naPrice)
			result+=naBtn*naPrice;
		}
		return result;
	}
	//console.log(countResult());




})();