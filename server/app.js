const express=require('express');
const bodyparser=require('body-parser');
const route=require('./routes/routing');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyparser.json());
app.use('/',route);

const port=3000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
});