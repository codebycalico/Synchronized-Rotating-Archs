# Synchronized Rotating Archs
Creating synchronized rotating arcs in p5.js

Using Patt Vira's tutorial: https://www.youtube.com/watch?v=l1pcPSXV3bI

This sketch creates rotating arc that circle around the keypoint of a tracked person (if there is one), otherwise draws rotating circles in the center of the screen. Uses the first keypoint from the tracked pose that has a confidence level of over 0.5 and draws the center of the arcs around that.