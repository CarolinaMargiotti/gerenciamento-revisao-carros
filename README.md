# Sistema de gerenciamento de revisão de carros.

# Ferramentas
Back-end 
- Typescript
- Node.js
- Postgres
- Sequelize

Front-end
- React
- Typescript
- Reactstrap
- Bootstrap

# Requisitos
O sistema a ser desenvolvido precisa ter as seguintes funcionalidades:
- Cadastro completo de clientes com:
  - Nome
  - Telefone
  - Endereço
  - CPF
- Cadastro de veículos pertencentes a clientes com:
  - Número da placa
  - Modelo/versão
  - Ano de fabricação
  - Valor de compra
- Agendamentos de revisões.
- Troca de datas de agendamentos de revisões.
- Cancelamentos de agendamentos de revisões.
- Relatório de quais serviços foram feitos para um determinado cliente e seu
veículo.
- Capacidade de persistência de dados. A base de informações do sistema deverá
ser salva em um banco de dados relacional.

# Como Executar
- Abrir separadamente os projetos Server e Cliente.
- Em cada um deles executar comando `npm i` para instalar dependencias.
- No server executar com comando `npm run dev`.
- Cliente executar com comando `npm start`.
- Esperar react abrir a pagina e pronto!
