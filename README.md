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

![image](https://github.com/redacreltd/jonatas-da-silva/assets/28464939/8c230c45-0e9b-47fc-b372-5c7149fd2453)

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

![image](https://github.com/redacreltd/jonatas-da-silva/assets/28464939/ae6f7b7e-de22-4ef1-8fb2-8d68c46e23f9)


## Stack used

- NestJS
- Docker
- Kafka/Zookeeper
- Postgresql

## What I would do next?

- Add a cache layer in the imdb-insights api.
- Create a single docker config for both microservices, in order to handle networks (for kafka) and run both services with a single docker-compose up command.

## The Architecture

  ![image](https://github.com/redacreltd/jonatas-da-silva/assets/28464939/8c1ec681-a1a1-4461-a514-906eadffbc22)

