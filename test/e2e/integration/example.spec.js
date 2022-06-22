// example.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Testing Test", () => {
  it("App is deployed on vercel.com subdomain", () => {
    cy.visit("/");
    cy.url().should("include", ".vercel.app");
  });
  it("Homepage", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome to Aurelia 2!");
  });
});
