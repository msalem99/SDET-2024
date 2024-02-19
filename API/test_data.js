const defaultName = "user";
const defaultEmail = "user@gmail.com";
const defaultPassword = "user123";
const wrongPassword = "wrongpassword";

const modifiedName = "modifieduser";
const modifiedEmail = "modifieduser@gmail.com";
const modifiedPassword = "modifiedpassword";

const nonRegisteredUserName = "user1";
const nonRegisteredUserEmail = "user1@gmail.com";
const nontRegisteredUserPassword = "user123";

const defaultUser = {
  name: defaultName,
  email: defaultEmail,
  password: defaultPassword,
};

const loginDefaultUser = {
  email: defaultEmail,
  password: defaultPassword,
};

const loginDefaultUserWithoutEmail = {
  name: defaultEmail,
  password: defaultPassword,
};

const loginDefaultUserWrongPassword = {
  ...loginDefaultUser,
  password: wrongPassword,
};

const nonRegisteredUser = {
  name: nonRegisteredUserName,
  email: nonRegisteredUserEmail,
  password: nontRegisteredUserPassword,
};

const adminCreds = {
  key_admin: "keyadmin123",
};

const modifiedDefaultUser = {
  name: modifiedName,
  email: modifiedEmail,
  password: modifiedPassword,
};
const loginModifiedDefaultUser = {
  email: modifiedEmail,
  password: modifiedPassword,
};
const newPasswordDefaultUser = {
  name: defaultName,
  email: defaultEmail,
  password: modifiedPassword,
};

const modifiedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOjgzNjYyLCJpYXQiOjE3MDgzODAzMjcsImV4cCI6MTcwODQ2NjcyN30.IkszB6QLHXbu3U0x-4o-pSqfVKPNVasdOpU-3U0";

module.exports = {
  defaultUser,
  loginDefaultUser,
  loginDefaultUserWrongPassword,
  nonRegisteredUser,
  loginDefaultUserWithoutEmail,
  adminCreds,
  modifiedToken,
  modifiedDefaultUser,
  newPasswordDefaultUser,
  loginModifiedDefaultUser,
};
