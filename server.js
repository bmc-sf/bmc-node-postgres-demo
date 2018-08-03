//	Node-Postgres-Demo
//  Date:  08/03/18

//Imports
var express = require("express");
const { Client } = require('pg');
//var parse = require('utils-json-parse');
var http = require('http');
var bodyParser = require('body-parser');

// Use Express
var app = express()

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Postgress DB Parameters - Heroku & Postgress
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

// MySQL DB Parameters - Heroku & ClearDB
//var con = mysql.createConnection({
//	host: env('DB_HOST', 'us-cdbr-iron-east-05.cleardb.net'),
//	user: env('DB_USERNAME', 'b310795ff08cd3'),
//	password: env('DB_PASSWORD', '24d90289'),
//	database: env('DB_DATABASE', 'heroku_b344631383948cc')
//  });

// connect to DB
    // con.connect(function(err) {
    //     if (err) {
    //         console.error('Error:- ' + err.stack);
    //         return;
    //     }

    //     //console.log('Connected Id:- ' + con.threadId);
    // });

// ------------------------------------------------
// Express
// ------------------------------------------------
// GET request returns static text
//app.get('/', (req, res) => res.send('Hello......node.js server'));
app.get('/', function (req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<h1>DEMO:  Heroku Node.js, PostgreSQL and Heroku Connect app v1.2</h1><br /><br /> <strong>View All students:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/students">http:\/\/bmc-node-postgres-demo.herokuapp.com\/students</a></br><strong>View Claire:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/harry">http:\/\/bmc-node-postgres-demo.herokuapp.com\/harry</a></br><strong>Insert Student:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/insert">http:\/\/bmc-node-postgres-demo.herokuapp.com\/insert</a></br><strong>Update Student Better:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/update">http:\/\/bmc-node-postgres-demo.herokuapp.com\/update</a></br> <strong>Update Student Free:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/update2">http:\/\/bmc-node-postgres-demo.herokuapp.com\/update2</a></br><strong>Delete Student:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/delete">http:\/\/bmc-node-postgres-demo.herokuapp.com\/delete</a></br></br></br></br></br></br><strong>Admin:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/admin">admin</a></br></br>');
	res.end();
});

app.get('/Demo', function (req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<h1>Eds DEMO:  Heroku Node.js, PostgreSQL and Heroku Connect app v1.3</h1><br/><br/><strong>Update Student Trial:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/updateTrial">http:\/\/bmc-node-postgres-demo.herokuapp.com\/Trial</a></br></br> <strong>Update Student Good: </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/updateGood">http:\/\/bmc-node-postgres-demo.herokuapp.com\/Good</a></br></br><strong>Update Student Better: </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/updateBetter">http:\/\/bmc-node-postgres-demo.herokuapp.com\/Better</a></br></br><strong>Update Student Best:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/updateBest">http:\/\/bmc-node-postgres-demo.herokuapp.com\/Best</a></br></br><strong>Update Student Inactive: </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/updateInactive">http:\/\/bmc-node-postgres-demo.herokuapp.com\/Inactive</a></br></br></br><hr><strong>View Claire:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/claire">http:\/\/bmc-node-postgres-demo.herokuapp.com\/claire</a></br>');
	res.end();
});

app.get('/buttons', function (req, res){
	res.sendFile('/demo.html');
});

// GET request runs SELECT * query
app.get('/students', function(request, response) {
	client.query("SELECT firstname__c, lastname__c, email__c, subscription_status__c FROM salesforce.student__c", function (err, result, fields) {
		if (err) throw err;
        console.log("Results:");
 		console.log(result);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(JSON.stringify(result));
		response.end();
	  });
});

// GET request runs SELECT * query
app.get('/claire', function(request, response) {
//	client.query("SELECT * FROM users WHERE lastname = 'Boyle'", function (err, result, fields) {
    client.query("SELECT firstname__c, lastname__c, email__c, subscription_status__c FROM salesforce.student__c  WHERE email__c = 'lboyle@example.com'", function (err, result, fields) {
		if (err) throw err;
        console.log("Results:");
 		console.log(result);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(JSON.stringify(result));
		response.end();
	  });
});

// GET request runs INSERT query
app.get('/insert', function(request, response) {
	  var sql = "INSERT INTO salesforce.student__c (firstname__c, lastname__c, email__c, subscription_status__c) VALUES ('Mace', 'Windu', 'mwindu@ral.com', 'Good')";
	  client.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		console.log(sql);
	  });
});

// GET request runs UPDATE "Trial" query
app.get('/updateTrial', function(request, response) {
	  var value1 = '2';
	  var value2 = '3';
	  var sql = "UPDATE salesforce.student__c SET subscription_status__c = 'Trial' WHERE email__c = 'lboyle@example.com'";
	  client.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		console.log(sql);
	  });

});

// GET request runs UPDATE "Good" query
app.get('/updateGood', function(request, response) {
    var value1 = '2';
    var value2 = '3';
    var sql = "UPDATE salesforce.student__c SET subscription_status__c = 'Good' WHERE email__c = 'lboyle@example.com'";
    client.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log(sql);
    });

});

