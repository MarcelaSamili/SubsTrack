import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routs/user.routes.js';
import authRouter from './routs/auth.routes.js';
import subscriptionRouter from './routs/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

//Inicializa uma aplicação express
const app = express();
//app agora representa sua API, onde você define rotas, middlewares e lógica de negócio.

//Essa expressão Adiciona um middleware que faz o parse (análise) automático de requisições com conteúdo JSON.
app.use(express.json());
//Isso é essencial para manipular dados enviados no corpo da requisição (req.body) no formato JSON, como em requisições POST, PUT e PATCH.

//Esse middleware faz o parse (análise) de dados enviados via "<form>" HTML
app.use(express.urlencoded({ extended: false }));
//extended: false:
/*Usa o parser querystring do Node.js para processar os dados.
Só permite dados simples, como strings ou arrays simples.*/
//extended: true:
/*Usa o parser qs (uma biblioteca mais poderosa).
Suporta objetos aninhados e estruturas complexas. */

//Esse middleware é usado para analisar (parsear) cookies enviados pelo cliente em cada requisição.
/*Lê o cabeçalho Cookie das requisições.
Faz o parse dos cookies e os disponibiliza em req.cookies como um objeto JavaScript.*/
app.use(cookieParser()); //Lembre de instalar ele "npm install cookie-parcer" e importar!
/*Quando é usado:
Sempre que você precisar ler cookies no servidor, como para autenticação, rastreamento de sessão, ou preferências do usuário.
Exemplo de uso:
Se o navegador enviar este cabeçalho:
Cookie: token=abc123; theme=dark;*/

//ARCJET MIDDLEWARE
app.use(arcjetMiddleware);

//Rotas da API
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

//Extrai inforomações sobre o erro
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Wlcome to the SubsTrack API');
});

//Define a porta em que a API vai rodar.
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;

//"npm install jsonwebtoken bcryptjs"
/*Esse comando instala duas bibliotecas 
muito usadas para autenticação e segurança em aplicações Node.js*/

//jsonwebtoken:
/*O que é: Uma biblioteca para criação e verificação de tokens JWT (JSON Web Tokens).
Para que serve: Usada para autenticação em APIs. 
Você cria um token quando o usuário faz login, e depois verifica o token em requisições protegidas.*/

//bcryptjs:
/*O que é: Biblioteca para hashing e verificação de senhas.
Para que serve: 
Armazena senhas de forma segura, gerando um hash. 
Na hora do login, compara o hash armazenado com a senha digitada.*/

/*JWT (jsonwebtoken): Para criar tokens seguros e stateless (o servidor não precisa armazenar sessões).
BcryptJS: Para proteger senhas usando salt e hashing, dificultando ataques de força bruta. */
