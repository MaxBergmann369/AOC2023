import {getLines} from "../readFile";
import {IGame, createGames} from "./models";

const lines: string[] = getLines("02/input.txt");

const games: IGame[] = createGames(lines);

let sumOfPows: number = 0;

for(let game of games) {
    let green: number = 0;
    let red: number = 0;
    let blue: number = 0;

    for(const bag of game.bags) {
        for(const cube of bag.cubes) {
            if(cube.color === "green"&& cube.amount > green) {
                green = cube.amount;
            }
            else if(cube.color === "blue"&& cube.amount > blue) {
                blue = cube.amount;
            }
            else if(cube.color === "red" && cube.amount > red) {
                red = cube.amount;
            }
        }
    }

    sumOfPows += (green * red * blue);
}

console.log(sumOfPows);