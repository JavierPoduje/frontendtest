/// <reference types="cypress" />

describe('chessboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  describe('is correctly displayed', () => {
    it('has 8 columns', () => {
      cy.get('[data-test=chessboard__column]').should('have.length', 8);
    });
    it('has have 64 squares', () => {
      cy.get('.chessboard__square').should('have.length', 64);
    });
  });

  describe('has squares correctly defined', () => {
    // right colors
    it('has 32 dark squares', () => {
      cy.get('.chessboard__square--dark').should('have.length', 32);
    });
    it('has 32 light squares', () => {
      cy.get('.chessboard__square--light').should('have.length', 32);
    });
    it('has right colors', () => {
      cy.get('[data-test=chessboard__square--a8]').should(
        'have.class',
        'chessboard__square--light',
      );
      cy.get('[data-test=chessboard__square--h8]').should(
        'have.class',
        'chessboard__square--dark',
      );
      cy.get('[data-test=chessboard__square--a1]').should(
        'have.class',
        'chessboard__square--dark',
      );
      cy.get('[data-test=chessboard__square--h1]').should(
        'have.class',
        'chessboard__square--light',
      );
    });
    // round corners
    it('has rounded corners', () => {
      cy.get('[data-test=chessboard__square--a8]').should(
        'have.class',
        'chessboard__square--top_left',
      );
      cy.get('[data-test=chessboard__square--h8]').should(
        'have.class',
        'chessboard__square--top_right',
      );
      cy.get('[data-test=chessboard__square--a1]').should(
        'have.class',
        'chessboard__square--bottom_left',
      );
      cy.get('[data-test=chessboard__square--h1]').should(
        'have.class',
        'chessboard__square--bottom_right',
      );
    });
  });
});
