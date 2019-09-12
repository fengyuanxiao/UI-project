// JavaScript Document


/*自建方法-----------------------------------*/


/*线条滑动方法 传参数为 选中该元素的字符串表达式  lineMove*/
function lineMove(str){
	var aDl=$(str);
	
	var iW=aDl.eq(0).width()+2;
	var iH=aDl.eq(0).height()+2;
	aDl.each(function() {
        var t=$('<div></div>');
		
		var b=$('<div></div>');
		
		var l=$('<div></div>');
		
		var r=$('<div></div>');
		
		t.appendTo($(this));
		r.appendTo($(this));
		l.appendTo($(this));
		b.appendTo($(this));
		
		t.css({position:"absolute",left:-1,top:-1,width:0,height:1,backgroundColor:'#000'});
		b.css({position:"absolute",right:-1,bottom:-1,width:0,height:1,backgroundColor:'#000'});
		l.css({position:"absolute",left:-1,top:-1,height:0,width:1,backgroundColor:'#000'});
		r.css({position:"absolute",right:-1,bottom:-1,width:1,height:0,backgroundColor:'#000'});
		
		
		//console.log(this)
		//console.log(iW);
		$(this).hover(function(){
			//console.log(iW);
			t.stop().animate({width:iW});
			l.stop().animate({height:iH});
			r.stop().animate({height:iH});
			b.stop().animate({width:iW});
			//console.log(t.width())
		},
		function(){
			t.stop().animate({width:0});
			l.stop().animate({height:0});
			r.stop().animate({height:0});
			b.stop().animate({width:0});
		});
		
		
    });
}

/*获取用户名显示在页面-----------------------------------*/
(function(){
	var reg=/^loaduser$/;
	getCookie(reg);
	//console.log(getCookie(reg));
	var result=0;
	var len=getCookie(reg).length;
	for(var i=0;i<len;i++){
		result=JSON.parse(getCookie(reg)[i]);
	}
	//console.log(result);
	if(result!=0){
		var oHello=$('#header .header .hd-r li a.choose');
		var oLoad=$('#header .header .hd-r li a.chooseload');
		var oLogin=$('#header .header .hd-r li a.chooselogin');
		oHello.html(result.name);
		oLoad.html('退出');
		oLogin.html('欢迎');
		oLoad.click(function(){
			delCookie('loaduser');
		});
	}




})();

/*获取购物车内商品的数量显示在页面-----------------------------------*/
(function(){
	var reg=/^shop\d+$/;
	var len=getCookie(reg).length;
	var oShow=$('#headlogo .headlogo .shopcart a span strong');
	oShow.html(len);






})();




