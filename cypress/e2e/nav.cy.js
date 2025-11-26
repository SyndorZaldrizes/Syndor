describe('Navigation behavior', () => {
  const toggleSelector = '#navToggle';
  const navSelector = '#mainNav';

  beforeEach(() => {
    cy.visit('/');
  });

  it('opens the nav when toggle is clicked and sets aria-expanded', () => {
    cy.get(toggleSelector).as('toggle');
    cy.get(navSelector).as('nav');

    cy.get('@toggle').click();
    cy.get('@nav').should('have.class', 'open');
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'true');
  });

  it('moves focus into first nav link when opened and returns focus when closed', () => {
    cy.get(toggleSelector).as('toggle');
    cy.get(navSelector).as('nav');

    cy.get('@toggle').focus();
    cy.focused().should('have.id', 'navToggle');

    cy.get('@toggle').click();
    cy.get(navSelector).find('a, button, [tabindex]:not([tabindex="-1"])').first().should('be.focused');

    cy.get('@toggle').click();
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'false');
    cy.get('@toggle').should('be.focused');
  });

  it('closes when Escape key is pressed', () => {
    cy.get(toggleSelector).as('toggle');
    cy.get(navSelector).as('nav');

    cy.get('@toggle').click();
    cy.get('@nav').should('have.class', 'open');

    cy.get('body').type('{esc}');
    cy.get('@nav').should('not.have.class', 'open');
    cy.get('@toggle').should('have.attr', 'aria-expanded', 'false');
  });

  it('closes when clicking outside', () => {
    cy.get(toggleSelector).as('toggle');
    cy.get(navSelector).as('nav');

    cy.get('@toggle').click();
    cy.get('@nav').should('have.class', 'open');

    cy.get('body').click('topRight');
    cy.get('@nav').should('not.have.class', 'open');
  });

  it('closes when a nav link is clicked', () => {
    cy.get(toggleSelector).as('toggle');
    cy.get(navSelector).as('nav');

    cy.get('@toggle').click();
    cy.get('@nav').find('a').first().click();
    cy.get('@nav').should('not.have.class', 'open');
  });
});
