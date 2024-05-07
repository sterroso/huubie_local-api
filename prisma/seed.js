import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
      where: { email: "client.admin@client.examplemail.com" },
      update: {},
      create: {
        email: "client.admin@client.examplemail.com",
        password: await hash("adminpass", 18),
        first_name: "Admin",
        last_name: "Default User",
      },
    });
}