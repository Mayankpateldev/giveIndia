GiveIndia Coding Test
Pre Requested
1) Node.js 
2) MongoDB

Need to Set MongoDB URI in .env file ( Default is mongodb://localhost:27017/giveindia)

Object Schema
name: String (required)
value: Any (required)
timestamp: Date (not required)
How to use the API
1) Create new Account
curl --location --request POST 'localhost:3000/register' \
--header 'Content-Type: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Testing",
    "accountId": "8283422",
    "accountType": "Savings",
    "balance": "35000"
}'

2) Transfer Amount to One Account to Other

curl --location --request POST 'localhost:3000/transfer' \
--header 'Content-Type: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fromAccountId":"9854789",
	"toAccountId":"85997",
	"amount": "50000"
}'

Setting Up (If needed)
npm install
npm run watch
node .\seeder.js  (For Auto register some accounts)


Running Tests

npm install -g mocha

cd > Project Dir
> mocha