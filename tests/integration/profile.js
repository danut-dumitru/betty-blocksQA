import { Selector } from "testcafe";

import { BASE_URL, TESTING_USERNAME, TESTING_PASSWORD } from "../../util/env";
import loginSelectors from "../selectors/login.js";
import profileSelectors from "../selectors/profile.js";

fixture(`Profile picture tests`).page(`${BASE_URL}/login`);

test("Profile picture settings should be available in the account", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.login);
  await t.click(profileSelectors.myAccount);
  await t
    .expect(profileSelectors.loadPictureButton.exists)
    .ok()
    .expect(profileSelectors.saveProfilePicture.exists)
    .ok();
});

test("Upload and save a new avatar", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.login);
  await t.click(profileSelectors.myAccount);
  await t
    .setFilesToUpload(profileSelectors.loadPictureButton, [
      "../uploads/file1.jpg",
    ])
    .click(profileSelectors.saveProfilePicture);
});

test("Remove an uploaded avatar", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.login);
  await t.click(profileSelectors.myAccount);
  await t
    .setFilesToUpload(profileSelectors.loadPictureButton, [
      "../uploads/file1.jpg",
    ])
    .clearUpload(profileSelectors.loadPictureButton);
});

//The tests below will fail because it's a bug. Even if you upload an invalid file type or a large file it still triggers the save functionality
test("Upload an invalid file type", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.login);
  await t.click(profileSelectors.myAccount);
  await t
    .setFilesToUpload(profileSelectors.loadPictureButton, [
      "../uploads/empty.txt",
    ])
    .click(profileSelectors.saveProfilePicture)
    .expect(profileSelectors.uploadSuccessMessage.exists)
    .notOk();
});

test("Upload large size file", async (t) => {
  await t
    .typeText(loginSelectors.usernameInput, TESTING_USERNAME)
    .typeText(loginSelectors.passwordInput, TESTING_PASSWORD)
    .click(loginSelectors.login);
  await t.click(profileSelectors.myAccount);
  await t.setFilesToUpload(profileSelectors.loadPictureButton, [
    "../uploads/large-file.jpg",
  ]);
  await t
    .click(profileSelectors.saveProfilePicture)
    .expect(profileSelectors.uploadSuccessMessage.exists)
    .notOk();
});
