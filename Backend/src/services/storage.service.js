import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile({ buffer, fileName, mimeType, folder = "snitch" }) {
  try {
    const base64File = `data:${mimeType};base64,${buffer.toString("base64")}`;

    const result = await client.files.upload({
      file: base64File,
      fileName: fileName,
      folder: folder,
    });

    return {
      url: result.url,
      fileId: result.fileId,
    };
  } catch (error) {
    console.error("IMAGEKIT UPLOAD ERROR:", error);
    throw error;
  }
}