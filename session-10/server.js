const express = require('express');
const studentController = require('./controllers/studentController');

const app = express();
const PORT = 3000;

app.use('/mahasiswa', studentController);

app.listen(PORT, () => {
  console.log('🟢 Server is running on port:', PORT);
});
