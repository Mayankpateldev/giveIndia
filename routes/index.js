const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const router = express.Router();
const BankAccount = mongoose.model('BankAccount');

router.get('/', async (req, res) => {
    let fromAccountId = await BankAccount.find()
    res.send(fromAccountId);
});

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
  ], async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let isAccount = await BankAccount.countDocuments({ 'accountId': req.body.accountId })
        if(isAccount > 0) {
            res.send({ errorCode: 119,  errorMessage: 'Account already register with same account Id.' })
        }
        else {
            const account = new BankAccount(req.body);
            account.save()
                .then(() => { res.send('Thank you for your account!'); })
                .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
        }
    } else {
        res.send(errors);
    }
});

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
  ], async (req, res) =>  {
    console.log(req.body);
    let amount = parseInt(req.body.amount)
    const errors = validationResult(req);
    if( amount <= 0 ) {
        res.send({ errorCode: 112,  errorMessage: 'Please enter an valid amount.' })
    }
    if (errors.isEmpty()) {
        if (req.body.fromAccountId  === req.body.toAccountId ) {
            res.send({ errorCode: 110,  errorMessage: 'Transfer between same account not valid.' })
        } else {
            amount = (amount / 100)  // Convert Paisa to Ruppes
            let fromAccount = await BankAccount.find({ 'accountId': req.body.fromAccountId })
            let toAccount = await BankAccount.find({ 'accountId': req.body.toAccountId })
            
            toAccount = toAccount[0]
            fromAccount = fromAccount[0]
            
            let fromBal = parseInt(fromAccount.balance)
            let toBal = parseInt(toAccount.balance)
            
            if (toAccount.accountType === 'BasicSavings') {
                if ((toBal + amount) > 50000) {
                    res.send({ errorCode: 115,  errorMessage: 'The balance in ‘BasicSavings’ account type should never exceed Rs. 50,000.' })
                }
            }
            if ( fromBal > amount )
            {
                let payload = {
                    "name" : fromAccount.name,
                    "accountId" : fromAccount.accountId,
                    "accountType" : fromAccount.accountType,
                    "balance" : (fromBal - amount),
                }
                const updateFrom = await BankAccount.findByIdAndUpdate(fromAccount._id, payload, { new: false })
                payload = {
                    "name" : toAccount.name,
                    "accountId" : toAccount.accountId,
                    "accountType" : toAccount.accountType,
                    "balance" : (toBal + amount),
                }
                const updateto = await BankAccount.findByIdAndUpdate(toAccount._id, payload, { new: false })
                let resJson = {
                    newSrcBalance: updateFrom.balance,
                    totalDestBalance: updateto.balance,
                    transferedAt: new Date()
                }
                res.send(resJson);
            } else {
                res.send({ errorCode: 111,  errorMessage: 'Account balance is less then required.' })
            }
        }
    } else {
        res.send(errors);
    }
});

module.exports = router;
