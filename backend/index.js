const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const port = 4000;
const JWT_SECRET = 'secret_ecom';

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://kishanchannesh19:Pikupiku@cluster0.od9qk.mongodb.net/Piku")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// Middleware to authenticate JWT token
function fetchUser(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Root API
app.get('/', (req, res) => {
  res.send("Server is Running...");
});

// File Upload Setup
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });
app.use('/images', express.static('upload/images'));

// Image Upload API
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: 0, message: "No image uploaded" });

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// MongoDB Schemas
const Product = mongoose.model("product", {
  id: Number,
  name: String,
  image: String,
  cat: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

const User = mongoose.model('users', {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartdata: Object,
  date: { type: Date, default: Date.now }
});

// Add Product
app.post('/addproduct', async (req, res) => {
  try {
    const count = await Product.countDocuments({});
    const product = new Product({
      id: count + 1,
      name: req.body.name,
      cat: req.body.cat,
      old_price: req.body.old_price,
      new_price: req.body.new_price,
      image: req.body.image || ""
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Remove Product
app.post('/removeproduct', async (req, res) => {
  try {
    const removed = await Product.findOneAndDelete({ id: req.body.id });
    if (!removed) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, name: removed.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to remove product" });
  }
});

// Get All Products
app.get('/allproduct', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// Signup
app.post('/signup', async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ success: false, errors: "Email already registered" });

    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartdata: cart
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password)
      return res.status(400).json({ success: false, errors: "Invalid credentials" });

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// Get Cart
app.post('/getcart', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.cartdata);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

// Add to Cart
app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user.id);
    const cart = user.cartdata;
    cart[itemId] = (cart[itemId] || 0) + 1;

    await User.findByIdAndUpdate(req.user.id, { cartdata: cart });
    res.send("Item added to cart");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Remove from Cart
app.post('/removecartitem', fetchUser, async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user.id);
    const cart = user.cartdata;

    if (cart[itemId]) {
      cart[itemId]--;
      if (cart[itemId] <= 0) delete cart[itemId];
    }

    await User.findByIdAndUpdate(req.user.id, { cartdata: cart });
    res.send("Item removed from cart");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// New Collection
app.get('/newcollections', async (req, res) => {
  try {
    const products = await Product.find({});
    const newcollection = products.slice(-8);
    res.send(newcollection);
  } catch (error) {
    res.status(500).send("Could not fetch new collections");
  }
});

// Popular in Women
app.get('/popularinwomen', async (req, res) => {
  try {
    const products = await Product.find({ cat: "women" });
    res.send(products.slice(0, 4));
  } catch (error) {
    res.status(500).send("Could not fetch popular products");
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
