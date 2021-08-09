import { connection, disconnect } from 'mongoose';
import request from 'supertest';
import app from '../../../app';
import { connectTestDB } from '../../../mongodb';

beforeAll(connectTestDB);

beforeEach(async () => {
    await connection.db.dropDatabase();
});

afterAll(async () => {
    await disconnect();
});

it('Should get authed user\'s information', async () => {
    const testUser = {
        email: "test@gmail.com",
        username: "testUser",
        password: "123123"
    };

    const user = await request(app.callback())
        .post('/users')
        .send(testUser);

    const tokenResponse = await request(app.callback())
        .post('/users/auth')
        .send({
            email: testUser.email,
            password: testUser.password
        });

    const token = `bearer ${tokenResponse.body.token}`;

    const response = await request(app.callback())
        .get(`/users/${user.body.user._id}`)
        .set({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
        });

    expect(response.status).toBe(200);
    expect(response.body.user._id).toBe(user.body.user._id);
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.user.username).toBe(testUser.username);
});