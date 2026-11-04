require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "auth_assignment";

const client = new MongoClient(uri);
let database;

async function connectDB() {
    if (database) return database;
    await client.connect();
    database = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
    return database;
}

function getDB() {
    if (!database) {
        throw new Error("Database not connected. Call connectDB() first.");
    }
    return database;
}

async function closeDB() {
    await client.close();
    database = undefined;
    console.log("MongoDB connection closed.");
}

module.exports = { connectDB, getDB, closeDB };
