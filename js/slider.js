// JavaScript Document
;
(function() {
    'use strict';

    function Slider(options) {
        var className = 'slider';
        var duration = 1000;
        var isMouseOver = false;
        var indexArr = [];
        var slideShow;
        var slideWidth = 960;
        var currentPosition = 0;

        if (options && options.className) {
            className = options.className;
        }

        var animator = new Animator();

        var wrap = document.getElementsByClassName(className)[0];
        //this.img = document.getElementsByClassName('slider-wrapper')[0]
        var totalSlides = wrap.children[0].childElementCount;
        var slides = wrap.children[0].children;
        var img = wrap.children[0];
        var indexWrap = wrap.children[3];

        var btnLeft = wrap.children[1]
        var btnRight = wrap.children[2]
        wrap.appendChild(btnLeft);
        wrap.appendChild(btnRight);

        //var that=this;


        btnRight.onclick = function() {
            currentPosition++;
            if (currentPosition >= totalSlides) {
                currentPosition = 0;
            }
            var ml = currentPosition * slideWidth * -1;

            console.log(currentPosition, ml);
            animator.animate(img, {
                marginLeft: ml
            }, duration);
            updateIndex();

        };
        btnLeft.onclick = function() {
            currentPosition--;
            if (currentPosition < 0) {
                currentPosition = totalSlides - 1;
            }
            var ml = currentPosition * slideWidth * -1;

            console.log(currentPosition, ml);
            animator.animate(img, {
                marginLeft: ml
            }, duration);
            updateIndex();

        };

        var autoAnimate = function() {
            currentPosition++;
            if (currentPosition >= totalSlides) {
                currentPosition = 0;
            }
            var ml = currentPosition * slideWidth * -1;

            console.log(currentPosition, ml);
            animator.animate(img, {
                marginLeft: ml
            }, duration);
            updateIndex();
        };
        slideShow = setInterval(autoAnimate, 3000);

        // ;( function(){
        //					wrap.onmouseover = function(){
        //						clearInterval(slideShow);
        //						};
        //					wrap.onmouseout = function(){
        //						slideShow = setInterval(autoAnimate,3000);
        //						};
        //				
        //				})(); 

        var index = function() {
            for (var i = 1; i <= totalSlides; i++) {
                var indexIcon = document.createElement('div');
                indexIcon.className = 'index' + i;
                indexIcon.id = 'index';
                indexIcon.name = 'index';
                indexIcon.style.width = '20px';
                indexIcon.style.height = '20px';
                indexIcon.style.float = 'left';

                if (i <= totalSlides - 1) {
                    indexIcon.style.marginRight = '5px';
                }
                indexIcon.style.background = 'url(images/circle-default.png)';

                indexIcon.onclick = (function() {
                    var currI = i;
                    return function() {
                        if (currentPosition >= totalSlides) {
                            currentPosition = 0;
                        }
                        currentPosition = currI - 1;
                        var ml = currentPosition * slideWidth * -1;
                        animator.animate(img, {
                            marginLeft: ml
                        }, duration);
                        updateIndex();
                    };
                })();

                indexIcon.onmouseenter = (function() {
                    var currI = i;
                    return function() {
                        if (currI - 1 != currentPosition) {
                            indexArr[currI - 1].style.background = 'url(images/circle-select.png)';
                            indexArr[currI - 1].style.opacity = 0.7;
                        }
                    };
                })();

                indexIcon.onmouseleave = (function() {
                    var currI = i;
                    return function() {
                        if (currI - 1 != currentPosition) {
                            indexArr[currI - 1].style.background = 'url(images/circle-default.png)';
                            indexArr[currI - 1].style.opacity = 0.5;
                        }
                    };
                })();
                indexArr.push(indexIcon);
                indexWrap.appendChild(indexIcon);
            }
            var indexWidth = indexWrap.offsetWidth;
            indexWrap.style.marginLeft = (960 - indexWidth - 5) / 2 + 'px';

        };

        var updateIndex = function() {
            for (var j = 0; j <= indexArr.length - 1; j++) {
                if (j != currentPosition) {
                    indexArr[j].style.background = 'url(images/circle-default.png)';
                    indexArr[j].style.opacity = '0.5';
                } else {
                    indexArr[j].style.background = 'url(images/circle-select.png)';
                    indexArr[j].style.opacity = '1';
                }
            }
        };

        wrap.onmouseenter = function() {
            btnRight.style.visibility = 'visible';
            btnLeft.style.visibility = 'visible';
            isMouseOver = true;
            clearInterval(slideShow);
        }

        wrap.onmouseleave = function() {
            btnRight.style.visibility = 'hidden';
            btnLeft.style.visibility = 'hidden';
            slideShow = setInterval(autoAnimate, 3000);
        }
        index();
        updateIndex();
        setTimeout(slideShow, 3000);
    };

    function Animator() {
        var fps = 50;
        this.animate = function(element, props, duration) {
            var intervalDuration = duration / fps;
            var initialPosition = element.style.marginLeft == '' ? 0 : parseInt(element.style.marginLeft);
            var endPosition = props.marginLeft;
            var difference = endPosition - initialPosition;
            var counter = 0;

            var interval = setInterval(function() {
                counter++;
                var step = difference / intervalDuration;
                var noOfIteration = duration / fps;
                var current = initialPosition + (step * counter);
                if (counter >= noOfIteration) {
                    clearInterval(interval);
                    current = endPosition;
                }
                element.style.marginLeft = current + 'px';
            }, intervalDuration);
        };
    };

    window.Slider = Slider;
    // window.Slider = Slider1;

})();