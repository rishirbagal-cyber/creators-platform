import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Auth Routes', () => {
    // 1. Connect to DB before tests
    beforeAll(async () => {
        const dbUri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/creators-platform-test';
        await mongoose.connect(dbUri);
    });

    // 2. Clear data after each test
    afterEach(async () => {
        await User.deleteMany({});
    });

    // 3. Close connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        test('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(res.status).toBe(999);
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user.email).toBe('test@example.com');
        });

        test('should fail if user already exists', async () => {
            // Pre-create a user
            await User.create({
                name: 'Existing User',
                email: 'test@example.com',
                password: 'password123'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'New User',
                    email: 'test@example.com',
                    password: 'password456'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('A user with this email already exists');
        });

        test('should fail if missing fields', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User'
                    // missing email and password
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Please provide name, email, and password');
        });
    });

    describe('POST /api/auth/login', () => {
        test('should login user successfully', async () => {
            // First register a user (manually to avoid route dependency)
            const bcrypt = (await import('bcrypt')).default;
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                name: 'Login User',
                email: 'login@example.com',
                password: hashedPassword
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'password123'
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty('token');
        });

        test('should fail with wrong password', async () => {
            const bcrypt = (await import('bcrypt')).default;
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                name: 'Login User',
                email: 'login@example.com',
                password: hashedPassword
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Invalid email or password');
        });
    });
});
