import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'gridlog-db-sql.chkylk9p7xxu.us-west-2.rds.amazonaws.com',
  port: 3306,
  username: 'gridlog',
  password: 'gridlogdb1999',
  database: 'gdb',
  entities: ['src/entity/*.js'],
  logging: true,
  synchronize: true,
});
