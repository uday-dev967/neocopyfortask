'use strict'

var gRanger = function(containerName, minElement, maxElement, step){
	/* init main view-objects */
	var sliderRanger = null;
	var slideMin = null;
	var slideMax = null;

	/* Range object */
	var range = {
		min : 0,
		max : 0,
		minLeft : 0,
		maxLeft : 0,
		width : 0,
		step : 10,
		minDragged : false,
		init : function(){
			slideMin.style.left = 0;
			slideMax.style.left = this.maxLeft + 'px';
		},
		sync : function(){
			/* set min */
			if(this.minDragged){
				minElement.value = this.min + Math.round(this.minLeft / this.width);
			}
			if(this.maxDragged){
				maxElement.value = this.min + Math.round(this.maxLeft / this.width);
			}

		},
		slideDrag : function(event){

			var left = event.clientX - sliderRanger.offsetLeft;
			/* min scroll */
			if(this.minDragged){
				if(left < 0){
					left = 0;
				}
				else if (left >= this.maxLeft - slideMin.offsetWidth){
					left = (this.maxLeft - slideMin.offsetWidth);
				}

				this.minLeft = left;
				window.rangeMinLeft = this.minLeft;
				slideMin.style.left = left + 'px';
				this.sync();
			}

			/* max scroll */
			if(this.maxDragged){
				if(left > sliderRanger.offsetWidth){
					left = sliderRanger.offsetWidth;
				}
				else if (left <= this.minLeft + slideMin.offsetWidth){
					left = (this.minLeft + slideMin.offsetWidth);
				}

				this.maxLeft = left;
				window.rangeMaxLeft = this.maxLeft;
				slideMax.style.left = left + 'px';
				this.sync();
			}
		}
	}

	/* Get range container and greate 2 slider (.min and .max) */
	sliderRanger = document.querySelector(String(containerName));
	if(sliderRanger === null) return;
	slideMin = document.createElement('div');
	slideMax = document.createElement('div');
	slideMin.className = 'slider min';
	slideMin.id = 'slider-min';
	slideMax.className = 'slider max';
	slideMax.id = 'slider-max';
	sliderRanger.appendChild(slideMin);
	sliderRanger.appendChild(slideMax);

	/* setInit value */
	minElement = document.querySelector(String(minElement));
	maxElement = document.querySelector(String(maxElement));
	if(minElement === null || typeof minElement === "undefined" || maxElement === null || typeof maxElement === "undefined") return;
	range.min = Math.floor(minElement.value);
	range.max = Math.floor(maxElement.value);
	range.maxLeft = sliderRanger.offsetWidth;
	window.rangeMaxLeft = range.maxLeft;
	range.width = sliderRanger.offsetWidth / (range.max - range.min);
	range.step = (!isNaN(parseInt(step)) && parseInt(step) > 0)?parseInt(step):range.step;
	range.init();

	/* set Min slide Listener */
	slideMin.addEventListener("mousedown", function(e){
		range.minDragged = true;
		document.getElementById('range').style.backgroundImage = 'linear-gradient(to right, #ef4b6e 0%, #ef4b6e 100%)';
		left_minrange = 0;
		left_maxrange = 100;
	});
	slideMin.addEventListener("mouseup", function(e){
		range.minDragged = false;
		document.getElementById('range').style.backgroundImage = 'linear-gradient(to right, #ef4b6e 0%, #ef4b6e 100%)';
		left_minrange = 0;
		left_maxrange = 100;
	});

	/* set Max slide Listener */
	slideMax.addEventListener("mousedown", function(e){
		range.maxDragged = true;
		document.getElementById('range').style.backgroundImage = 'linear-gradient(to right, #ef4b6e 0%, #ef4b6e 100%)';
		left_minrange = 0;
		left_maxrange = 100;
	});
	slideMax.addEventListener("mouseup", function(e){
		range.maxDragged = false;
		document.getElementById('range').style.backgroundImage = 'linear-gradient(to right, #ef4b6e 0%, #ef4b6e 100%)';
		left_minrange = 0;
		left_maxrange = 100;
	});

	/* default unset */
	document.addEventListener("mouseup", function(e){
		range.minDragged = false;
		range.maxDragged = false;
	});


	/* set default Listener */
	document.addEventListener("mousemove", function(e){
		range.slideDrag(e);
	});
}
