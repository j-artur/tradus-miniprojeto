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
