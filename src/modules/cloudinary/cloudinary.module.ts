import { Module } from '@nestjs/common';
import { cloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
    providers: [
        CloudinaryService, cloudinaryProvider, CloudinaryService],
    exports: [cloudinaryProvider],
})

export class CloudinaryModule { }
