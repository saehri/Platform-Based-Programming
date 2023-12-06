const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /mahasiswa
router.get('/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (error, result) => {
    if (error) {
      console.log('🔴 Error fetching data', error);
      res.status(500).json({message: error});
    } else {
      res.json(result);
    }
  });
});

// GET /mahasiswa/:nim
router.get('/mahasiswa/:nim', (req, res) => {
  res.json(req.params);
  // db.query('SELECT * FROM mahasiswa', (error, result) => {
  //   if (error) {
  //     console.log('🔴 Error fetching data', error);
  //     res.status(500).json({message: error});
  //   } else {
  //     res.json(result);
  //   }
  // });
});

module.exports = router;
