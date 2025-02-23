const express = require('express');
const { getExchangeRate, getSupportedCurrencies } = require('../controllers/currency.controllers');

const router = express.Router();

router.get('/exchange/:base/:target', getExchangeRate);
router.get('/currency-codes', getSupportedCurrencies);

module.exports = router;