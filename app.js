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

//home route
app.route('/articles')
.get((req, res) => {

    Article.find({},function(err, foundArticles) {
        if(!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }
    });
})
.post((req,res)=>{
    const newArticle= new Article({
    title:req.body.title,
    content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("successfully post added");
        }
    });
    })
.delete((req,res)=>{
    Article.deleteMany({},function(err){
        if(!err){
            res.send("articles deleted");
        }
    });

});


app.route("/articles/:articleTitle")
.get(function(req,res){
    const articleTitle = req.params.articleTitle;
    Article.findOne({title: articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("no article with matching title");
        }
    });
});


//server connect
app.listen('3000', ()=>{
console.log('listening on port 3000');
});