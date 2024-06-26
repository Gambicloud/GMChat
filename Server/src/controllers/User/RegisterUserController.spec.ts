import { app } from "../../app";
import request from "supertest";

import { AppDataSource } from '../../database/dataSource';
import { testsClient } from "../../utils/testsClient";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy(); 
});

describe("Register user controller", () => {
  it("Should be able to create a new user", async () => {
    const data = {
      name: "tester",
      email: "tester@itester.com",
      username: "testering",
      password: "tester123"
    };

    const response = await request(app).post('/register').send(data);
    
    const { password, ...userData } = data;
    const { id: _, ...userResponse } = response.body;

    await testsClient.connect();
    await testsClient.query(`DELETE FROM users WHERE username = '${ data.username }'`);

    expect(userResponse).toHaveProperty("status");
  });
})