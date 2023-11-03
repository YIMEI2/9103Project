// Initialize global variables
 var ranges;
 let seed = Math.random() * 200;
 var mySize;
 let str_wei = 0;
 let x_space;
 let color1, color2;
 let colorselet = [];
 let plus, margin;
 let filter1;
 
 let xCoor = 0;

 function setup() 
{
 	randomSeed(seed);
 	mySize = 900;
 	createCanvas(600,800);
	colorselet[0] = "#1a1a1a";
 	colorselet[1] = "#abadc5";
 	colorselet[2] = "#abbcc3";
	colorselet[3] = "#bfd1b2";
	colorselet[4] = "#7f9faf";

 	background("#003153");
 	margin = mySize / 50;
 	ranges = int(random(10, 20));
 	color1 = random(colorselet);
 	color2 = random(colorselet);
 	plus = 0;
 	filter1 = new makeFilter(); // Create a filter object
 }

 function draw() {
 	randomSeed(seed); // Set the random seed
 	noiseSeed(seed); // Set the noise seed

 	noFill();
	push();
	// Loop to draw shapes
 	for (let i = 0; i < ranges; i++) 
	{
 		strokeWeight(str_wei);
 		stroke(random(colorselet));
		// Update the horizontal coordinate   'untitled_230710'(SamuelYAN,2023)  https://openprocessing.org/sketch/1969233
 		if (ranges % 3 == 0) {
 			drawingContext.shadowColor = str(random(colorselet)) + "15";
 			drawingContext.shadowOffsetX = str_wei;
 			drawingContext.shadowOffsetY = str_wei;
 			drawingContext.shadowBlur = 0;
 		} else {
 			drawingContext.shadowColor = str(random(colorselet)) + "15";
 			drawingContext.shadowOffsetX = str_wei;
 			drawingContext.shadowOffsetY = str_wei;
 			drawingContext.shadowBlur = 0;
 		}
		// Update the horizontal coordinate
		xCoor = xCoor + 0.05*width;
		if(xCoor>width)
		{
			xCoor=0;
		}
 		let x = xCoor;
		// Set line dashes and draw rectangles
 		drawingContext.setLineDash([2, int(random(12, 5))+plus, 3, 2, int(random(1, 4))-plus, 2, int(random(11, 4))+plus, 2]);
 		rect(x - random(4, 10) * sin(random(1, 0.5) * plus), height * random(0.15, 0.85) + mySize / 2 * sin(0.7 * sin(0.5 * plus - 0.5) - 0.5),  random(mySize / 20, mySize / 2), plus);
 		rect(x - random(10, 4) * cos(random(0.5, 1) * plus), height * random(0.85, 0.15) - mySize / 2 * sin(0.75 * sin(0.7 * plus - 0.5) - 0.25),  random(mySize / 2, mySize / 20), plus);
 	}
	pop();

	// Adjust stroke weight
 	if (str_wei < 0.5) {
 		str_wei += 0.1;
 	}
    // Update the 'plus' variable
 	if (plus * random(35, 50) < 1 * mySize / 8) 
	{
 		plus += 0.01;
 	} 
	else 
	{ 
		// Remove shadows and create a final frame
 		drawingContext.shadowColor = random(colorselet);
 		drawingContext.shadowOffsetX = 0;
 		drawingContext.shadowOffsetY = 0;
 		drawingContext.shadowBlur = 0;

        // Display the final frame
 		noLoop();
 		noLoop();
 		blendMode(BLEND);
 		image(overAllTexture, 0, 0);
 		blendMode(ADD);
 		strokeWeight(random(0.10, 0.5) / 2);
 		stroke(str(random(colorselet)) + "05");
 		noFill();
 		drawingContext.setLineDash([2, 1, 2, 3]);
 		drawOverPattern();
 		drawingContext.setLineDash([1, 1, 1, 1]);
 		blendMode(BLEND);
 	}
 }


// Filter constructor   Code Inspiration Source.：https://p5js.org/reference/#/p5/filter
function makeFilter() {
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(0, 0, 5, 95);
	overAllTexture = createGraphics(width, height);
	overAllTexture.loadPixels();
	for (var i = 0; i < width; i++) { 
		for (var j = 0; j < height; j++) {
			overAllTexture.set(i, j,
						color(0, 0, random(95, 85), noise(i / 3, j / 3, (i * j) / 150) * random(5, 15) / 2));
		}
	}
	overAllTexture.updatePixels();
}

// Function to draw an over pattern
function drawOverPattern() {
	push();
	translate(width / 2, height / 2);
	let s = max(width, height) / 1 * sqrt(3) - 2;
	let n = 6;

	//Loop to divide and draw triangles
	for (let theta = TWO_PI / 6; theta < TWO_PI; theta += TWO_PI / 6) { 
		divideOP(0, 0, s * cos(theta), s * sin(theta), s * cos(theta + TWO_PI / 6), s * sin(theta + TWO_PI / 6), n);
	}
	pop();
}

//Function to calculate a proportional point
function prop(x1, y1, x2, y2, k) {
	let x3 = (1 - k) * x1 + k * x2;
	let y3 = (1 - k) * y1 + k * y2;
	return [x3, y3];
}

//reference: 'Rainy day-3' (SamuelYAN,2023)  https://openprocessing.org/sketch/2019293 
//Function to divide and draw triangles
function divideOP(x1, y1, x2, y2, x3, y3, n) {
	if (n > 1) {
		let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
		let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
		let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
		let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
		let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
		let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
		let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
		divideOP(x1, y1, xA, yA, xF, yF, n - 1);
		divideOP(xA, yA, xB, yB, xG, yG, n - 1);
		divideOP(xB, yB, x2, y2, xC, yC, n - 1);
		divideOP(xG, yG, xF, yF, xA, yA, n - 1);
		divideOP(xC, yC, xG, yG, xB, yB, n - 1);
		divideOP(xF, yF, xG, yG, xE, yE, n - 1);
		divideOP(xG, yG, xC, yC, xD, yD, n - 1);
		divideOP(xD, yD, xE, yE, xG, yG, n - 1);
		divideOP(xE, yE, xD, yD, x3, y3, n - 1);
	} else {
		makeTriangle([x1, y1], [x2, y2], [x3, y3]);
	}
}
// Function to draw a triangle
function makeTriangle(v1, v2, v3) {
	let points = shuffle([v1, v2, v3]);
	let [x1, y1] = points[0];
	let [x2, y2] = points[1];
	let [x3, y3] = points[2];
	let iStep = 1 / (pow(2, floor(random(4, 2))));
	for (let i = 0; i < 1; i += iStep) { 
		let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
		let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
		triangle(x1, y1, x4, y4, x5, y5);
	}
}
