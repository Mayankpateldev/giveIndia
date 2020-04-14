## GiveIndia Coding Test

### Pre Requested
1) Node.js 
2) MongoDB

Need to Set MongoDB URI in .env file ( Default is mongodb://localhost:27017/giveindia)

### How to use the API

#### Using Curl Command

##### Register new Account:
	curl --location --request POST 'localhost:3000/account/register' \
	--header 'Content-Type: application/json' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	    "name": "Testing",
	    "accountId": "8283422",
	    "accountType": "Savings",
	    "balance": "35000"
	}'

##### Transfer Amount from one Account to Other:
	curl --location --request POST 'localhost:3000/account/transfer' \
	--header 'Content-Type: application/json' \
	--header 'Content-Type: application/json' \
	--data-raw '{
		"fromAccountId":"9854789",
		"toAccountId":"85997",
		"amount": "50000"
	}'

#### Using PostMan Collection
You need to import postman collection from git repository (Interview.postman_collection.json)

### Now Install Node Modules and Run Application
	npm install
	npm run watch
### If you want to register dummy account using seeder please run below commands ( Must be server run)
	node .\seeder.js  ####(For Auto register some accounts)
### Running Tests
	npm install -g mocha #### require to install mocha lib for running Test Cases
	> mocha
