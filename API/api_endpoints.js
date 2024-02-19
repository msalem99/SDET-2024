const request = require("supertest");

async function authenticateUser(server, body) {
  const response = await request(server).post("/api/v1/auth").send(body);
  return response;
}
async function createUser(server, body) {
  const response = await request(server).post("/api/v1/users").send(body);
  return response;
}
async function getUser(server, token) {
  const response = await request(server)
    .get("/api/v1/users")
    .set("Authorization", token);
  return response;
}
async function patchUser(server, token, body) {
  const response = await request(server)
    .patch("/api/v1/users")
    .send(body)
    .set("Authorization", token);
  return response;
}
async function deleteUser(server, token) {
  const response = await request(server)
    .delete("/api/v1/users")
    .set("Authorization", token);
  return response;
}
async function deleteAllUsers(server, admin) {
  const response = await request(server)
    .delete("/api/v1/all-users")
    .send(admin);

  return response;
}
module.exports = {
  authenticateUser,
  createUser,
  getUser,
  patchUser,
  deleteUser,
  deleteAllUsers,
};
