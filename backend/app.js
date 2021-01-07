const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.send('<h1>HELLO WORLD</h1>');
})

app.listen(process.env.PORT, () => console.log(`app started on port ${process.env.PORT}`));