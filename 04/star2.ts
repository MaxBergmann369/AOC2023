import {getLines} from "../readFile";
import {createCards, ICard} from "./models";

const lines: string[]  = getLines("04/input.txt");

const cards: ICard[] = createCards(lines);

function processScratchcards(cards: ICard[]): number {
    let sets: number[] = [];
    let winning: number[] = [];

    //init
    for(const card of cards) {
        sets.push(1);
        winning.push(hasWinning(card));
    }

    //calc
    for(let i: number = 0; i < cards.length; i++) {
        for(let k: number  = 0; k < sets[i]; k++) {
            for (let j: number  = i; j < i + winning[i]; j++) {
                sets[j+1]++;
            }
        }
    }

    //sum
    let sum: number = 0;
    for(const set of sets) {
        sum += set;
    }

    return sum;
}

function hasWinning(finalCard: ICard): number {
    let cnt: number = 0
    for(const card of finalCard.elfCards) {
        if(finalCard.myCards.includes(card)) {
            cnt++;
        }
    }

    return cnt;
}

const result: number = processScratchcards(cards);
console.log(result);