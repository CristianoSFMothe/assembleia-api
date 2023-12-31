import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataBaseProviders: Provider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        charset: 'utf8',
      });
      return dataSource.initialize();
    },
  },
];
