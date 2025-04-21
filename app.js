const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { initializeDB } = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');
const cors = require('cors');

dotenv.config();
console.log('Environment loaded, DB_HOST:', process.env.DB_HOST);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initializeDB();
app.use(cors());
app.use('/api', schoolRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to School Management API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong on the server' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
