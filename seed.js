require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "auth_assignment";

const sampleUsers = [
    {
        username: "jahan",
        email: "abdullajahan2@gmail.com",
        password: "password123",
        fullName: "Abdulla Jahan",
        role: "Admin"
    },
    {
        username: "student",
        email: "student@example.com",
        password: "password123",
        fullName: "Sample Student",
        role: "Student"
    }
];

async function seed() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection("users");

        await usersCollection.deleteMany({});
        await usersCollection.insertMany(sampleUsers);

        console.log("Database seeded successfully with default users!");
        console.log("Demo Credentials: email: abdullajahan2@gmail.com | password: password123");
    } catch (err) {
        console.error("Seeding error:", err);
    } finally {
        await client.close();
    }
}

seed();
