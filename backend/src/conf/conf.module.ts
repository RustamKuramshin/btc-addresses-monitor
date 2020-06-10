import {Global, Module} from '@nestjs/common';
import { ConfService } from './conf.service';

@Global()
@Module({
  providers: [ConfService],
  exports: [ConfService]
})
export class ConfModule {}
