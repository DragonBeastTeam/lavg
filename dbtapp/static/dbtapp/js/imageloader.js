


$(document).ready(function(){ 
    var imageSet = [];
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);
    var sources = [];

    function handleFiles(e) {
        
        if (sources.length != 0) {
            offset = sources.length;
        } else {
            offset = 0;
        }

        for (var i = 0; i < e.target.files.length; i++) {
            
            sources[offset + i] = URL.createObjectURL(e.target.files[i]);

            var layerContent = {
                layerOne: document.createElement('canvas'),
                layerTwo: document.createElement('canvas')
            };
            
            layerContent.layerOne.className = "layerOne";
            layerContent.layerTwo.className = "layerTwo";


            var settings = {
                transition: function(current, next){
                    simpleTransition(current, next);
                },
                duration: 2000
            };
            layerContent.settings = settings;


            imageSet[offset + i] = layerContent;

            

            var element = document.createElement("li");

            element.appendChild(layerContent.layerOne);
            element.appendChild(layerContent.layerTwo);
            slideshow.appendChild(element);
        }

        loadImages(sources, function(images) {
            for (var i = 0; i < images.length; i++) {
                
                imageSet[i].image = images[i];

                var layerOne = imageSet[i].layerOne;
                var image = imageSet[i].image;

                var size = calcSize(layerOne, image);
                var width = size.width;
                var height = size.height;
                var paddingLeft = size.paddingLeft;
                var paddingTop = size.paddingTop;

                var context = layerOne.getContext('2d');
                context.drawImage(image, paddingLeft, paddingTop, width, height); //, paddingLeft, paddingTop, width, height  
                $(imageSet[i].layerOne).hide();
                
                oneLoadedFile(imageSet[i], i);
            };
        });       
    }
    doneLoadingFiles(imageSet);
}) 

function calcSize( canvas, image ) {
    var imageRatioW = ( image.width / image.height );
    var imageRatioH = ( image.height / image.width );

    var widthScalingFactor = ( imageRatioW * canvas.scrollHeight ) / image.width;
    var heightScalingFactor = ( imageRatioH * canvas.scrollWidth ) / image.height;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.width * widthScalingFactor;
        var height = image.height * widthScalingFactor;
    } else{
        var width = image.width * heightScalingFactor;
        var height = image.height * heightScalingFactor;
    };

    var paddingLeft = ( (canvas.scrollWidth - width) / 2 );
    var paddingTop =( (canvas.scrollHeight - height) / 2 );

    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}

function loadImages(sources, callback) {
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


