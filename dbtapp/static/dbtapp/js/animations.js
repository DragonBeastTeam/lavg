function simpleTransition(current, next, timeline) {
/*	$(current.layers).fadeOut();
	$(next.layers).fadeIn();*/
	
	timeline.add(TweenLite.delayedCall(0, function(){
		$(next).show();
		next.layers[0].setAttribute("style", "margin-left:" + 800 + "px");
	}),null);
	timeline.add(TweenLite.to($(next.layers[0]), 2, {marginLeft:"0px"}));
	timeline.add(TweenLite.to($(current.layers[0]), 0, {display:"none"}));
/*	timeline.add(TweenLite.delayedCall(0, function(){
		$(current).hide();
  	}),null);*/
}

function startAnimation(layerContent) {
	$(layerContent.layers).fadeIn();
}

function endAnimation(layerContent) {
	$("#logo-image").fadeOut();
	$(layerContent.layers).fadeOut();
}



function transSlide(timeline, current, next) {
	
	
	
}

function ani1(imageSet) {

	var tl = new TimelineLite();
		
		//Set up first, final
		firstSlideAni1(imageSet, "GREAT PRODUCT");
		imageSet.unshift("First slide");
		imageSet.push("Final slide");

		for(i = 0; i<imageSet.length; i++){
			//On first
			if (i == 0){
				tl.add(TweenLite.to($("#lay3"), 2, {width:"800px", height:"480px"}));
				tl.add(TweenMax.to(TweenMax.to($("#line"), 1.5, {delay:1, width: "0px", left: "+=400px", backgroundPosition:"0px"})));
				tl.add(TweenLite.delayedCall(-0.2, fadeElement, [$("#videoName"), "out"]));
			}
			//On final
			else if (i == imageSet.length-1){
				tl.add(TweenLite.delayedCall(1, finalSlideAni1, ['CREATOR', 'CONTACT.COM']));
				tl.add(TweenLite.to($("#lay3"), 1, {delay:1, width:"800px", height:"480px"}));
				tl.add(TweenLite.to($("#line"), 1, {delay:-0.3, width:"400px", height:"2px"}));
				tl.add(TweenLite.delayedCall(-0.2, fadeElement, [$("#videoName"), "in"]));
				tl.add(TweenLite.delayedCall(1, setVisible));

			}
			//Rest
			else{
				if (i%2 == 0) {
					tl.add(TweenLite.delayedCall(1, setImage, [imageSet[i].image.src]));
					tl.add(TweenLite.to($("#lay1"), 1.5, {width:"800px", height:"480px"}));
				}
				else{
					tl.add(TweenLite.delayedCall(1, setImage2, [imageSet[i].image.src ]));
					tl.add(TweenLite.to($("#lay2"), 1.5, {width:"800px", height:"480px"}));
				}		
			}
		}

		restoreAni1(imageSet);
}

//Helpers
function setImage(imageSrc) {
	$("#lay1").css( "width", "0px"  );
	$("#lay2").css( "z-index", "1"  );
	$("#lay1").css( "z-index", "2"  );
	$("#lay3").css( "z-index", "0"  );
	
	$("#lay1").css( "background-image", "url('" + imageSrc + "')"  );
}
function setImage2(imageSrc) {
	$("#lay2").css( "width", "0px"  );
	$("#lay1").css( "z-index", "1"  );
	$("#lay2").css( "z-index", "2"  );
	$("#lay3").css( "z-index", "0"  );
	
	$("#lay2").css( "background-image", "url('" + imageSrc + "')"  );
}
function fadeElement(element, inOrOut){
	
	if (inOrOut.localeCompare("out") == 0) {		
		$(element).fadeOut(500);
	}
	if (inOrOut.localeCompare("in") == 0) {
		$(element).fadeIn(500);
	}

}
function setVisible() {
	$("#contact").css( "visibility", "visible" );
	$("#creator").css( "visibility", "visible" );
	//$(element).css( "visibility", "visible" );
}


function finalSlideAni1(creat, cont){
	$("#lay3").css( "width", "0px"  );
	$("#lay3").css( "z-index", "3"  );
	
	$("#line").css( "left", "200px"  );
	
	//Create creator
	creator = document.createElement("h6");
	creator.innerHTML = creat;
	$(creator).attr( "id", "creator"  );
	$(creator).attr( "class", "removeTemp"  );
	$(creator).css( "position", "relative"  );
	$(creator).css( 'top', '170px'  );
	$(creator).css( "font-size", "20px"  );
	$(creator).css( "visibility", "hidden" );
	$( "#lay3" ).append(creator);
	

	//Create contact
	contact = document.createElement("h6");
	contact.innerHTML = cont;
	$(contact).attr( "id", "contact"  );
	$(contact).attr( "class", "removeTemp"  );
	$(contact).css( "position", "relative"  );
	$(contact).css( 'top', '190px'  );
	$(contact).css( "font-size", "15px"  );
	$(contact).css( "visibility", "hidden" );
	$( "#lay3" ).append(contact);
	
}

function firstSlideAni1(imageSet, vidName){
	$("#videoCont").css( "background-image", "url('" + imageSet[0].image.src + "')"  );

	//Remove from previous
	$(".removeTemp").remove();

	$("#lay3").css( "width", "800px"  );
	$("#lay3").css( "z-index", "3"  );
	$("#lay3").css( "background-color", "rgba(255, 255, 255, 0.9)"  );
	$("#lay3").css( "text-align", "center"  );
	
	//Create line
	line = document.createElement("div");
	$(line).attr( "id", "line"  );
	$(line).attr( "class", "removeTemp"  );
	$(line).css( "width", "400px"  );
	$(line).css( "height", "2px"  );
	$(line).css( "position", "relative"  );
	$(line).css( 'top', '180px'  );
	$(line).css( "left", "200px"  );
	//$(line).css( "z-index", "3"  );
	$(line).css( "background-color", "rgba(86, 86, 86, 1)"  );
	$( "#lay3" ).append(line);
	
	//Create videoName name
	videoName = document.createElement("h4");
	videoName.innerHTML = vidName;
	$(videoName).attr( "id", "videoName"  );
	$(videoName).attr( "class", "removeTemp"  );
	$(videoName).css( "position", "relative"  );
	$(videoName).css( 'top', '110px'  );
	$(videoName).css( "font-size", "40px"  );
	$( "#lay3" ).append(videoName);
}

function restoreAni1(imageSet){
	$("#lay1").css( "background-image", "none"  );
	$("#lay2").css( "background-image", "none"  );
	$("#lay3").css( "z-index", "0"  );
	
	imageSet.shift();
	imageSet.pop();
}


