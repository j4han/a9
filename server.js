require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectDB, getDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// 1. GET: Render Login Page
app.get("/", (req, res) => {
    res.render("login", { error: null, success: null });
});

// 2. GET: Render Registration Page
app.get("/register", (req, res) => {
    res.render("register", { error: null });
});

// 3. POST: Process Login and Validate against MongoDB
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", {
            error: "Please provide both email and password.",
            success: null
        });
    }

    try {
        const db = getDB();
        const usersCollection = db.collection("users");

        // Fetch user from MongoDB
        const user = await usersCollection.findOne({ email: email.trim().toLowerCase() });

        // Validate user existence and password
        if (!user || user.password !== password) {
            return res.render("login", {
                error: "Invalid email or password.",
                success: null
            });
        }

        // Render dashboard upon successful verification
        res.render("dashboard", { user });
    } catch (err) {
        console.error("Login verification error:", err);
        res.status(500).render("login", {
            error: "Server error during verification. Please try again.",
            success: null
        });
    }
});

// 4. POST: Register New User
app.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.render("register", { error: "All fields are required." });
    }

    try {
        const db = getDB();
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.render("register", { error: "Email is already registered. Please login." });
        }

        await usersCollection.insertOne({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            role: "User",
            createdAt: new Date()
        });

        res.render("login", {
            error: null,
            success: "Registration successful! You can now log in."
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).render("register", { error: "Database error during registration." });
    }
});

// 5. GET: Logout
app.get("/logout", (req, res) => {
    res.redirect("/");
});

// Start Server after connecting to MongoDB
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to database:", err);
        process.exit(1);
    }
}

startServer();
