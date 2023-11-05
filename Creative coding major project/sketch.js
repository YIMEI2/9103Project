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
let bgPg;

let step=0;

let xCoor = 0;

//array for store brach and solid objects
let apples=[];
let treeLines=[];
let treeArcs=[];
let treeSolid=[];
let appleShowIndex=0;
let lastShowFrameCount=0;

//transparency control
let baseTransparency = 255;
let branchTransparency = 255;

let couldFallAppleIndex=[];
let blowFallAccuStrength = 0;
let fallAppleIndex=-1;

//show apple slogon index
let fallAppleSlogon=0;

let mic; //using mic

//bg song
let song2;

function preload() 
{
    song2 = loadSound("./asset/song2.mp3");
}

function setup() 
{
  randomSeed(seed);
  mySize = 900;
  let cnv = createCanvas(600, 800);
  cnv.mousePressed(userStartAudio);
  colorselet[0] = "#1a1a1a";
  colorselet[1] = "#abadc5";
  colorselet[2] = "#abbcc3";
  colorselet[3] = "#bfd1b2";
  colorselet[4] = "#7f9faf";
  bgPg = createGraphics(width, height);

  bgPg.background("#003153");
  margin = mySize / 50;
  ranges = int(random(10, 20));
  color1 = random(colorselet);
  color2 = random(colorselet);
  plus = 0;
 
    
  filter1 = new makeFilter();
  //set apple sloid and brach objects
  setApples();
  setTreeSolids();  
  setTreeArcs();    
  setTreeLines();    
    
  print(apples.length);
    
  //open mic
  mic = new p5.AudioIn();
  mic.start();

  //set fix framerate
  frameRate(30);
    
}


function draw() 
{
  
  image(bgPg,0,0);
    
  if(step==0)
  {
    background("#003153");
    strokeWeight(1);
    stroke(255);
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Apple Tree",width/2,height*0.4);
      
    textSize(20);
    text("Click to start.",width/2,height*0.6);
      
    if (mouseIsPressed === true)
    {
        step=1;
        song2.loop();
        lastShowFrameCount = frameCount;
    }
  } 
  else if(step==1)
  {
     if(frameCount - lastShowFrameCount<450) //time control
     {
         if(frameCount%3==0) //generate once every 3 frames
         {
            generateBg();
         }
        
     }
      else
      {
          step=2;
          colorMode(RGB);
          baseTransparency=0;
          branchTransparency=0;
      }
  }
  else if(step==2)
  {
    if(baseTransparency<255)
    {
        baseTransparency++;
    }
    if(branchTransparency<255)
    {
        branchTransparency++;
    }

      
    //ref: https://p5js.org/reference/#/p5.AudioIn
    micLevel = mic.getLevel();
    print(micLevel);
    if(appleShowIndex<apples.length && micLevel>0.2 && frameCount - lastShowFrameCount>20)
    {
      appleShowIndex+=1;
    }
    //let y = height - micLevel * height;
    //ellipse(width/2, y, 10, 10);
      
    stroke(25,50,90);
    strokeWeight(3);
    for (let i = 0; i < apples.length && i < appleShowIndex; i++) 
    {
        apples[i].display();
    }
      
    stroke(25,50,90);
    for (let i = 0; i < treeSolid.length; i++) 
    {
        treeSolid[i].display();
    }
    for (let i = 0; i < treeArcs.length; i++) 
    {
        treeArcs[i].display();
    }
      
    for (let i = 0; i < treeLines.length; i++) 
    {
        treeLines[i].display();
    }
      
    if(appleShowIndex>=apples.length)
    {
        step=3;
        for (let i = 0; i < apples.length ; i++) 
        {
            if(apples[i].y<height/2)
            {
                 couldFallAppleIndex.push(i);
            }
        }
        lastShowFrameCount = frameCount;
    }
    
    if(branchTransparency>250)
    {
        strokeWeight(1);
        stroke(255);
        fill(255);
        textAlign(CENTER);
        textSize(30);
        text("Speak to generate apples, click to start.",width/2,height-60);
    }
    
  }
  
  if(step==3)
  {
    micLevel = mic.getLevel();
    //apple fall down
    if(micLevel>0.4 && frameCount - lastShowFrameCount>40)
    {
        let index =int(random(0,couldFallAppleIndex.length));
        apples[couldFallAppleIndex[index]].setFall();
        
        //ref: https://p5js.org/reference/#/p5/splice
        couldFallAppleIndex.splice(index,1);
        
        lastShowFrameCount = frameCount;
        fallAppleIndex = couldFallAppleIndex[index];
        
    }
      
    stroke(25,50,90);
    strokeWeight(3);
    for (let i = 0; i < apples.length && i < appleShowIndex; i++) 
    {
        apples[i].update();
        apples[i].display();
    }
    
    stroke(25,50,90);
    for (let i = 0; i < treeSolid.length; i++) 
    {
        treeSolid[i].display();
    }
    for (let i = 0; i < treeArcs.length; i++) 
    {
        treeArcs[i].display();
    }
      
    for (let i = 0; i < treeLines.length; i++) 
    {
        treeLines[i].display();
    }
    
    //show apple slogan
    strokeWeight(1);
    stroke(255);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    if(fallAppleSlogon===0)
    {
        text("Now, try to blow the apple tree.",width/2,height-60);
    }
    else{
        
        let k=fallAppleSlogon%3;
        if(k==0){text("You might get a Newton's apple.",width/2,height-60);}
        else if(k==1){text("You might have get a Steve Jobs Apple.",width/2,height-60);}
        else if(k==2){text("You may have received an apple of Eve.",width/2,height-60);}
    }
  }
  

}

