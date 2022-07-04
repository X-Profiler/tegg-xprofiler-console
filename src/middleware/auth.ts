import { Middleware, MiddlewareMethod, Inject, Next } from '@xprofiler/tegg';
import { UserData } from '../plugin/auth';

@Middleware()
export default class Auth {
  @Inject()
  private user: UserData;

  @MiddlewareMethod()
  async userRequired(next: Next) {
    if (this.user.userId) {
      return await next();
    }
    return {
      status: 401,
      body: '请先登录',
    };
  }
}
