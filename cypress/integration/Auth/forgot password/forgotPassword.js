//!Из-за бага некоторые тесты не проходят(баг задокументирован)
describe("loginFunctional", () => {
  const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";
  const FORGOT_PATH = "https://rc-0.worldwinelist.com/acc/forgot-password";
  const EXIST_USER_EMAIL = "test1@gmail.com";
  const UNCORRECT_USER_EMAIL = "test1@12312.com";
  const NOT_EXIST_USER_EMAIL = "test1@mail.com";

  it("openForgotPassword", () => {
    cy.visit(LOGIN_PATH);

    cy.wait(3000);
    cy.get(".Forgot__Wrapper-iVQOBk").click();
  });

  //восстановление пароля для существуюшего пользователя
  it("existUser", () => {
    cy.get("#email")
      .type(EXIST_USER_EMAIL)
      .should("have.value", EXIST_USER_EMAIL);
    cy.get(".Button__Wrapper-fZazvH > .BaseButton-lbLhfD").click();
  });

  //восстановление для несуществующего пользователя
  it("notExistUser", () => {
    cy.visit(FORGOT_PATH);
    cy.get("#email")
      .type(NOT_EXIST_USER_EMAIL)
      .should("have.value", NOT_EXIST_USER_EMAIL);
    cy.get(".Button__Wrapper-fZazvH > .BaseButton-lbLhfD").click();
    cy.get(".Email__Error-fLCHYT")
      .should("be.visible")
      .and("contain.text", "We couldn’t find your account on WWL");
  });
});
