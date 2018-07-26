const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogsRouter = require('./controllers/blogs');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
