const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: 'message of API'});
});

module.exports = router;
