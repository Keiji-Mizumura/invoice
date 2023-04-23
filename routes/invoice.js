const express = require('express');

const router = express.Router();

const invoiceController = require('../controllers/invoice');

router.get('/', invoiceController.getIndex);

module.exports = router;