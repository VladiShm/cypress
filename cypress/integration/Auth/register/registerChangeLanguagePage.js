//Проверка перевода всей страницы и полей формы на разные языки
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
      expectedUsername: "Username",
      expectedEmail: "Email",
      expectedPassword: "Password",
      expectedRepeatPassword: "Repeat password",
      expectedRegisterButton: "Sign up",
      expectedTerms: "I have read and agreed to the Terms and Conditions",
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
      expectedUsername: "Nom de l'utilisateur",
      expectedEmail: "Email",
      expectedPassword: "Mot de passe",
      expectedRepeatPassword: "Répéter le mot de passe",
      expectedRegisterButton: "S'inscrire",
      expectedTerms:
        "J'ai lu et j'accepte les Termes et Conditions and Politique de confidentialité",
    },
    {
      name: "Spain",
      selector: ":nth-child(3) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Encuentre su comprador o proveedor de vino perfecto",
      expectedText: "con sólo unos pocos clics",
      expectedFooter: "Términos y Condiciones © 2024 World Wine List",
      expectedLogin: "Iniciar sesión",
      expectedSignUp: "Registrarse",
      expectedUsername: "Nombre del usuario",
      expectedEmail: "Email",
      expectedPassword: "Contraseña",
      expectedRepeatPassword: "Repetir contraseña",
      expectedRegisterButton: "Registrarse",
      expectedTerms:
        "He leído y acepto los Términos y Condiciones y la Política de Privacidad",
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
      expectedUsername: "Nome utente",
      expectedEmail: "Email",
      expectedPassword: "Password",
      expectedRepeatPassword: "Ripetere la password",
      expectedRegisterButton: "Registrarsi",
      expectedTerms:
        "Ho letto e accettato i termini e le condizioni e la Privacy Policy",
    },
    {
      name: "Germany",
      selector: ":nth-child(5) > .Select__ItemTitle-ckBTRd",
      expectedTitle: "Finden Sie Ihren perfekten Weinkäufer oder Lieferanten",
      expectedText: "in nur wenigen Klicks",
      expectedFooter: "Allgemeine Geschäftsbedingungen © 2024 World Wine List",
      expectedLogin: "Anmelden",
      expectedSignUp: "Registrieren",
      expectedUsername: "Benutzername",
      expectedEmail: "E-Mail",
      expectedPassword: "Passwort",
      expectedRepeatPassword: "Passwort wiederholen",
      expectedRegisterButton: "Registrieren",
      expectedTerms:
        "Ich habe die Nutzungsbedingungen und die Datenschutzrichtlinie gelesen und stimme ihnen zu",
    },
  ];

  languages.forEach((language) => {
    it(`should display correct text for ${language.name}`, () => {
      cy.visit(LOGIN_PATH);
      cy.get(".Header__Signup-jnfbBp").click();

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
      cy.get(".Name__Label-iCxMnV").should(
        "contain",
        language.expectedUsername
      );
      cy.get(".Email__Label-hEOSLw").should("contain", language.expectedEmail);
      cy.get(".Password__Label-cmDVDu").should(
        "contain.text",
        language.expectedPassword
      );
      cy.get(".RepeatPassword__Label-dEkLtq").should(
        "contain",
        language.expectedRepeatPassword
      );
      cy.get(".Button__Wrapper-daKfZh > .BaseButton-lbLhfD").should(
        "contain",
        language.expectedRegisterButton
      );

      cy.get(".CheckboxWithText16__LabelWrapper-hVGbsu").should(
        "contain",
        language.expectedTerms
      );
    });
  });
});
