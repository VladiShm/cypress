/// <reference types="cypress" />;

describe("register", () => {
  const USERNAME = "auto_test3";
  const USER_EMAIL = "user3@example.com";
  const USER_PASSWORD = "Hello123";
  const USER_PASSWORD_REPEAT = "Hello123";
  const REGISTER_PATH = "https://rc-0.worldwinelist.com/acc/login";

  //Наличие уведомления о Cookie policy при первом входе в систему
  it("Are the cookies?", () => {
    cy.visit(REGISTER_PATH);
    cy.get(".Desktop__Wrapper-iPwTrV").should("be.visible");
  });

  it("positive_test", () => {
    cy.visit(REGISTER_PATH);
    cy.get(".Header__Signup-jnfbBp").should("be.visible").click();

    cy.get("#name").type(USERNAME).should("have.value", USERNAME);
    cy.get("#email").type(USER_EMAIL).should("have.value", USER_EMAIL);
    cy.get("#password").type(USER_PASSWORD).should("have.value", USER_PASSWORD);
    cy.get("#repeat-password")
      .type(USER_PASSWORD_REPEAT, { force: true })
      .should("have.value", USER_PASSWORD_REPEAT);
    cy.get(".CheckboxWithText16__CheckboxMark-hvAcoh > svg").click();

    cy.get(".Button__Wrapper-daKfZh > .BaseButton-lbLhfD")
      .should("be.visible")
      .click();
  });
});
