import fs from 'fs';
import path from 'path';
import { Middleware, MiddlewareMethod, Next, Inject, Request, TEGG_CONFIG } from '@xprofiler/tegg';

@Middleware()
export default class StaticServer {
  @Inject()
  private req: Request;
  @Inject(TEGG_CONFIG)
  private config: any;

  @MiddlewareMethod()
  async static(next: Next) {
    const config = this.config.static;
    const { path: requestPath, method } = this.req;
    if (method.toLowerCase() === 'get' && requestPath.startsWith(config.prefix)) {
      const filePath = path.join(config.dir, requestPath.replace(config.prefix, ''));
      const ext = path.extname(filePath).slice(1);
      let type = 'plain';
      if (ext === 'css') {
        type = 'text/css; charset=utf-8';
      } else if (ext === 'js') {
        type = 'text/javascript; charset=utf-8';
      } else if (ext.startsWith('woff')) {
        type = `font/${ext}`;
      }
      if (fs.existsSync(filePath)) {
        return {
          status: 200,
          headers: {
            'content-type': `${type}`,
          },
          body: fs.readFileSync(filePath),
        };
      }
    }

    await next();
  }
}
