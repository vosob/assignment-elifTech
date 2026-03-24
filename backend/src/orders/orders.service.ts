import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    return await this.prismaService.order.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        totalPrice: dto.totalPrice,
        items: JSON.parse(JSON.stringify(dto.items)),
      },
    });
  }
}
