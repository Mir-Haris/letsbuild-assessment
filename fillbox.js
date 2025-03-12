"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function minCubesToFillBox(length, width, height, cubeCounts) {
    var remainingVolume = length * width * height; // Total volume to fill
    var totalCubesUsed = 0;
    // Iterate from largest cube size (2^i) to smallest (2^0)
    for (var i = cubeCounts.length - 1; i >= 0; i--) {
        var cubeSize = Math.pow(2, i); // Cube side length
        var cubeVolume = Math.pow(cubeSize, 3);
        // Find how many of these cubes fit within the box dimensions
        var maxFit = Math.floor(length / cubeSize) * Math.floor(width / cubeSize) * Math.floor(height / cubeSize);
        // We cannot use more cubes than are available
        var cubesToUse = Math.min(maxFit, cubeCounts[i]);
        // Calculate how much volume these cubes occupy
        var volumeUsed = cubesToUse * cubeVolume;
        // Subtract from remaining volume
        remainingVolume -= volumeUsed;
        totalCubesUsed += cubesToUse;
        // If the box is completely filled, return the answer
        if (remainingVolume === 0) {
            return totalCubesUsed;
        }
    }
    // If we exit the loop without filling the box completely, return -1
    return -1;
}
function processInput(input) {
    var lines = input.trim().split("\n");
    var results = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var values = line.trim().split(" ").map(Number);
        var length_1 = values[0], width = values[1], height = values[2], cubeCounts = values.slice(3);
        results.push(minCubesToFillBox(length_1, width, height, cubeCounts));
    }
    return results;
}
// Read input from 'problems.txt' and execute the function
var inputFile = "problems.txt";
fs.readFile(inputFile, "utf8", function (err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    var results = processInput(data);
    results.forEach(function (result) { return console.log(result); });
});
