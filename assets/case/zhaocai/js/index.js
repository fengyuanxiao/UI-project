
// -------------------轮播图
$(function(){
  //调用swiper
  var mySwiper = new Swiper ('.swiper-container',{
    //分页器
		pagination: {el:'.swiper-pagination'}
	});

});

// --------------------canvas进度条
// 第一个
$(function(){
  //计算设计图和视口的比值
  var percent = 750/document.documentElement.clientWidth;
  // console.log(percent);
  //     //计算宽高
  var w = 136/percent;
  var h = 136/percent;
  function can(dom,num){
    //获取canvas
    dom.ClassyLoader({
      width:w+5,
  		height:h+5,
  		diameter:w/2,
      lineWidth:2,
      speed: 30,
      percentage: num,
      lineColor: '#fa3012',
      remainingLineColor: '#ffe2e0',
  		fontSize:38/percent
    });
  }

  can($('.one-can'),37);
  can($('.two-can'),56);
  can($('.three-can'),62);
});

// 首页添加点击事件
$(function(){
  var aNav = $('nav a');
  console.log(aNav);
  aNav.on('tap',function(){
    $(this).addClass('active');
  })

})
