import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipeValidationPipe implements PipeTransform<string, number>{
  transform(value: any, metadata: ArgumentMetadata) {


    //we need to convert the string to number
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue)) {
      throw new BadRequestException(`the validation field for ethis fiels ${value} must be number`)


    }

    return newValue;
  }
}
