var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config= require('config')
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var app = express();


var mysql= require('mysql');

var db_config = {
    host     : 'localhost',
    user     : 'root',
    database : 'MY_INFO_DB',
    password : ''
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();



connection.query('SELECT * from Team', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0]);
});


app.set('port', config.get("port"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});
// app.get('/', routes.index);
app.get('/api/team',function(req, res){

    //connection.connect();
    connection.query('SELECT * from Team', function(err, rows, fields) {
        //console.log(err);
        console.log(rows);
        res.send(rows);
    });
    //connection.end();
});


app.get("/api/team/:id", function(req, res){
    var id = new objectId(req.params.id);
    connection.query("SELECT id from Team where id="+id,function(err, rows, fields) {
        //console.log(err);
        console.log(rows);
        res.send(rows);
    });
});

app.post("/api/team", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var TeamMember = req.body.name_news;
    var TeamMemberAge = req.body.res;
    var TeamMemberExp = req.body.exp;
    var TeamMember = {name_news: TeamMemberName, res: TeamMemberAge, exp: TeamMemberExp};
    //consnole.log(TeamMember);
    connection.query("INSERT INTO Team (id,name,age,work_exp_years,describe) values ("+1+TeamMember+","+TeamMemberAge+","
        +TeamMemberExp+")",function(err, rows, fields) {
        //console.log(err);

        res.sendStatus(200);
    });
});

app.delete("/api/team/:id", function(req, res){

    var id = new objectId(req.params.id);
    connection.query("Delete from Team where id="+id,function(err, rows, fields) {
        //console.log(err);

        res.sendStatus(200);
    })
});

app.put("/api/team", jsonParser, function(req, res){
   // if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var userName = req.body.name_news;
    var userAge = req.body.res;
    var userDay = req.body.day;
    connection.query("update table team set name="+userName+" where id="+id,function(err, rows, fields) {
        //console.log(err);

        res.sendStatus(200);
    })
});


