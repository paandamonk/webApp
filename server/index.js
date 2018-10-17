const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const server = "localhost";

app.get('/', (req, res)   =>{
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1 ,2 ,3]);
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.query);
})
app.listen(port, () => console.log(`listening on: http://${server}:${port}`));