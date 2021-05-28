import { Selector } from "testcafe";

import { BASE_URL, TESTING_USERNAME, TESTING_PASSWORD } from "../../util/env";
import loginSelectors from "../selectors/login";

fixture("User login tests").page(`${BASE_URL}/login`);

    

test("User can login using valid credentials ", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.passwordVisible)
    .click(loginSelectors.login);
});

test("Error message is displayed in case of wrong credentials", async (t) => {
  await t
    .typeText(loginSelectors.passwordInput, "invalid@test.com")
    .typeText(loginSelectors.passwordInput, "Wrongpassword1")
    .click(loginSelectors.login);

  await t.expect(loginSelectors.badCredentialsMessage.exists).ok();
});

test("Error message is displayed in case of wrong password", async (t) => {
  await t
    .typeText(loginSelectors.passwordInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, 'Testing1234')
    .click(loginSelectors.login);

  await t.expect(loginSelectors.badCredentialsMessage.exists).ok();
});

test("Error messages are displayed in case of login with no input", async (t) => {
  await t
    .click(loginSelectors.usernameInput)
    .click(loginSelectors.passwordInput)
    .click(loginSelectors.usernameInput)
    .click(loginSelectors.login);

  const errorMessageNoInput = Selector("p").withText("This field is required")
    .count;
  await t.expect(errorMessageNoInput).eql(2);
});
