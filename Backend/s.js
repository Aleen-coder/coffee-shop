import express from "express";
import mysql from "mysql";
import cors from "cors";
//import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());

// create MYSQL connection 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coffee-shop",
});
// Test connection
 db.connect((err) => { 
    if (err) { 
        console.error("MySQL connection error:", err); }
     else { 
        console.log("Connected to coffee_shop database"); } });




// API to get all products (coffee + pastry) 
       app.get("/products", (req, res) => {
         const q = "SELECT * FROM products"; 
         db.query(q, (err, data) => {
             if (err) return res.status(500).json(err);
                 return res.json(data); 
                });
                 });
// Checkout route
app.post("/checkout", (req, res) => {
  const { user_id, cartItems } = req.body;

  // 1. Create new order
  const orderQuery = "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')";
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  db.query(orderQuery, [user_id, totalAmount], (err, result) => {
    if (err) return res.status(500).json(err);

    const orderId = result.insertId;

    // 2. Insert order items
    const itemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const values = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);


    db.query(itemQuery, [values], (err2) => {
      if (err2) return res.status(500).json(err2);

// 3. Clear cart
      const clearQuery = "DELETE FROM cart_items WHERE user_id = ?";
      db.query(clearQuery, [user_id], (err3) => {
        if (err3) return res.status(500).json(err3);
        return res.json({ message: "Order placed successfully", orderId });
      });
    });
  });
});

// Get cart items for a user
app.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const q =`
   SELECT c.id , p.id AS product_id, p.name, p.price, p.image_url, c.quantity 
             FROM cart_items c 
             INNER JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = ?
             `;
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
// Add item to cart 
app.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body; 
  if (!product_id) {
     return res.status(400).json({ error: "Missing product_id" }); 
    }
const q = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)"; 
db.query(q, [user_id, product_id, quantity], (err, result) => { 
if (err) {
 
   console.error(" Error inserting into cart_items:", err); 
  return  res.status(500).json({ error: err.message });
  }
 return res.json({ message: "Item added", id: result.insertId });
  });
 });


// Remove item from cart
app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM cart_items WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Item removed" });
  });
});
// Get all orders for a user 
app.get("/orders/:userId", (req, res) => { 
 const userId = req.params.userId;
 const q = ` SELECT o.id, o.total_amount, o.status, o.created_at 
 FROM orders o WHERE o.user_id = ? `; 
 db.query(q, [userId], (err, data) => {
 if (err) return res.status(500).json(err);
return res.json(data); 
});
 });

 // Register new user
  app.post("/register", (req, res) => { 
 const { name, email, password } = req.body;

// 1. Basic validation 
 if (!name || !email || !password) {
return res.status(400).json({ error: "Name, email, and password are required" }); }

// 2. Check if email already exists
const checkQuery = "SELECT * FROM users WHERE email = ?";
db.query(checkQuery, [email], (err, results) => {
if (err) { 
  console.error("Error checking email:", err);
   return res.status(500).json({ error: "Database error" }); 
  }
if (results.length > 0) {
 return res.status(409).json({ error: "Email already registered" }); 
  }

// 3. Insert new user

 const q = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
  db.query(q, [name, email, password], (err, result) => {
     if (err) {
  console.error("Error registering user:", err); 
 return res.status(500).json({ error: err.message });
 }
 return res.json({ message: `Welcome aboard, ${name}!  🎉 You’ve registered successfully.`, 
    userId: result.insertId 

   }); 
  }); 
  });

// Login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
// 1. Basic validation 
 if (!email || !password) { 
 return res.status(400).json({ error: "Email and password are required" });
 }


  // 2. Check user
  const q = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  db.query(q, [email, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = results[0];
    return res.json({
       message: `Welcome back, ${user.name}!`, 
       user });
  });
});

// Get all users (admin only)
app.get("/admin/users/:adminId", (req, res) => {
  const adminId = req.params.adminId;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const q = "SELECT id, name, email, role, created_at FROM users";
    db.query(q, (err2, data) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json(data);
    });
  });
});

// Get all orders (admin only)
app.get("/admin/orders/:adminId", (req, res) => {
  const adminId = req.params.adminId;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const q = `
      SELECT o.id, o.user_id, u.name AS user_name, o.total_amount, o.status, o.created_at
      FROM orders o
      INNER JOIN users u ON o.user_id = u.id
    `;
    db.query(q, (err2, data) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json(data);
    });
  });
});

// Update order status (admin only)
app.put("/admin/orders/:adminId/:orderId", (req, res) => {
  const { adminId, orderId } = req.params;
  const { status } = req.body;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const q = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(q, [status, orderId], (err2) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json({ message: "Order status updated successfully" });
    });
  });
});

 const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started running on http://localhost:${PORT}`);
});