// GET request runs UPDATE "Better" query
app.get('/updateBetter', function(request, response) {
  var value1 = '2';
  var value2 = '3';
  var sql = "UPDATE salesforce.student__c SET subscription_status__c = 'Better' WHERE email__c = 'lboyle@example.com'";
  client.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(sql);
  });

});

// GET request runs UPDATE "Best" query
app.get('/updateBest', function(request, response) {
  var value1 = '2';
  var value2 = '3';
  var sql = "UPDATE salesforce.student__c SET subscription_status__c = 'Best' WHERE email__c = 'lboyle@example.com'";
  client.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(sql);
  });

});

// GET request runs UPDATE "Inactive" query
app.get('/updateInactive', function(request, response) {
  var value1 = '2';
  var value2 = '3';
  var sql = "UPDATE salesforce.student__c SET subscription_status__c = 'Inactive' WHERE email__c = 'lboyle@example.com'";
  client.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(sql);
  });

});

// GET request runs DELETE query
app.get('/delete', function(request, response) {
    var sql = "DELETE FROM salesforce.student__c WHERE lastname__c like '%Windu%'";
     client.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
        console.log(sql);
        response.write('Deleted student Mace Windu');
	  });
});

// Handle POST with JSON

// Inactice, Trial, Good, Better, Best  subscription_status__c
app.post('/json', function(request, response) {
    var jsonData = request.body;

    // var myStringResult = JSON.stringify(request.body);
    // var myResult = JSON.parse(myStringResult);
    // firstname = myResult.firstname;
    // lastname = myResult.lastname;
    var jString = JSON.stringify(jsonData);
    var jObj = JSON.parse(jString);
    var tmp = 'New Student:  ' + jObj.firstname + ' ' + jObj.lastname + ' ' + jObj.email;
    console.log('JSON = ' + tmp);

    // Update Student
    var sql = "UPDATE salesforce.student__c SET subscription_status__c = '"+jObj.subscription_status__c+"' WHERE email__c = '"+jObj.email+"'";
    console.log(sql);
    client.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");

    });

    // Write Response
    response.set('Content-Type', 'application/json');
    response.write("You sent some data " + JSON.stringify(jsonData));
    response.end();
});

// ************************************************************************
app.get('/admin', function (req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>ADMIN:  node.js DB app</h1><br /><br /> <strong>Create DB:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/createDB">http:\/\/bmc-node-postgres-demo.herokuapp.com\/createDB</a></br><strong>Create Table:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/createTable">http:\/\/bmc-node-postgres-demo.herokuapp.com\/createTable</a></br><strong>Load Data:  </strong><a href="http:\/\/bmc-node-postgres-demo.herokuapp.com\/loadData">http:\/\/bmc-node-postgres-demo.herokuapp.com\/loadData</a></br></br>');
  res.end();
});

// GET request runs Create Database query
app.get('/createDB', function(request, response) {
	client.query("CREATE DATABASE students", function (err, result) {
		if (err) throw err;
		console.log("Database created");
  });
});

// GET request runs Create Table query
app.get('/createTable', function(request, response) {
	  var sql = "CREATE TABLE students (account_number INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), institution VARCHAR(255), course VARCHAR(255), instructor VARCHAR(255), subscription_type VARCHAR(255), subscription_level VARCHAR(255))";
    client.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table created");
  });
});

// GET request runs Load Data INSERT query
app.get('/loadData', function(request, response) {
  var sql = "INSERT INTO students (firstname, lastname, email, institution, course, instructor, subscription_type, subscription_level) VALUES ?";
  var values = [
    ['Hermoine', 'Granger', 'hgranger@hogwarts.com', 'Hogwarts School of Witchcraft and Wizardry', 'Defense Against the Dark Arts', 'Severus Snape', 'Free', 'Good'],
    ['Neval', 'Longbottom', 'nlongbottom@hogwarts.com', 'Hogwarts School of Witchcraft and Wizardry', 'Defense Against the Dark Arts', 'Severus Snape', 'Free', 'Good'],
    ['Harry', 'Potter', 'hpotter@hogwarts.com', 'Hogwarts School of Witchcraft and Wizardry', 'Defense Against the Dark Arts', 'Severus Snape', 'Paid', 'Good'],
    ['Ronald', 'Weasley', 'rweasley@hogwarts.com', 'Hogwarts School of Witchcraft and Wizardry', 'Defense Against the Dark Arts', 'Severus Snape', 'Free', 'Good'],
    ['Poe', 'Dameron', 'pdameron@ral.com', 'Rebel Alliance University', 'X-Wing Combat Maneuvers', 'Obi Wan Kenobi', 'Free', 'Good'],
    ['Luke', 'Skywalker', 'lskywalker@ral.com', 'Rebel Alliance University', 'X-Wing Combat Maneuvers', 'Obi Wan Kenobi','','']
  ];
  client.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
// ************************************************************************

// Start Server
var server = app.listen(process.env.PORT, function () {
	//var host = server.address().address;
	//var port = server.address().port;

 //Print Message To Console
 //console.log('Server running at http://%s:%s', host, port);
});
