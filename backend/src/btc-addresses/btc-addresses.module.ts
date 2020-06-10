import {Module} from '@nestjs/common';
import {BtcAddressesController} from './btc-addresses.controller';
import {BtcAddressesService} from './btc-addresses.service';
import {UtilsService} from "../utils/utils.service";

@Module({
  controllers: [BtcAddressesController],
  providers: [BtcAddressesService, UtilsService]
})
export class BtcAddressesModule {}
