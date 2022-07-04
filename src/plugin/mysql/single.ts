import Rds from 'ali-rds';
import { MysqlOptions } from './type';

export default class Mysql extends Rds {
  constructor(option: MysqlOptions) {
    super(option);
    return this;
  }

  query(...args): Promise<any> {
    return super.query(...args);
  }

  end() {
    return super.end();
  }
}
