$(window).load(function  () {
    imageloader(); 
}); 

function imageloader(){
    var navList = $(".round-button .round-button-circle");
        if(document.getElementById('head-number') != null) {
        var pageNr = parseInt(document.getElementById('head-number').textContent.replace(/(\r\n|\n|\r)/gm,""));
        var backgroundColor;

        switch(pageNr) {
            case 1:
                $(navList[pageNr-1]).addClass("currentPageOrange1");
                backgroundColor = '#FF9900';
                break;
            case 2:
                $(navList[pageNr-1]).addClass("currentPagePink");
                backgroundColor = '#EC6568';
                break;
            case 3:
                $(navList[pageNr-1]).addClass("currentPageOrange2");
                backgroundColor = '#ED712C';
                break;    
            case 4:
                $(navList[pageNr-1]).addClass("currentPageYellow");
                backgroundColor = '#FFCC00';
                break;    
            case 5:
                $(navList[pageNr-1]).addClass("currentPageOrange1");
                backgroundColor = '#FF9900';
                break;
        } 
        $('#addFileWrapper').css('background-color', backgroundColor);
    }

    initializeColorSetting();
    
    initializeVideo();
    
    var images = $('#images li form div img');
    for (var i = 0; i < images.length; i++) {
        var size = calcSize(images[i].parentNode,images[i]);
        images[i].style.width = size.width + "px";
        images[i].style.height = size.height + "px";
        images[i].style.marginTop = size.paddingTop + "px";
        images[i].style.marginLeft = size.paddingLeft + "px";
    }    
}

var textCol = "green";
function initializeColorSetting(){
    $('.text-color').colpick({
        colorScheme:'dark',
        layout:'rgbhex',
        color:localStorage.getItem('text-col'),
        onSubmit:function(hsb,hex,rgb,el) {
            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
            localStorage.setItem("text-col", $('.text-color').css('background-color'));
        },
    })
    .css('background-color', localStorage.getItem('text-col'));
    
    $('.background-color').colpick({
        colorScheme:'dark',
        layout:'rgbhex',
        color:localStorage.getItem('background-col'),
        onSubmit:function(hsb,hex,rgb,el) {
            $(el).css('background-color', '#'+hex);
            $(el).colpickHide();
            localStorage.setItem("background-col", $('.background-color').css('background-color'));
        },
    })
    .css('background-color', localStorage.getItem('background-col')); 
}

