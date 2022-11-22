const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", ejs);
app.set("views", "views");

app.get('/', (req, res, next) =>{
    res.render('login', {
        pagetitle: 'login'
    });
});

app.listen(8080, () => {
    console.log("Server Started!!")
});