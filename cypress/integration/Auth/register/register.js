/// <reference types="cypress" />;
const REGISTER_PATH = "https://test.worldwinelist.com/acc/signup";
const LOGIN_PATH = "https://rc-0.worldwinelist.com/acc/login";
const REGISTER_BUTTON_SELECTOR = ".Button__Wrapper-daKfZh > .BaseButton-lbLhfD";

const errorList = [
  {
    name: "English",
    selector: ":nth-child(1) > .Select__ItemTitle-ckBTRd",
    usernameError:
      'The username should contain 3-30 characters, only Latin letters, numbers and the following characters: "-", "." and "_"',
    existError: "Sorry, the username is already taken",
  },
  {
    name: "French",
    selector: ":nth-child(2) > .Select__ItemTitle-ckBTRd",
    usernameError:
      'Le nom d\'utilisateur doit contenir des caractères 3-30, uniquement des lettres latines, des chiffres et les caractères suivants:" -","."et"_"',
    existError: "Désolé, le nom d'utilisateur est déjà pris",
  },
  {
    name: "Spain",
    selector: ":nth-child(3) > .Select__ItemTitle-ckBTRd",
    usernameError:
      'El nombre del usuario debe contener 3-30 caracteres, solo letras latinas, números y los siguientes caracteres: "-", "." y "_"',
    existError: "Lo siento, el nombre de usuario ya ha sido tomado",
  },
  {
    name: "Italy",
    selector: ":nth-child(4) > .Select__ItemTitle-ckBTRd",
    usernameError:
      'Il nome utente deve contenere 3-30 caratteri, solo lettere latine, numeri e i seguenti caratteri: "-", "." e "_"',
    existError: "Siamo spiacenti, ma il nome utente è già in uso",
  },
  {
    name: "Germany",
    selector: ":nth-child(5) > .Select__ItemTitle-ckBTRd",
    usernameError:
      'Der Benutzername sollte 3-30 Zeichen, nur lateinische Buchstaben, Zahlen und die folgenden Zeichen: "-", "." und "_" enthalten',
    existError: "Entschuldigung, der Benutzername ist schon vergeben",
  },
];

const fillRegistrationForm = ({
  username,
  email,
  password,
  passwordRepeat = "",
}) => {
  cy.get("#name").type(username).should("have.value", username);
  cy.get("#email").type(email).should("have.value", email);
  cy.get("#password").type(password).should("have.value", password);
  if (passwordRepeat) {
    cy.get("#repeat-password")
      .type(passwordRepeat, { force: true })
      .should("have.value", passwordRepeat);
  }
  cy.get(".CheckboxWithText16__CheckboxMark-hvAcoh > svg").click();
};

const checkTranslateErrors = () => {};

// Проверка состояния  кнопки "Sign up"
const checkRegisterButtonState = (shouldBeEnabled) => {
  cy.get(REGISTER_BUTTON_SELECTOR).should(
    shouldBeEnabled ? "not.have.class" : "have.class",
    shouldBeEnabled ? "disabled" : "disabled"
  );
};

//Проверка цвета кнопки
const checkButtonColor = (buttonColor) => {
  cy.get(".Button__Wrapper-daKfZh > .BaseButton-lbLhfD").should(
    "have.css",
    "background-color",
    buttonColor
  );
};

describe("register", () => {
  const USERNAME = "auto_test4";
  const USER_EMAIL = "user4@example.com";
  const USER_PASSWORD = "Hello123";
  const USER_PASSWORD_REPEAT = "Hello123";

  //Наличие уведомления о Cookie policy при первом входе в систему
  it("Are the cookies?", () => {
    cy.visit(REGISTER_PATH);
    cy.get(".Desktop__Wrapper-iPwTrV").should("be.visible");
  });
});

describe("registerUser", () => {
  //регистрация существующего пользователя
  it("checkExistUser", () => {
    const USERNAME = "test2_2";
    const EMAIL = "test2@gmail.com";
    const PASSWORD = "WWL2021gb";
    cy.visit(REGISTER_PATH);

    fillRegistrationForm({
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
      passwordRepeat: PASSWORD,
    });

    errorList.forEach((elem) => {
      cy.get(".LanguageSwitcher__Lang-cWyqIz")
        .click()
        .get(elem.selector)
        .click();
      cy.get(".Name__Error-itAtBH")
        .should("be.visible")
        .and("contain.text", elem.existError);
    });
  });
});

describe("checkSignUpButton", () => {
  const ENABLE_COLOR = "rgb(136, 18, 43)";
  const DISABLE_COLOR = "rgb(231, 231, 234)";

  const USERNAME = "test21_2";
  const EMAIL = "test2@gmail.com";
  const PASSWORD = "WWL2021gb";

  //sign up is enabled(корректно введенные данные)
  it("checkInputCorrectData", () => {
    cy.visit(REGISTER_PATH);
    fillRegistrationForm({
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
      passwordRepeat: PASSWORD,
    });
    checkRegisterButtonState(true);
    checkButtonColor(ENABLE_COLOR);
  });

  //sign up is disabled(поля заполнены частично)
  it("checkInputNotFullData", () => {
    cy.visit(REGISTER_PATH);
    fillRegistrationForm({
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
    });

    checkRegisterButtonState(false);
    checkButtonColor(DISABLE_COLOR);
  });

  //sign up is disabled(поля заполнены некорректными данными)
  it("checkInputUncorrectData", () => {
    const UNCORRECT_USERNAME = "te";
    cy.visit(REGISTER_PATH);
    fillRegistrationForm({
      username: UNCORRECT_USERNAME,
      email: EMAIL,
      password: PASSWORD,
      passwordRepeat: PASSWORD,
    });
    checkRegisterButtonState(false);
    checkButtonColor(DISABLE_COLOR);
  });

  //sign up is disabled(очищение обязательного поля)
  it("checkDeleteRequiredField", () => {
    cy.visit(REGISTER_PATH);
    fillRegistrationForm({
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
      passwordRepeat: PASSWORD,
    });
    checkRegisterButtonState(true);
    checkButtonColor(ENABLE_COLOR);
    cy.get(".CheckboxWithText16__CheckboxMark-hvAcoh > svg").click();
    checkRegisterButtonState(false);
    checkButtonColor(DISABLE_COLOR);
  });
});

desctribe("checkFieldErrors", () => {
  it("checkNotEqualPassword", () => {});
});
