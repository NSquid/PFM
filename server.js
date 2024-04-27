const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

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
    const { type, amount } = req.body;

    const query = 'INSERT INTO History (Type, Amount, Date) VALUES (?, ?, CURDATE())';
    db.query(query, [type, amount], (error, results) => {
        if (error) {
            console.error('Failed to insert data:', error);
            res.status(500).json({ error: 'Failed to insert data' });
            return;
        }

        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});