//line class for branch
class lines {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
  display() {
    push()
    strokeWeight(4)
    stroke(247,190,57,branchTransparency)
    line(this.x1, this.y1, this.x2, this.y2)
    pop()
  }
}

//class of apple
class Apple {
  constructor(x, y, d, angle, _settings) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.angle = angle;
    this.settings = _settings;
    this.fall=0;
    this.fallSpeed = random(3,7);
  }
    
  setFall()
  {
       this.fall=1;
  }
  update()
  {
    if(this.fall==1)
    {
        if(this.y+this.d/2 < height)
        {
            this.y+=this.fallSpeed;
        }
        if(this.y+this.d/2 >= 602)
        {
            this.fall = 2;
            fallAppleSlogon++;
        }
    }
  }

  display() 
  {
    push();
    translate(this.x, this.y)
    rotate(this.angle)
    stroke(25,50,90);
    fill(this.settings.c1);
    arc(0, 0, this.d, this.d, -(PI * (1 - this.settings.ratio)) + PI, (PI * (1 - this.settings.ratio)) + PI, OPEN, CHORD);
    fill(this.settings.c2);
    arc(0, 0, this.d, this.d, -PI * this.settings.ratio, PI * this.settings.ratio, OPEN, CHORD);
    pop();
  }
}

