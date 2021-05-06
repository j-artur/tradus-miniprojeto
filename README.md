# Seleção traDUS

## Atividade prática

Esse projeto faz parte do processo seletivo do Edital traDUS 15/2021

Como requisitos, o projeto desenvolvido deve:

- Possuir um sistema de autenticação de usuário com:

  - [x] Cadastro de usuário (nome, email, senha).

  - [x] Confirmação do cadastro via email com link para uma página de confirmação, onde será solicitada a senha cadastrada.

  - [x] Recuperação de senha via email com link para uma página onde uma nova senha é cadastrada.

  - [x] Login permitindo acesso apenas aos usuários com email confirmado. As páginas dos usuários logados terão apenas um botão para realizar o logout.

- Um usuário especial (admin) terá acesso a uma lista com os usuários cadastrados e poderá:

  - [x] Cadastrar novos usuários (nome e email). Um email será enviado para confirmar o cadastro e criar uma senha.

  - [x] Remover um usuário cadastrado.

  - [x] Alterar o nome de um usuário cadastrado.

Este projeto:

- Terá o Frontend desenvolvido em Vue.
- Backend em Typescript com Express.
- Utilizará o ORM TypeORM.

### Resumo do desenvolvimento

Toda a aplicação foi desenvolvida em [Typescript](https://www.typescriptlang.org/), é uma linguagem que eu já venho usando há um tempo e prefiro ela ao Javascript. Ela dá uma grande ajuda na hora do desenvolvimento com a detecção de erros, o auto completion, e a opção de ter a segurança de uma linguagem fortemente tipada.

Já desenvolvi outras aplicações pequenas para projetos pessoais utilizando [Express](https://expressjs.com/), então foi a opção mais confortável.

Optei por usar [TypeORM](https://typeorm.io/#/) pois é uma ORM bem integrada com Typescript, e que eu acabei conhecendo enquanto estudava mais sobre backend depois que apliquei para a vaga.

Estudei banco de dados com MySQL no IFRN e com [PostgreSQL](https://www.postgresql.org/) na UFERSA, optei pelo Postgres por estar mais vivo na memória e conhecer mais da CLI.

As senhas dos usuários cadastrados são devidamente criptografadas antes de serem salvas no banco de dados, fazendo uso da biblioteca [argon2](https://www.npmjs.com/package/argon2).

Usei o [Nodemailer](https://nodemailer.com/about/) como agente responsável para enviar emails destinados aos usuários nos casos de confirmação de conta e recuperação de senha.

A autenticação foi feita com [JSON Web Tokens](https://jwt.io/), porém não ficou 100% completa. Consegui fazer o access token mas não há refresh token, por ser minha primeira vez usando JWT e não ter muita experiência com autenticação (as únicas vezes que fiz autenticação foi pelo [Laravel](https://laravel.com/), que deixava quase 100% de toda a funcionalidade por baixo dos panos), acabei por deixar passar e focar mais nas outras funcionalidades.

O JWT deve durar 30 minutos e não é armazenado na máquina (nem cookies, nem local storage), mas sim numa variável javascript (no estado global da aplicação feita com a composition API do Vue3). Isso significa que o usuário precisará fazer login novamente caso recarregue a página, o que não é um problema tão grande já que o Vue Router utiliza a navegação por hash (#) e tomei cuidado para usar `e.preventDefault()` nos envios de formulários.

Para o frontend, foi dada a opção de desenvolver em [Vue.js](https://vuejs.org/) ou [React](https://reactjs.org/), optei por usar Vue. Apesar de ser mais "desenrolado" no React, como era um dos requisitos descritos no edital, pensei em ir me acostumando mais com a sintaxe.

Confesso que ainda acho algumas coisas "estranhas" (além de toda a confusão sempre ao usar o `this` no javascript). Por cada componente ser escrito como um `object literal` mas depois virar uma `Vue instance`, a forma de acessar seus dados e funções em cada lugar dentro do próprio componente pode ser diferente. Como no exemplo abaixo, onde a mesma variável `number` é referenciada de 3 formas distintas:

```
  <template>
    {{ number }}
  </template>

  <script>
  export default {
    data() {
      return {
        number: 0
      }
    },
    methods: {
      setNumber(arg) {
        this.number = arg
      },
    },
  }
  </script>
```

Para o armazenamento de estado global (para autenticação), as opções eram [Vuex](https://vuex.vuejs.org/) e [Vue3 Composition API](https://cli.vuejs.org/). Por ter noção de toda a complexidade extra que integrar um projeto React ao [Redux](https://redux.js.org/) traz, optei pela rota mais "vanilla" possível, de não utilizar Vuex.

Para realizar requisições HTTP, utilizei o [AXIOS](https://axios-http.com/) pelas configurações extras que ele traz em relação à [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) do browser.

### Considerações finais

Tentei me aproximar ao máximo do padrão MVC para ter uma aplicação bem organizada no backend.

No frontend, por desconhecer padrões de projeto para o Vue, acabei por organizar (ou desorganizar) a aplicação do meu próprio jeito.

Desenvolvi o backend de forma mais tranquila e organizada, e o frontend de forma mais corrida, deixando para refatorar o código no final.

Em suma, o projeto não foi finalizado da forma que eu mais gostaria, mas considerando o tempo que tinha para desenvolver duas aplicações, fiquei satisfeito com o resultado final.

## Deploy:

Estou com dificuldades em fazer deploy mas caso consigo resolver os erros, a aplicação deve estar rodando na URL https://tradus-miniprojeto.herokuapp.com/