/*banner图-------------------------------------*/
(function(){
	var oBanner=$('#banner');
	var aLipic=$('#banner .pic li');
	var aLibtn=$('#banner .btn li');
	var oBtnl=$('#banner .btnl');
	var oBtnr=$('#banner .btnr');
	var iNow=0;
	var timer;
	aLipic.hide().eq(4).show();
	aLibtn.hover(function(){
		clearInterval(timer);
		var index=$(this).index();
		aLipic.stop().fadeOut(500).eq(index).stop().fadeIn(500);	
		aLibtn.removeClass('active').eq(index).addClass('active');
		oBanner.css({backgroundImage:'url(images/banback'+(index+1)+'.jpg)'});	
		iNow=index;
		//console.log(index);
	},function(){
		inTerval();	
		
	});
	
	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=aLipic.size()-1;
		}
		aLipic.stop().fadeOut(500).eq(iNow).stop().fadeIn(500);	
		aLibtn.removeClass('active').eq(iNow).addClass('active');
		oBanner.css({backgroundImage:'url(images/banback'+(iNow+1)+'.jpg)'});	
	});
	
	oBtnr.click(function(){
		iNow++;
		if(iNow==aLipic.size()){
			iNow=0;
		}
		aLipic.stop().fadeOut(500).eq(iNow).stop().fadeIn(500);	
		aLibtn.removeClass('active').eq(iNow).addClass('active');
		oBanner.css({backgroundImage:'url(images/banback'+(iNow+1)+'.jpg)'});	
	});


	/*封装图片定时切换函数==*/
	function inTerval(){
		clearInterval(timer);
		timer=setInterval(function(){
			iNow++;
			if(iNow==aLipic.size()){
				iNow=0;
			}
			aLipic.stop().fadeOut(500).eq(iNow).stop().fadeIn(500);	
			aLibtn.removeClass('active').eq(iNow).addClass('active');
			oBanner.css({backgroundImage:'url(images/banback'+(iNow+1)+'.jpg)'});	
		},3000);
	}

	inTerval();
	
	var oRec=$('#banner .reccom');
	oRec.hover(function(){
		oRec.stop().animate({left:1000});
	},
	function(){
		oRec.stop().animate({left:1010});
	});
	
	/*给menu加背景图*/
	var aSpan=$('#banner .banner .optionbox .list li span')
	var len=aSpan.size();
	for(var i=1; i<len;i++){
		+function(){
			var j=i;
			aSpan.eq(i).css({backgroundPosition:-17*i+"px -111px"});
			aSpan.eq(i).parent().hover(function(){
				aSpan.eq(j).css({backgroundPosition:-17*j+"px -129px"})
			},function(){
				aSpan.eq(j).css({backgroundPosition:-17*j+"px -111px"});
			});	
		}();
	}
	/*二级导航==*/
	(function(){
		/*动态添加 二级导航*/
		var aBtnli=$('#banner .optionbox .list li');
		var oSowbox=$('#banner .optionbox .ban-showbox');
		var oPtionbox=$('#banner .optionbox');
		//console.log(oSowbox.clone());
		for(var i=0;i<9;i++){
			if(i<5){
				oSowbox.clone().appendTo(oPtionbox).css({top:2*i+5});	
			}else{
				oSowbox.clone().appendTo(oPtionbox).css({bottom:-2*i+10});
			}
			
		}
		oSowbox.css({top:0});


		/*二级导航展示效果*/
		(function(){
			var aShowbox=$('#banner .optionbox .ban-showbox');
			//console.log(aShowbox);
			//console.log(aBtnli);
			function moveInOut(obj){
				obj.hover(function(){
				var index=obj.index(this);
				aShowbox.eq(index).show();


				},function(){
					var index=obj.index(this);
					aShowbox.eq(index).hide();
				});
			}
			moveInOut(aBtnli);	
			moveInOut(aShowbox);

		})();

	})();





})();

/*特卖区----------------------------------------*/
(function(){
	
	/*线条跑动效果*/
	lineMove('#special .show .fix .toger dl');

/*选项卡效果*/
	var aToger=$('#special .show .fix .toger');
	var aSelect=$('#special .show .select .l')
	
	//console.log(aToger);
	//console.log(aSelect);
	
	aToger.hide().eq(0).show();
	
	aSelect.each(function(){
		var index=$(this).index();
		$(this).hover(function(){
			aToger.hide().eq(index).show();
			
		},function(){})
	});
})();

/*专柜同款----------------------------------------*/


(function(){
	
	
	/*线条跑动效果*/
	lineMove('#same .w .bottom .hot .show ul li.week dl');
	
	/*选项卡效果*/
	var aDiv=$('#same .w .bottom .hot .select div');
	var aLi=$('#same .w .bottom .hot .show ul li');
	
	aDiv.each(function(){
		var index=$(this).index();
		$(this).hover(function(){
			aLi.hide().eq(index).show();
		},
		function(){
			
		});
			
	});
	
	/*透明度变化效果*/
	var aTodiv=$('#same .w .bottom .hot .show ul li.topic div');
	//console.log(aTodiv);
	aTodiv.hover(function(){
		//console.log(this);
		$(this).css({opacity:0.6})
	},
	function(){
		aTodiv.css({opacity:1});
	});

})();
	
