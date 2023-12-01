import {getLines} from "../readFile";

const lines = getLines("01/input.txt");

let sum: number = 0;

for(const line of lines) {
    let first: string = "";
    let last: string = "";
    for(let i = 0; i < line.length; i++) {
        if(!isNaN(parseInt(line[i]))) {
            if(first === "") {
                first = line[i];
                last = line[i];
            }
            else {
                last = line[i];
            }
        }
    }

    console.log(first + last);
    sum += parseInt(first + last);
    first = "";
    last = "";
}

console.log(sum);

