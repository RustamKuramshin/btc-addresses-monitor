import {IsNotEmpty, IsString} from "class-validator";

export class CreateBtcAddressDto {
    @IsString()
    @IsNotEmpty()
    address: string;
}