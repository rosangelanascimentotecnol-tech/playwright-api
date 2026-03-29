// @ts-check
import { test, expect } from '@playwright/test';

var tokenGlobal;
var bookingId; // Adicione esta variável

// Adicionei @regressivo em todos para a pipeline encontrar os testes
test('Consultando as reservas cadastradas @regressivo', async ({ request }) => {
  const response = await request.get('/booking/');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando as reservas com base em um ID @regressivo', async ({ request }) => {
  // DICA: Tente usar um ID que você acabou de criar no teste de POST abaixo
  const response = await request.get('/booking/1851'); 
  const jsonBody = await response.json();
  
  expect(response.status()).toBe(200);
});

test('Cadastrando uma reserva @regressivo', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      "firstname": "Rosangela",
      "lastname": "Nascimento",
      "totalprice": 222,
      "depositpaid": true,
      "bookingdates": { "checkin": "2018-01-01", "checkout": "2019-01-01" },
      "additionalneeds": "Breakfast"
    }
  });
  const responseBody = await response.json();
  bookingId = responseBody.bookingid; // CAPTURA O ID DINÂMICO AQUI
  
  expect(response.status()).toBe(200);
});

test('Gerando um token @regressivo', async ({ request }) => {
  const response = await request.post('/auth', {
    data: { "username": "admin", "password": "password123" }
  });
  const responseBody = await response.json();
  tokenGlobal = responseBody.token;
  expect(response.status()).toBe(200);
});

test('Atualização parcial @regressivo', async ({ request }) => {
  const authResponse = await request.post('/auth', {
    data: { "username": "admin", "password": "password123" }
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  // AGORA USE O ID QUE FOI CRIADO ACIMA
  const partialUpdate = await request.patch(`/booking/${bookingId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    },
    data: { "firstname": "Rosangela", "totalprice": 111 }
  });

  expect(partialUpdate.status()).toBe(200);
});

  