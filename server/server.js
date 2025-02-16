const express = require('express');                
const morgan = require('morgan');                  
const bodyParser = require('body-parser');         
const mongoose = require('mongoose');              
const cors = require('cors');                      
const config = require('./config');

const app = express();                              

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

// Connect to database before starting the server
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API 🚀');
});
const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search', productSearchRoutes);

// Start server only if DB connection is successful
const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
