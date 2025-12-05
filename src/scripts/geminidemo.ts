import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';

// import config from '../config/config';
import { getBlob, readFile } from '../utils/file.handlers';
import { logger } from '../utils/logger';

const ai = new GoogleGenAI({
  // apiKey: config.GEMINI_API_KEY,
});

async function main() {
  const file = await readFile(['images', 'gemini_image_1.jpg']);

  logger.info('main', 'read file', {
    path: file.filePath,
    size: file.size,
    mime: file.mimeType,
  });

  try {
    logger.info('upload:start', file.filePath, 'starting upload');
    const image = await ai.files.upload({
      file: getBlob({ file: file.file, mimeType: file.mimeType }),
    });

    logger.info('uploaded', image);

    if (!image.uri || !image.mimeType) {
      throw new Error('Image upload failed (missing uri or mimeType)');
    }
    logger.info('main', 'generating content', { model: 'gemini-2.5-flash' });

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-pro',
      contents: [
        createUserContent([
          'Do you know this place? Describe it in detail, and explain why a cat would like to visit here.',
          createPartFromUri(image.uri, image.mimeType),
        ]),
      ],
      config: {
        systemInstruction: 'You are a cat named Neko.',
        thinkingConfig: {
          includeThoughts: true,
        },
      },
    });

    for await (const chunk of response) {
      logger.info('main', 'chunk', chunk.text);
    }

    logger.success('main', 'response', { text: response });
  } catch (err: unknown) {
    logger.error('api:error', {
      error: (err as Error)?.message ?? err,
      details: err,
    });

    throw err;
  }
}

await main();
