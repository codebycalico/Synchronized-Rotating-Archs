// Calico Rose
// August 28, 2025
// Using tutorial video from Patt Vira:
// https://www.youtube.com/watch?v=l1pcPSXV3bI

let video;
let bodyPose;
let poses = [];

let arcs = [];
let totalArcs = 80;
// how big / small the distance between each arc
let r0 = 30;
let r_mult = 0.05;
let f_mult = 0.08;

let trackedX = 0;
let trackedY = 0;

function preload() {
  // The model is being loaded from the cloud (Google server somewhere)
  // Images processed through model happens on computer
  bodyPose = ml5.bodyPose("MoveNet");
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  for(let i = 0; i < totalArcs; i++) {
    let r = r0 + (i + 1) * totalArcs * r_mult;
    let f = (i + 1) * f_mult;
    let h = 200 + (100/totalArcs) * i;
    arcs[i] = new Arc(r, f, h);
  }

  video = createCapture(VIDEO);
  video.hide();

  // .detect looks at one image one time
  // .detectStart continuously detects
  // callback function for anytime it has recieved a result from the model
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(0);
  //translate(width/2, height/2);

  if(poses.length > 0) {
    for(let i = 0; i < poses.length; i++) {
      for(let j = 0; j < poses[i].keypoints.length; j++) {
        if(poses[i].keypoints[j].confidence > 0.5) {
          trackedX = poses[i].keypoints[j].x;
          trackedY = poses[i].keypoints[j].y;
        }
      }
    }
  } else {
    trackedX = width/2;
    trackedY = height/2;
  }
 
  for(let i = 0; i < totalArcs; i++) {
    arcs[i].update(trackedX, trackedY);
    arcs[i].display();
  }
}
