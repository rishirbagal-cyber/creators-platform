import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function findUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne();
    if (user) {
      console.log('Found user:', user.email);
    } else {
      console.log('No users found in database');
    }
    process.exit(0);
  } catch (err) {
    console.error('💥 Connection Error:', err.message);
    if (err.reason) console.error('Reason:', err.reason.servers);
    process.exit(1);
  }
}

findUser();
