import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ParamsPath } from './types/types';
import { CreateFolderDto } from './dto/createFolder.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFilesDto } from './dto/deleteFiles.dto';
import { Response } from 'express';
import { RenameFileDto } from './dto/renameFile.dto';

@Controller('files')
export class FilesController {
  constructor(private filesServices: FilesService) {}

  @Get('carpets/*')
  allFiles(@Param() dir: ParamsPath) {
    return this.filesServices.allFiles(dir[0]);
  }

  @Post('folder/*')
  createFolder(@Param() dir: ParamsPath, @Body() name: CreateFolderDto) {
    return this.filesServices.createFolder(dir[0], name.name);
  }

  @Post('upload/*')
  @UseInterceptors(FilesInterceptor('files', 1000))
  uploadFiles(
    @Param() dir: ParamsPath,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.filesServices.uploadFiles(dir[0], files);
  }

  @Delete('remove/*')
  removeFiles(@Param() dir: ParamsPath, @Body() files: DeleteFilesDto) {
    return this.filesServices.removeFiles(dir[0], files);
  }

  @Get('download/*')
  async downloadFile(@Param() dir: ParamsPath, @Res() res: Response) {
    const filePath = await this.filesServices.getFilePath(dir[0]);
    res.sendFile(filePath);
  }

  @Put('rename/*')
  async renameFile(@Param() dir: ParamsPath, @Body() files: RenameFileDto) {
    return this.filesServices.renameFile(dir[0], files);
  }
}
