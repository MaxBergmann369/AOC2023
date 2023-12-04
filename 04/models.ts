
export function createCards(lines: string[]): ICard[] {
    const finalCards: ICard[] = [];

    for(let line of lines) {
        const vals: string[] = line.split(":")
        const id: number = parseInt(vals[0].replace("Card", "").trim());
        const cards: string[] = vals[1].split("|");
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

    return finalCards;
}

export interface ICard {
    id: number,
    elfCards: number[],
    myCards: number[]
}