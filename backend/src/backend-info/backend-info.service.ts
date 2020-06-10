import { Injectable } from '@nestjs/common';
import {EntityManager} from "typeorm";
import {UtilsService} from "../utils/utils.service";

@Injectable()
export class BackendInfoService {

    private dbQueries: Map<string, string>;

    constructor(private db: EntityManager, private utils: UtilsService) {
        this.dbQueries = this.utils.loadFilesFromSqlFolderToMapSync(__dirname);
    }

    async getBackendInfo(): Promise<any> {
        const res = await this.db.query(this.dbQueries.get('select-service-registry.sql'));
        return {status: "up", numberServiceInstances: res.length ? res[0].count : null};
    }
}
