// 类属性方法先定义和执行,然后才是实例的
export type cardObj = object & {
  cardCode: number
  cardDesc: string
  standOut: boolean
}
export default class Cards {
  private finalCards: cardObj[] = this.shuffle()
  get piles () {
    return this.deal()
  }
  static originalCards: cardObj[] = Cards.generateCards()
  static generateCards () {
    const cards: cardObj[] = []
    const numbers = [
      { cardCode: 6, cardDesc: '6', standOut: false },
      { cardCode: 7, cardDesc: '7', standOut: false },
      { cardCode: 8, cardDesc: '8', standOut: false },
      { cardCode: 9, cardDesc: '9', standOut: false },
      { cardCode: 10, cardDesc: '10', standOut: false }      
    ]
    const letters = [
      { cardCode: 11, cardDesc: 'J', standOut: false },
      { cardCode: 12, cardDesc: 'Q', standOut: false },
      { cardCode: 13, cardDesc: 'K', standOut: false },
      { cardCode: 14, cardDesc: 'A', standOut: false },
      { cardCode: 15, cardDesc: '2', standOut: false }      
    ]
    const jokers = [
      { cardCode: 16, cardDesc: 'JOKER', standOut: false },
      { cardCode: 17, cardDesc: 'JOKER', standOut: false }     
    ]
    for (let i = 0; i < 8; i++) {
      cards.push(...numbers)
      cards.push(...letters)
    }
    for (let i = 0; i < 2; i++) {
      cards.push(...jokers)
    }
    return cards
  }
  shuffle () {
    return Cards.originalCards.sort(() => Math.random() - 0.5)
  }
  deal () {
    const finalCards: cardObj[] = JSON.parse(JSON.stringify(this.finalCards))
    const piles: any[] = []
    for (let i = 0; i < 4; i++) {
      piles.push(finalCards.splice(0, 21).sort((a, b) => b.cardCode - a.cardCode))
    }
    return piles
  }
}