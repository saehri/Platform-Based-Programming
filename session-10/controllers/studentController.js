const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../models/db');

const jsonParser = bodyParser.json();

// GET /
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (error, result) => {
    if (error) {
      console.log('🔴 Error fetching data', error);
      res.status(500).json({message: error});
    } else {
      res.json(result);
    }
  });
});

// GET /:nim
router.get('/:nim', (req, res) => {
  const studentId = req.params.nim;
  db.query(
    'SELECT * FROM students where nim = ?',
    [studentId],
    (error, result) => {
      if (error) {
        console.log('🔴 Error fetching data', error);
        res.status(500).json({message: error});
      } else if (!result.length) {
        res
          .status(404)
          .json({message: `Student with id: ${studentId} does not exist`});
      } else {
        res.json(result[0]);
      }
    }
  );
});

// PUT /students/:nim
router.put('/:nim', (req, res) => {
  const studentId = req.params.nim;
  const {nama, gender, prodi, alamat} = req.body;
  db.query(
    'UPDATE students SET nama = ?, gender = ?, prodi = ?, alamat =?, WHERE nim = ?',
    [nama, gender, prodi, alamat, studentId],
    (error) => {
      if (error) {
        console.error('Error updating students:', error);
        res.status(500).json({message: 'Internal server error'});
      } else {
        res.json('Updating students successfully!');
      }
    }
  );
});

// DELETE /:nim
router.delete('/:nim', (req, res) => {
  const studentId = req.params.nim;
  db.query(`DELETE FROM students WHERE nim = ${studentId}`, (error, result) => {
    if (error) {
      console.error('Failed to delete data with id:', studentId);
      res.status(500).json({message: 'Internal server error!'});
    } else {
      res.json(
        'Successfully deleted student with id:',
        studentId,
        result.affectedRows
      );
    }
  });
});

router.post('/new', jsonParser, (req, res) => {
  const {nim, nama, gender, prodi, alamat} = req.body;
  const queryText = `INSERT INTO students (nim, nama, gender, prodi, alamat) VALUES ("${nim}", "${nama}", "${gender}", "${prodi}", "${alamat}")`;

  db.query(queryText, (err, results, fields) => {
    if (err) {
      console.error('Error creating data');
      res.status(500).json({message: err.message});
    } else {
      console.log('Row inserted:', results.affectedRows);
      res.json('Data is successfully created!');
    }
  });
});

module.exports = router;
