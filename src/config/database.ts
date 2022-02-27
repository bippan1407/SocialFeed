import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ["dist/src/migration/*{.ts,.js}"],
    logging: ["query"],
    maxQueryExecutionTime: 500,
    synchronize: true,
    // migrationsTableName: "custom_migration_table",
    cli: {
        migrationsDir: "src/migration/",
        entitiesDir: "src/entities/",
    }
}

export default config