function getStyle(obj,name){
	return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj,false)[name];
}
function move(obj,json,options){	
	options = options || {};
	options.easing = options.easing || "ease-out";
	options.duration = options.duration || 700;	
	var start = {};
	var dis = {};	
	for(var name in json){	
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}	
	var count = Math.round(options.duration/30);	
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;		
		for(var name in json){
			switch(options.easing){
				case "linear":
					 var a = n/count;
					 var cur = start[name] + dis[name]*a;
					 break;
				case "ease-in":
					 var a = n/count;
					 var cur = start[name] + dis[name]*a*a*a;
					 break;
				case "ease-out":
					 var a = 1 - n/count;
					 var cur = start[name] + dis[name]*(1- a*a*a);
					 break;
			}			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}			
		}		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}	
	},30);	
}
