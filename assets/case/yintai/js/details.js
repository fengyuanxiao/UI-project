// JavaScript Document
/*主图展示效果=========================================================================*/
(function(){
/*===左右按钮切换效果===*/

	var oBtnl=$('#shopinform .w .mainshow .bottom .left .conctrl input.btnl');
	var oBtnr=$('#shopinform .w .mainshow .bottom .left .conctrl input.btnr');
	var oMove=$('#shopinform .w .mainshow .bottom .left .conctrl .conlook .move');
	var iNow=0;//控制move滑动的距离；
	var aConctrl=$('#shopinform .w .mainshow .bottom .left .conctrl .conlook .move li.l');
	var oLookimg=$('#shopinform .w .mainshow .bottom .left .look img');
	var oLook=$('#shopinform .w .mainshow .bottom .left .look');
	var oSmallshow=$('#shopinform .w .mainshow .bottom .left .look .smallshow');
	var oBigshow=$('#shopinform .w .mainshow .bottom .bigshow');
	// var getX;//获取大图的x坐标；
	// var getY;//获取大图的y坐标；
	/*封装一个函数 move移动及透明度变化*/
	function opaMove(){
		oMove.css({opacity:0.5});
		oMove.stop().animate({left:-72*iNow},function(){
			oMove.css({opacity:1});
		});
	}


	oBtnl.click(function(){
		iNow--;
		if(iNow<=0){
			iNow=0;
		};
		opaMove();
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow>=5){
			iNow=5;
		}
		opaMove();
	});
	/*===鼠标移上图片切换效果===*/
	aConctrl.each(function(){
		var index=$(this).index();
		$(this).hover(function(){
			//var i=$(this).index();
			//console.log(i);
			
			oLookimg.attr({src:'../images/listbig'+(index+1)+'.jpg'});
			aConctrl.removeClass('active').eq(index).addClass('active');
			oBigshow.css({background:'url(../images/listbig'+(index+1)+'.jpg)'});
		});
	});
	/*===放大镜效果===*/
	
	oLook.hover(function(){
		//console.log('鼠标进来了')
		oLook.mousemove(function(ev){
			//console.log('动了');
			var oX=ev.pageX-parseInt(oLook.offset().left);
			var oY=ev.pageY-parseInt(oLook.offset().top);
			//console.log(ev.pageX,ev.pageY);
			//console.log(oLook.offset());
			//console.log(oX,oY);
			var dis=oSmallshow.width()+2;//保存该移动块宽高的一半；
			//console.log(oX);
			var disX=oX-dis/2;			
			var disY=oY-dis/2;
			//console.log(disX,disY);
				if(disX<=0){
					disX=0;
				}else if(disX>=(300-dis)){
					disX=300-dis;
				};

				if(disY<=0){
					disY=0;
				}else if(disY>=400-dis){
					disY=400-dis;
				};

				oSmallshow.css({left:disX,top:disY});
				oBigshow.css({backgroundPosition:(-disX*2.56)+'px '+(-disY*2.56)+'px'});
				oSmallshow.show()
				oBigshow.show();
		});
		

		
	},function(){
		oSmallshow.hide();
		oBigshow.hide();
		//console.log(oSmallshow.position());
		//console.log(0);
	});

	/*微信盒子显示消失=======*/
	var oTwo=$('#shopinform .w .mainshow .bottom .left .link ul.l li.two');
	var oBox=$('#shopinform .w .mainshow .bottom .left .link .box');
	/*封装鼠标移上函数*/
	function mouseOver(oBj1,oBj2){
		oBj1.css({borderColor:'#ccc'});
		oBj2.show();
	};
	/*封装鼠标移出函数*/
	function mouseOut(oBj1,oBj2){
		oBj1.css({borderColor:'#fff'})
		oBj2.hide();
	};

	//console.log(oTwo,oBox);
	oTwo.each(function(){
		var index=oTwo.index(this);
		//console.log(index)
		$(this).hover(function(){
			mouseOver(oTwo.eq(index),oBox.eq(index));
		},function(){
			mouseOut(oTwo.eq(index),oBox.eq(index));
		});
	});
	
	oBox.each(function(){
		var index=oBox.index(this);
		//console.log(index)
		$(this).hover(function(){
			mouseOver(oTwo.eq(index),oBox.eq(index));
		},function(){
			mouseOut(oTwo.eq(index),oBox.eq(index));
		});
	});

	/*给分享盒子中的小图标定位=======*/
	var aShareInside=$('#shopinform .w .mainshow .bottom .left .link .sharebox .shareinside a');
	aShareInside.each(function(){
		var index=aShareInside.index(this);
		aShareInside.eq(index).css({backgroundPosition:-148-(32*index)+'px 0'});

	});
	/*===购买时的选择效果===*/
	var aChoose=$('#shopinform .w .mainshow .bottom .center>dl .choose');
	var aChooseb=$('#shopinform .w .mainshow .bottom .center>dl .choose b');
	//console.log(aChoose,aChooseb);
	aChoose.each(function(){
		var index=aChoose.index(this);
		//console.log(index);
		$(this).click(function(){
			if(index==0){
				aChooseb.eq(index).show();
			}else{
				aChooseb.filter('.smbig-b').hide().eq(index-1).show();	
			}
		});
	});
	/*===点击增加数量效果===*/

	var aBtnDivt=$('#shopinform .w .mainshow .bottom .center .buy .buy-l .btn div.btn-t');
	var aBtnDivb=$('#shopinform .w .mainshow .bottom .center .buy .buy-l .btn div.btn-b');
	var oNumP=$('#shopinform .w .mainshow .bottom .center .buy .buy-l p');
	var shopnum=parseInt(oNumP.html());
	aBtnDivt.click(function(){
		shopnum++;
		oNumP.html(shopnum);
	});

	aBtnDivb.click(function(){
		shopnum--;
		if(shopnum<=1){
			shopnum=1;
		};
		oNumP.html(shopnum);

	});
	/*===加入购物车功能===*/
	var oJoincar=$('#shopinform .w .mainshow .bottom .center .buy .joincar');
	var oShopcar=$('#shopinform .w .shoppart .left .l-top .jump .shopcar');
	oJoincar.click(function(){

		setCookie('shop1','{"src":"../images/list1.jpg","price":"299","name":"茵佳兰迪INPLUS-LADY夏季新款 欧美时尚 个性条纹修身背带裙套装","number":"1"}',7);
		//console.log(document.cookie)
	});
	oShopcar.click(function(){
		setCookie('shop2','{"src":"../images/carpic1.jpg","price":"99","name":"幸福里牛皮肩带日式海军风饺子包TM120605蓝色","number":"2"}',7)
	});



})();

