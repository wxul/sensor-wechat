const express = require('express');
const router = express.Router();
const api = require('../net/he_weather');

// 查询天气集合
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

// 查询空气信息
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

// 搜索地点
router.get('/search', (req, res) => {
    var location = req.query.location;
    api
        .search(location)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).end('server error!');
        });
});

module.exports = router;
