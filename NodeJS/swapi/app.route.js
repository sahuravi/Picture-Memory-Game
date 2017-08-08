const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

module.exports = router;