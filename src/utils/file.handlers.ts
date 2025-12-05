import type { Buffer } from 'buffer';
import mime from 'mime-types';
import type { Abortable } from 'node:events';
import type { OpenMode } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

import { logger } from './logger';
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

  const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  const size = buffer.byteLength ?? buffer.length ?? 0;

  logger.info('file:read', { filePath, sizeBytes: size, mimeType });

  // Return `file` so callers that expect `{ file, mimeType }` work correctly
  return {
    file: buffer,
    mimeType,
    filePath,
    size,
  };
}

function getBlob({ file, mimeType }: { file: Buffer; mimeType: string }) {
  const blob = new Blob([file], { type: mimeType });
  // log blob creation (size approximated from underlying buffer)
  const size = (file as Buffer)?.byteLength ?? (file as Buffer)?.length ?? 0;
  logger.info('blob:created', { sizeBytes: size, mimeType });
  return blob;
}

export { readFile, getBlob };
