const express = require('express');
const db = require('./config/db');

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Bank API',
        endpoints: {
            'GET /test-db': 'Test database connection',
            'GET /accounts': 'Get all accounts',
            'GET /accounts/:id': 'Get account by ID',
            'POST /accounts': 'Create new account (body: {name, email, balance})'
        }
    });
});

// Test route to verify database connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT NOW() as currentTime, DATABASE() as dbName');
        res.json({
            success: true,
            message: 'Database connected successfully!',
            data: rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: err.message
        });
    }
});

// GET all accounts - Sabhi accounts dekho
app.get('/accounts', async (req, res) => {
    try {
        const [accounts] = await db.query('SELECT * FROM accounts ORDER BY id DESC');
        res.json({
            success: true,
            count: accounts.length,
            data: accounts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// GET single account by ID - Ek account ki details dekho
app.get('/accounts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [accounts] = await db.query('SELECT * FROM accounts WHERE id = ?', [id]);

        if (accounts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        res.json({
            success: true,
            data: accounts[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// POST - Naya account banao
app.post('/accounts', async (req, res) => {
    try {
        const { name, email, balance = 0 } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required'
            });
        }

        // Insert into database
        const [result] = await db.query(
            'INSERT INTO accounts (name, email, balance) VALUES (?, ?, ?)',
            [name, email, balance]
        );

        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            data: {
                id: result.insertId,
                name,
                email,
                balance
            }
        });
    } catch (err) {
        // Duplicate email error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = app;
