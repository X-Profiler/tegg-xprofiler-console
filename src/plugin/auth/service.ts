import { Injectable, Inject } from '@xprofiler/tegg';
import { MultiMysqlClients } from '../mysql';
import { User, InsertResults } from './type';

@Injectable()
export default class Service {
  @Inject()
  private clients: MultiMysqlClients;

  consoleQuery(sql: string, params: any[] = []): Promise<any> {
    const xprofiler_console = this.clients.get('xprofiler_console');
    return xprofiler_console.query(sql, params);
  }

  async getUserByName(name: string): Promise<User> {
    const sql = 'SELECT * FROM user WHERE name = ?';
    const params = [ name ];
    const data = await this.consoleQuery(sql, params);
    return data[0];
  }

  async saveUser(name: string, nick: string, pass: string, identity: number, mail: string): Promise<InsertResults> {
    const sql = 'INSERT INTO user (name, nick, pass, identity, mail) VALUES (?, ?, ?, ?, ?)';
    const params = [ name, nick, pass, identity, mail ];
    const id: InsertResults = await this.consoleQuery(sql, params);
    return id;
  }
}
