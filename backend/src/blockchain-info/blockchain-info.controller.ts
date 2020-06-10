import {Controller, Get} from '@nestjs/common';
import {BlockChainInfoService} from "./blockchain-info.service";
import {BlockChainInfo} from "./interfaces/blockchain.info.interface";

@Controller('blockchain-info')
export class BlockChainInfoController {
    constructor(private readonly blockChainInfoService: BlockChainInfoService) {}

    @Get()
    getInfo(): BlockChainInfo {
        return this.blockChainInfoService.getBlockChainInfo();
    }
}
