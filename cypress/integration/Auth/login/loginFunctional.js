const languages = [
  {
    lang_name: "English",
    selector: ":nth-child(1) > .Select__ItemTitle-ckBTRd",
    error: "We couldn’t find your account on WWL",
  },
  {
    lang_name: "Français",
    selector: ":nth-child(2) > .Select__ItemTitle-ckBTRd",
    error: "Nous n'avons pas pu trouver votre compte sur WWL",
  },
  {
    lang_name: "Español",
    selector: ":nth-child(3) > .Select__ItemTitle-ckBTRd",
    error: "No hemos podido encontrar su cuenta en WWL",
  },
  {
    lang_name: "Italiano",
    selector: ":nth-child(4) > .Select__ItemTitle-ckBTRd",
    error: "Non siamo riusciti a trovare il suo account su WWL",
  },
  {
    lang_name: "Deutsche",
    selector: ":nth-child(5) > .Select__ItemTitle-ckBTRd",
    error: "Wir konnten Ihr Benutzerkonto auf WWL nicht finden",
  },
];

const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";
const EMAIL_SELECTOR = "#email";
const PASSWORD_SELECTOR = "#password";
const LOGIN_BUTTON_SELECTOR = ".Button__Wrapper-cbalPZ > .BaseButton-lbLhfD";
const LANGUAGE_SWITCHER_SELECTOR = ".LanguageSwitcher__Lang-cWyqIz";
const ERROR_SELECTOR = ".Email__Error-iaaiQE";

// Вводим данные email и пароль
function inputCredentials(email, password) {
  if (email) {
    cy.get(EMAIL_SELECTOR).clear().type(email).should("have.value", email);
  }
  if (password) {
    cy.get(PASSWORD_SELECTOR)
      .clear()
      .type(password)
      .should("have.value", password);
  }
}

// Проверяем состояние кнопки "log in"
function checkLoginButtonState(shouldBeEnabled) {
  cy.get(LOGIN_BUTTON_SELECTOR).should(
    shouldBeEnabled ? "be.enabled" : "be.disabled"
  );
}

// Переключаем язык и проверяем текст ошибки
function switchLanguageAndCheckError(language) {
  cy.get(LANGUAGE_SWITCHER_SELECTOR).click();
  cy.get(language.selector).click();
  cy.get(ERROR_SELECTOR).should("contain.text", language.error);
}

// Проверка списка языков в выпадающем меню
describe("loginFunctional", () => {
  it("languageList", () => {
    cy.visit(LOGIN_PATH);
    cy.get(LANGUAGE_SWITCHER_SELECTOR).click();
    languages.forEach((language) => {
      cy.get(language.selector).should("contain.text", language.lang_name);
    });
  });
});

// Кнопка "log in" активируется при корректно введенных данных
describe("EnableLoginButton", () => {
  const EMAIL = "test1@gmail.com";
  const PASSWORD = "wwlglobaldata2021";

  it("YesEmailAndPassword", () => {
    cy.visit(LOGIN_PATH);
    inputCredentials(EMAIL, PASSWORD);
    checkLoginButtonState(true);
  });
});

// Кнопка "log in" не активируется при некорректно введенных данных
describe("DisableLoginButton", () => {
  const EMAIL = "test1@gmail.com";
  const PASSWORD = "wwlglobaldata2021";

  // Введен email, не введен пароль
  it("NoPassword", () => {
    cy.visit(LOGIN_PATH);
    inputCredentials(EMAIL, "");
    checkLoginButtonState(false);
  });

  // Не введен email, введен пароль
  it("NoEmail", () => {
    cy.get(EMAIL_SELECTOR).clear();
    cy.get(PASSWORD_SELECTOR).clear();
    inputCredentials("", PASSWORD);
    checkLoginButtonState(false);
  });

  // Не введен email, не введен пароль
  it("NoEmailAndPassword", () => {
    inputCredentials("", "");
    checkLoginButtonState(false);
  });
});

// Тесты авторизации пользователя
describe("LoginUser", () => {
  const EMAIL = "test1@gmail.com";
  const PASSWORD = "wwlglobaldata2021";
  const UNCORRECT_EMAIL = "test1@test.com";
  const UNCORRECT_PASSWORD = "wwlglobaldata2021";

  // Авторизация с корректными данными
  it("UserWithCorrectData", () => {
    cy.visit(LOGIN_PATH);
    inputCredentials(EMAIL, PASSWORD);
    cy.get(LOGIN_BUTTON_SELECTOR).click();
    cy.url().should("include", "https://rc-0.worldwinelist.com/acc");
  });

  // Авторизация с некорректными данными (+ проверка перевода ошибок)
  it("UserWithUncorrectData", () => {
    cy.visit(LOGIN_PATH);
    inputCredentials(UNCORRECT_EMAIL, UNCORRECT_PASSWORD);
    cy.get(LOGIN_BUTTON_SELECTOR).click();
    languages.forEach(switchLanguageAndCheckError);
  });
});