/*楼梯效果----------------------------------------*/

(function(){
	
	var aLi=$('#stair .ladder');
	var aP=$('#stair .ladder p');
	var len=aP.size();
	var iNow=-1;//记录点击了某个li的索引；
	
	//console.log($(window).scrollTop()); //1003显示楼梯；
	
	/*滑轮滚动*/
	$(window).scroll(function(){
		var roll=$(window).scrollTop();
		//console.log(roll);
		if(roll>=1003){
			aLi.parent().show();
		}else{
			aLi.parent().hide();
			aP.hide();
		};
		for(var i=0;i<len-1;i++){
			if(roll>=1815+i*454){
				aP.hide().eq(i).show();
			}
		}
		if(roll>=1815+9*454){
			aP.hide();
		}
		
	});
	
	/*鼠标单击*/
	aLi.each(function() {
		var index=$(this).index();
        $(this).click(function(){
			aP.hide().eq(index).show();
			//console.log(index);
			iNow=index;
			$('#stair .close').show();
			if(index!=9){
				$('body,html').animate({scrollTop:1815+index*454},500,function(){
					$('#stair .close').hide();
				});	
			}else{
				$('body,html').animate({scrollTop:0},500,function(){
					$('#stair .close').hide();
				});
			};
			
			
			
		});
    });
	
	/*鼠标移进移出*/
	aLi.each(function(){
		var index=$(this).index();
		$(this).hover(function(){
			aP.eq(index).show();	
		},
		function(){
			aP.hide();
			if(iNow!=-1){
				aP.eq(iNow).show();
			}	
		});
	});
	
	
	
	
})();


/* 商品展示区-------------------------------------*/

/* 时尚名品-------------------------------------*/

	/*图片滑动切换效果*/
(function(){
	var oBtnl=$('#contect .pin .w .bottom .left .fix input.btnl');
	var oBtnr=$('#contect .pin .w .bottom .left .fix input.btnr');
	var oMove=$('#contect .pin .w .bottom .left .fix .look .move');
	var iNow=0;//控制切换到第几张图片；
	var iW=$('#contect .pin .w .bottom .left .fix .look .move li').width();//单次移动的长度；
	oBtnl.click(function(){
		
		iNow--;
		if(iNow<=0){
			iNow=0;
			oMove.stop().animate({left:-iW*iNow},function(){
				oMove.css({left:-iW*3});
			});	
			iNow=3;
		}else{
			oMove.stop().animate({left:-iW*(iNow)});
		}
		
	});
	
	oBtnr.click(function(){
		
		iNow++;
		if(iNow>=4){
			iNow=4;
			oMove.stop().animate({left:-iW*iNow},function(){
				oMove.css({left:-iW});
			});	
			iNow=1;
		}else{
			oMove.stop().animate({left:-iW*(iNow)});
		}
	});	
})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .pin .w .bottom .center .move');
	var aBtnli=$('#contect .pin .w .bottom .center .btn li');
	var iW=$('#contect .pin .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .pin .w .bottom .center .btnl');
	var oBtnr=$('#contect .pin .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .pin .w .bottom .right div.shop a');


/* 潮流女装-------------------------------------*/
	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .woman .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .woman .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .woman .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .woman .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();
	
	/*右边线条效果*/
lineMove('#contect .woman .w .bottom .right div.shop a');	
	
	
	
	
/* 精品男装-------------------------------------*/
	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .man .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .man .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .man .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .man .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*右边线条效果*/
lineMove('#contect .man .w .bottom .right div.shop a');



/* 时尚鞋靴-------------------------------------*/

	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .shoe .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .shoe .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .shoe .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .shoe .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .shoe .w .bottom .center .move');
	var aBtnli=$('#contect .shoe .w .bottom .center .btn li');
	var iW=$('#contect .shoe .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .shoe .w .bottom .center .btnl');
	var oBtnr=$('#contect .shoe .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .shoe .w .bottom .right div.shop a');


