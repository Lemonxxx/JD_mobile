window.onload=function(){
	// 调用头部js效果
	searchEffect();
	timeBack();
	bannerEffect();
	
	

}
// 头部搜索块透明度效果 封装函数
function searchEffect(){

	// 1.获取当前banner高度
	var banner = document.querySelector(".jd_banner");
	var bannerHeight = banner.offsetHeight;//banner的高度包括边框
	// 获取header搜索块
	var search= document.querySelector(".jd_search")
	// console.log(bannerHeight);
	// 2.获取屏幕滚动时,banner滚出屏幕的距离
	window.onscroll = function(){//监听
		// console.log(bannerHeight);
		var offetTop = document.documentElement.scrollTop;//不支持document.body.scrollTop了
		// console.log(offetTop);
		// 3.计算比例值即为透明度,获取透明度,设置背景色
		var opacity= 0;
		//判断，若盒子移出banner高度后，停止计算设置透明度
		if(offetTop <= bannerHeight){
			opacity = offetTop/bannerHeight;
			// 设置样式
			search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";//样式做拼接
			// console.log("aa");
		}
		
		
	}
 
}

//倒计时效果
function timeBack(){
	//1. 获取时间的span
	var spans= document.querySelector(".jd_sk_time").querySelectorAll("span");
	//2.设置初始倒计时
	var totalTime =3740;
	// 3.开启定时器  每个1000s执行一次函数
	var timeId = setInterval(function(){
		totalTime--;
		if (totalTime <0 ) {
			// 清除时钟
			clearInterval(timeId);	
			return;		

		}
		//得到剩余时间的 时 分 秒
		var hour = Math.floor(totalTime/3600);//取底函数 
		
		var minute = Math.floor(totalTime%3600 /  60);
		var second = totalTime%60;
		// console.log(hour+" "+minute+" "+second);
		// 赋值
		// 时的第一位
		spans[0].innerHTML = Math.floor(hour/10);
		// 时的第二位
		spans[1].innerHTML = Math.floor(hour%10);
		// 分
		spans[3].innerHTML = Math.floor(minute/10);
		spans[4].innerHTML = Math.floor(minute%10); 
		//秒
		spans[6].innerHTML = Math.floor(second/10);
		spans[7].innerHTML = Math.floor(second%10); 
	},1000) 
}

