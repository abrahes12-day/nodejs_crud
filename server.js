const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const body_parser = require('body-parser');
const path = require('path');
const app = express();
const connectDB = require('./server/database/connection');

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 3001;

//log request
app.use(morgan('tiny'));

//Connect MongoDB
connectDB();

//parse request to body-parser
// app.use(body_parser.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use('/', require('./server/routes/route'));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})