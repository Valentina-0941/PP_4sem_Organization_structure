const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = 3000;

// Обслуживание статических файлов из корневой директории
app.use(express.static(path.join(__dirname)));

app.get('/data', (req, res) => {
    const results = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
