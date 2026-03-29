🚀 Automação de Testes de API - Playwright
Este projeto contém uma suite de testes automatizados para a API Restful-Booker, focando na validação de fluxos de reservas (booking) e autenticação.

🛠️ Tecnologias Utilizadas
Playwright: Framework principal para automação de testes de ponta a ponta.

JavaScript: Linguagem base utilizada para a escrita dos scripts.

Node.js: Ambiente de execução do código JavaScript.

Visual Studio Code: Editor de código utilizado no desenvolvimento.

📋 Cenários de Teste
A automação cobre os seguintes cenários:

Consultar Reservas: Busca a lista completa de reservas.

Consultar por ID: Valida se os detalhes de uma reserva específica (como nome, preço e datas) estão corretos.

Cadastrar Reserva: Cria uma nova reserva e valida se os dados retornados no corpo da resposta condizem com os enviados.

Gerar Token: Realiza a autenticação via POST e armazena o token de acesso.

Atualização Parcial (PATCH): Simula a alteração de apenas alguns campos de uma reserva existente, utilizando autenticação por Cookie.

🚀 Como Executar o Projeto
Clone o repositório:

Bash
git clone https://seu-repositorio-aqui.com
Instale as dependências:

Bash
npm install
Instale os navegadores do Playwright (se necessário):

Bash
npx playwright install
Execute os testes:

Via terminal:

Bash
npx playwright test
Via interface visual:

Bash
npx playwright test --ui
💡 Boas Práticas Implementadas
Validação de Status Code: Todos os testes verificam se o retorno é 200 OK.

Asserções de Propriedades: Uso do toHaveProperty para garantir a integridade da estrutura do JSON.

Tratamento de Dados: Armazenamento do corpo da resposta em variáveis para evitar múltiplas chamadas de await response.json().

Modularidade: Divisão clara entre testes de consulta, criação e edição.

Desenvolvido por: [Rosângela Nascimento] 👩‍💻
