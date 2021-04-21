import { MusicType } from './../../../commons/enums/index.Enum';
import { GetLimitDto } from './../../../commons/dto/getByID';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDefined } from 'class-validator';

export class GetFilteredMusicsQuery{

    @ApiProperty({ name: 'limit', required: true, description: 'limit' })
    @IsNumber()
    @IsDefined()
    limit: number; 
    type: MusicType
    @ApiProperty({name:"rate",type:Number,required: true, description: 'rate' })
   rate: number
}