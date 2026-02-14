const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.error('Failed to connect to DB:', error);
        process.exit(1);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('DB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('DB error:', err);
});

module.exports = connectDB;