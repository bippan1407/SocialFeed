import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv'

dotenv.config({
    path: '.env.' + process.env.NODE_ENV
})

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ["dist/src/migration/*{.ts,.js}"],
    logging: ["query"],
    maxQueryExecutionTime: 500,
    synchronize: true,
    cli: {
        migrationsDir: "src/migration/",
        entitiesDir: "src/entities/",
    },
    ssl: {
        rejectUnauthorized: false
    }
}

export default config