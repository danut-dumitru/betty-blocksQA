import { Selector } from "testcafe";

export default {
  usernameInput: Selector("input[name=email_address]"),
  passwordInput: Selector("input[name=password]"),
  login: Selector('[type="submit"]'),
  logout: Selector('a[href$=login]'),
  passwordVisible: Selector('[type="button"]'),
  badCredentialsMessage: Selector("div[class*=MuiAlert-message]"),

};
