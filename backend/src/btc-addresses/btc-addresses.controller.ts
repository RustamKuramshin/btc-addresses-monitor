import {Body, Controller, Delete, Get, Param, Post, Query, UsePipes} from '@nestjs/common';
import {CreateBtcAddressDto} from "./dto/create-btc-address.dto";
import {BtcAddressesService} from "./btc-addresses.service";
import {BtcAddressValidatorPipe} from "./pipes/btc-address-validator.pipe";

@Controller('btc-addresses')
export class BtcAddressesController {
    constructor(private readonly btcAddressesService: BtcAddressesService) {}

    @Post()
    @UsePipes(BtcAddressValidatorPipe)
    async create(@Body() createBtcAddressDto: CreateBtcAddressDto): Promise<any> {
        return await this.btcAddressesService.createBtcAddress(createBtcAddressDto);
    }

    @Get()
    async findAll(@Query('offset') offset: number, @Query('limit') limit: number): Promise<any> {
        return await this.btcAddressesService.getAllBtcAddresses(offset, limit);
    }

    @Get(':address')
    @UsePipes(BtcAddressValidatorPipe)
    async findOne(@Param('address') address: string): Promise<any> {
        return await this.btcAddressesService.getBtcAddress(address);
    }

    @Delete(':address')
    @UsePipes(BtcAddressValidatorPipe)
    async remove(@Param('address') address: string) {
        await this.btcAddressesService.deleteBtcAddress(address);
    }
}
