import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainVendorDto {
   @IsString()
   @IsNotEmpty()
   method:string;

   @IsArray()
   params: any[];

}