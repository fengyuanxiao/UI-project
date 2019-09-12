




(function(){
	/*创建页码===*/
	var oPage=$('#shoplist .w .page-footer');
	oPage.createPage({pageCount : 10,
		current : 1,
		backFn:function(num){
			var oShopshow=$('#shoplist .w .shopshow');
			oShopshow.html('');
			loadData(num);
		}
	});

	/*封装加入购物车函数===*/
	function addCar(num){
		var aBtnCar=$('#shoplist .w .shopshow .item .it-car');
		aBtnCar.click(function(){
			var index=aBtnCar.index(this);
			var strSrc=$('#shoplist .w .shopshow .item .it-img img').eq(index).attr("src");
			var strPrice=$('#shoplist .w .shopshow .item .it-price strong').eq(index).text().trim().slice(1);
			var strName=$('#shoplist .w .shopshow .item .it-href').eq(index).text();
			//console.log(strPrice);
			setCookie('shop'+(index+3+(num-1)*20),'{"src":"'+strSrc+'","price":"'+strPrice+'","name":"'+strName+'","number":"'+(index+3+(num-1)*20)+'"}',7);
			//console.log(num);
		});
	
	}
	
	/*封装加载json数据方法===*/
	function loadData(num){
		var oShopshow=$('#shoplist .w .shopshow');
		$.get('../json/json'+num+'.txt',function(data){
			//console.log(typeof data);
			data=JSON.parse(data);
			//console.log(data[0]);
			var len=data.length;
			for(var i=0;i<len;i++){
				var oItem=$('<div class="item l"><div class="it-img"><img src="'+data[i].src+'" alt=""></div><div class="it-car"></div><div class="it-price"><strong>￥'+data[i].price+'</strong> &nbsp;&nbsp;&nbsp;&nbsp;<span>￥3200</span></div><a href="#" class="it-href">'+data[i].name+'</a> </div>');
				oItem.appendTo(oShopshow);
			}
			addCar(num);

		});
	};

	loadData(1);
	



})();