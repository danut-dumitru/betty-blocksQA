import { Selector } from "testcafe";
import faker from "faker";

import { BASE_URL, TESTING_USERNAME } from "../../util/env";
import registerSelectors from "../selectors/register.js";

const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomEmailAddress = faker.internet.email("testing");
const passwordUsed = "Pa123459";

fixture("Register new account tests").page(`${BASE_URL}/login`);

test("User can go back to the login page from the registration page", async (t) => {
  await t.click(registerSelectors.registerNewAccount);
  await t.click(registerSelectors.backToLoginPage);
  await t.expect(registerSelectors.loginPage.exists).ok();
});

test("Register new account", async (t) => {
  await t.click(registerSelectors.registerNewAccount);
  await t
    .typeText(registerSelectors.firstName, randomFirstName)
    .typeText(registerSelectors.lastName, randomLastName)
    .typeText(registerSelectors.emailAddress, randomEmailAddress)
    .typeText(registerSelectors.password, passwordUsed);
  await t.click(registerSelectors.createAccount);

  await t.expect(registerSelectors.accountCreatedMessage.exists).ok();
});

test("Error messages displayed in case of no input register attempt", async (t) => {
  await t.click(registerSelectors.registerNewAccount);
  await t.click(registerSelectors.firstName);
  await t.click(registerSelectors.lastName);
  await t.click(registerSelectors.emailAddress);
  await t.click(registerSelectors.password);
  await t.click(registerSelectors.createAccount);

  const errorMessageNoInput = Selector("p").withText("This field is required")
    .count;
  await t.expect(errorMessageNoInput).eql(4);
});

test("Using an existing registered email to register a new account", async (t) => {
  await t.click(registerSelectors.registerNewAccount);
  await t
    .typeText(registerSelectors.firstName, randomFirstName)
    .typeText(registerSelectors.lastName, randomLastName)
    .typeText(registerSelectors.emailAddress, TESTING_USERNAME )
    .typeText(registerSelectors.password, passwordUsed);
  await t.click(registerSelectors.createAccount);
  await t.expect(registerSelectors.emailAlreadyUsed.exists).ok();
});
