import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbUri = process.env.NODE_ENV === 'test' 
            ? process.env.MONGODB_URI_TEST 
            : (process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MONGODB_URI);
            
        if (!dbUri) {
            console.error('❌ Environment Variable check failed:');
            console.error('Available keys:', Object.keys(process.env).filter(key => key.includes('URI') || key.includes('URL') || key.includes('MONGO')));
            throw new Error(`Database URI (MONGO_URI, DATABASE_URL, or MONGODB_URI) not found for ${process.env.NODE_ENV || 'development'} environment`);
        }

        const conn = await mongoose.connect(dbUri);
        if (process.env.NODE_ENV !== 'test') {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
