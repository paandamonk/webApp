const express = require('express');
const users = require('./appdata/controller');
const app = express();
const port = 3000;
const server = "localhost";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/../client/"));

app.use('/users', users);




app.listen(port);
// eslint-disable-next-line no-console
console.log(`listening on: http://${server}:${port}`);