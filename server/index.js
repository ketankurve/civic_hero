import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issues.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/issues', issueRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error.message);
    });

// 3. A Simple Route to test
app.get('/', (req, res) => {
    res.send('Civic Hero API is ready!');
});