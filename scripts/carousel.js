window.addEventListener('load',function(){
	var carousels=document.getElementsByClassName('carousel');

	//make carousel Event
	for(var i=0;i<carousels.length;i++){
		addEventTocarousel(carousels[i]);
	}
});

function addEventTocarousel(carouselElement){
	var ulElem = carouselElement.querySelector('ul');
	var liElems = ulElem.querySelectorAll('li');

	//width 조절
	var liwidth = liElems[0].clientWidth;
	var adjustedwidth = liElems.length * liwidth;

	ulElem.style.width = adjustedwidth + 'px';

	//slide button event
	var slideButtons = carouselElement.querySelectorAll('.slide');
	for(var i=0; i<slideButtons.length;i++){
		slideButtons[i].addEventListener('click',createListenerslide(carouselElement))}
}

function createListenerslide(carouselElement){
	return function(event){
		var clickedButton  = event.currentTarget;

		//값 가져오기
		var liElems = carouselElement.querySelectorAll('li');
		var licount=liElems.length;
		var currentIndex=carouselElement.attributes.data.value;

		//slidebutton check
		if(clickedButton.className.includes('right')&&currentIndex < licount-1){
			currentIndex++;
			scrollDiv(carouselElement,currentIndex);
		}
		else if(clickedButton.className.includes('left')&&currentIndex >0){
			currentIndex--;
			scrollDiv(carouselElement,currentIndex);
		}

		//indicator update
		updateIndicator(carouselElement, currentIndex);
		//decide slide button hide
		updateSlideButtonVisible(carouselElement, currentIndex, licount)
		//index value update
		carouselElement.attributes.data.value = currentIndex;
	}
}
function scrollDiv(carouselElement,nextIndex){
	var scrollable = carouselElement.querySelector('div');
	var liwidth = scrollable.clientWidth;
	var newleft = liwidth * nextIndex;

	scrollable.scrollTo({left: newleft, behavior: 'smooth'});
}

function updateIndicator(carouselElement, currentIndex){
	var indicators = carouselElement.querySelectorAll('footer > div');
	for(var i=0;i<indicators.length;i++){
		if(currentIndex == i){
			indicators[i].className='active';
		}
		else{
			indicators[i].className='';
		}
	}
}

function updateSlideButtonVisible(carouselElement, currentIndex, licount){
	var left=carouselElement.querySelector('.slide-left');
	var right=carouselElement.querySelector('.slide-right');

	if(currentIndex>0){
		left.style.display = 'block'  //보이도록
	}
	else{
		left.style.display = 'none' //숨김
	}

	if(currentIndex<licount -1){
		right.style.display = 'block';
	}
	else{
		right.style.display = 'none';
	}
}