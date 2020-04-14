const mongoose = require('mongoose');
const BankAccount = mongoose.model('BankAccount');
const { check, validationResult } = require('express-validator');

exports.getAccounts = async function(req, res) {
    let fromAccountId = await BankAccount.find()
    res.send(fromAccountId);
}

exports.registerAccount = async function(req, res) {
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
}

exports.transferAmount = async function(req, res) {
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
            try {
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
                    let updateFrom, updateto;
                    let payload = {
                        "name" : fromAccount.name,
                        "accountId" : fromAccount.accountId,
                        "accountType" : fromAccount.accountType,
                        "balance" : (fromBal - amount),
                    }
                    try {
                        updateFrom = await BankAccount.findByIdAndUpdate(fromAccount._id, payload, { new: false })
                    } catch (error) {
                        console.error('error', error)
                        return res.send({ errorCode: 120,  errorMessage: 'Something is wrong in transfer.' })
                    }
                    payload = {
                        "name" : toAccount.name,
                        "accountId" : toAccount.accountId,
                        "accountType" : toAccount.accountType,
                        "balance" : (toBal + amount),
                    }
                    try {
                        updateto = await BankAccount.findByIdAndUpdate(toAccount._id, payload, { new: false })
                    } catch (error) {
                        // Rollback Transaction
                        console.error('error', error)
                        let payload = {
                            "name" : fromAccount.name,
                            "accountId" : fromAccount.accountId,
                            "accountType" : fromAccount.accountType,
                            "balance" : (fromBal + amount),
                        }
                        updateFrom = await BankAccount.findByIdAndUpdate(fromAccount._id, payload, { new: false })
                        return res.send({ errorCode: 120,  errorMessage: 'Something is wrong in transfer.' })
                    }
                    let totalDestBal = await BankAccount.aggregate(
                        [ { $match: { name : { $eq : toAccount.name} } },
                            { $group: {
                                _id : null,
                                balance: { $sum: "$balance" }
                            }
                            }
                        ]
                        )
                    console.log('transferTotal', totalDestBal)    
                    let resJson = {
                        newSrcBalance: (fromBal - amount),
                        totalDestBalance: totalDestBal[0].balance,
                        transferedAt: new Date()
                    }
                    res.send(resJson);
                
                } else {
                    res.send({ errorCode: 111,  errorMessage: 'Account balance is less then required.' })
                }
            } catch (error) {
                console.error('error', error)
                return res.send({ errorCode: 120,  errorMessage: 'Something is wrong in transfer.' })
            }    
        }
    } else {
        res.send(errors);
    }
}