function initializeVideo () {
    
        if (document.getElementById("font") != undefined) {
            var fontChoice = document.getElementById("font");
            var font = fontChoice.options[fontChoice.selectedIndex].value;
            localStorage.setItem("font", font);
        }

    
        // create video object
        var video = {
            images: [],
            intro: null,
            outro: null,
            fontFamily: localStorage.getItem('font'),//fontChoice.options[fontChoice.selectedIndex].value,
            textColor: localStorage.getItem('text-col'),//$('.text-color').css('background-color'),
            backgroundColor: localStorage.getItem('background-col')//$('.background-color').css('background-color')
        };
        
        var slideshow = document.getElementById('slideshow');
    
        var list = $('#slideshow li .slideshow-parent');
        var images = $('#slideshow li div img');
        var texts = $('#slideshow li div .description');

        // create intro screen
        video.intro = {
            transition: function(first, timeline, transitionLength){
                lineStartAnimation(first, timeline, transitionLength);
                //fadeStartAnimation(first, timeline, transitionLength)
            },
            transitionSetup: function(first){
                lineStartAnimationSetup(first);
                //fadeStartAnimationSetup(first);
            },
            transitionLength: 2,
            effectLengt: 2, 
            parent: list[0],
            fontFamily: video.fontFamily,
            textColor: video.textColor,
            backgroundColor: video.backgroundColor
        }
        // hide intro screen
        $(list[0]).css("opacity", "0");

        // go through all images
        var i;
        for(i = 0; i < images.length; i++) { 
            //$(images[i]).zIndex = i+1;

            // create imagesettings for each image
            video.images[i] = {
                transition: function(current, next, timeline, transitionLength){
                    splitTransition(current, next, timeline, transitionLength);
                    //simpleTransition(current, next, timeline, transitionLength);
                    //fadePanoramaTransition(current, next, timeline, transitionLength);
                },
                transitionSetup: function(previous, current, next){
                    //panoramaSetup(parent)
                    //shrinkTransSetup(previous, current, next);
                    splitTransSetup(previous, current, next);
                },
                effect: function(current, timeline, effectLength){
                    plainEffect(current, timeline, effectLength);
                    //plainEffect(current, timeline, effectLength);
                    //panoramaEffect(current, timeline, effectLength);                 
                },
                effectSetup: function(current){
                    plainEffSetup(current);
                    //panoramaEffSetup(current);

                },
                transitionLength: 1, //(Math.floor((Math.random() * 4) + 2) * 1000)
                effectLength: 1,
                image: images[i],
                parent: list[i+1],
                description: texts[i],
                fontFamily: video.fontFamily,
                textColor: video.textColor,
                backgroundColor: video.backgroundColor
            };
            
            var size = calcSize(slideshow, images[i]);
            images[i].style.width = size.width + "px";
            images[i].style.height = size.height + "px";
            images[i].style.marginTop = size.paddingTop + "px";
            images[i].style.marginLeft = size.paddingLeft + "px";

            /*images[i].style.width = size.width;
            images[i]..height = size.height;
            //$(images[i]).css( "top", size.paddingTop, "left", size.paddingLeft );
            //layers[0].style.top = size.paddingTop + "px";
            //layers[0].style.left = size.paddingLeft;
            images[i].setAttribute("style", "top:" + size.paddingTop.toString() + "px");
            images[i].setAttribute("style", "margin-top:" + size.paddingTop.toString() + "px");
            images[i].setAttribute("style", "left:" + size.paddingLeft.toString() + "px");*/

            
            $(list[i+1]).css("opacity", "0");
            
            oneLoadedFile(video.images[i], i);
        }

        // create outro screen
        video.outro = {
            transition: function(last, outro, timeline, transitionLength){
                lineEndAnimation(last, outro, timeline, transitionLength);
                //fadeEndAnimation(last, outro, timeline, transitionLength);
            },
            transitionSetup: function(last){
                lineEndAnimationSetup(last);
                //fadeEndAnimationSetup(last);
             },
            transitionLength: 1,
            effectLengt: 2,
            parent: list[i+1],
            fontFamily: video.fontFamily,
            textColor: video.textColor,
            backgroundColor: video.backgroundColor
        } 
        // hide outro screen
        $(list[i+1]).css("opacity", "0");

        doneLoadingFiles(video);

        return video;

    }

function calcSize( parent, image ) {
    var imgWidth = image.offsetWidth;
    var imgHeight = image.offsetHeight;
    var parentWidth = parent.offsetWidth;
    var parentHeight = parent.offsetHeight;

    var imageRatioW = ( imgWidth / imgHeight );
    var imageRatioH = ( imgHeight / imgWidth );

    var widthScalingFactor = ( imageRatioW * parent.offsetHeight ) / imgWidth;
    var heightScalingFactor = ( imageRatioH * parent.offsetWidth ) / imgHeight;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = imgWidth * widthScalingFactor;
        var height = imgHeight * widthScalingFactor;
    } else{
        var width = imgWidth * heightScalingFactor;
        var height = imgHeight * heightScalingFactor;
    };

    var paddingLeft = ( (parentWidth - width) / 2 );
    var paddingTop =( (parentHeight - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}

function getSize( image, width, height ) {
    var imgWidth = $(image).width();
    var imgHeight = $(image).height();
    var parentWidth = width;
    var parentHeight = height;

    var imageRatioW = ( imgWidth / imgHeight );
    var imageRatioH = ( imgHeight / imgWidth );

    var widthScalingFactor = ( imageRatioW * parentHeight ) / imgWidth;
    var heightScalingFactor = ( imageRatioH * parentWidth ) / imgHeight;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = imgWidth * widthScalingFactor;
        var height = imgHeight * widthScalingFactor;
    } else{
        var width = imgWidth * heightScalingFactor;
        var height = imgHeight * heightScalingFactor;
    };

    var paddingLeft = ( (parentWidth - width) / 2 );
    var paddingTop =( (parentHeight - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}

/*function loadImages(sources, callback) {
    var images = [];
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function loadSingleImage(source, callback) {
    var image;

    image = new Image();
    image.onload = function() {
        callback(image);
    };
    image.src = source;
}*/

