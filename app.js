const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Eat", "Sleep", "Code"];
const works = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    
    let day = date.getDate();
    
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

    let newItem = req.body.item;

    if(req.body.list === "Work"){
        works.push(newItem);
        res.redirect("/Work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});

app.get("/Work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: works});
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});