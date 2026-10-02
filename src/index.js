require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 9000;
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');}
);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



