import auth from 'basic-auth';
import kitx from 'kitx';
import { Middleware, MiddlewareMethod, Inject, Next, Request } from '@xprofiler/tegg';
import UserData from './user';
import Service from './service';

@Middleware()
export default class Auth {
  @Inject()
  private service: Service;
  @Inject()
  private user: UserData;
  @Inject()
  private req: Request;

  @MiddlewareMethod()
  async basic(next: Next) {
    // user has been setted
    if (this.user.userId) {
      return await next();
    }

    const credentials = auth(this.req);
    if (!credentials || !credentials.name || !credentials.pass) {
      return {
        status: 401,
        headers: {
          'www-authenticate': 'basic realm="easy-monitor-tegg"',
        },
        body: '请先登录',
      };
    }

    const { name, pass }: { name: string, pass: string } = credentials;
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(name)) {
      return {
        status: 401,
        body: '请使用邮箱注册或者登陆',
      };
    }

    // save user first time
    const saltPass = kitx.md5(pass, 'hex');
    const user = await this.service.getUserByName(name);
    if (!user) {
      const identity = parseInt(((Math.random() * 9 + 1) * 10e4).toString(), 10);
      const nick = name.replace(/@.*/, '');
      const mail = name;
      const { insertId } = await this.service.saveUser(name, nick, saltPass, identity, mail);
      this.user.set({
        userId: insertId,
        name, nick, mail,
      });

      return await next();
    }

    // check pass success
    if (user.pass === saltPass) {
      this.user.set({
        userId: user.id,
        name: user.name,
        nick: user.nick,
        mail: user.mail,
      });
      return await next();
    }

    // auth failed
    return {
      status: 401,
      body: '用户名或者密码错误，登陆失败',
    };
  }
}
