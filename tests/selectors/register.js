import { Selector } from "testcafe";

export default {
  registerNewAccount: Selector("a[role=button]"),
  firstName: Selector("input[name=first_name]"),
  lastName: Selector("input[name=last_name]"),
  emailAddress: Selector("input[name=email_address]"),
  password: Selector("input[name=password]"),
  createAccount: Selector("button[type=submit]"),
  accountCreatedMessage: Selector("div").withText("Account created"),
  emailAlreadyUsed: Selector("div").withText("error: email already exists"),
  backToLoginPage: Selector("a[role=button]"),
  loginPage: Selector("h3").withText("Login flow"),
};
