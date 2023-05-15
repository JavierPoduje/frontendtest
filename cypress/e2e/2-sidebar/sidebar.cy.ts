/// <reference types="cypress" />

describe('sidebar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  describe('content correctly displayed', () => {
    it('has `rows` section', () => {
      cy.get('.sidebar').get('.sidebar__rows').should('exist');
    });

    it('has `button`', () => {
      cy.get('.sidebar').get('.sidebar__button').should('exist');
    });
  });

  describe('after the chessboard is clicked', () => {
    it('squares are displayed on sidebar', () => {
      cy.get('[data-test=chessboard__square--a8]').click();
      cy.get('.sidebar__row__square').should('have.text', 'a8');
    });

    it('squares are displayed in pairs', () => {
      // pair 1
      cy.get('[data-test=chessboard__square--a8]').click();
      cy.get('[data-test=chessboard__square--a1]').click();
      // pair 2
      cy.get('[data-test=chessboard__square--c2]').click();
      cy.get('[data-test=chessboard__square--c4]').click();
      // pair 3
      cy.get('[data-test=chessboard__square--e5]').click();
      cy.get('[data-test=chessboard__square--e7]').click();
      // pair 4 (incomplete)
      cy.get('[data-test=chessboard__square--h3]').click();

      cy.get('.sidebar__row').should('have.length', 4);
    });
  });

  describe('`clear` button', () => {
    it('clears sidebar', () => {
      cy.get('[data-test=chessboard__square--a8]').click();
      cy.get('.sidebar__button').click();
      cy.get('.sidebar__row__square').should('not.exist');
    });
  });
});
