const { server } = require("mock-user-auth/bin/www.js");
const request = require("supertest");
const fs = require("fs");

const {
  defaultUser,
  loginDefaultUser,
  loginDefaultUserWrongPassword,
  nonRegisteredUser,
  loginDefaultUserWithoutEmail,
  modifiedToken,
  modifiedDefaultUser,
  newPasswordDefaultUser,
  adminCreds,
  loginModifiedDefaultUser,
} = require("./test_data");

const {
  authenticateUser,
  createUser,
  getUser,
  patchUser,
  deleteUser,
  deleteAllUsers,
} = require("./api_endpoints");

const filePath = "./node_modules/mock-user-auth/components/mock/users.json";

describe("Auth API tests", function () {
  afterAll((done) => {
    server.close();
    // This is to ensure that the file used as a DB is emptied after the tests run
    // to preserve a clean DB state Before and after the test suite runs
    // This is equivalent to destroying a test database
    fs.writeFile(filePath, JSON.stringify({ users: [] }), (err) => {
      if (err) {
        console.error("Error clearing JSON file:", err);
        done.fail(err);
      } else {
        console.log("JSON file cleared successfully");
        done();
      }
    });
  });

  beforeAll((done) => {
    // This is to ensure that the file used as a DB is emptied after the tests run
    // This is equivalent to initializing a test database
    fs.writeFile(filePath, JSON.stringify({ users: [] }), (err) => {
      if (err) {
        console.error("Error clearing JSON file:", err);
        done.fail(err);
      } else {
        console.log("JSON file cleared successfully");
        done();
      }
    });
  });

  afterEach(async () => {
    const deleteAllUsersResponse = await deleteAllUsers(server, adminCreds);
    expect(deleteAllUsersResponse.statusCode).toEqual(200);
    expect(deleteAllUsersResponse.body).toHaveProperty(
      "message",
      "Users deleted with success"
    );
  });

  it("Creates a user successfully", async function () {
    const response = await createUser(server, defaultUser);
    expect(response.statusCode).toEqual(200);
  });

  it("Returns a token after successful user creation", async function () {
    const response = await createUser(server, defaultUser);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "User registered with success"
    );
    expect(response.body).toHaveProperty("token");
  });

  it("Fails to create a user with empty body request", async function () {
    const response = await createUser(server, {});
    expect(response.statusCode).not.toEqual(200);
  });

  it("Fails to create a user that's already existing", async function () {
    const firstResponse = await createUser(server, defaultUser);
    expect(firstResponse.statusCode).toEqual(200);
    const secondResponse = await createUser(server, defaultUser);
    expect(secondResponse.statusCode).toEqual(401);
    expect(secondResponse.body).toHaveProperty(
      "message",
      "User already registered"
    );
  });

  it("Creates user and logins successfully", async function () {
    const firstResponse = await createUser(server, defaultUser);
    expect(firstResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.statusCode).toEqual(200);
    expect(loginResponse.body).toHaveProperty("token");
  });

  it("Creates user and fails to login with wrong password", async function () {
    const firstResponse = await createUser(server, defaultUser);
    expect(firstResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(
      server,
      loginDefaultUserWrongPassword
    );
    expect(loginResponse.statusCode).toEqual(401);
    expect(loginResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
  });

  it("Creates user and fails to login with only name and  password", async function () {
    const firstResponse = await createUser(server, defaultUser);
    expect(firstResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(
      server,
      loginDefaultUserWithoutEmail
    );
    expect(loginResponse.statusCode).toEqual(401);
    expect(loginResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
  });

  it("Fails to login with non existant User", async function () {
    const loginResponse = await authenticateUser(server, nonRegisteredUser);
    expect(loginResponse.statusCode).toEqual(401);
    expect(loginResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
  });

  it("Successfully gets existant user data", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const getUserResponse = await getUser(server, token);
    expect(getUserResponse.statusCode).toEqual(200);
    expect(getUserResponse.body).toHaveProperty("id");
    expect(getUserResponse.body).toHaveProperty("name", defaultUser.name);
    expect(getUserResponse.body).toHaveProperty("email", defaultUser.email);
    expect(getUserResponse.body).toHaveProperty(
      "password",
      defaultUser.password
    );
  });

  it("Fails to get user data with modified token", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const getUserResponse = await getUser(server, modifiedToken);
    expect(getUserResponse.statusCode).toEqual(403);
    expect(getUserResponse.body).toHaveProperty("message", "Unauthorized");
  });

  it("Successfully patches existing user data and gets the correct data after patching using new token", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const patchUserResponse = await patchUser(
      server,
      token,
      modifiedDefaultUser
    );
    expect(patchUserResponse.statusCode).toEqual(200);
    expect(patchUserResponse.body).toHaveProperty(
      "message",
      "User updated with success!"
    );
    const loginNewTokenResponse = await authenticateUser(
      server,
      loginModifiedDefaultUser
    );
    expect(loginNewTokenResponse.body).toHaveProperty("token");
    const newToken = loginNewTokenResponse.body.token;
    expect(newToken).not.toEqual(token);
    const getUserResponse = await getUser(server, newToken);
    expect(getUserResponse.statusCode).toEqual(200);
    expect(getUserResponse.body).toHaveProperty("id");
    expect(getUserResponse.body).toHaveProperty(
      "name",
      modifiedDefaultUser.name
    );
    expect(getUserResponse.body).toHaveProperty(
      "email",
      modifiedDefaultUser.email
    );
    expect(getUserResponse.body).toHaveProperty(
      "password",
      modifiedDefaultUser.password
    );
  });

  it("Successfully patches existing user data and fails to get the correct data after patching using old token", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const patchUserResponse = await patchUser(
      server,
      token,
      modifiedDefaultUser
    );
    expect(patchUserResponse.statusCode).toEqual(200);
    expect(patchUserResponse.body).toHaveProperty(
      "message",
      "User updated with success!"
    );
    const getUserResponse = await getUser(server, token);
    expect(getUserResponse.statusCode).toEqual(403);
  });

  it("Successfully patches existing user password and fails to login with old password", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const patchUserResponse = await patchUser(
      server,
      token,
      newPasswordDefaultUser
    );
    expect(patchUserResponse.statusCode).toEqual(200);
    expect(patchUserResponse.body).toHaveProperty(
      "message",
      "User updated with success!"
    );
    const loginNewTokenResponse = await authenticateUser(
      server,
      loginDefaultUser
    );
    expect(loginNewTokenResponse.statusCode).toEqual(401);
    expect(loginNewTokenResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
  });

  it("Fails to patch existing user with empty data", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const patchUserResponse = await patchUser(server, token, {});
    expect(patchUserResponse.statusCode).toEqual(400);
  });

  it("Fails to patch with invalid token", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");

    const patchUserResponse = await patchUser(server, modifiedToken, {});
    expect(patchUserResponse.statusCode).toEqual(403);
  });

  it("Successfully deletes the user and fails to login or get the user after deletion", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.body).toHaveProperty("token");
    const token = loginResponse.body.token;
    const deleteUserResponse = await deleteUser(server, token);
    expect(deleteUserResponse.statusCode).toEqual(200);
    expect(deleteUserResponse.body).toHaveProperty(
      "message",
      "User deleted with success!"
    );
    const getUserResponse = await getUser(server, token);
    expect(getUserResponse.statusCode).toEqual(403);

    const newLoginResponse = await authenticateUser(server, defaultUser);
    expect(newLoginResponse.statusCode).toEqual(401);
    expect(newLoginResponse.body).toHaveProperty(
      "message",
      "Incorrect email or password"
    );
  });

  it("Fails to delete user with invalid token", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const deleteUserResponse = await deleteUser(server, modifiedToken);
    expect(deleteUserResponse.statusCode).toEqual(403);
    expect(deleteUserResponse.body).toHaveProperty(
      "message",
      "Unauthorized to delete"
    );
  });

  it("Successfully deletes all users using admin creds", async function () {
    const registerResponse = await createUser(server, defaultUser);
    expect(registerResponse.statusCode).toEqual(200);
    const registerResponse2 = await createUser(server, modifiedDefaultUser);
    expect(registerResponse2.statusCode).toEqual(200);

    const deleteAllUsersResponse = await deleteAllUsers(server, adminCreds);
    expect(deleteAllUsersResponse.statusCode).toEqual(200);
    expect(deleteAllUsersResponse.body).toHaveProperty(
      "message",
      "Users deleted with success"
    );
    const loginResponse = await authenticateUser(server, loginDefaultUser);
    expect(loginResponse.statusCode).toEqual(401);
    const secondLoginResponse = await authenticateUser(
      server,
      loginModifiedDefaultUser
    );
    expect(secondLoginResponse.statusCode).toEqual(401);
  });
});
