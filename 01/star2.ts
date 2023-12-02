import {getLines} from "../readFile";

const lines: string[] = getLines("01/input.txt");

const numbers: Map<string, number> = new Map<string, number>()

numbers.set("one", 1);
numbers.set("two", 2);
numbers.set("three", 3);
numbers.set("four", 4);
numbers.set("five", 5);
numbers.set("six", 6);
numbers.set("seven", 7);
numbers.set("eight", 8);
numbers.set("nine", 9);
numbers.set("1", 1);
numbers.set("2", 2);
numbers.set("3", 3);
numbers.set("4", 4);
numbers.set("5", 5);
numbers.set("6", 6);
numbers.set("7", 7);
numbers.set("8", 8);
numbers.set("9", 9);

let sum: number = 0;

for(const line of lines) {
    const keys: string[] = Array.from(numbers.keys());

    const idx: Map<number, number> = new Map<number, number>()

    for(const key of keys) {
        let firstPosition = line.indexOf(key);
        let lastPosition = line.lastIndexOf(key);

        if(firstPosition !== -1 && numbers.get(key) !== undefined) {
            let num: number | undefined = numbers.get(key);
            if(num != undefined) {
                idx.set(firstPosition + key.length - 1, num);
            }
        }

        if(lastPosition !== -1 && numbers.get(key) !== undefined) {
            const num: number | undefined = numbers.get(key);
            if(num != undefined) {
                idx.set(lastPosition + key.length - 1, num);
            }
        }
    }

    const keys1: number[] = Array.from(idx.keys());

    const sorted: number[] = keys1.sort((a, b) => a - b);
    const lowest: number = sorted[0];
    const highest: number = sorted[sorted.length-1];

    const num1: number | undefined = idx.get(lowest);
    const num2: number | undefined  = idx.get(highest);

    if(num1 !== undefined && num2 !== undefined) {
        const num: string = num1.toString() + num2.toString();
        sum += parseInt(num);
    }
}

console.log(sum);