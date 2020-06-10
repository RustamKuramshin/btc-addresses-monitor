import {Module, OnApplicationBootstrap} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BtcAddressesModule} from './btc-addresses/btc-addresses.module';
import {BackendInfoModule} from './backend-info/backend-info.module';
import {BlockChainInfoModule} from './blockchain-info/blockchain-info.module';
import {UtilsModule} from './utils/utils.module';
import {ScheduleModule} from "@nestjs/schedule";
import {MonitorModule} from './monitor/monitor.module';
import {TasksModule} from './tasks/tasks.module';
import {TasksService} from "./tasks/tasks.service";
import {ConfModule} from './conf/conf.module';

@Module({
    imports: [TypeOrmModule.forRoot(), BtcAddressesModule, BackendInfoModule, BlockChainInfoModule, UtilsModule, ScheduleModule.forRoot(), MonitorModule, TasksModule, ConfModule]
})
export class AppModule implements OnApplicationBootstrap {
    constructor(private tasksService: TasksService) {
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.tasksService.createApplicationHeartBeat();
        await this.tasksService.createBtcAddressesBalanceUpdater();
    }
}
