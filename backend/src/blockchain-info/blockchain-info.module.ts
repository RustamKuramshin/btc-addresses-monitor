import {HttpModule, Module} from '@nestjs/common';
import { BlockChainInfoController } from './blockchain-info.controller';
import { BlockChainInfoService } from './blockchain-info.service';

@Module({
  imports: [HttpModule],
  exports: [BlockChainInfoService],
  controllers: [BlockChainInfoController],
  providers: [BlockChainInfoService]
})
export class BlockChainInfoModule {}
