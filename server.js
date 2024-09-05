const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

let database;  // Declare database variable to use after connecting

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        database = client.db("PORTFOLIO"); // Connect to database once
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process if DB connection fails
    }
}

// Call the connection function when the server starts
connectToMongoDB();

// Register user route
app.post('/register_user', async (req, res) => {
    try {
        const collection = database.collection("emails");
        const user = req.body;
        await collection.insertOne(user);
        res.status(200).send("Thank You for Contacting! ");
    } catch (err) {
        console.error("Email not sent!", err);
        res.status(500).send("Sorry Email not sent! Try again.");
    }
});

// Start server
app.listen(5500, () => {
    console.log("Server running on port 5500");
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log("Shutting down server...");
    await client.close(); // Close the MongoDB connection when server stops
    process.exit(0);
});