/* 潮流箱包-------------------------------------*/
	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .bag .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .bag .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .bag .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .bag .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .bag .w .bottom .center .move');
	var aBtnli=$('#contect .bag .w .bottom .center .btn li');
	var iW=$('#contect .bag .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .bag .w .bottom .center .btnl');
	var oBtnr=$('#contect .bag .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .bag .w .bottom .right div.shop a');



/* 美容护肤-------------------------------------*/
	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .skin .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .skin .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .skin .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .skin .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .skin .w .bottom .center .move');
	var aBtnli=$('#contect .skin .w .bottom .center .btn li');
	var iW=$('#contect .skin .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .skin .w .bottom .center .btnl');
	var oBtnr=$('#contect .skin .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .skin .w .bottom .right div.shop a');




/* 运动户外-------------------------------------*/

	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .outside .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .outside .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .outside .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .outside .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .outside .w .bottom .center .move');
	var aBtnli=$('#contect .outside .w .bottom .center .btn li');
	var iW=$('#contect .outside .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .outside .w .bottom .center .btnl');
	var oBtnr=$('#contect .outside .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .outside .w .bottom .right div.shop a');




/* 内衣配饰-------------------------------------*/

	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .cloth .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .cloth .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .cloth .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .cloth .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .cloth .w .bottom .center .move');
	var aBtnli=$('#contect .cloth .w .bottom .center .btn li');
	var iW=$('#contect .cloth .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .cloth .w .bottom .center .btnl');
	var oBtnr=$('#contect .cloth .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .cloth .w .bottom .right div.shop a');




/* 婴童家居-------------------------------------*/

	/*图片滑动切换效果*/
(function(){
		var oBtnl=$('#contect .home .w .bottom .left .fix input.btnl');
		var oBtnr=$('#contect .home .w .bottom .left .fix input.btnr');
		var oMove=$('#contect .home .w .bottom .left .fix .look .move');
		var iNow=0;//控制切换到第几张图片；
		var iW=$('#contect .home .w .bottom .left .fix .look .move li').width();//单次移动的长度；
		oBtnl.click(function(){
			
			iNow--;
			if(iNow<=0){
				iNow=0;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW*3});
				});	
				iNow=3;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
			
		});
		
		oBtnr.click(function(){
			
			iNow++;
			if(iNow>=4){
				iNow=4;
				oMove.stop().animate({left:-iW*iNow},function(){
					oMove.css({left:-iW});
				});	
				iNow=1;
			}else{
				oMove.stop().animate({left:-iW*(iNow)});
			}
		});	
	})();

	/*中间轮播图效果*/
(function(){
	var oMove=$('#contect .home .w .bottom .center .move');
	var aBtnli=$('#contect .home .w .bottom .center .btn li');
	var iW=$('#contect .home .w .bottom .center .move li').width();
	var iNow=0;//当前展示的图片的索引；
	var oBtnl=$('#contect .home .w .bottom .center .btnl');
	var oBtnr=$('#contect .home .w .bottom .center .btnr');
	
	aBtnli.each(function(){
		var index=$(this).index();
		$(this).click(function(){
			oMove.stop().animate({left:-iW*index});
			aBtnli.css({backgroundPosition:'0 0'});
			$(this).css({backgroundPosition:'0 bottom'});
			iNow=index;
		});
	});

	oBtnl.click(function(){
		iNow--;
		if(iNow==-1){
			iNow=0;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});

		
	});
	oBtnr.click(function(){
		iNow++;
		if(iNow==2){
			iNow=1;
		}
		oMove.stop().animate({left:-iW*iNow});
		aBtnli.css({backgroundPosition:'0 0'});
		aBtnli.eq(iNow).css({backgroundPosition:'0 bottom'});
		
		
	});



	
})();

	/*右边线条效果*/
lineMove('#contect .home .w .bottom .right div.shop a');


/* 跳转区-------------------------------------*/



































