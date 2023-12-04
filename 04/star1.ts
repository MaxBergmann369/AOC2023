import {getLines} from "../readFile";

const lines: string[]  = getLines("04/sample1.txt");

interface ICard {
    id: number,
    elfCards: number[],
    myCards: number[]
}

const finalCards: ICard[] = [];

for(let line of lines) {
    const vals = line.split(":")
    const id: number = parseInt(vals[0].replace("Card", "").trim());
    const cards = vals[1].split("|");
    const elfCards: number[] = [];
    for(let card of cards[0].split(" ")) {
        if(!isNaN(parseInt(card))) {
            elfCards.push(parseInt(card));
        }
    }

    const myCards: number[] = [];
    for(let card of cards[1].split(" ")) {
        if(!isNaN(parseInt(card))) {
            myCards.push(parseInt(card));
        }
    }

    let card: ICard = {
        id,
        elfCards,
        myCards
    };

    finalCards.push(card);
}

let sum = 0;

for(let cards of finalCards) {
    sum += amountOfWinning(cards);
}

console.log(sum);


function amountOfWinning(finalCard: ICard): number {
    let cnt: number = 0
    for(let card of finalCard.elfCards) {
        if(finalCard.myCards.includes(card)) {
            cnt++;
        }
    }

    cnt--;
    console.log(cnt)
    return cnt < 0 ? 0 : Math.pow(2, cnt);
}