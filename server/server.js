const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Authorization, Accept");

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Data MySql
const db = mysql.createConnection({
    host: 'serwer2286904.home.pl',
    user: '35797066_shopping_list',
    password: 'shopping_list',
    database: '35797066_shopping_list'
})
// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err
    }
    console.log('MySQL Connected')
})

//Create Table Shopping List
app.get('/createShoppingList', (req, res) => {
    let sql = 'CREATE TABLE ShoppingList(id DOUBLE, name VARCHAR(255), price VARCHAR(255), updateDate VARCHAR(255) ,  PRIMARY KEY(id)) ';
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('Shopping List table created')
    })
})


// Add Thing
app.post('/addThing', (req, res) => {
    let post = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    }

    let sql = 'INSERT INTO ShoppingList  SET?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send(`Thing added`)
    })
})

// Download Shopping List
app.get('/downloadShoppingList', (req, res) => {
    let sql = 'SELECT * FROM ShoppingList'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        res.send(results)
    })
})
//Delete Thing
app.delete('/deleteThing/:id', (req, res) => {
    let sql = `DELETE FROM ShoppingList WHERE Id = ${req.params.id} `
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('Thing deleted')
    })
})

app.post('/editThing', (req, res) => {

    let sql = `UPDATE ShoppingList SET Name='${req.body.name}', Price='${req.body.price}', UpdateDate='${req.body.updateDate}' WHERE Id=${req.body.id}`
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Thing edited")
    })
})

app.listen(9000, () => {
    console.log('Server started on port 9000')
})