const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mid = require('./utils/middleware');

const { token } = require('../app_config');
const util = require('./utils');
const weather = require('./utils/weather');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mid.middleware);

// app.use('/chats', express.static(path.join(__dirname, './html')));

app.get('/', (req, res) => {
    res.end('hello!');
});

app.get('/cloud-picture', (req, res) => {
    res.redirect(util.getCurrentCloudPicture());
});

const { he_key } = require('../app_config');
const axios = require('axios');
const https = require('https');

app.get('/cloud-picture2', (req, res) => {
    https
        .get(
            `https://api.heweather.com/s6/map/cloudmap?key=${he_key}`,
            response => {
                console.log('状态码：', response.statusCode);
                console.log('请求头：', response.headers);
                var rawData = '';
                response.on('data', chunk => {
                    rawData += chunk;
                });
                response.on('end', () => {
                    console.log('end!', rawData.length);
                    // res.end(new Buffer(rawData, 'binary'));
                    res.setHeader('Content-Type', 'image/jpeg');
                    res.write(rawData, 'binary');
                    res.end();
                });
            }
        )
        .on('error', err => {
            console.log(err);
            res.end(err);
        });
});

// EncodingAESKey: fRiNddHo08W0H8Z3e7UdiEv5Kqodlhmve98EUQsPau1

app.get('/api', function(req, res) {
    var sign = {
        signature: req.query.signature,
        timestamp: req.query.timestamp,
        echostr: req.query.echostr,
        nonce: req.query.nonce
    };

    var props = [sign.nonce, sign.timestamp, token].sort().join('');
    // console.log(props);
    var sha1 = crypto.createHash('SHA1');
    sha1.update(props);
    var result = sha1.digest('hex');
    // console.log(sign.signature, result);
    if (sign.signature == result) {
        res.end(sign.echostr);
    } else {
        res.end(false);
    }
});

const receive = require('./receive');

app.post('/api', receive);

const net = require('./net');
const util_token = require('./utils/token');
const menu = require('../config/menu');
util_token.getToken().then(t => {
    net.createMenu(menu, t).then(console.log);
});
// require('./route')(app);

app.use(function(req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const PORT = 8078;
const server = http.createServer(app);
server.listen(PORT);
console.log('server is listening on port : ' + PORT);
server.on('error', err => {
    console.log(err);
    process.exit(1);
});
