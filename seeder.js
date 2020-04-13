var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/register',
  'headers': {
    'Content-Type': ['application/json', 'application/json']
  },
  body: JSON.stringify({"name":"Give India Saving1","accountId":"1234545","accountType":"Savings","balance":"35000"})
};

request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});

var options = {
    'method': 'POST',
    'url': 'http://localhost:3000/register',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify({"name":"Give India Saving2","accountId":"432212","accountType":"Savings","balance":"36985"})
  };

request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});


var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/register',
  'headers': {
    'Content-Type': ['application/json', 'application/json']
  },
  body: JSON.stringify({"name":"Give India Saving3","accountId":"292749","accountType":"Savings","balance":"47585"})
};

request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});

var options = {
    'method': 'POST',
    'url': 'http://localhost:3000/register',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify({"name":"Give India Current1","accountId":"426322","accountType":"Current","balance":"15486"})
};

request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});

var options = {
    'method': 'POST',
    'url': 'http://localhost:3000/register',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify({"name":"Give India Current2","accountId":"632445","accountType":"Current","balance":"85425"})
};

request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});


var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/register',
  'headers': {
    'Content-Type': ['application/json', 'application/json']
  },
  body: JSON.stringify({"name":"Give India Current3","accountId":"453353","accountType":"Current","balance":"100520"})
};

request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

var options = {
    'method': 'POST',
    'url': 'http://localhost:3000/register',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify({"name":"Give India BasicSavings1","accountId":"958452","accountType":"BasicSavings","balance":"95054"})
};
request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
});

var options = {
    'method': 'POST',
    'url': 'http://localhost:3000/register',
    'headers': {
      'Content-Type': ['application/json', 'application/json']
    },
    body: JSON.stringify({"name":"Give India BasicSavings2","accountId":"22432","accountType":"BasicSavings","balance":"36052"})
};

request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});


var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/register',
  'headers': {
    'Content-Type': ['application/json', 'application/json']
  },
  body: JSON.stringify({"name":"Give India BasicSavings3","accountId":"253823578","accountType":"BasicSavings","balance":"15007"})
};

request(options, function (error, response) { 
if (error) throw new Error(error);
console.log(response.body);
});
