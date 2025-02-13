import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readdir, mkdir, writeFile, unlink, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'fs';
import { DeleteFilesDto } from './dto/deleteFiles.dto';
import { accessSync } from 'node:fs';

@Injectable()
export class FilesService {
  private path = process.env.PATH_DRIVE;

  private orderFiles(files: string[]) {
    const contentFiles = files
      .filter((value) => {
        if (value.includes('.')) return value;
      })
      .sort()
      .reverse();

    const folders = files
      .filter((value) => {
        if (!value.includes('.')) return value;
      })
      .sort()
      .reverse();

    return {
      folders,
      files: contentFiles,
    };
  }

  async allFiles(dir: string) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    try {
      const files = await readdir(path);

      const orderFiles = this.orderFiles(files);

      return {
        message: 'Files found',
        statusCode: 200,
        data: orderFiles,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  async getFilePath(dir: string): Promise<string> {
    const parseDir = dir.replace('_', ' ');
    const decodedDir = decodeURIComponent(parseDir);
    const path = join(this.path, decodedDir);

    try {
      // Verifica si el archivo existe
      await accessSync(path);
      return path;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      }
      throw new BadRequestException('Failed to get file path');
    }
  }

  async createFolder(dir: string, name: string) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir, name);

    try {
      await mkdir(path);
      return {
        message: 'Folder created',
        statusCode: 201,
      };
    } catch {
      throw new BadRequestException('Directory as already exist');
    }
  }

  async uploadFiles(dir: string, files: Express.Multer.File[]) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    try {
      for (const file of files) {
        const filePath = join(path, file.originalname);
        await writeFile(filePath, file.buffer);
      }
      return {
        message: 'Files uploaded',
        statusCode: 201,
      };
    } catch {
      throw new BadRequestException('Directory not found');
    }
  }

  async removeFiles(dir: string, file: DeleteFilesDto) {
    const decodedDir = decodeURIComponent(dir);

    const path = join(this.path, decodedDir);

    const isExist = existsSync(path);

    if (!isExist) {
      throw new BadRequestException('Directory not found');
    }

    try {
      if (file.name.includes('.')) {
        const filepath = join(path, decodeURIComponent(file.name));
        await unlink(filepath);
        return {
          message: 'File removed',
          statusCode: 200,
        };
      }

      const filepath = join(path, decodeURIComponent(file.name));
      await rm(filepath, {
        recursive: true,
        force: true,
      });

      return {
        message: 'Folder removed',
        statusCode: 200,
      };
    } catch {
      throw new BadRequestException('File not found');
    }
  }
}
