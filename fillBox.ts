import * as fs from "fs";

function minCubesToFillBox(length: number, width: number, height: number, cubeCounts: number[]): number {
    let remainingVolume = length * width * height; // Total volume to fill
    let totalCubesUsed = 0;
    
    // Iterate from largest cube size (2^i) to smallest (2^0)
    for (let i = cubeCounts.length - 1; i >= 0; i--) {
        const cubeSize = 2 ** i; // Cube side length
        const cubeVolume = cubeSize ** 3;

        // Find how many of these cubes fit within the box dimensions
        let maxFit = Math.floor(length / cubeSize) * Math.floor(width / cubeSize) * Math.floor(height / cubeSize);

        // We cannot use more cubes than are available
        let cubesToUse = Math.min(maxFit, cubeCounts[i]);

        // Calculate how much volume these cubes occupy
        let volumeUsed = cubesToUse * cubeVolume;

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

function processInput(input: string) {
    const lines = input.trim().split("\n");
    const results: number[] = [];

    for (const line of lines) {
        const values = line.trim().split(" ").map(Number);
        const [length, width, height, ...cubeCounts] = values;
        results.push(minCubesToFillBox(length, width, height, cubeCounts));
    }

    return results;
}

// Read input from 'problems.txt' and execute the function
const inputFile = "problems.txt";
fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    const results = processInput(data);
    results.forEach(result => console.log(result));
});
