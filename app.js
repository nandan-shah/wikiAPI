const express=require('express');
const bodyParser =require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app=express();

//ejs setup
app.set('view engine', 'ejs');
app.use(express.static("public"));

//bodyPARSER setup
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose setup
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true,useUnifiedTopology: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model('Article',articleSchema);
//mongoose setup complete

//home route get request
app.get('/', (req, res) => {
res.send('Hello');
});

//server connect
app.listen('3000', ()=>{
console.log('listening on port 3000');
});