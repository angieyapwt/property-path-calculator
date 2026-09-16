import { readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'dist', 'client');
await rename(join(root, '_next'), join(root, 'site-assets'));

const textExtensions = /\.(?:html|js|css|json|rsc|svg)$/i;

async function rewrite(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewrite(path);
    } else if (textExtensions.test(entry.name)) {
      const source = await readFile(path, 'utf8');
      const updated = source.replaceAll('_next/', 'site-assets/');
      if (updated !== source) await writeFile(path, updated);
    }
  }
}

await rewrite(root);
