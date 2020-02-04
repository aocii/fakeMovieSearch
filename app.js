var express = require("express");
var parser = require("body-parser");
var request = require("request");
var rp = require("request-promise");

var app = express();

app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: true }));

app.get("/", function (q, a) {
    a.render("home");
});
// -----------------------




app.get("/answer", function (q, a) {

    var s = (q.query.x)+"&apikey=thewdb";
    var url = "http://www.omdbapi.com/?s="
    
    rp(url+s).then((htmlstring) => {
        const parsedData = JSON.parse(htmlstring);
        console.log("çalıştı");
        // a.send(parsedData.Search[0])
        a.render("answer",{data:parsedData})
    }).catch((err) => {
        console.log("errorrr", err);
    });
    
});




// -----------------------
app.get("*", function (q, a) {
    a.send("wrong");
});

app.listen(1000, function () {
    console.log("localhoşt1000 de açtım bro");
});