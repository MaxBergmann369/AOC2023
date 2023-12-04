import {getLines} from "../readFile";
import {createCards, ICard} from "./models";

const lines: string[]  = getLines("04/input.txt");

const cards: ICard[] = createCards(lines);

let sum: number = 0;

for(const card of cards) {
    sum += amountOfWinning(card);
}

console.log(sum);


function amountOfWinning(finalCard: ICard): number {
    let cnt: number = -1;
    for(const card of finalCard.elfCards) {
        if(finalCard.myCards.includes(card)) {
            cnt++;
        }
    }

    return cnt < 0 ? 0 : Math.pow(2, cnt);
}