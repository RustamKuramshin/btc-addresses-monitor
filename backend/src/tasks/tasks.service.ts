import {Injectable} from '@nestjs/common';
import {SchedulerRegistry} from "@nestjs/schedule";
import {EntityManager, Connection} from "typeorm";
import {UtilsService} from "../utils/utils.service";
import {APP_CONFIG} from "../conf/conf.service";

@Injectable()
export class TasksService {

    private dbQueries: Map<string, string>;

    constructor(private scheduler: SchedulerRegistry, private db: EntityManager, private utils: UtilsService, private conn: Connection) {
        this.dbQueries = this.utils.loadFilesFromSqlFolderToMapSync(__dirname);
    }

    async createApplicationHeartBeat() {
        const regRes = await this.conn.createQueryBuilder()
            .insert()
            .into('service_registry')
            .values([
                {datetime_last_pulse: "now()"}
            ]).returning('*')
            .execute();
        if (regRes.raw.length) {
            APP_CONFIG.appId = regRes.raw[0].id;

            const heartbeatRate = await this.db.query(this.dbQueries.get('select-heartbeat-rate.sql'));
            if (heartbeatRate.length) {
                const rate = heartbeatRate[0].value;
                const jobHeartBeat = async () => {
                    await this.db.query(this.dbQueries.get('update-pulse-timestamp.sql'), [APP_CONFIG.appId]);
                };

                const interval = setInterval(jobHeartBeat, rate * 1000);
                this.scheduler.addInterval('heartbeat', interval);
            }
        }
    }

    async createBtcAddressesBalanceUpdater() {

    }

}