const express = require('express');
const bodyParser = require('body-parser');

const testMessageRouter = require('./routes/testMessage');
const HttpError = require('./utils/class-httpError');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
	res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});



app.use('/api', testMessageRouter);

/**
 * throws an error when the route is unknown
 */
app.use((req, res, next) => {
    throw new HttpError('Could not find this route', 404);
});

/**
 * manage error, display code and message error
 */
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    };
    res.status(error.code || 500);
    res.json({message: error.message || 'an unknown error occured'});
})

app.listen(process.env.PORT, () => console.log(`app started on port ${process.env.PORT}`));