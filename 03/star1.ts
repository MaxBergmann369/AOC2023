import {getLines} from "../readFile";

const lines: string[] = getLines("03/input.txt");

let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

let sum = 0;

for(let i = 0; i < lines.length; i++) {
    let number: string = "";
    let endIdx: number = 0;

    for(let j = 0; j < lines[0].length; j++) {
        if(numbers.includes(lines[i][j])) {
            number += lines[i][j];
            endIdx = j;
        }
        else if(number !== "") {
            let pS = endIdx - number.length + 1;
            if(isPartNumber(i, pS, endIdx, lines)) {
                console.log(number)
                sum += parseInt(number);
            }

            number = "";
            endIdx = 0;
        }

        if(j === lines[0].length - 1 && number !== "") {
            let pS = endIdx - number.length + 1;
            if(isPartNumber(i, pS, endIdx, lines)) {
                console.log(number)
                sum += parseInt(number);
            }

            number = "";
            endIdx = 0;
        }
    }
}

console.log(sum);

function isPartNumber(lineNum: number, pS: number, pE: number, lines: string[]): boolean {
    let numLen: number = pE - pS + 1;

    let pos: number[] = [pS - 1, lineNum -1]
    if(isNotPoint(pos, lines)) {
        return true;
    }

    for(let i = 0; i < numLen + 1; i++) {
        pos[0] = pos[0] + 1;
        if(isNotPoint(pos, lines)) {
            return true;
        }
    }

    for(let i = 0; i < 2; i++) {
        pos[1] = pos[1] + 1
        if(isNotPoint(pos, lines)) {
            return true;
        }
    }

    for(let i = 0; i < numLen + 1; i++) {
        pos[0] = pos[0] - 1;
        if(isNotPoint(pos, lines)) {
            return true;
        }
    }

    pos[1] = pos[1] - 1;
    if(isNotPoint(pos, lines)) {
        return true;
    }

    return false;
}

function isNotPoint(pos: number[], lines: string[]): boolean {
    if(pos[0] < 0 || pos[1] < 0 || pos[1] >= lines.length || pos[0] >= lines[pos[1]].length) {
        return false;
    }

    return lines[pos[1]][pos[0]] !== "." && !numbers.includes(lines[pos[1]][pos[0]]);
}