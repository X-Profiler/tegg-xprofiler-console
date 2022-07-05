import { Injectable, Inject } from '@xprofiler/tegg';
import { MultiMysqlClients } from '../../plugin/mysql';
import { User } from '../../plugin/auth';
import { AppInfo } from './type';

@Injectable()
export default class MysqlService {
  @Inject()
  private clients: MultiMysqlClients;

  consoleQuery(sql: string, params: any[] = []): Promise<any> {
    const xprofiler_console = this.clients.get('xprofiler_console');
    return xprofiler_console.query(sql, params);
  }

  async getUserByUserIds(userIds: number[]): Promise<User[]> {
    if (!userIds.length) {
      return [];
    }
    const sql = `SELECT * FROM user WHERE id in (${userIds.map(() => '?').join(',')})`;
    const params = [ ...userIds ];
    return this.consoleQuery(sql, params);
  }

  getMyApps(userId: number): Promise<AppInfo[]> {
    const sql = 'SELECT * FROM apps WHERE owner = ? ORDER BY gm_modified ASC';
    const params = [ userId ];
    return this.consoleQuery(sql, params);
  }

  getJoinedApps(userId: number, status: number): Promise<AppInfo[]> {
    const sql = 'SELECT * FROM apps WHERE id in (SELECT app FROM members WHERE user = ? AND status = ?) ORDER BY gm_modified ASC';
    const params = [ userId, status ];
    return this.consoleQuery(sql, params);
  }
}
