var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require("../server");
console.log(server);
chai.use(chaiHttp);
const serverURL = process.env.SERVER_URL || 'http://127.0.0.1:3000';

describe('GiveIndiaTest', function () {

    it("should register new account /register POST", function (done) {
        chai.request(serverURL)
            .post('/register')
            .send({
                "name": "Test Account 1",
                "accountId": "8283422",
                "accountType": "Savings",
                "balance": "45000" // Store In Rupees
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    })

    it("should register new account /register POST", function (done) {
        chai.request(serverURL)
            .post('/register')
            .send({
                "name": "Test Account 2",
                "accountId": "123586",
                "accountType": "Savings",
                "balance": "20000"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    })

    it("can not register account with same id /register POST", function (done) {
        chai.request(serverURL)
            .post('/register')
            .send({
                "name": "Anil",
                "accountId": "8283422",
                "accountType": "Savings",
                "balance": "35000"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorCode');
                res.body.should.have.property('errorMessage');
                done();
            });
    })

    it("can not register without account id /register POST", function (done) {
        chai.request(serverURL)
            .post('/register')
            .send({
                "name": "Anil",
                "accountType": "Savings",
                "balance": "35000"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    })

    it("should transfer from one account to other /transfer POST", function (done) {
        chai.request(serverURL)
            .post('/transfer')
            .send({
                "fromAccountId":"8283422",
                "toAccountId":"123586",
                "amount": "5000" // In Paisa
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('newSrcBalance');
                res.body.should.have.property('totalDestBalance');
                done();
            });
    })

    it("Can not transfer in same account /transfer POST", function (done) {
        chai.request(serverURL)
            .post('/transfer')
            .send({
                "fromAccountId":"8283422",
                "toAccountId":"8283422",
                "amount": "5000" // In Paisa
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorCode');
                res.body.should.have.property('errorMessage');
                done();
            });
    })

    it("can not transfer `Source account should have the required amount for the transaction to succeed` /transfer POST", function (done) {
        chai.request(serverURL)
            .post('/transfer')
            .send({
                "fromAccountId":"8283422",
                "toAccountId":"123586",
                "amount": "50000000000" // In Paisa
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorCode');
                res.body.should.have.property('errorMessage');
                done();
            });
    })

    it("should register new account /register POST", function (done) {
        chai.request(serverURL)
            .post('/register')
            .send({
                "name": "Test Account 3",
                "accountId": "689526000",
                "accountType": "BasicSavings",
                "balance": "35000"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    })
    
    it("should transfer from one account to other /transfer POST", function (done) {
        chai.request(serverURL)
            .post('/transfer')
            .send({
                "fromAccountId":"8283422",
                "toAccountId":"689526000",
                "amount": "5000" // In Paisa
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('newSrcBalance');
                res.body.should.have.property('totalDestBalance');
                done();
            });
    })
    
    it("can not transfer `The balance in ‘BasicSavings’ account type should never exceed Rs. 50,000` /transfer POST", function (done) {
        chai.request(serverURL)
            .post('/transfer')
            .send({
                "fromAccountId":"8283422",
                "toAccountId":"689526000",
                "amount": "50000000000" // In Paisa
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('errorMessage');
                res.body.should.have.property('errorCode');
                done();
            });
    })
})
describe('404 Test Case', function () {
    it("should return 404 not found", function (done) {
        chai.request(serverURL)
            .get('/test')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
    })
})