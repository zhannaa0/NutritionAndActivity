const express = require('express');
const router = express.Router();
const ApiHistory =  require('../models/ApiHistory')
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
      const data = await ApiHistory.find().lean();
      const doc = new PDFDocument();
      doc.fontSize(12);
      doc.text('API History', { align: 'center' });
      doc.moveDown();
  
      data.forEach((entry, index) => {
        doc.text(`Entry ${index + 1}:`);
        doc.text(`Direction: ${entry.direction}`);
        doc.text(`Query: ${JSON.stringify(entry.query)}`);
        doc.moveDown();
      });
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=api_history.pdf');
  
      doc.pipe(res);
  
      doc.end();
    } catch (err) {
      console.error('Error generating PDF:', err);
      res.status(500).send('Error generating PDF');
    }
  })


  module.exports = router