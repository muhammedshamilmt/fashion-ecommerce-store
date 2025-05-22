import { PrismaClient } from '@prisma/client';
import { products } from '../src/utils/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  for (const product of products) {
    const { _id, ...productData } = product;
    await prisma.product.create({
      data: {
        ...productData,
        price: productData.price / 83, // Convert from INR to USD
      },
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 