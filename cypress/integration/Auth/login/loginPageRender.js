describe("login", () => {
  const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";

  //Проверка отрисовки страницы при входе в систему
  it("Checking the title/subtitle", () => {
    cy.visit(LOGIN_PATH);
    //Заголовки
    cy.get(".Slider__Title-hrJjCx").should("exist");
    cy.get(".Slider__Text-eAMDHM").should("exist");
  });

  it("Checking the rendering of the login form", () => {
    cy.get(".Form__Wrapper-eMWYFR").should("exist");
    cy.get(".Header__Wrapper-leYDnP > :nth-child(1)").should("exist");
    cy.get(".Header__Signup-jnfbBp").should("exist");
    cy.get("#email").should("exist");
    cy.get(".Email__Label-eHsORC").should("exist");
    cy.get("#password").should("exist");
    cy.get(".Password__Label-egEtFp").should("exist");
    cy.get(".Forgot__Title-kyevmv").should("exist");
    cy.get(".BaseButton-lbLhfD").should("exist");
    cy.get(".Button__Title-jKgURi").should("exist");
    cy.get(".NotSee__Wrapper-kxRall").should("exist");
  });

  //Наличие уведомления о Cookie policy при первом входе в систему
  it("Are the cookies?", () => {
    cy.visit(LOGIN_PATH);
    cy.get(".Desktop__Wrapper-iPwTrV").should("exist");
    cy.get(".Desktop__Image-jvwlMF").should("exist");
  });
});
