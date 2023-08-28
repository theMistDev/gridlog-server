import { DataSource } from 'typeorm';
import { User } from '../entity/user';

const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.SQL_HOST,
  port: 3306,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  entities: [User],
  logging: true,
  synchronize: true,
});

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default myDataSource;
