const express = require('express');
const router = express.Router();
const api = require('../net/he_weather');

router.get('/weather', (req, res) => {
    var location = req.query.location;
    api
        .getWeather(location)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end('server error!');
        });
});

router.get('/air', (req, res) => {
    var location = req.query.location;
    api
        .getAir(location)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end('server error!');
        });
});

module.exports = router;
