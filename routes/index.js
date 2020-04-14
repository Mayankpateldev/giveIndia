const express = require('express');
const router = express.Router();
const account = require('./Account')

router.use('/account', account)

module.exports = router;
