import { HttpController, HttpMethod, HTTPMethodEnum, Inject } from '@xprofiler/tegg';
import { UserData } from '../plugin/auth';
import { MysqlService } from '../service/mysql';

@HttpController()
export default class UserController {
  @Inject()
  private user: UserData;
  @Inject()
  private mysql: MysqlService;

  @HttpMethod({
    path: '/xapi/user',
    method: HTTPMethodEnum.GET,
  })
  async index() {
    const { nick: name, userId } = this.user;
    const [{ identity }] = await this.mysql.getUserByUserIds([ userId ]);

    const data = { name, id: identity };

    return {
      ok: true,
      data,
    };
  }
}
