import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import * as WAV from 'wallet-address-validator/dist/wallet-address-validator.js'

@Injectable()
export class BtcAddressValidatorPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const metaTypeName = metadata.metatype.name;
        let address = "";
        if (metaTypeName === 'String') {
            address = value;
        } else if (metaTypeName === 'CreateBtcAddressDto') {
            address = value.address;
        }

        if (!WAV.validate(address, 'BTC')) {
            throw new BadRequestException('Invalid BTC address');
        }

        return value;
    }
}