import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if(!error) return;
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
