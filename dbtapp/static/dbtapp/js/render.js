function initPreview (imageSet) {	
	runSlideShow(imageSet);
}
var timeline = new TimelineMax();

function runSlideShow(video) {
	
	
	
	initControls(timeline);
	
	//Set up additional animationelements
	for (var i = 0; i < video.images.length; i++) {
		video.images[i].parent.style.opacity = 0;
		video.intro.parent.style.opacity = 0;
		video.outro.parent.style.opacity = 0;

		video.images[i].transitionSetup(video.images[i-1], video.images[i], video.images[i+1]);	
		video.images[i].effectSetup(video.images[i]/*.parent*/);
	
	} 

	// Animera fram f�rsta sidan
	video.intro.transition(video.intro, timeline, video.intro.transitionLength);
	//v�nta ett tag
	timeline.add(TweenLite.to(video.intro.parent, video.intro.effectLength, {})); 
	var current;
	var next;
	// loopa igenom alla bilder
	for (var i = 0; i < video.images.length; i++) {
		
		// animera fram n�sta bild
		if(i == 0) { // om f�rsta bild
			intro = video.intro;
			first = video.images[0];
			
			first.transition(intro, first, timeline, first.transitionLength);
			first.effect(first, timeline, first.effectLength); 
		} 
		if (i < video.images.length-1) { // alla bilder
			current = video.images[i];
			next = video.images[i+1];

			current.transition(current, next, timeline, next.transitionLength);
			next.effect(next, timeline, next.effectLength);      
		} else { // sista bilden
			last = video.images[i];
			outro = video.outro;

			outro.transition(last, outro, timeline, video.outro.transitionLength);
			timeline.add(TweenLite.to(video.outro.parent, video.outro.effectLength, {})); 
		}
	} 
}