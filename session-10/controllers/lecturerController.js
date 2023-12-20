const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../models/db');

const jsonParser = bodyParser.json();

// GET /
router.get('/', (req, res) => {
  db.query('SELECT * FROM lecturers', (error, result) => {
    if (error) {
      console.log('🔴 Error fetching data', error);
      res.status(500).json({message: error});
    } else {
      res.json(result);
    }
  });
});

// GET /:nip
router.get('/:nip', (req, res) => {
  const lecturerId = req.params.nip;
  db.query(
    'SELECT * FROM lecturers where nip = ?',
    [lecturerId],
    (error, result) => {
      if (error) {
        console.log('🔴 Error fetching data', error);
        res.status(500).json({message: error});
      } else if (!result.length) {
        res
          .status(404)
          .json({message: `Lecturer with id: ${lecturerId} does not exist`});
      } else {
        res.json(result[0]);
      }
    }
  );
});

// PUT /lecturers/:nip
router.put('/:nip', (req, res) => {
  const lecturerId = req.params.nip;
  const {nama, gender, prodi, alamat} = req.body;
  db.query(
    'UPDATE lecturers SET nama = ?, gender = ?, prodi = ?, alamat =?, WHERE nip = ?',
    [nama, gender, prodi, alamat, lecturerId],
    (error) => {
      if (error) {
        console.error('Error updating lecturers:', error);
        res.status(500).json({message: 'Internal server error'});
      } else {
        res.json('Updating lecturers successfully!');
      }
    }
  );
});

// DELETE /:nip
router.delete('/:nip', (req, res) => {
  const lecturerId = req.params.nip;
  db.query(
    `DELETE FROM lecturers WHERE nip = ${lecturerId}`,
    (error, result) => {
      if (error) {
        console.error('Failed to delete data with id:', lecturerId);
        res.status(500).json({message: 'Internal server error!'});
      } else {
        res.json(
          'Successfully deleted lecturer with id:',
          lecturerId,
          result.affectedRows
        );
      }
    }
  );
});

router.post('/new', jsonParser, (req, res) => {
  const {nip, nama, gender, prodi, alamat} = req.body;
  const queryText = `INSERT INTO lecturers (nip, nama, gender, alamat) VALUES ("${nip}", "${nama}", "${gender}", "${alamat}")`;

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
