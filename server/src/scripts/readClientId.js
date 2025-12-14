const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../../../Z-OldStructure/.env');
const content = fs.readFileSync(envPath, 'utf-8');
const match = content.match(/GOOGLE_CLIENT_ID=(.*)/);
if (match) {
    console.log(match[1].trim());
}
