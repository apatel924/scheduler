describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});