import 'reflect-metadata';
import fs from 'fs/promises';
import path from 'path';
import { Scanner } from '@xprofiler/tegg';

export async function scan() {
  const baseDir = __dirname;

  const scanner = new Scanner({
    needWriteFile: false,
    configDir: 'config',
    extensions: [ '.ts' ],
    excluded: [ 'view', 'public' ],
  });
  const manifest = await scanner.scan(baseDir);
  await fs.writeFile(path.join(baseDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}
