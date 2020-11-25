import { FilesController } from './files.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        FilesController],
    providers: [],
})
export class FilesModule { }
