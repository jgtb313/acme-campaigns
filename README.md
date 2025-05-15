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

- **_Arquitetura In-Memory para Testes_**: Utilizei a ideia de In-Memory para implementar os mocks de Testes de Integração(campaign.service.test.ts). Conseguimos testar a camada de negócio sem depender de uma implementação de banco de dados e trazendo agilidade para execução dos testes.

- **_Utilização das libs_** (NestJS, Zod + NestJSZod, Jest + Supertest, TypeORM)

  - **NestJS** Facilita a criação de APIs em Node.js. Adota muito bem o padrão de injeção de dependências, tornando o código mais organizado e fácil de manter.
  - **Zod + NestJSZod** Zod para validação de dados, criação de schemas utils e em conjunto com NestjsZod consiguimos reutilizar a representação da entidade em schema para validação de input em controllers.
  - **Jest + Supertest** Jest para testes unitários(campaign.domain.test.ts) e testes de integração(campaign.service.test.ts) e Supertest auxiliando junto do Jest para testes de e2e(campaign.controller.test.ts).
  - **TypeORM** Facilita a manipulação de banco de dados(PostgreSQL).

- **_Melhorias na Criação da Documentação/Abstração de Decorators do NestJS/Swagger_**: Um TODO a ser feito poderia ser a criação de custom decorators **_@Controller_** e **_@Route_** com as opções possíveis dentro NestJS/Swagger para simplificar a documentação e criação de controller/route.

- **_Regras e Validações_**

  - A data fim deve ser sempre maior que a dataInicio: Implementado na parte validação das rotas (controller.schema.ts).
  - A data de início deve ser igual ou posterior à data atual no momento da criação: Implementado na parte validação das rotas (controller.schema.ts).
  - Se a data final for inferior à data atual, a campanha deve ser marcada como "expirada": Implementado na camada de Domain (campaign.domain.ts).

- Implementação de Rotina para consistência do status "EXPIRED": Poderiamos implementar uma rotina (buscando campanhas com endDate menor ou igual a hoje) para garantir a consistência do status, utilizando o CampaignDomain.markAsExpired()

# `acme-campaigns-frontend`

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/) installed

## 🚀 Getting Started

1.  **Install dependencies**

    Run the following command:

        yarn install

2.  **Set up environment variables**

    Copy the example environment file:

        cp .env.example .env

3.  **Start the development server**

    yarn dev

## 📁 Project Structure

```
src/
├── app/                  # App Router pages and layouts
│   ├── campaigns/        # Campaigns pages (e.g., create/edit)
│   └── layout.tsx        # Root layout
├── components/           # Business components
├── layouts/              # Layouts
├── schemas/              # Zod schemas for form validation
├── services/             # API service layer
├── stores/               # React Query stores
└── ui/                   # UI primitives (navbar, header, etc.)
```

## ⚠️ Considerações

- **\_Client Side e Server Side**: Utilizei Server Side Rendering nos cenários em que temos o campaignId na rota e os dados não sofrem alteração dinâmica, sendo usados como initialValues no formulário. Já nos casos com maior interação e mutabilidade, optei por Client Side Rendering com ReactQuery.

- **\_Schemas e Services**: Poderiamos ter uma implementação de monorepo/libs internas para reutilização de Schemas e até geração de serviços baseado no openapi.spec que é gerado pela API.

- **_Regras e Validações_**

  - A data fim deve ser sempre maior que a dataInicio: Implementado com Zod + React Hook Form.
  - A data de início deve ser igual ou posterior à data atual no momento da criação: Implementado com Zod + React Hook Form.
  - Se a data final for inferior à data atual, a campanha deve ser marcada como "expirada": Backend aplica regra de negócio e retorna para o backend.

## 📸 Images

### API Documentation

![API Documentation](https://i.imgur.com/QFASNp1.png)

### API Documentation

![API Documentation](https://i.imgur.com/ZHQivw6.png)

### API Documentation

![API Documentation](https://i.imgur.com/UKboU7a.png)

### API Tests

![API Tests](https://i.imgur.com/xWdjT4e.png)

### Campaigns List

![Campaigns List](https://i.imgur.com/xyZgumy.png)

### New Campaign

![New Campaign](https://i.imgur.com/ZvkXpYh.png)

### Campaign Details

![Campaign Details](https://i.imgur.com/VY7lZQC.png)

### Delete Campaign

![Delete Campaign](https://i.imgur.com/FSSPJ0c.png)
