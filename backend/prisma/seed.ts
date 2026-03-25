import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding...');

  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  for (let i = 0; i < 10; i++) {
    const fullName = faker.commerce.productName();
    const shortName = fullName.split(' ').slice(0, 2).join(' ');

    await prisma.shop.create({
      data: {
        name: shortName,
        shopRate: parseFloat(faker.commerce.price({ min: 1, max: 5 })),
        products: {
          create: Array.from({ length: 6 }).map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
            image: faker.image.urlLoremFlickr({ category: 'food' }),
          })),
        },
      },
    });
  }

  console.log('🎉 Seeding done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
