const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'app.js'));
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

app.post('/api/login', (req, res, next) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) return next(err);

        if (result.length > 0 && password === result[0].password) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});