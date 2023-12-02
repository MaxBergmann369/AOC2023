import {getLines} from "../readFile";
import {IGame, ICube, IBag, createGames} from "./models";

const lines: string[] = getLines("02/input.txt");

const limit1: ICube = {
    amount: 12,
    color: "red"
}

const limit2: ICube = {
    amount: 13,
    color: "green"
}

const limit3: ICube = {
    amount: 14,
    color: "blue"
}

const games: IGame[] = createGames(lines);

let gameIds: number[] = []

for(let game of games) {
    let bags: IBag[] = game.bags;
    let check: boolean = false;

    for(let bag of bags) {
        for(let cube of bag.cubes) {
            if ((cube.amount > limit1.amount && cube.color === limit1.color)
                || (cube.amount > limit2.amount && cube.color === limit2.color)
                || (cube.amount > limit3.amount && cube.color === limit3.color)) {
                check = true;
                break;
            }
        }
    }

    if(!check) {
        gameIds.push(game.id);
    }
}

let sum: number = 0;

for(const id of gameIds) {
    sum += id;
}

console.log(sum)