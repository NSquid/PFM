const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pfm-web'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

app.post('/api/finance', (req, res) => {
    const { type, amount, description } = req.body;

    const query = 'INSERT INTO History (Type, Amount, Description, Date) VALUES (?, ?, ?, CURDATE())';
    db.query(query, [type, amount, description], (error, results) => {
        if (error) {
            console.error('Failed to insert data:', error);
            res.status(500).json({ error: 'Failed to insert data' });
            return;
        }

        res.json({ success: true });
    });
});

app.get('/api/finance', (req, res) => {
    const incomeQuery = 'SELECT SUM(Amount) as totalIncome FROM History WHERE Type = "income"';
    const outcomeQuery = 'SELECT SUM(Amount) as totalOutcome FROM History WHERE Type = "outcome"';

    db.query(incomeQuery, (incomeError, incomeResults) => {
        if (incomeError) {
            console.error('Failed to fetch income:', incomeError);
            res.status(500).json({ error: 'Failed to fetch income' });
            return;
        }

        db.query(outcomeQuery, (outcomeError, outcomeResults) => {
            if (outcomeError) {
                console.error('Failed to fetch outcome:', outcomeError);
                res.status(500).json({ error: 'Failed to fetch outcome' });
                return;
            }

            res.json({
                income: incomeResults[0].totalIncome,
                outcome: outcomeResults[0].totalOutcome,
            });
        });
    });
});

app.get('/api/finance/income', (req, res) => {
    db.query("SELECT Amount, Description, Date FROM History WHERE Type = 'income'", (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server error');
            return;
        }

        res.json(results);
        console.log(results);
    });
});

app.get('/api/finance/outcome', (req, res) => {
    db.query("SELECT Amount, Description, Date FROM History WHERE Type = 'outcome'", (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server error');
            return;
        }

        res.json(results);
        console.log(results);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});