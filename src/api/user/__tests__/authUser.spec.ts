import request from 'supertest';
import app from '../../../app';
import { connectTestDB } from "../../../mongodb";
import { connection, disconnect } from 'mongoose';

beforeAll(connectTestDB);

beforeEach(async () => {
    await connection.db.dropDatabase();
});

afterAll(async () => {
    await disconnect();
});

it('Should return JWT token if credentials match', async () => {
    const testUser = {
        email: 'test@gmail.com',
        username: 'testUser',
        password: '123123'
    };

    await request(app.callback())
        .post('/users')
        .send(testUser);

    const response = await request(app.callback())
        .post('/users/auth')
        .send({
            email: testUser.email,
            password: testUser.password
        });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
});

it('Should return error if e-mail not present in request body', async () => {
    const testUser = {
        email: 'test@gmail.com',
        username: 'testUser',
        password: '123123'
    };

    await request(app.callback())
        .post('/users')
        .send(testUser);

    const response = await request(app.callback())
        .post('/users/auth')
        .send({
            password: testUser.password
        });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('E-mail and password are required');
});

it('Should return error if password not present in request body', async () => {
    const testUser = {
        email: 'test@gmail.com',
        username: 'testUser',
        password: '123123'
    };

    await request(app.callback())
        .post('/users')
        .send(testUser);

    const response = await request(app.callback())
        .post('/users/auth')
        .send({
            email: testUser.email
        });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('E-mail and password are required');
});

it('Should return error if wrong e-mail', async () => {
    const testUser = {
        email: 'test@gmail.com',
        username: 'testUser',
        password: '123123'
    };

    await request(app.callback())
        .post('/users')
        .send(testUser);

    const response = await request(app.callback())
        .post('/users/auth')
        .send({
            email: '123@gmail.com',
            password: testUser.password
        });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Incorrect e-mail/password combination');
});

it('Should return error if wrong password', async () => {
    const testUser = {
        email: 'test@gmail.com',
        username: 'testUser',
        password: '123123'
    };

    await request(app.callback())
        .post('/users')
        .send(testUser);

    const response = await request(app.callback())
        .post('/users/auth')
        .send({
            email: testUser.email,
            password: '000000'
        });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Incorrect e-mail/password combination');
});