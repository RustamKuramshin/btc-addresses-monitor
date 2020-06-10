import { Module } from '@nestjs/common';
import { BackendInfoController } from './backend-info.controller';
import { BackendInfoService } from './backend-info.service';
import {UtilsService} from "../utils/utils.service";

@Module({
  controllers: [BackendInfoController],
  providers: [BackendInfoService, UtilsService]
})
export class BackendInfoModule {}
