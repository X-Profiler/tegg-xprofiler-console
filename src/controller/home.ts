import { HttpController, HttpMethod, HTTPMethodEnum, Inject } from '@xprofiler/tegg';
import { UserData } from '../plugin/auth';

@HttpController()
export default class HomeController {
  @Inject()
  private user: UserData;

  @HttpMethod({
    path: '/',
    method: HTTPMethodEnum.GET,
  })
  async index() {
    return this.user;
  }
}
