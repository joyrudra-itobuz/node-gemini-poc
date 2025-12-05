import type { Buffer } from 'buffer';
import mime from 'mime-types';
import type { Abortable } from 'node:events';
import type { OpenMode } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

import config from '../config/config';

async function readFile(
  segments: Array<string>,
  options?:
    | ({
        encoding?: null | undefined;
        flag?: OpenMode | undefined;
      } & Abortable)
    | null
) {
  const filePath = path.join(config.PUBLIC_PATH, ...segments);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const buffer = await fs.readFile(filePath, options);

  chalk.blue('Buffer Generated...', buffer, mime.lookup(filePath));

  return {
    buffer,
    mimeType: mime.lookup(filePath) || 'application/octet-stream',
  };
}

function getBlob({ file, mimeType }: { file: Buffer; mimeType: string }) {
  console.log({ file, mimeType });
  return new Blob([file], { type: mimeType });
}

export { readFile, getBlob };
