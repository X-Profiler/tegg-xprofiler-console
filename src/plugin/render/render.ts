import path from 'path';
import fs from 'fs/promises';
import { Injectable } from '@xprofiler/tegg';

@Injectable()
export default class Render {
  private engine: any;
  private options: any;
  private cache: Map<string, (data: any) => string> = new Map();

  constructor(engine, options) {
    this.engine = engine;
    this.options = options;
  }

  public async render(view: string, data: any = {}): Promise<string> {
    const { cache, viewExt, root } = this.options;
    view += viewExt;
    const viewPath = path.join(root, view);
    if (cache && this.cache.has(viewPath)) {
      const fn = this.cache.get(viewPath);
      return fn ? fn(data) : '';
    }

    const tpl = await fs.readFile(viewPath, 'utf8');

    const fn = this.engine.compile(tpl, {
      filename: viewPath,
      cache,
    });

    if (cache) {
      this.cache.set(viewPath, fn);
    }

    return fn(data);
  }
}
