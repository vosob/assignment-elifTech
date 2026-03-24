import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async getShops() {
    return await this.prisma.shop.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getShopProducts(id: string) {
    return await this.prisma.product.findMany({
      where: { shopId: id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
      },
    });
  }
}
