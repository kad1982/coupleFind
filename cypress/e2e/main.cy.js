/// <reference types="cypress" />


/*
В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима.
Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.
Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.
Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.
*/
describe('тест игры в пары', () => {
  beforeEach(() => {

    cy.visit('http://localhost:5500/20_testing/2/index.html')
    cy.get('input#countVertical').type(2);
    cy.get('input#countHorizont').type(2);
    cy.contains('Начать игру').click();
  })
  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима.', () => {
    cy.get('.card')
      .should('not.be.empty')
      .and(($card) => {
        expect($card).to.have.length(4)
      })
    cy.get(".flip").should('not.exist');
  })
  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой.', () => {
    const UniqueNumber = `${Math.floor(Math.random() * 3+1)}`;
    cy.get('.card:nth-child(' + UniqueNumber + ')').click();
    cy.get('.flip').should('exist');
  })
  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.', () => {
    let div = '.card' + ':nth-child' + '(' + 1 + ')';
    cy.get(div).click();
    cy.get(div).find('div').then(($div) => {
      const text1 = $div.text();
      let div2 = '.card' + ':nth-child' + '(' + 2 + ')';
      cy.get(div2).click();
      cy.get(div2).find('div').then(($div) => {
        const text2 = $div.text()
        if (text1 === text2) {
          cy.get('.flip').should('have.length', 2);
        } else {
          let div3 = '.card' + ':nth-child' + '(' + 3 + ')';
          cy.get(div3).click();
          cy.get(div3).find('div').then(($div) => {
            const text3 = $div.text()
            if (text1 === text3) {
              cy.get(div).click();
              cy.get('.flip').should('have.length', 2);
            } else {
              let div4 = '.card' + ':nth-child' + '(' + 4 + ')';
              cy.get(div4).click();
              cy.get(div4).find('div').then(($div) => {
                const text4 = $div.text();
                if (text1 === text4) {
                  cy.get(div).click();
                  cy.get(div4).click();
                  cy.get('.flip').should('have.length', 2);
                }
              })
            }
          })
        }
      })
    })
  })

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми.', () => {
    let div = '.card' + ':nth-child' + '(' + 1 + ')';
    cy.get(div).click();
    cy.get(div).find('div').then(($div) => {
      const text1 = $div.text();
      let div2 = '.card' + ':nth-child' + '(' + 2 + ')';
      cy.get(div2).click();
      cy.get(div2).find('div').then(($div) => {
        const text2 = $div.text()
        if (text1 === text2) {
          let div3 = '.card' + ':nth-child' + '(' + 3 + ')';
          cy.get(div3).click();
          cy.get(div3).find('div').then(($div) => {
            const text3 = $div.text()
            if (text2 === text3) {
              let div4 = '.card' + ':nth-child' + '(' + 4 + ')';
              cy.get(div4).click();
              cy.get(div4).find('div').then(($div) => {
                const text4 = $div.text();
                if (text3 === text4) {
                  cy.get(div).click();
                  cy.get(div4).click();
                  cy.get('.flip').should('have.length', 2);
                }
              })
            }
          })
        }
      })
    })
  })
})
