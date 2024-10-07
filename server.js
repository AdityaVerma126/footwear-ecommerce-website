const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const subscribe = []; 

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/footcapDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, function () {
        console.log("server started on port 3000");
    });
  })
  .catch(err => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  });

// Handle connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create User model
const User = mongoose.model("User", userSchema);

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var email = req.body.email;
    console.log(email);
    res.sendFile(__dirname + "/sucess.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html");
});

app.get("/wishlist", (req, res) => {
    res.sendFile(__dirname + "/wishlist.html");
});

app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html");
});

app.get("/contactus", (req, res) => {
    res.sendFile(__dirname + "/contactus.html");
});

app.get("/shop", (req, res) => {
    res.sendFile(__dirname + "/shop.html");
});

app.post("/s", (req, res) => {
    var user = req.body.username;
    var pword = req.body.password;
    
    console.log("subscribe/login page :- "+"user name "+user+" password  "+ pword);
    let subs ={
        username : user,
        password : pword,
    }
    subscribe.push(subs); 
    console.log(subscribe) 
    res.redirect("/");
});

app.post("/portfolio", (req, res) => {
    res.sendFile(__dirname + "/portfolio.html");
});

app.post("/sendmessage", (req, res) => {
    var name = req.body.Name;
    var Email = req.body.Email;
    var subject = req.body.subject;
    var textarea = req.body.textarea;
    console.log("prtofolio message details :- "+"name: "+name,+"Email: "+ Email,+"sub: "+ subject,+"msg: "+ textarea);
    res.redirect("/");
});

app.post("/contact", (req, res) => {
    var name = req.body.name;
    var Email = req.body.email;
    var phoneno = req.body.phone;
    var textarea = req.body.message;
    console.log("contact us details :-" +"name :"+name,+"email: "+ Email,+"phone no.: "+ phoneno,+"msg: "+ textarea);
    res.redirect("/");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        console.log("Received signup request:", { username, email });

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password // Note: In a real application, you should hash this password
        });

        // Save user to database
        await newUser.save();
        
        console.log("New user signup successful:", { username, email });
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup", error: error.message });
    }
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/sucess.html");
});

// new route for handling login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find user by username
        const user = await User.findOne({ username: username });

        if (user && user.password === password) {
            // In a real application, you should use proper password hashing and comparison
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
});

app.get('/test-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed", error: error.toString() });
  }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});
app.listen(4000, function () {
    console.log("server started on port 4000");
});