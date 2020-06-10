import {Controller, Get} from '@nestjs/common';
import {BackendInfoService} from "./backend-info.service";

@Controller('backend-info')
export class BackendInfoController {
    constructor(private readonly backendInfoService: BackendInfoService) {}

    @Get()
    async getInfo(): Promise<any> {
        return this.backendInfoService.getBackendInfo();
    }
}
