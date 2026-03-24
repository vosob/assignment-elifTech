import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @HttpCode(200)
  async getShops() {
    return await this.shopsService.getShops();
  }

  @Get(':id/products')
  @HttpCode(200)
  async getShopProducts(@Param('id') id: string) {
    return await this.shopsService.getShopProducts(id);
  }
}
