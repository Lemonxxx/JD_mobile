window.onload = function(){
	// 获取左侧栏
	var ct_left = document.querySelector(".ct_left");
	// 获取左侧栏的高度
	var leftHeight = ct_left.offsetHeight;
	// 获取滑动的列表项
	var ulBox =  ct_left.querySelector("ul:first-of-type");
	var ulBoxHeight = ulBox.offsetHeight;
	// 获取所有li元素的值
	var lis = ulBox.querySelectorAll("li");
	// 设置静止状态下的最大top值
	var maxTop = 0;
	// 设置静止状态下的最小top值
	var minTop =  leftHeight - ulBoxHeight ;
	// 设置滑动状态下的最大top值
	var maxBTop = maxTop +100;
	// 设置滑动状态下的最小top值
	var minBTop = minTop - 100;
	// console.log(maxBTop+":"+minBTop);
	// s实现滑动
	var startY = 0;
	var moveY = 0;
	var distanceY = 0; 
	var currentY = 0;
	// 添加滑动事件
	 ulBox.addEventListener("touchstart",function(e){
	 	// 获取手指的起始坐标
	 	startY= e.targetTouches[0].clientY;


	 });
	 ulBox.addEventListener("touchmove",function(e){
	 		
	 	moveY= e.targetTouches[0].clientY;
	 	distanceY=moveY - startY;
	 	// 判断
	 	if((currentY + distanceY)> maxBTop ||(currentY + distanceY) < minBTop ){
	 			// console.log("111");
	 		return;
	 	}

	 	// 清除之前可能添加的过度效果
	 	ulBox.style.transition = "none";
	 	ulBox.style.top=(currentY + distanceY)+"px"; 
	 });
	 ulBox.addEventListener("touchend",function(e){
		 	if(currentY + distanceY < minTop){
		 		currentY = minTop;
		 		ulBox.style.transition = "top 0.5s";
		 		ulBox.style.top = minTop +"px";

		 	}else if(currentY + distanceY > maxTop){
		 		currentY = maxTop;
		 		ulBox.style.transition = "top 0.5s";
		 		ulBox.style.top = maxTop +"px";
		 	}else {
		 		// 记录当前滑动的距离
		 		currentY += distanceY;

		 	}
	 });
	 // 为每个li元素添加索引值
	 for(var i = 0;i<lis.length;i++){
	 	lis[i].index = i;
	 }
	 

	/* // 绑定移动端的tap事件
		 itcast.tap(ulBox,function(e){
		 	//1. 修改li元素的方式
		 	for (var i = 0;i<lis.length;i++){
		 		lis[i].classList.remove("active");
		 	}
		 	 var li = e.target.parentNode;
		 	var liHeight = li.offsetHeight;
		 	li.classList.add("active");
		 	// 获取li元素索引值
		 	var index = li.index;
		 	ulBox.style.transition="top 0.5s";
		 	if (-index * liHeight < minTop) {
		 		ulBox.style.top = minTop + "px";
		 		currentY = minTop;
		 	}else{
		 		ulBox.style.top  = -index * liHeight + "px";
		 		currentY = -index*liHeight;
		 	}
		 	
		 	// 2.移动当前li元素 但是不能超出之前设定的区间
		 })
	*/
	/*// 使用zepto实现tap
	$(ulBox).on("tap",function(e){
			//1. 修改li元素的方式
		 	for (var i = 0;i<lis.length;i++){
		 		lis[i].classList.remove("active");
		 	}
		 	var li = e.target.parentNode;
		 	var liHeight = li.offsetHeight;
		 	li.classList.add("active");
		 	// 获取li元素索引值
		 	var index = li.index;
		 	ulBox.style.transition="top 0.5s";
		 	if (-index * liHeight < minTop) {
		 		ulBox.style.top = minTop + "px";
		 		currentY = minTop;
		 	}else{
		 		ulBox.style.top  = -index * liHeight + "px";
		 		currentY = -index*liHeight;
		 	}
	});
	*/
	//使用fastclick实现 就是绑定click事件
	// 绑定fastclick
	 if ('addEventListener' in document) {
    	document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
	
	ulBox.addEventListener("click",function(e){
			//1. 修改li元素的方式
		 	for (var i = 0;i<lis.length;i++){
		 		lis[i].classList.remove("active");
		 	}
		 	var li = e.target.parentNode;
		 	var liHeight = li.offsetHeight;
		 	li.classList.add("active");
		 	// 获取li元素索引值
		 	var index = li.index;
		 	ulBox.style.transition="top 0.5s";
		 	if (-index * liHeight < minTop) {
		 		ulBox.style.top = minTop + "px";
		 		currentY = minTop;
		 	}else{
		 		ulBox.style.top  = -index * liHeight + "px";
		 		currentY = -index*liHeight;
		 	}

	})
	 

}