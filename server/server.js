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
    let sql = 'CREATE TABLE ShoppingList(Id DOUBLE, Name VARCHAR(255), Price VARCHAR(255), UpdateDate VARCHAR(255) ,  PRIMARY KEY(id)) ';
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('Shopping List table created')
    })
})
app.get('/api', (req,res)=> {
    res.send("hello")
})

// Add Thing
app.post('/addTask', (req, res) => {
    let post = {
        Id: req.body.id,
        Name: req.body.name,
        Price: req.body.price,
     
    }
    let sql = 'INSERT INTO ShoppingList  SET?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send('Thing added')
    })
})




app.listen(9000, () => {
    console.log('Server started on port 9000')
})