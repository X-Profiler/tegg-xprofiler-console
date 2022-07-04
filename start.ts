import path from 'path';
import fs from 'fs/promises';
import { Application } from '@xprofiler/tegg';

export async function start(env: string) {
  const baseDir = __dirname;
  const manifest = JSON.parse(await fs.readFile(path.join(baseDir, 'manifest.json'), 'utf8'));

  const app = new Application();
  await app.load(manifest[env], baseDir);
  await app.run();

  return app;
}

