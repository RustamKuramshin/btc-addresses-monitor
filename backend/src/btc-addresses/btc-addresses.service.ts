import {Injectable} from '@nestjs/common';
import {CreateBtcAddressDto} from "./dto/create-btc-address.dto";
import {EntityManager} from 'typeorm';
import {UtilsService} from "../utils/utils.service";

@Injectable()
export class BtcAddressesService {

    private dbQueries: Map<string, string>;

    constructor(private db: EntityManager, private utils: UtilsService) {
        this.dbQueries = this.utils.loadFilesFromSqlFolderToMapSync(__dirname);
    }

    async createBtcAddress(btcAddress: CreateBtcAddressDto): Promise<any> {
        await this.db.query(this.dbQueries.get('create-btc-address.sql'),
            [btcAddress.address]);
        return await this.getBtcAddress(btcAddress.address);
    }

    async getAllBtcAddresses(offset: number, limit: number): Promise<any> {
        if (offset && limit) {
            return await this.db.query(this.dbQueries.get('get-all-btc-addresses-with-limit-offset.sql'),[offset, limit]);
        }
        return await this.db.query(this.dbQueries.get('get-all-btc-addresses.sql'));
    }

    async getBtcAddress(address: string): Promise<any> {
        return await this.db.query(this.dbQueries.get('get-btc-address.sql'), [address]);
    }

    async deleteBtcAddress(address: string): Promise<any> {
        return await this.db.query(this.dbQueries.get('delete-btc-address.sql'),[address]);
    }
}