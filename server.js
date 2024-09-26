// import our dependencies
const express = require("express");
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection is not successful
    if(err){
        return console.log("Error connecting to the database:", err);
    }

    // connection is succesful
    console.log("Successfully connected to mysql:", db.threadId);
})

// retrieve all patients
app.get('', (req, res) => {
    const getPatients ="SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.status(200).send(data)
    })
})

app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).send('Failed to retrieve providers');
        }
        res.status(200).json(results); // Respond with the results
    });
});


// GET endpoint to retrieve patients by first name
app.get('/patients', (req, res) => {
    const firstName = req.query.first_name; // Get first name from query parameter
    if (!firstName) {
        return res.status(400).send('First name is required');
    }

    const query = 'SELECT * FROM patients WHERE first_name = ?'; // Query to filter by first name
    
    connection.query(query, [firstName], (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).send('Failed to retrieve patients');
        }
        res.status(200).json(results); // Respond with the results
    });
});

// GET endpoint to retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty; // Get specialty from query parameter
    if (!specialty) {
        return res.status(400).send('Specialty is required');
    }

    const query = 'SELECT * FROM providers WHERE provider_specialty = ?'; // Query to filter by specialty
    
    connection.query(query, [specialty], (error, results) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).send('Failed to retrieve providers');
        }
        res.status(200).json(results); // Respond with the results
    });
});


// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})