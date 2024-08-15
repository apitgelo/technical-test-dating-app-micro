import { connect, clearDatabase, closeDatabase } from "./db-handler";

beforeAll(async () => {
  await connect();
  jest.setTimeout(70000);
});

beforeEach(async () => {
  jest.clearAllMocks();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});
