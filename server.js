const express = require('express');
const { Client } = require('pg');

const app = express();
const tableName = 'notifications';

const connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pushnotification',
    password: '1234',
    port: 5432,
});

connection.connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});
app.use(express.json());

app.get('/getNotification', (req, res) => {
    connection.query(`select * from ${tableName}`, (error, response) => {
        if(!!error)console.log('Query error');
        else res.send(response.rows[Math.floor(Math.random()*response.rows.length)]);
    });
});

app.get('/',(req, res) => res.sendFile(__dirname+'/index.html'));
app.get('/*', (req, res) => res.sendFile(__dirname+req.originalUrl));

app.listen(4201, '0.0.0.0', () => console.log('Server Listening on 4201'));
