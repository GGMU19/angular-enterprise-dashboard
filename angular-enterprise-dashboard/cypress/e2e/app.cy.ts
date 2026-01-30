describe('Application Smoke Test', () => {
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('/');
  });

  it('should load the application', () => {
    // Check that the app root element exists
    cy.get('app-root').should('exist');
  });

  it('should have the correct title', () => {
    // Check the page title
    cy.title().should('include', 'AngularEnterpriseDashboard');
  });

  it('should be accessible', () => {
    // Check basic accessibility
    cy.get('body').should('be.visible');

    // Verify no console errors (optional)
    cy.window().then(win => {
      expect(win.console.error).to.not.be.called;
    });
  });
});
