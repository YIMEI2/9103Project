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

function setup() {
  randomSeed(seed);
  mySize = 900;
  createCanvas(600, 800);
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
  push();
  filter1 = new makeFilter();
  for(let i=0;i<150;i++)
  {
	  generateBg();
  }
  pop();
}

function generateBg()
{
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
    //noLoop();
    //noLoop();
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

function draw() {
  strokeWeight(2);
  //Left Branch
  let apple1 = new Apple(294, 330, 27, PI / 2, { ratio: 0.45, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple1.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple2 = new Apple(266, 335, 32, 3 * PI / 2, { ratio: 0.52, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple2.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple3 = new Apple(234, 328, 36, PI / 2, { ratio: 0.40, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple3.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple4 = new Apple(189, 297, 73, PI / 30, { ratio: 0.55, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple4.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple5 = new Apple(184, 238, 46, 31 * PI / 30, { ratio: 0.55, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple5.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple6 = new Apple(190, 203, 27, PI / 30, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple6.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple7 = new Apple(180, 174, 36, PI / 2, { ratio: 0.48, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple7.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple8 = new Apple(144, 160, 42, -PI / 40, { ratio: 0.50, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple8.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple9 = new Apple(135, 112, 54, PI, { ratio: 0.60, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple9.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple10 = new Apple(148, 60, 54, 0, { ratio: 0.55, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple10.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  //Middle Branch
  let apple11 = new Apple(311, 308, 29, 0, { ratio: 0.50, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple11.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple12 = new Apple(313, 272, 45, PI, { ratio: 0.50, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple12.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple13 = new Apple(285, 246, 33, PI / 2, { ratio: 0.50, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple13.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple14 = new Apple(261, 250, 22, 3 * PI / 2, { ratio: 0.40, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple14.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple15 = new Apple(269, 226, 20, 0, { ratio: 0.52, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple15.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple16 = new Apple(343, 250, 30, 3 * PI / 2, { ratio: 0.50, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple16.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple17 = new Apple(350, 225, 23, 0, { ratio: 0.40, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple17.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  //Right Branch
  let apple18 = new Apple(329, 337, 41, 3 * PI / 2, { ratio: 0.52, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple18.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple19 = new Apple(364, 332, 27, 3 * PI / 2, { ratio: 0.60, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple19.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple20 = new Apple(411, 292, 44, 41 * PI / 40, { ratio: 0.60, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple20.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple21 = new Apple(395, 328, 40, PI / 2, { ratio: 0.40, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple21.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple22 = new Apple(416, 254, 32, PI / 40, { ratio: 0.40, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple22.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple23 = new Apple(421, 210, 61, 41 * PI / 40, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple23.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple24 = new Apple(419, 167, 27, PI / 40, { ratio: 0.4, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple24.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple25 = new Apple(442, 162, 20, 8 * PI / 5, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple25.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple26 = new Apple(473, 169, 42, 3 * PI / 5, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple26.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple27 = new Apple(508, 176, 27, 8 * PI / 5, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple27.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });

  let apple28 = new Apple(520, 151, 27, -PI / 40, { ratio: 0.5, c1: color(12, 133, 88), c2: color(175, 67, 67) });
  apple28.display({ c1: color(12, 133, 88), c2: color(175, 67, 67) });


// Middle Rectangle
// Black stroke
  strokeWeight(2);
  stroke(0, 0, 0);
  let middleRect = new Rect(95, 602, 417, 77, 19, 145, 99);
  middleRect.display();

  //Soil
  strokeWeight(2);
  stroke(0, 0, 0);
  let soil = new Rect(120, 590, 370, 77, 188, 168, 88);
  soil.display();

  let soil1 = new Rect(120, 590, 60, 77, 188, 168, 88);
  soil1.display();

  let soil2 = new Rect(180, 590, 60, 77, 175, 67, 67);
  soil2.display();

  let soil3 = new Rect(240, 590, 60, 77, 19, 145, 99);
  soil3.display();

  let soil4 = new Rect(300, 590, 60, 77, 188, 168, 88);
  soil4.display();

  let soil5 = new Rect(360, 590, 60, 77, 19, 145, 99);
  soil5.display();


  let acr1 = new Arc(150, 666, 60, 77, PI, 0, 12, 133, 88);
  acr1.display();

  let acr2 = new Arc(210, 666, 60, 50, PI, 0, 12, 133, 88);
  acr2.display();

  let acr3 = new Arc(270, 666, 60, 90, PI, 0, 175, 67, 67);
  acr3.display();

  let acr4 = new Arc(330, 666, 60, 70, PI, 0, 175, 67, 67);
  acr4.display();

  let acr5 = new Arc(390, 666, 60, 30, PI, 0, 188, 168, 88);
  acr5.display();

  let acr6 = new Arc(455, 666, 70, 50, PI, 0, 12, 133, 88);
  acr6.display();

  let Apple1 = new Apple(210, 580, 60, 29.85, {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple1.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});

  let Apple2 = new Apple(255, 585, 30, 29.85, {ratio: 0.6, c1: color(175,67,67), c2: color(12, 133, 88)});
  Apple2.display({ratio: 0.6, c1: color(175,67,67), c2: color(12, 133, 88)});

  let Apple3 = new Apple(285, 570, 40, PI, {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple3.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});

  let Apple4 = new Apple(332, 582, 60, radians(270), {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple4.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});

  let Apple5 = new Apple(392, 582, 60, radians(270), {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple5.display({ratio: 0.6, c1: color(175,67,67), c2: color(12, 133, 88)});

  let Apple6 = new Apple(298, 532, 40, radians(0), {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple6.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});

  let Apple7 = new Apple(298, 490, 45, radians(0), {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple7.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});

  let Apple8 = new Apple(305, 429, 80, radians(360), {ratio: 0.6, c1: color(175,67,67), c2: color(12, 133, 88)});
  Apple8.display({ratio: 0.6, c1: color(175,67,67), c2: color(12, 133, 88)});

  let Apple9 = new Apple(300, 367, 44, radians(360), {ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});
  Apple9.display({ratio: 0.6, c1: color(12, 133, 88), c2: color(175,67,67)});


  fill(123,123,132);
  strokeWeight(10);
  line(300,430,285,470)

}

class Apple {
  constructor(x, y, d, angle, settings) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.angle = angle;
    this.ratio = settings.ratio;
  }

  display(settings) {
    push();
    translate(this.x, this.y)
    rotate(this.angle)
    stroke(0);
    fill(settings.c1);
    arc(0, 0, this.d, this.d, -(PI * (1 - this.ratio)) + PI, (PI * (1 - this.ratio)) + PI, OPEN, CHORD);
    fill(settings.c2);
    arc(0, 0, this.d, this.d, -PI * this.ratio, PI * this.ratio, OPEN, CHORD);
    pop();
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

 //Draw a rectangle
 class Rect {
  constructor(x, y, w, h, r,g,b) {
    this.x = x;             
    this.y = y;            
    this.w = w;             
    this.h = h;             
    this.fillColor = color(r, g, b); 
  }

   //Draw a rectangle
  display() {
    fill(this.fillColor);
    rect(this.x, this.y, this.w, this.h);
  }
}

//Draw an arc
class Arc {
  constructor(x, y, w, h, start, stop, r, g, b, mode = PIE) {
    this.x = x;                
    this.y = y;                
    this.w = w;                 
    this.h = h;                  
    this.start = start;          
    this.stop = stop;           
    this.fillColor = color(r, g, b);  
    this.mode = mode;            
  }

  //Draw an arc
  display() {
    fill(this.fillColor);
    noStroke();
    arc(this.x, this.y, this.w, this.h, this.start, this.stop, this.mode);
  }
}
