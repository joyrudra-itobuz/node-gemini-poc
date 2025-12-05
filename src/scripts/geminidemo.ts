import {
  createPartFromUri,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';

import config from '../config/config';
import { getBlob, readFile } from '../utils/file.handlers';

const ai = new GoogleGenAI({
  apiKey: config.GEMINI_API_KEY,
});

async function main() {
  const file = await readFile(['images', 'gemini_image_1.jpg']);

  const image = await ai.files.upload({
    file: getBlob({ file: file.buffer, mimeType: file.mimeType }),
  });

  console.log({ image, mime: image.mimeType, uri: image.uri });

  if (!image.uri || !image.mimeType) {
    throw new Error('Image upload failed');
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      createUserContent([
        'Describe this image in one short sentence.',
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
    config: {
      systemInstruction: 'You are a cat named Neko.',
    },
  });

  console.info(response.text);
}

await main();
