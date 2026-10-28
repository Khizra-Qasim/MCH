// ✅ Import required libraries
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Allow JSON body for login/cart requests

// ✅ Serve frontend files from "Public" folder
app.use(express.static("Public"));

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "1234",    // your MySQL password
  database: "mch"      // must match the schema you created
});

// ✅ Route: Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// ✅ Route: Get first 15 products for homepage
app.get("/products/home", (req, res) => {
  db.query("SELECT * FROM products LIMIT 15", (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// ✅ Route: Get single product by ID
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results[0]);
  });
});

// ✅ Route: Get products by category
app.get("/products/category/:name", (req, res) => {
  const category = req.params.name;
  const sql = `
    SELECT p.* 
    FROM products p 
    JOIN categories c ON p.category_id = c.id 
    WHERE c.name = ?`;
  db.query(sql, [category], (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// ✅ Route: Search products
app.get("/products/search/:query", (req, res) => {
  const q = `%${req.params.query}%`;
  db.query("SELECT * FROM products WHERE name LIKE ? OR description LIKE ?", [q, q], (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// ✅ Route: User login (basic example)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length > 0) {
      res.json({ success: true, message: "Login successful", user: results[0] });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

// ✅ Route: Add to cart
app.post("/cart/add", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  db.query("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], (err) => {
    if (err) return res.status(500).send("Database error");
    res.json({ success: true, message: "Product added to cart" });
  });
});

// ✅ Route: Get cart items
app.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT c.id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?", [userId], (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

// ✅ Start the server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
