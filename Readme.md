# Image-Loader

Micro javascript library that implement a load manager for images. It check if the image is in cache and provide a callback system.

## How to use it

	var loader = new IL("./rino.jpg",function(img){
		console.log(img);
	});

## If you have to use it mutiple time

	var loader = new IL();
	loader.load("./image1.jpg",function(img){
		console.log(img);
	});
	loader.load("./image2.jpg",function(img){
		console.log(img);
	});

## Pipeline of callbacks

If you call multiple time the function `load` for the same image, the different callbacks are queued in a pipe.

	var loader = new IL();
	loader.load("./rino.jpg",function(img){
		console.log("First Callback");
	});
	loader.load("./rino.jpg",function(img){
		console.log("Second Callback");
	});

The result after one load of the image (only one TCP/IP transmission) is:

	--> First Callback
	--> Second Callback