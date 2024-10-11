import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest_db',
    entities: ['./src/**/entity/*.ts'],
    migrations: ['./src/**/migration/*.ts'],
    synchronize: false,
});
