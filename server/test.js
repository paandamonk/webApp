const express = require('express');
const users = require('./appdata/controller');
const app = express();
const port = 80;
var cors = require('cors');

const server = "localhost";
app.use(cors());
//app.use("/", express.static(__dirname + "/../client/"));

app.use('/users', users);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port);
// eslint-disable-next-line no-console
console.log(`listening on: http://${server}:${port}`);