// @ts-check
import { test, expect } from '@playwright/test';

// Variável global para compartilhar o token entre testes, se necessário
var tokenGlobal;

test('Consultando as reservas cadastradas', async ({ request }) => {
  const response = await request.get('/booking/');
  console.log(await response.json());
  
  expect(response.ok()).toBeTruthy(); // Adicionado ()
  expect(response.status()).toBe(200);
});

test('Consultando as reservas com base em um ID', async ({ request }) => {
  const response = await request.get('/booking/1851');
  const jsonBody = await response.json();
  console.log(jsonBody);

  expect(jsonBody.firstname).toBe('Rosangela');
  expect(jsonBody.lastname).toBe('Nascimento');
  expect(jsonBody.totalprice).toBe(111);
  expect(jsonBody.depositpaid).toBeTruthy();
  expect(jsonBody.bookingdates.checkin).toBe('2018-01-01');
  expect(jsonBody.bookingdates.checkout).toBe('2019-01-01');
  expect(jsonBody.additionalneeds).toBe('Breakfast');

  expect(response.ok()).toBeTruthy(); // Adicionado ()
  expect(response.status()).toBe(200);
});

test('Cadastrando uma reserva', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      "firstname": "herbertao",
      "lastname": "qazando",
      "totalprice": 222,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
      },
      "additionalneeds": "Breakfast"
    }
  });

  // Boa prática: armazena o JSON uma única vez
  const responseBody = await response.json();
  console.log(responseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Validando dados de retorno dentro do objeto 'booking'
  expect(responseBody.booking).toHaveProperty("firstname", "herbertao");
  expect(responseBody.booking).toHaveProperty("lastname", "qazando");
  expect(responseBody.booking).toHaveProperty("totalprice", 222);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);
});

test('Gerando um token', async ({ request }) => {
  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  const responseBody = await response.json();
  tokenGlobal = responseBody.token; // Alimenta a variável global
  console.log("Seu token é: " + tokenGlobal);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Atualização parcial', async ({ request }) => {
  // Se o teste de 'Gerando um token' rodar antes, você poderia usar o tokenGlobal.
  // Aqui você está gerando um novo, o que também é seguro.
  const authResponse = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  const authBody = await authResponse.json();
  const token = authBody.token;

  const partialUpdate = await request.patch('/booking/763', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    },
    data: {
      "firstname": "Rosangela",
      "lastname": "Nascimento",
      "totalprice": 111,
      "depositpaid": false
    }
  });

  expect(partialUpdate.ok()).toBeTruthy();
  expect(partialUpdate.status()).toBe(200);

  const updatedBody = await partialUpdate.json();
  console.log("Corpo atualizado:", updatedBody);

  expect(updatedBody).toHaveProperty("firstname", "Rosangela");
  expect(updatedBody).toHaveProperty("lastname", "Nascimento");
  expect(updatedBody).toHaveProperty("totalprice", 111);
  expect(updatedBody).toHaveProperty("depositpaid", false);
});