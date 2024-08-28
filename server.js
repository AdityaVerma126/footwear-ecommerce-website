
const express = require("express")
const bodyParser = require("body-parser")

const app = express();


app.use(express.static("assets"))
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")

});
app.post("/", (req, res) => {

    var email = req.body.email;
    console.log(email);
    res.sendFile(__dirname + "/sucess.html")


})
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html")
})
app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html")
})
app.get("/contactus", (req, res) => {
    res.sendFile(__dirname + "/contactus.html")
})






app.post("/s", (req, res) => {
    var user = req.body.username;
    var pword = req.body.password;
    console.log("subscribe/login page :- "+"user name "+user,+"password"+ pword);
    res.redirect("/")

})
app.post("/portfolio", (req, res) => {


    res.sendFile(__dirname + "/portfolio.html")
})

app.post("/sendmessage", (req, res) => {
    var name = req.body.Name;
    var Email = req.body.Email;
    var subject = req.body.subject;
    var textarea = req.body.textarea;
    console.log( "prtofolio message details :- "+"name: "+name,+"Email: "+ Email,+"sub: "+ subject,+"msg: "+ textarea);
    res.redirect("/")

})


app.post("/contact", (req, res) => {
    var name = req.body.name;
    var Email = req.body.email;
    var phoneno = req.body.phone;
    var textarea = req.body.message;
    console.log("contact us details :-" +"name :"+name,+"email: "+ Email,+"phone no.: "+ phoneno,+"msg: "+ textarea);
    res.redirect("/")

})
app.listen(3000, function () {
    console.log("server started")
})