/*商品详情部分效果=========================================================================*/
(function(){

	var aChoose=$('#shopinform .w .shoppart .left .l-top .jump .choose');
	var aChoosebox=$('#shopinform .w .shoppart .left .l-top .jump .choosebox');
	aChoose.each(function(){
		var index=aChoose.index(this);
		$(this).hover(function(){
			if(index==0){
				aChoose.eq(index).css({backgroundPosition:'-148px -70px'});
			}
			
			aChoosebox.eq(index).show();
		},function(){
			if(index==0){
				aChoose.eq(index).css({backgroundPosition:'0 -70px'});
			}
			aChoosebox.eq(index).hide();

		});
	});

	aChoosebox.each(function(){
		var index=aChoosebox.index(this);
		$(this).hover(function(){
			if(index==0){
				aChoose.eq(index).css({backgroundPosition:'-148px -70px'});
			}
			
			aChoosebox.eq(index).show();
		},function(){
			if(index==0){
				aChoose.eq(index).css({backgroundPosition:'0 -70px'});
			}
			
			aChoosebox.eq(index).hide();

		});
	});

	var aLi=$('#shopinform .w .shoppart .left .l-top .nav li');
	aLi.click(function(){
		var index=aLi.index(this);
		aLi.removeClass('active').eq(index).addClass('active');
	});

})();