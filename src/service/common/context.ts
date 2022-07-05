import { Injectable, Inject, ScopeEnum } from '@xprofiler/tegg';
import { MysqlService } from '../mysql';

@Injectable({ scope: ScopeEnum.EXECUTION })
export default class ContextService {
  @Inject()
  private mysql: MysqlService;

  async getUserMap(userIds: number[]) {
    const users = await this.mysql.getUserByUserIds(userIds);
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    const systemUser = 999999;
    if (userIds.includes(systemUser)) {
      userMap[systemUser] = {
        id: systemUser,
        name: 'System',
        nick: 'System',
      };
    }
    return users;
  }
}
