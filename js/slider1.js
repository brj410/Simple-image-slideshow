// JavaScript Document



;(function(){
	'use strict';
	
	var Slider=function(){
			
			 var marginleft = 0;
			var slideWidth = 960;
			//var duration = 1000;
						
			var btnLeft=document.getElementById('btnleft');
			var btnRight = document.getElementById('btnright');
			
			var animator = new Animator();
			
			var wrap = document.getElementsByClassName('wrapper')[0];
			//this.img = document.getElementsByClassName('slider-wrapper')[0]
			var totalSlides = wrap.children[0].childElementCount;
			var slides =wrap.children[0].children;
			var img = wrap.children[0];
			//var currentPosition = 0;
			var totalWidth=this.totalSlides * this.slideWidth ;			
			var that=this;
			
			var btnLeft=document.getElementById('btnleft');
			wrap.appendChild(btnLeft);
			var btnRight=document.getElementById('btnright');
			wrap.appendChild(btnRight);
			
			this.moverightleft = function(){
				that.marginleft-=that.slideWidth;
				that.img.style.marginLeft=that.marginleft+'px';
				if(that.marginleft===-that.slideWidth*that.totalSlides){
					that.marginleft=that.slideWidth;}
				};
			 
			btnRight.onclick = function(){
				img.style.marginLeft=that.marginleft+'px';
				//console.log('1');
		 		if(that.marginleft<=0 && that.marginleft >-that.totalWidth)
					{
						that.marginleft-=that.slideWidth;
						}
				else
					{
						that.marginleft=0;
						}
					img.style.marginLeft = that.marginleft+'px';
					//var ml = that.marginleft * that.slideWidth * -1;
//					animator.animate(img, {marginLeft: ml},duration);
				};
				
			btnLeft.onclick = function(){
					img.style.marginLeft=that.marginleft+'px';
					//console.log('1');
		 		if(that.marginleft<0 && that.marginleft>=-that.totalWidth)
					{
						that.marginleft-=-that.slideWidth;
						}
				else
					{
						that.marginleft = -that.totalWidth;
						}
					img.style.marginLeft = that.marginleft + 'px';
					//var ml = that.marginleft * that.slideWidth * -1;
//					animator.animate(img, {marginLeft: ml}, duration);
					
				};
					
	};
	
	function Animator() {
		var fps = 50;
		
		
		var animate = function(img, props, duration) {
			var intervalDuration = duration/fps;
			var initialPosition = img.style.marginLeft=='' ? 0 : parseInt(img.style.marginLeft);
			
			var endPosition = props.marginLeft;
			var difference = endPosition - initialPosition;
			var counter = 0;
			
			var interval = setInterval(function() {
				
				counter++;
				var step = difference / intervalDuration;
				
				var current = initialPosition + (step * counter);
				
				if (Math.abs(current) >= Math.abs(endPosition)) {
					current = endPosition;
					clearInterval(interval);
				}
				
				img.style.marginLeft = current + 'px';
			}, intervalDuration);
		};
	};

	
	var s = new Slider();
	//setInterval(s.moverightleft,1000);
	
})();
