const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    const users = await prisma.user.findMany();
    console.log('Users in DB:', users);
    const todos = await prisma.todo.findMany();
    console.log('Todos in DB:', todos);
}

checkData()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
