
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


const actorRoutes = require('./routes/actorRoutes');
app.use('/api', actorRoutes);


app.listen(port, () => {
  console.log(`API REST para actores corriendo en http://localhost:${port}`);
});