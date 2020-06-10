import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {UtilsService} from "../utils/utils.service";

@Module({
  exports: [TasksService],
  providers: [TasksService, UtilsService]
})
export class TasksModule {}
