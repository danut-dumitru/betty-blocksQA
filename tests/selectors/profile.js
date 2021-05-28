import { Selector } from "testcafe";

export default {
  myAccount: Selector("a[href$=my-account]"),
  profileImage: Selector("h3").withText("Change profile image"),
  loadPictureButton: Selector("input[type=file]"),
  saveProfilePicture: Selector("button[type=submit]"),
  uploadSuccessMessage: Selector("div[role=alert]"),
};
