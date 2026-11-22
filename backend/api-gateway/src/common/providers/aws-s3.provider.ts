import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsS3Provider {
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  async uploadFilesToS3(files: Express.Multer.File[], pathName: string) {
    const bucket = process.env.AWS_S3_BUCKET_NAME!;
    const uploaded = [];

    for (const file of files) {
      const key = `${pathName}/${this.generateUUID()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3.send(command);

      uploaded.push({
        originalName: file.originalname,
        key,
        mime: file.mimetype,
        url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      });
    }

    return uploaded;
  }

  /**
   * Genera una URL firmada para descargar un archivo desde AWS S3
   * @param key Ruta/nombre del archivo dentro del bucket
   * @param expiresIn Tiempo de expiración (en segundos)
   * @returns URL firmada válida por el tiempo indicado
   */
  async getSignedDownloadUrl(key: string, expiresIn = 60): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET!;
    console.log({ bucketName, key }, 'Que onda');
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3, command, { expiresIn });
  }

  generateUUID(): string {
    // RFC4122 version 4 compliant
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
