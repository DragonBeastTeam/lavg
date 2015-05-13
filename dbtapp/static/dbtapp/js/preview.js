
function initPreview (imageSet) {	
    $("#preview-button").delay(1000).on("click", function() {
		//imageSet = sortSlideShow(imageSet);
		$("#preview").hide();
    	runSlideShow(imageSet, 0);
    });
}



function runSlideShow(video, index) {
	
	$(".close").click(function() {
		$(video.images).hide();
	});
	var timeline = new TimelineLite();
	// Animera fram första sidan
	video.intro.transition(video.intro.wrapper, timeline, video.intro.transitionLength);
	//vänta ett tag
	timeline.add(TweenLite.to(video.intro.wrapper, video.intro.effectLength, {})); 
	var current;
	var next;
	// loopa igenom alla bilder
	for (var i = 0; i < video.images.length; i++) {
		// animera fram nästa bild
		if(i == 0) { // om första bild
			intro = video.intro;
			first = video.images[i];

			first.transition(intro, first, timeline, first.transitionLength);
			first.effect(first, timeline, first.effectLength); 
		} else if (index < video.images.length-1) { // alla bilder
			current = video.images[i];
			next = video.images[i+1];

			current.transition(current, next, timeline, next.transitionLength);
			next.effect(next, timeline, next.effectLength);      
		} else { // sista bilden
			last = video.images[i];
			outro = video.outro;

			outro.transition(last, outro, timeline, video.outro.transitionLength);
			timeline.add(TweenLite.to(video.outro.wrapper, video.outro.effectLength, {})); 
		}
	} 
}
