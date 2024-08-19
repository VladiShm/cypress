describe("change_language", () => {
  const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";

  const languages = [
    {
      name: "English",
      selector: ":nth-child(1) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Find your perfect wine buyer or supplier",
      expectedText: "in just a few clicks",
      expectedFooter: "Terms and Conditions © 2024 World Wine List",
      expectedLogin: "Log in",
      expectedSignUp: "Sign Up",
      expectedEmail: "Email",
      expectedPassword: "Password",
      expectedForgorPassword: "Forgot password?",
      expectedLoginButton: "Log in",
    },
    {
      name: "French",
      selector: ":nth-child(2) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Trouvez votre meilleur acheteur ou fournisseur",
      expectedText: "en quelques cliques",
      expectedFooter:
        "Conditions générales d'utilisation © 2024 World Wine List",
      expectedLogin: "Connexion",
      expectedSignUp: "S'inscrire",
      expectedEmail: "Email",
      expectedPassword: "Mot de passe",
      expectedForgorPassword: "Mot de passe oublié?",
      expectedLoginButton: "Connexion",
    },
    {
      name: "Spain",
      selector: ":nth-child(3) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Encuentre su comprador o proveedor de vino perfecto",
      expectedText: "con sólo unos pocos clics",
      expectedFooter: "Términos y Condiciones © 2024 World Wine List",
      expectedLogin: "Iniciar sesión",
      expectedSignUp: "Registrarse",
      expectedEmail: "Email",
      expectedPassword: "Contraseña",
      expectedForgorPassword: "¿Olvidaste tu contraseña?",
      expectedLoginButton: "Iniciar sesión",
    },
    {
      name: "Italy",
      selector: ":nth-child(4) > .Select__ItemTitle-ckBTRd",
      expectedTitle:
        "Trovate l'acquirente o fornitore di vino perfetto per voi",
      expectedText: "in pochi clic",
      expectedFooter: "Termini e condizioni © World Wine List 2024",
      expectedLogin: "Accedi",
      expectedSignUp: "Registrarsi",
      expectedEmail: "Email",
      expectedPassword: "Password",
      expectedForgorPassword: "Password dimenticata?",
      expectedLoginButton: "Accedi",
    },
    {
      name: "Germany",
      selector: ":nth-child(5) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Finden Sie Ihren perfekten Weinkäufer oder Lieferanten",
      expectedText: "in nur wenigen Klicks",
      expectedFooter: "Allgemeine Geschäftsbedingungen © 2024 World Wine List",
      expectedLogin: "Anmelden",
      expectedSignUp: "Registrieren",
      expectedEmail: "E-Mail",
      expectedPassword: "Passwort",
      expectedForgorPassword: "Passwort vergessen?",
      expectedLoginButton: "Anmelden",
    },
  ];

  languages.forEach((language) => {
    it(`should display correct text for ${language.name}`, () => {
      cy.visit(LOGIN_PATH);

      cy.get(".LanguageSwitcher__Lang-cWyqIz")
        .should("be.visible")
        .click()
        .get(language.selector)
        .click();

      cy.get(".Slider__Title-hrJjCx").should("contain", language.expectedTitle);
      cy.get(".Slider__Text-eAMDHM").should("contain", language.expectedText);
      cy.get(".Footer__Link-iXAPaN").should("contain", language.expectedFooter);
      cy.get(".Footer__Link-iXAPaN").should("contain", language.expectedFooter);

      //form
      cy.get(".Email__Label-eHsORC").should("contain", language.expectedEmail);
      cy.get(".Password__Label-egEtFp").should(
        "contain.text",
        language.expectedPassword
      );
      cy.get(".Forgot__Title-kyevmv").should(
        "contain",
        language.expectedForgorPassword
      );
      cy.get(".Button__Title-jKgURi").should(
        "contain",
        language.expectedLoginButton
      );
    });
  });
});
