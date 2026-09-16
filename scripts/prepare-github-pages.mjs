import { readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'dist', 'client');

async function findAssetDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(directory, entry.name);
    if (entry.name === '_next') return path;
    const nested = await findAssetDirectory(path);
    if (nested) return nested;
  }
  return null;
}

const assetDirectory = await findAssetDirectory(root);
if (!assetDirectory) {
  throw new Error('The built _next asset directory was not found in dist/client.');
}
console.log(`Preparing GitHub Pages assets from ${assetDirectory}`);
await rename(assetDirectory, join(root, 'site-assets'));

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
