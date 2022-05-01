const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname,'dist')))

app.get('/',(req,res)=>{
    res.render('dist/index.html')
})

app.all('*',(req,res)=>{
    res.redirect('/');
})

app.listen(3000);