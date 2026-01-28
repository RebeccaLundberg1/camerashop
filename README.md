# Camerashop

Full-stack demo web shop with a Spring Boot API and a Next.js frontend.

## Tech stack

- Backend: Spring Boot 3 (Java 21), JPA, MariaDB
- Frontend: Next.js 16 (React 19), Tailwind CSS
- Dev tooling: Docker Compose for local stack

## Requirements

- Docker + Docker Compose (recommended)
- Or local runtimes: Java 21, Maven, Node.js 18+

## Environment variables

See `.env.example` for the required variables. Use it as the base for your local `.env`.

Example values for local Docker are included in `.env.example`.

## Run with Docker Compose

1. Copy the example env file and fill it in:

```bash
cp .env.example .env
```

2. Start the full stack:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- Adminer (DB UI): `http://localhost:8081`

Database data is persisted in `db_data/`.

## Run locally without Docker

You can also run each service directly and keep MariaDB in Docker.

1. Start the database only:

```bash
docker compose up -d mariadb adminer
```

2. Backend (Spring Boot):

```bash
cd backend
export SPRING_DATASOURCE_URL=jdbc:mariadb://localhost:3306/camerashop
export SPRING_DATASOURCE_USERNAME=camerashop
export SPRING_DATASOURCE_PASSWORD=camerashop
./mvnw spring-boot:run
```

3. Frontend (Next.js):

```bash
cd frontend
export NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8080
npm install
npm run dev
```

Open `http://localhost:3000`.