//轮播图
function bannerEffect(){
	// 1.设置修改轮播图结构
		// a.在开始添加最后一张图片
		// b.在最后添加第一张图片
		// 1.1获取轮播图结构
		var  banner = document.querySelector(".jd_banner");
		//1.2获取图片容器
		var imgBox = banner.querySelector("ul:first-of-type");
		// 1.3获取原始的第一张图片
		// 1.4获取原始的最后一张图片
		var first = imgBox.querySelector("li:first-of-type");
		var last = imgBox.querySelector("li:last-of-type");
		// 1.5首位插入两张图片 cloneNode 复制一个dom元素
		imgBox.appendChild(first.cloneNode(true));
		// insertBefore(需要插入的dom元素,位置)
		imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
	// 2.设置对应的样式
		// 2.1获取所有li元素
		var lis = imgBox.querySelectorAll("li");
		// 2.2获取li元素的数量
		var count = lis.length;
		// 2.3获取banner的宽度
		var bannerWidth = banner.offsetWidth;
		// 2.4设置图片盒子的宽度
		imgBox.style.width=count*bannerWidth +"px";
		//2.5设置li元素的宽度
		 for(var i=0;i<lis.length;i++){
		 	lis[i].style.width=bannerWidth+"px";
		 }
	//定义图片索引 因为图片已经有了一个图片的偏移
	var index = 1;


	//3.设置默认偏移
		 imgBox.style.left = -bannerWidth +"px";
	//4.当屏幕变化时,重新计算宽度
		 window.onresize = function() {
					// 4.1重新获取banner的宽度，覆盖全局变量
				bannerWidth = banner.offsetWidth;
				// 4.2设置图片盒子的宽度
				imgBox.style.width=count*bannerWidth +"px";
				//4.3设置li元素的宽度
				for(var i=0;i<lis.length;i++){
					lis[i].style.width=bannerWidth+"px";
				}

				//4.4重新设置定位
				imgBox.style.left = -index*bannerWidth +"px";

		 }
	//实现点标记
	var setindicator=function(index){
		var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
	  // 先清除其他li元素的active样式
	  for(var i=0;i<indicators.length;i++){
	  	indicators[i].classList.remove("active");

	  }
	  // 为当前li元素添加样式
	  indicators[index-1].classList.add("active");

	}
	 

	 //5.实现自动轮播
	 var timeId;
	 var startTime =function(){

	 	timeId= setInterval(function(){
	 		//5.1变换索引
	 			index++;
	 			// 5.2添加过渡效果
	 			imgBox.style.transition = "left 0.5s ease-in-out"
			//5.3设置偏移
			imgBox.style.left = (-index*bannerWidth) +"px";
			// 为避免判断和偏移同时执行，从而导致最后一张无法显示的情况，给判断加一个延时操作
			setTimeout(function(){
				//5.4判断是否到最后一张,如果是则
				if(index == count-1){
				 index=1;
				 // 如果一个元素的某个属性之前添加过过渡效果,那么过渡属性会一直存在,如果不想要,则需要清除过渡效果
				 // 清除过渡效果
				 imgBox.style.transition = "none";
				 // 偏移到指定位置
				 imgBox.style.left = (-index*bannerWidth) +"px";
				}
				},500);		
	 		},1000)

	 }
	startTime();

	//6.实现手动轮播
	var startX,moveX,distanceX;
	// 标记当前过渡效果是否已经执行完毕,避免滑动速度过快,位移来不急得情况
	var isEnd = true;
	// 1.为图片添加触摸事件--触摸开始
	imgBox.addEventListener("touchstart",function(e){
		// 清除时钟
		clearInterval(timeId);
		// 获取当前手指的起始位置
		// console.log(123);
		startX = e.targetTouches[0].clientX;


	})
	// 2.为图片添加触摸事件--滑动过程
	imgBox.addEventListener("touchmove",function(e){
		if (isEnd == true) {
			// 记录手指在滑动过程中的位置
			moveX = e.targetTouches[0].clientX;
			// 计算坐标差异
			distanceX = moveX-startX; 
			// 为保证效果正常，将之前可能添加的过渡效果清除
			 imgBox.style.transition = "none";
			// 实现元素偏移 left 值参照原始坐标
			imgBox.style.left = (-index*bannerWidth +distanceX) +"px";

		}

		
		
	})
	// 3.为图片添加触摸事件--触摸结束
	imgBox.addEventListener("touchend",function(e){
		// 松开手指标记当前过渡效果正在执行
		isEnd = false;
		// 获取当前滑动的距离判断是否超出指定范围 100px；
		if (Math.abs(distanceX) > 100) { //上一张
			if (distanceX > 0) {
				index--;
			}else{
				index++;
			}
			// 翻页
			imgBox.style.transition="left 0.5s ease-in-out";
			imgBox.style.left = -index*bannerWidth+"px"; 

		}else if (Math.abs(distanceX) > 0 ) {
			// 回弹
			imgBox.style.transition = "left 0.5s ease-in-out";
			imgBox.style.left = -index*bannerWidth +"px";
		}
		// 将上一次move产生得数据重置为0;
		startX = 0;
		moveX =0;
		distanceX = 0;	
		
		
	})
	imgBox.addEventListener("webkitTransitionEnd",function(){
		// 如果到了最后一张（count-1）则回到索引1，到第一张则回到索引count-2
		if(index == count -1) {
			index = 1;
			// console.log(index);
			imgBox.style.transition = "none";
			imgBox.style.left = -index*bannerWidth+"px";
			 // setindicator(1);
			// console.log(index);

		}else if(index == 0){
			index = count-2;
			imgBox.style.transition = "none";
			imgBox.style.left = -index*bannerWidth+"px";

		}
		// 设置标记 
		console.log(index);
		 setindicator(index);
		setTimeout(function(){
			isEnd = true;
			// 清除之前添加得定时器
			clearInterval(timeId); 
		// 重新开启定时器
			startTime();
		},500)
		
	
	}); 


}
 
