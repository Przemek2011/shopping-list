const express = require('express');
const bodyParser = require("body-parser");

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




app.listen(5000, () => {
    console.log('Server started on port 5000')
})