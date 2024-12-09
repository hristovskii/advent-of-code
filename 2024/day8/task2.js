const fs = require("fs");

function calculatePuzzle(inputFile) {
    const data = fs.readFileSync(inputFile, "utf-8");

    const map = data.replace(/\r/g, "")
                          .split("\n")
                          .filter(x => x !== "")
                          .map(x => x.split(""));

    const locations = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === ".") continue;
            if (!locations[map[y][x]]) locations[map[y][x]] = [];
            locations[map[y][x]].push([x, y]);
        }
    }

    const antinodes = [];
    const width = map[0].length;
    const height = map.length;
    for (const locs of Object.values(locations)) {
        if (locs.length <= 1) continue;

        for (let i = 0; i < locs.length; i++) {
            for (let j = 0; j < locs.length; j++) {
                if (i === j) continue;

                const loci = locs[i];
                const locj = locs[j];

                const antinode1 = [loci[0], loci[1]];
                while (antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) {
                    antinode1[0] += loci[0] - locj[0];
                    antinode1[1] += loci[1] - locj[1];
                    if (antinodes.findIndex(x => x[0] === antinode1[0] && x[1] === antinode1[1]) < 0 &&
                        antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) antinodes.push([antinode1[0], antinode1[1]]);
                }

                const antinode2 = [locj[0], locj[1]];
                while (antinode2[0] >= 0 && antinode2[1] >= 0 && antinode1[0] < width && antinode2[1] < height) {
                    antinode2[0] += locj[0] - loci[0];
                    antinode2[1] += locj[1] - loci[1];
                    if (antinodes.findIndex(x => x[0] === antinode2[0] && x[1] === antinode2[1]) < 0 &&
                        antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) antinodes.push([antinode2[0], antinode2[1]]);
                }

                if (antinodes.findIndex(x => x[0] === loci[0] && x[1] === loci[1]) < 0) antinodes.push([loci[0], loci[1]]);
                if (antinodes.findIndex(x => x[0] === locj[0] && x[1] === locj[1]) < 0) antinodes.push([locj[0], locj[1]]);
            }
        }
    }

    return antinodes.length;
}

const inputFile = "input.txt";

const result = calculatePuzzle(inputFile);
console.log("\n" + result);