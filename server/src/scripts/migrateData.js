const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const usersFile = path.join(__dirname, '../../../users.json');

async function migrate() {
    try {
        if (!fs.existsSync(usersFile)) {
            console.log('No users.json found, skipping migration.');
            return;
        }

        const data = fs.readFileSync(usersFile, 'utf-8');
        const users = JSON.parse(data);

        console.log(`Found ${users.length} users to migrate.`);

        for (const user of users) {
            // Check if user already exists
            const existing = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existing) {
                console.log(`User ${user.email} already exists, skipping.`);
                continue;
            }

            let password = user.password;
            if (password) {
                password = await bcrypt.hash(password, 10);
            }

            await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.username || user.displayName, // Use username or displayName
                    password: password,
                    googleId: user.googleId,
                },
            });
            console.log(`Migrated user: ${user.email}`);
        }

        console.log('Migration completed.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

migrate();
