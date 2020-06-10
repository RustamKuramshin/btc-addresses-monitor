import { Injectable } from '@nestjs/common';
import {Cron, CronExpression, Interval} from '@nestjs/schedule';

@Injectable()
export class MonitorService {

    // @Cron("*/60 * * * * *")
    // @Interval(60000)
    // UpdateBtcAddressesBalance() {
    // }
}
