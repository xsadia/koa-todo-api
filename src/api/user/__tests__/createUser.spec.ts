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

it(' should create user if credentials unique', async () => {
    const testUser = {
        email: "test@gmail.com",
        username: "testUser",
        password: "123123"
    };
    const response = await request(app.callback())
        .post('/users')
        .send(testUser);
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.user.username).toBe(testUser.username);
    expect(response.body.user._id).toBeDefined();
});

it('should return error if email is not unique', async () => {
    const testUser = {
        email: "test@gmail.com",
        username: "testUser",
        password: "123123"
    };

    const testUser2 = {
        email: "test@gmail.com",
        username: "testUser2",
        password: "123123"
    };

    await request(app.callback())
        .post('/users')
        .send(
            testUser
        );

    const response = await request(app.callback())
        .post('/users')
        .send(
            testUser2
        );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('E-mail already in use');
});

it('should return error if username is not unique', async () => {
    const testUser = {
        email: "test@gmail.com",
        username: "testUser",
        password: "123123"
    };

    const testUser2 = {
        email: "test1@gmail.com",
        username: "testUser",
        password: "123123"
    };

    await request(app.callback())
        .post('/users')
        .send(
            testUser
        );

    const response = await request(app.callback())
        .post('/users')
        .send(
            testUser2
        );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username already in use');
});

it('Should return error if e-mail is not present in request body', async () => {
    const response = await request(app.callback())
        .post('/users')
        .send({
            username: 'testUser',
            password: '123123'
        });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('E-mail, username and password are required');
});

it('Should return error if username is not present in request body', async () => {
    const response = await request(app.callback())
        .post('/users')
        .send({
            email: 'test@gmail.com',
            password: '123123'
        });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('E-mail, username and password are required');
});

it('Should return error if password is not present in request body', async () => {
    const response = await request(app.callback())
        .post('/users')
        .send({
            email: 'test@gmail.com',
            username: 'testUser'
        });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('E-mail, username and password are required');
});




