const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const subscribe = []; 

// Connect  MongoDB
mongoose.connect("mongodb://localhost:27017/footcapDB")
  .then(() => {
    console.log("Connected to MongoDB");
    seedProducts(); // Call the function to seed products
    app.listen(3000, function () {
        console.log("server started on port 3000");
    });
  })
  .catch(err => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  });

//  connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

//  User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// User model
const User = mongoose.model("User", userSchema);
// product schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});   

//product model
const Product = mongoose.model("Product", productSchema); 
// contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true }
});

// contact model
const Contact = mongoose.model("Contact", contactSchema);
        






//  compression middleware
app.use(compression());

// Serve static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets'), {
    maxAge: '1d' // Cache static assets for 1 day
}));

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

app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        // Create new contact document
        const newContact = new Contact({
            name: name,
            email: email,
            phone: phone,
            message: message
        });

        // Save to database
        await newContact.save();
        
        console.log("Contact form submission saved:", { name, email });
        res.redirect("/");
    } catch (error) {
        console.error("Error saving contact form:", error);
        res.status(500).json({ message: "Error saving contact form", error: error.message });
    }
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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
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

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare submitted password with hashed password
        const match = await bcrypt.compare(password, user.password);
        
        if (match) {
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

async function seedProducts() {
  const products = [
    { id: 1, name: "Running Sneaker Shoes", category: "men", price: 180.85, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { id: 2, name: "Leather Mens Slipper", category: "men", price: 190.85, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" },
    { id: 3, name: "Simple Fabric Shoe", category: "women", price: 160.85, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a" },
    { id: 4, name: "Air Jordan 7 Retro", category: "sports", price: 170.85, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3" },
    { id: 5, name: "Women's High Heels", category: "women", price: 210.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { id: 6, name: "Men's Casual Loafers", category: "men", price: 145.50, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509" },
    { id: 7, name: "Tennis Shoes", category: "sports", price: 189.99, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa" },
    { id: 8, name: "Women's Sandals", category: "women", price: 99.99, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306" },
    { id: 10, name: "Basketball Sneakers", category: "sports", price: 199.99, image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842" },
    { id: 11, name: "Men's Hiking Boots", category: "men", price: 179.99, image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd" },
    { id: 12, name: "Women's Ballet Flats", category: "women", price: 89.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
    { id: 13, name: "Kids' Velcro Sneakers", category: "kids", price: 59.99, image: "https://images.unsplash.com/photo-1571210862729-78a52d3779a2" },
  ];

  try {
    for (let product of products) {
      await Product.findOneAndUpdate({ id: product.id }, product, { upsert: true, new: true });
    }
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`Sending ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});
