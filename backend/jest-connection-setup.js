const { establishConnection, endConnection } = require("./src/database");

beforeAll(async () => {
 return await establishConnection();
});

afterAll(async () => {
  return await endConnection();
});