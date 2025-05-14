# ACME Campaign

# `acme-campaigns-api`

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/) installed
- [Docker](https://www.docker.com/) installed

## 🚀 Getting Started

1.  **Install dependencies**

    Run the following command:

        yarn install

2.  **Start Docker containers**

    yarn docker

3.  **Set up environment variables**

    Copy the example environment file:

        cp .env.example .env

4.  **Start the development server**

    yarn start:dev

5.  **Run tests**

    yarn start:dev

## 📁 `src/adapters`

| Folder/File  | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `in-memory/` | Contains in-memory implementations for repositories, used for testing or mock purposes. |
| `typeorm/`   | Contains TypeORM-based implementations for database persistence.                        |

---

## 📁 `src/ports/database`

| File                     | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `campaign.repository.ts` | Interface or abstract class defining the expected behavior of a campaign repository. |
| `index.ts`               | Entry point that exports the repository interfaces.                                  |

---

## 📁 `src/core/campaign`

| File                            | Description                                                         |
| ------------------------------- | ------------------------------------------------------------------- |
| `campaign.controller.schema.ts` | Zod schema for HTTP request/response used in the controller.        |
| `campaign.controller.spec.ts`   | E2E tests for the controller logic.                                 |
| `campaign.controller.ts`        | Handles incoming requests and delegates logic to the service layer. |
| `campaign.domain.test.ts`       | Unit tests for domain logic.                                        |
| `campaign.domain.ts`            | Contains the core domain logic and entities related to campaigns.   |
| `campaign.mock.ts`              | Provides mock data for testing or development.                      |
| `campaign.module.ts`            | NestJS module definition for wiring campaign-related.               |
| `campaign.schema.ts`            | Business-level validation.                                          |
| `campaign.service.module.ts`    | NestJS module definition for wiring campaign-related.               |
| `campaign.service.test.ts`      | Integration tests for service logic.                                |
| `campaign.service.ts`           | Contains business logic to be consumed.                             |
| `index.ts`                      | Barrel file that exports campaign-related modules or components.    |

---

## ⚠️ Considerações

- **_Arquitetura Hexagonal_**: Utilizei a arquiteura hexagonal como estrutura da API, a ideia de ports e adapters separa muito bém a abstração(ports) da implementação(adapters), dando liberdade para alterações e desacoplamento de implementações externas da camada de negócogio(core).

- **_Arquitetura In-Memory para Testes_**: é uma abordagem onde você utiliza uma base de dados em memória (como SQLite ou MongoDB em memória) para testar a lógica da aplicação sem afetar o banco de dados real. Isso acelera os testes, pois não há necessidade de interagir com um banco de dados real, o que torna o processo mais rápido e isolado, ideal para testes unitários e de integração.

- **_Arquitetura In-Memory para Testes_**: Utilizei a ideia de In-Memory para implementar os mocks de Testes de Integração(campaign.service.test.ts). Conseguimos testar a camada de negócio sem depender de uma implementação de banco de dados e trazendo agilidade para execução dos testes.

- **_Utilização das libs_** (NestJS, Zod + NestJSZod, Jest + Supertest, TypeORM)

  - **NestJS** Facilita a criação de APIs em Node.js. Adota muito bem o padrão de injeção de dependências, tornando o código mais organizado e fácil de manter.
  - **Zod + NestJSZod** Zod para validação de dados, criação de schemas utils e em conjunto com NestjsZod consiguimos reutilizar a representação da entidade em schema para validação de input em controllers.
  - **Jest + Supertest** Jest para testes unitários(campaign.domain.test.ts) e testes de integração(campaign.service.test.ts) e Supertest auxiliando junto do Jest para testes de e2e(campaign.controller.test.ts).
  - **TypeORM** Facilita a manipulação de banco de dados(PostgreSQL).

- **_Melhorias na Criação da Documentação/Abstração de Decorators do NestJS/Swagger_**: Um TODO a ser feito poderia ser a criação de custom decorators **_@Controller_** e **_@Route_** com as opções possíveis dentro NestJS/Swagger para simplificar a documentação e criação de controller/route.

# `acme-campaigns-frontend`
