import { Middleware, MiddlewareMethod, Next, Inject, Request, TEGG_CONFIG } from '@xprofiler/tegg';

@Middleware()
export default class StaticServer {
  @Inject()
  private req: Request;
  @Inject(TEGG_CONFIG)
  private config: any;

  @MiddlewareMethod()
  async static(next: Next) {
    console.log(12333, this.config.static, this.req.path);
    await next();
  }
}
