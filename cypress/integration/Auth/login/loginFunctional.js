describe("loginFunctional", () => {
  const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";
  const languages = [
    {
      lang_name: "English",
      selector: ":nth-child(1) > .Select__ItemTitle-ckBTRd",
    },
    {
      lang_name: "Français",
      selector: ":nth-child(2) > .Select__ItemTitle-ckBTRd",
    },
    {
      lang_name: "Español",
      selector: ":nth-child(3) > .Select__ItemTitle-ckBTRd",
    },
    {
      lang_name: "Italiano",
      selector: ":nth-child(4) > .Select__ItemTitle-ckBTRd",
    },
    {
      lang_name: "Deutsche",
      selector: ":nth-child(5) > .Select__ItemTitle-ckBTRd",
    },
  ];

  it("languageList", () => {
    cy.visit(LOGIN_PATH);

    cy.get(".LanguageSwitcher__Lang-cWyqIz").click();
    languages.forEach((language) => {
      cy.get(language.selector).should("contain.text", language.lang_name);
    });
  });

  it("changeLanguage", () => {});
});
