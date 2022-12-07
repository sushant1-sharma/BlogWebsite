//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sushantsharma:Sush123@cluster0.piqwrgw.mongodb.net/BlogDB", {useNewUrlParser: true});

const homeStartingContent = "Hey, Welcome to my blog Websie, here you will get content related to Programming, Web Development, QA Testing and lot more."
const aboutContent = "I am a Web Developer and a QA Engineer who always interested in new challanges in life."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

var _ = require('lodash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const compose_data_array = [];

const ItemsSchema = new mongoose.Schema({
  Title: String,
  Post: String  
});

const Item = mongoose.model("Item", ItemsSchema);




app.get('/', (req,res)=>{

  Item.find({}, function(err, foundItems){
    
    

     res.render("home", {Postdata: foundItems, homeStartingContent: homeStartingContent});
     });

 });

app.get('/about', (req,res)=>{
     res.render("about",{aboutContent: aboutContent});

 });


app.get('/contact', (req,res)=>{
     res.render("contact",{contactContent: contactContent});

 });

app.get('/compose', (req,res)=>{
     res.render("compose");

 });

app.get('/posts/:postName', (req, res) => {

   Item.findOne({  Title : req.params.postName  }, function(err, foundItems){
    console.log(foundItems);
      // if(_.lowerCase(foundItems.Title)==_.lowerCase(req.params.postName)){
        //const obj = JSON.parse('foundItems');
        if(foundItems!=null){
       	PostTitle= foundItems.Title;
       	PostContent = foundItems.Post;
        console.log(PostContent);
       	res.render("post", {PostTitle: PostTitle ,PostContent: PostContent });
       //}
        }
        else{
          res.redirect("/");
        }
  });
});

app.post('/compose', (req,res)=>{
	// var compose_data = {
	// 	Title : req.body.Title,
	// 	Post : req.body.Post
	// }

  const NewItem = new Item({
     Title: req.body.Title,
     Post: req.body.Post
  });

  NewItem.save();

	//compose_data_array.push(compose_data);
	//console.log(compose_data_array);
	res.redirect("/");
   
});











let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function(){
  console.log("Server started Successfuly");
});


