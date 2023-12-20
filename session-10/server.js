const express = require('express');
const studentController = require('./controllers/studentController');
const lecturerController = require('./controllers/lecturerController');

const app = express();
const PORT = 3000;

app.use('/students', studentController);
app.use('/lecturers', lecturerController);

app.listen(PORT, () => {
  console.log('🟢 Server is running on port:', PORT);
});
