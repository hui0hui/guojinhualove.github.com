function getByClass(sClass,oParent){if(!oParent){oParent=document}if(oParent.getElementsByClassName){return oParent.getElementsByClassName(sClass)}else{var result=[];var aEle=oParent.getElementsByTagName('*');var re=new RegExp('\\b'+sClass+'\\b');for(var i=0;i<aEle.length;i++){if(aEle[i].className.search(re)!=-1){result.push(aEle[i])}}return result}}function getPos(obj){var l=0;var t=0;while(obj){l+=obj.offsetLeft;t+=obj.offsetTop;obj=obj.offsetParent}return{left:l,top:t}}function addEvent(obj,type,fn){if(obj.addEventListener){obj.addEventListener(type,fn,false)}else{obj.attachEvent('on'+type,function(){fn.call(obj)})}}
// 滚动
(function() {
    var oNav = document.getElementById('nav1');
    var aA = oNav.children;
    for (var i = 0; i < aA.length; i++) {
        (function(index) {
            aA[i].onclick = function() {
                var sHref = this.href;
                sHref = sHref.substring(sHref.lastIndexOf('/') + 1);
                var oSub = document.getElementById(sHref);
                var iScrollTop = getPos(oSub).top;
                if (aA.length != index + 1) {
                    moveScroll(iScrollTop, 1500);
                    return false;
                }
            };
        })(i)
    }
    var isUser = false;
    addEvent(window,'scroll',function(){
        if(isUser){
            clearInterval(timer);
        }
        isUser = true;
    });
    var timer = null;
    function moveScroll(iTarget,time){
        var start = document.documentElement.scrollTop || document.body.scrollTop;
        var dis = iTarget - start;
        var count = Math.round(time/30);
        var n = 0;
        clearInterval(timer);
        timer = setInterval(function(){
            n++;
            isUser = false;
            var a = 1 - n/count;
            var cur = start + dis*(1-a*a*a);
            document.documentElement.scrollTop = cur;
            document.body.scrollTop = cur;
            if(n == count){
                clearInterval(timer);
            }
        },30);
    }
})();
// 全屏
fullPage();
window.onresize = fullPage;
function fullPage() {
    var aBlock = getByClass('sub', document.body);
    for (var i = 0; i < aBlock.length; i++) {
        aBlock[i].style.height = document.documentElement.clientHeight + 'px';
    }
}
//轮播：
(function(){
	var oUl=document.getElementById("focus_cont");
	var aLi=oUl.getElementsByTagName("li");	
	var oPrev=document.getElementById("prev");
	var oNext=document.getElementById("next");
	var iNow=0;
	var timer=null;
	function tab(){
		for(var i=0;i<aLi.length;i++){
				aLi[i].className="";
		}
		aLi[iNow].className="active";
	};
	function next(){
		iNow++;
		if(iNow==aLi.length){
			iNow=0;
		}
		tab();
	};
	timer=setInterval(next,3000);
	oNext.onclick=function(){
		iNow++;
		if(iNow==aLi.length){
			iNow=0;
		}
		tab();
	}
	oPrev.onclick=function(){
		iNow--;
		if(iNow==-1){
			iNow=aCk.length-1;
		}
		tab();
	}
	oUl.onmouseover=function(){
		clearInterval(timer);
	};
	oUl.onmouseout=function(){
		timer=setInterval(next,3000);	
	};
})();
//图片组合
(function(){var oUl=document.getElementById("tabShow");var aLi=oUl.children;var oTabBtn=document.getElementById("tabBtn5");var aBtn=oTabBtn.children;function direction(obj,oEvent){var x=oEvent.clientX-getPos(obj).left-obj.offsetWidth/2;var y=obj.offsetHeight/2+getPos(obj).top-oEvent.clientY;var a=Math.atan2(y,x);return Math.round((a*180/Math.PI+180)/90)%4}var oLi=document.getElementById("show");var aLi=oLi.children;var len=aLi.length;var zIndex=1;var aPos=[];for(var i=0;i<len;i++){aPos[i]={left:aLi[i].offsetLeft,top:aLi[i].offsetTop};aLi[i].style.left=aPos[i].left+"px";aLi[i].style.top=aPos[i].top+"px"}for(var i=0;i<len;i++){aLi[i].style.position="absolute";aLi[i].style.margin="0";drag(aLi[i]);aLi[i].index=i}function drag(obj){obj.onmousedown=function(ev){var oEvent=ev||event;var disX=oEvent.clientX-obj.offsetLeft;var disY=oEvent.clientY-obj.offsetTop;obj.style.zIndex=zIndex++;clearInterval(obj.timer);document.onmousemove=function(ev){var oEvent=ev||event;obj.style.left=oEvent.clientX-disX+"px";obj.style.top=oEvent.clientY-disY+"px";for(var i=0;i<len;i++){aLi[i].className=""}var oNear=findMin(obj);oNear&&(oNear.className="box")};document.onmouseup=function(){document.onmousemove=null;document.onmouseup=null;obj.releaseCapture&&obj.releaseCapture()};obj.setCapture&&obj.setCapture();return false}}var oBtn=document.getElementById("btn1");oBtn.onclick=function(){aPos.sort(function(){return Math.random()-0.5});for(var i=0;i<len;i++){aLi[i].index=i;move(aLi[i],aPos[i])}}})();
