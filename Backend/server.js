import express from "express";
//import mysql from "mysql";
import cors from "cors";
// import multer from "multer";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
   const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test connection

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});





app.get("/test-db", (req, res) => { 
  db.query("SELECT * FROM users LIMIT 1", (err, result) => {
     if (err) {
       return res.status(500).send("DB connection failed: " + err.message);
       } res.send("DB connected! First user: " + JSON.stringify(result[0]));
       }); 
      });

// =========================
// Products API
// =========================
app.get("/products", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// =========================
// Checkout route
// =========================
app.post("/checkout", (req, res) => {
  const { user_id, cartItems } = req.body;

  // 1. Create new order
  const orderQuery =
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')";
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  db.query(orderQuery, [user_id, totalAmount], (err, result) => {
    if (err) return res.status(500).json(err);

    const orderId = result.insertId;

    // 2. Insert order items
    const itemQuery =
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const values = cartItems.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

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

// =========================
// Cart routes
// =========================
app.get("/cart/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = `
    SELECT c.id, p.id AS product_id, p.name, p.price, p.image_url, c.quantity
    FROM cart_items c
    INNER JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  if (!product_id) {
    return res.status(400).json({ error: "Missing product_id" });
  }

  const q = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)";
  db.query(q, [user_id, product_id, quantity], (err, result) => {
    if (err) {
      console.error("Error inserting into cart_items:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: "Item added", id: result.insertId });
  });
});

app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM cart_items WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Item removed" });
  });
});

// =========================
// Orders for a user
// =========================
app.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = `
    SELECT o.id, o.total_amount, o.status, o.created_at
    FROM orders o
    WHERE o.user_id = ?
  `;
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// =========================
// User routes
// =========================
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  // Check if email already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Insert new user
    const q = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    db.query(q, [name, email, password], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.json({
        message: `Welcome aboard, ${name}! 🎉 You’ve registered successfully.`,
        userId: result.insertId,
      });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

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
    return res.json({ message: `Welcome back, ${user.name}!`, user });
  });
});

// =========================
// Admin routes
// =========================
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
// =========================
// Admin: View all contact messages
// =========================
app.get("/admin/messages/:adminId", (req, res) => {
  const adminId = req.params.adminId;

  // Check if requester is an admin
  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // Fetch all contact messages with user info
    const q = `
      SELECT cm.id, cm.user_id, u.name AS user_name, cm.email, cm.message, cm.created_at
      FROM contact_messages cm
      INNER JOIN users u ON cm.user_id = u.id
      ORDER BY cm.created_at DESC
    `;
    db.query(q, (err2, data) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json(data);
    });
  });
});
// =========================
// Admin: Delete an order
// =========================
app.delete("/admin/orders/:adminId/:orderId", (req, res) => {
  const { adminId, orderId } = req.params;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
// First delete order items (to avoid foreign key issues)
    const q = "DELETE FROM orders WHERE id = ?";
    db.query(q, [orderId], (err2) => {
      if (err2) return res.status(500).json({ error: "Database error" });
    
      // Then delete the order itself 
       const deleteOrder = "DELETE FROM orders WHERE id = ?";
        db.query(deleteOrder, [orderId], (err3) => {
        if (err3) return res.status(500).json({ error: "Database error" });
        return res.json({ message: "Order deleted successfully" }); });
    });
  });
});
// =========================
// Admin: Delete a contact message
// =========================
app.delete("/admin/messages/:adminId/:messageId", (req, res) => {
  const { adminId, messageId } = req.params;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const q = "DELETE FROM contact_messages WHERE id = ?";
    db.query(q, [messageId], (err2) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json({ message: "Message deleted successfully" });
    });
  });
});
// =========================
// Admin: View order history of a user
// =========================
app.get("/admin/user-orders/:adminId/:userId", (req, res) => {
  const { adminId, userId } = req.params;

  const checkRole = "SELECT role FROM users WHERE id = ?";
  db.query(checkRole, [adminId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0 || results[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const q = `
      SELECT o.id, o.total_amount, o.status, o.created_at,
             GROUP_CONCAT(CONCAT(p.name, ' ', oi.quantity) SEPARATOR ', ') AS items
      FROM orders o
      INNER JOIN order_items oi ON o.id = oi.order_id
      INNER JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    db.query(q, [userId], (err2, data) => {
      if (err2) return res.status(500).json({ error: "Database error" });
      return res.json(data);
    });
  });
});

// =========================
// Delete user (logout + remove account)
// =========================
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    return res.json({ message: "User deleted successfully" });
  });
});

app.post("/contact", (req, res) => {
  console.log("Contact form payload:", req.body);
  const { user_id, name, email, message } = req.body;
  if (!user_id || !name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const q = `
    INSERT INTO contact_messages (user_id, name, email, message)
    VALUES (?, ?, ?, ?)
  `;
  db.query(q, [user_id, name, email, message], (err) => {
    if (err) {console.error("Error inserting contact message:", err);
      return res.status(500).json({ error: "Database error" });}
    return res.json({ message: "We appreciate your message! It was sent successfully." });
  });
});

// =========================
//  // Start server //
//  ========================= 
const PORT = process.env.PORT || 5000;
 //  Railway's PORT 
  app.listen(PORT, () => { 
 console.log(`Server started running on port ${PORT}`); 
});