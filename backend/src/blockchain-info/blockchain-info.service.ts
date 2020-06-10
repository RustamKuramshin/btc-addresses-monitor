import {HttpService, Injectable} from '@nestjs/common';
import { BlockChainInfo } from './interfaces/blockchain.info.interface';
import {map} from "rxjs/operators";

@Injectable()
export class BlockChainInfoService {
    constructor(private http: HttpService) {}

    getBlockChainInfo(): BlockChainInfo {
        return {
            lastMaxBlockHeight: Math.round(Math.random() * 1000),
            datetimeVerification: new Date().toJSON()
        }
    }

    async rawAddr(address): Promise<any> {
        return await this.http.get(`https://blockchain.info/rawaddr/${address}`).pipe(map(res => res.data)).toPromise();
    }
}
