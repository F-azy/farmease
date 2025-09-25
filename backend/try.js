// hashAdmin.js
import bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'root'; // admin password
  const hash = await bcrypt.hash(password, 10); // 10 is salt rounds
  console.log('Hashed password:', hash);
}

generateHash();
