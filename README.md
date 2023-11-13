# Running the projects

## Pre-requesites

You need to have installed:

- Docker
- docker-compose
- node
- pnpm (or other package managers, pnpm recommended)

## Service A (imdb-insights)

First, create your .env file and add your keys:

- API_KEY=your-key
- API_HOST=your-host

After that, execute the following commands:

```
cd imdb-insights
pnpm install
docker-compose up --build
pnpm run start:dev
```

## Service B (imdb-insights-usage)

Execute the following commands:

```
cd imdb-insights-usage
pnpm install
docker-compose up --build
pnpm run start:dev
```

## Testing!

With everything up and running, you can make this test request:

[GET] http://localhost:3000/movie?movieName=Oppenheimer

![image](https://github.com/dev-John/imdb-insights/assets/28464939/f1d6ab7d-0f5d-4373-a7c2-2d3bf39d93ec)

You will receive the result of the processing and on the database you can consult the api usage registers:

To connect to the db, use the default access:

```
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'postgres',
database: 'postgres',
table: registry
```

SELECT \* FROM registry;

![image](https://github.com/dev-John/imdb-insights/assets/28464939/518ad65a-59ff-4395-947c-f74d74207fb2)


## Stack used

- NestJS
- Docker
- Kafka/Zookeeper
- Postgresql

## What I would do next?

- Add a cache layer in the imdb-insights api.
- Create a single docker config for both microservices, in order to handle networks (for kafka) and run both services with a single docker-compose up command.

## The Architecture

  ![image](https://github.com/dev-John/imdb-insights/assets/28464939/ceb3c7af-a0ad-4e1d-b718-3597898bacce)


