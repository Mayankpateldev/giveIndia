const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const controller = require('./controller')
const router = express.Router();

router.get('/', controller.getAccounts);
router.post('/register', [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('accountId')
      .isLength({ min: 1 })
      .withMessage('Please enter an Account Id'),
    check('accountType')
      .isLength({ min: 1 })
      .isIn(['Savings', 'Current', 'BasicSavings'])
      .withMessage('Please enter an Account Type any one from this [Saving, Current, BasicSaving]'),
    check('balance')
      .isLength({ min: 1 })
      .withMessage('Please enter an intial Amount'),
  ], controller.registerAccount);

router.post('/transfer', [
    check('fromAccountId')
      .isLength({ min: 1 })
      .withMessage('Please enter an from Account Id'),
    check('toAccountId')
      .isLength({ min: 1 })
      .withMessage('Please enter an to Account Id'),
    check('amount')
      .isLength({ min: 1 })
      .isInt()
      .withMessage('Please enter an valid amount'),
  ], controller.transferAmount);

module.exports = router;