function setApples()
{
  apples.push(new Apple(294, 330, 27, PI / 2, { ratio: 0.43, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(266, 335, 32, 3 * PI / 2, { ratio: 0.52, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(234, 328, 36, PI / 2, { ratio: 0.40, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(189, 297, 73, PI / 30, { ratio: 0.55, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(184, 238, 46, 31 * PI / 30, { ratio: 0.55, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(190, 203, 27, PI / 30, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(180, 174, 36, PI / 2, { ratio: 0.48, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(144, 160, 42, 0, { ratio: 0.48, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(135, 112, 54, PI, { ratio: 0.60, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(148, 60, 54, 0, { ratio: 0.55, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(311, 308, 29, 0, { ratio: 0.50, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(313, 272, 45, PI, { ratio: 0.48, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(285, 246, 33, PI / 2, { ratio: 0.46, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(261, 250, 22, 3 * PI / 2, { ratio: 0.46, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(269, 226, 20, 0, { ratio: 0.52, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(343, 250, 30, 3 * PI / 2, { ratio: 0.50, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(350, 225, 23, 0, { ratio: 0.40, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(329, 337, 41, 3 * PI / 2, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(364, 332, 27, 3 * PI / 2, { ratio: 0.60, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(411, 292, 44, 41 * PI / 40, { ratio: 0.60, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(395, 328, 40, PI / 2, { ratio: 0.40, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(416, 254, 32, PI / 40, { ratio: 0.40, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(421, 210, 61, 41 * PI / 40, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(419, 167, 27, PI / 40, { ratio: 0.4, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(442, 162, 20, 8 * PI / 5, { ratio: 0.4, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(473, 169, 42, 3 * PI / 5, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(508, 176, 27, 8 * PI / 5, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(520, 151, 27, -PI / 40, { ratio: 0.5, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(210, 580, 60, 29.85, { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(255, 585, 30, 29.85, { ratio: 0.6, c1: color(204, 55, 55), c2: color(4, 176, 112) }));
  apples.push(new Apple(285, 570, 40, PI, { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(332, 582, 60, radians(270), { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(392, 582, 60, radians(270), { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(298, 532, 40, radians(0), { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(298, 490, 45, radians(0), { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
  apples.push(new Apple(305, 429, 80, radians(360), { ratio: 0.6, c1: color(204, 55, 55), c2: color(4, 176, 112) }));
  apples.push(new Apple(300, 367, 44, radians(360), { ratio: 0.6, c1: color(4, 176, 112), c2: color(204, 55, 55) }));
    
  //ref:sort array link: https://editor.p5js.org/icm4.0/sketches/i-hcfvF0C
  apples.sort(compareObjects);
  
}

function setTreeLines()
{
  treeLines.push(new lines(292, 590, 292, 338));
  treeLines.push(new lines(180, 335, 413, 335));
  treeLines.push(new lines(180, 335, 195, 177));
  treeLines.push(new lines(195, 177, 147, 177));
  treeLines.push(new lines(147, 177, 142, 38));
  treeLines.push(new lines(413, 335, 426, 154));
  treeLines.push(new lines(426, 154, 520, 180));
  treeLines.push(new lines(520, 180, 520, 140));
  treeLines.push(new lines(310, 335, 310, 253));
  treeLines.push(new lines(251, 250, 355, 250));
  treeLines.push(new lines(268, 250, 268, 219));
  treeLines.push(new lines(355, 250, 355, 217));
  treeLines.push(new lines(181,590,420,590));
}
function setTreeArcs()
{
  treeArcs.push(new Arc(150, 666, 60, 77, PI, 0, 4, 176, 112));
  treeArcs.push(new Arc(210, 666, 60, 50, PI, 0, 4, 176, 112));
  treeArcs.push(new Arc(270, 666, 60, 90, PI, 0, 204, 55, 55));
  treeArcs.push(new Arc(330, 666, 60, 70, PI, 0, 204, 55, 55));
  treeArcs.push(new Arc(390, 666, 60, 30, PI, 0, 247,190,57));
  treeArcs.push(new Arc(455, 666, 70, 50, PI, 0, 4, 176, 112));
  
}
function setTreeSolids()
{
  treeSolid.push(new Rect(0, 602, width, 77, 19, 145, 99));
  treeSolid.push(new Rect(120, 590, 370, 77, 247,190,57));
  treeSolid.push(new Rect(120, 590, 60, 77, 247,190,57));
  treeSolid.push(new Rect(180, 590, 60, 77, 204, 55, 55));
  treeSolid.push(new Rect(240, 590, 60, 77, 19, 145, 99));
  treeSolid.push(new Rect(300, 590, 60, 77, 247,190,57));
  treeSolid.push(new Rect(360, 590, 60, 77, 19, 145, 99));
  
}


function compareObjects(a, b) {
  return b.y - a.y;
}

// Filter constructor   Code Inspiration Source.：https://p5js.org/reference/#/p5/filter
function makeFilter() {
  bgPg.colorMode(HSB, 360, 100, 100, 100);
  bgPg.drawingContext.shadowColor = color(0, 0, 5, 95);
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
  bgPg.push();
  bgPg.translate(width / 2, height / 2);
  let s = max(width, height) / 1 * sqrt(3) - 2;
  let n = 6;

  //Loop to divide and draw triangles
  for (let theta = TWO_PI / 6; theta < TWO_PI; theta += TWO_PI / 6) {
    divideOP(0, 0, s * cos(theta), s * sin(theta), s * cos(theta + TWO_PI / 6), s * sin(theta + TWO_PI / 6), n);
  }
  bgPg.pop();
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
    bgPg.triangle(x1, y1, x4, y4, x5, y5);
  }
}

//Draw a rectangle
class Rect {
  constructor(x, y, w, h, r, g, b) {
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

function generateBg() {
  randomSeed(seed); // Set the random seed
  noiseSeed(seed); // Set the noise seed

  bgPg.noFill();
  bgPg.push();
  // Loop to draw shapes
  for (let i = 0; i < ranges; i++) {
    bgPg.strokeWeight(str_wei);
    bgPg.stroke(random(colorselet));
    // Update the horizontal coordinate   'untitled_230710'(SamuelYAN,2023)  https://openprocessing.org/sketch/1969233
    if (ranges % 3 == 0) {
      bgPg.drawingContext.shadowColor = str(random(colorselet)) + "15";
      bgPg.drawingContext.shadowOffsetX = str_wei;
      bgPg.drawingContext.shadowOffsetY = str_wei;
      bgPg.drawingContext.shadowBlur = 0;
    } else {
      bgPg.drawingContext.shadowColor = str(random(colorselet)) + "15";
      bgPg.drawingContext.shadowOffsetX = str_wei;
      bgPg.drawingContext.shadowOffsetY = str_wei;
      bgPg.drawingContext.shadowBlur = 0;
    }
    // Update the horizontal coordinate
    xCoor = xCoor + 0.05 * width;
    if (xCoor > width) {
      xCoor = 0;
    }
    let x = xCoor;
    // Set line dashes and draw rectangles
    bgPg.drawingContext.setLineDash([2, int(random(12, 5)) + plus, 3, 2, int(random(1, 4)) - plus, 2, int(random(11, 4)) + plus, 2]);
    bgPg.rect(x - random(4, 10) * sin(random(1, 0.5) * plus), height * random(0.15, 0.85) + mySize / 2 * sin(0.7 * sin(0.5 * plus - 0.5) - 0.5), random(mySize / 20, mySize / 2), plus);
    bgPg.rect(x - random(10, 4) * cos(random(0.5, 1) * plus), height * random(0.85, 0.15) - mySize / 2 * sin(0.75 * sin(0.7 * plus - 0.5) - 0.25), random(mySize / 2, mySize / 20), plus);
  }
  bgPg.pop();

  // Adjust stroke weight
  if (str_wei < 0.5) {
    str_wei += 0.1;
  }
  // Update the 'plus' variable
  if (plus * random(35, 50) < 1 * mySize / 8) {
    plus += 0.01;
  }
  else {
    // Remove shadows and create a final frame
    bgPg.bgPg.drawingContext.shadowColor = random(colorselet);
    bgPg.drawingContext.shadowOffsetX = 0;
    bgPg.drawingContext.shadowOffsetY = 0;
    bgPg.drawingContext.shadowBlur = 0;

    // Display the final frame
    noLoop();
    noLoop();
    bgPg.blendMode(BLEND);
    bgPg.image(overAllTexture, 0, 0);
    bgPg.blendMode(ADD);
    bgPg.strokeWeight(random(0.10, 0.5) / 2);
    bgPg.stroke(str(random(colorselet)) + "05");
    bgPg.noFill();
    bgPg.drawingContext.setLineDash([2, 1, 2, 3]);
    bgPg.drawOverPattern();
    bgPg.drawingContext.setLineDash([1, 1, 1, 1]);
    bgPg.blendMode(BLEND);
  }
}
