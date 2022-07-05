import { HttpController, HttpMethod, HTTPMethodEnum, Inject, WithQuery } from '@xprofiler/tegg';
import { UserData } from '../plugin/auth';
import { MysqlService, AppInfo } from '../service/mysql';
import { ConextService } from '../service/common';

@HttpController()
export default class UserController {
  @Inject()
  private user: UserData;
  @Inject()
  private mysql: MysqlService;
  @Inject()
  private context: ConextService;

  @HttpMethod({
    path: '/xapi/apps',
    method: HTTPMethodEnum.GET,
  })
  async getApps(@WithQuery() query) {
    const { userId } = this.user;
    const { type } = query;

    // get my/joined apps
    let list: AppInfo[] = [];
    if (type === 'myApps') {
      list = await this.mysql.getMyApps(userId);
    }
    if (type === 'joinedApps') {
      list = await this.mysql.getJoinedApps(userId, 2);
    }

    const apps = list.map(({ name, id: appId }) => ({ name, appId }));

    // get invitations
    const invitedApps = await this.mysql.getJoinedApps(userId, 1);
    const users = await this.context.getUserMap(invitedApps.map(item => item.owner));
    const invitations = invitedApps.map(app => {
      const { id: appId, name: appName, owner } = app;
      return {
        appId, appName,
        ownerInfo: users[owner] && users[owner].nick || 'Unknown',
      };
    });

    return { ok: true, data: { list: apps, invitations } };
  }
}
