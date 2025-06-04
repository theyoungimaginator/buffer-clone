require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
// const userRoutes = require('./routes/userRoutes'); // Future
// const postRoutes = require('./routes/postRoutes'); // Future
// const schedulerRoutes = require('./routes/schedulerRoutes'); // Future

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('BufferX API is running!');
});

// Use API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
// app.use('/api/users', userRoutes); // Future
// app.use('/api/posts', postRoutes); // Future
// app.use('/api/scheduler', schedulerRoutes); // Future

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});