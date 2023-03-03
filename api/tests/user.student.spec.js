const request = require('supertest');
const app = require('./../src/http');

describe('Test the route api_student_v1/user/log-in', () => {
    test('Should respond with a 200 status code', async () => {
        const response = await request(app).post('/api_student_v1/user/log-in').send();
        expect(response.body.successful).toBe(false);
        expect(response.statusCode).toBe(200);
    });

    test('Should report missing data (Email)', async () => {
        const response = await request(app)
            .post('/api_student_v1/user/log-in')
            .send({ email: '', password: '123456' });
        expect(response.body.successful).toBe(false);
        expect(response.body.message).toBe('Falta ingresar datos');
    });

    test('Should report missing data (password)', async () => {
        const response = await request(app)
            .post('/api_student_v1/user/log-in')
            .send({ email: 'testing@gmail.com', password: '' });
        expect(response.body.successful).toBe(false);
        expect(response.body.message).toBe('Falta ingresar datos');
    });

    test('Rejecting when credentials are not correct', async () => {
        const response = await request(app)
            .post('/api_student_v1/user/log-in')
            .send({ email: 'testing@gmail.com', password: 'cheese' });
        expect(response.body.successful).toBe(false);
        expect(response.body.message).toBe('El email o la contraseña son incorrectos');
    });

    test('Login successfully', async () => {
        const response = await request(app)
            .post('/api_student_v1/user/log-in')
            .send({ email: 'testing@gmail.com', password: '123456' });
        expect(response.body.successful).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
    });
});