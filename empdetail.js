
var http = require("http");
var express = require('express');
const cors = require('cors');

var app = express();
app.use(cors())
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'newuser', //mysql database user name
  password : 'password', //mysql database password
  database : 'Bhushan' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3005, function () {


});

//rest api to get all results
app.get('/employees', function (req, res) {
  
   connection.query('select * from EMP', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.get('/byname', function (req, res) {
  
  connection.query('select * from EMP ORDER BY name ASC', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
app.get('/employees/:id',(request,response)=>
{
 
    connection.query('select  * from EMP where id=?',[request.params.id],(err,result)=>
    {
        if(err) throw err;
        
        response.write(JSON.stringify(result));
        response.end();
    })
})
app.delete('/employees/:id',(request,response)=>
{
 
    connection.query('delete from EMP where id=?',[request.params.id],(err,result)=>
    {
        if(err) throw err;
        console.log("Delete Record successfully");
        
        response.end();
    })
})
app.put('/emp/:id',(request,response)=>
{
  
 
    connection.query("update EMP set name='BNV',salary=3421 where id=?",[request.params.id],(err,result)=>
    {
        if(err) throw err;
        console.log("Delete Record successfully");
        
        response.end();
    })
})

app.post('/save', function (req, res) {
   var post  = req.body;
   connection.query('INSERT INTO EMP SET ?', post, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
