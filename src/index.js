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

app.post('/api', function(req, res) {
    console.log(req.body.xml);
    var xml = req.body.xml;
    var openId = xml.FromUserName;
    switch (xml.MsgType) {
        case 'text':
            res.success({
                ToUserName: openId,
                MsgType: 'text',
                Content: 'result:' + xml.Content
            });
            break;
        case 'event':
            switch (xml.Event) {
                case 'CLICK':
                    if (xml.EventKey.indexOf('天气:') >= 0) {
                        let location = xml.EventKey.replace('天气:', '');
                        console.log('location:', location);
                        weather
                            .getWeather(location)
                            .then(result => {
                                console.log(result);
                                var data = result.data;
                                if (data.status == 'ok') {
                                    res.success({
                                        ToUserName: openId,
                                        MsgType: 'text',
                                        Content: JSON.stringify(data)
                                    });
                                } else {
                                    res.success({
                                        ToUserName: openId,
                                        MsgType: 'text',
                                        Content: data.status
                                    });
                                }
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    } else if (xml.EventKey.indexOf('空气:') >= 0) {
                        let location = xml.EventKey.replace('空气:', '');
                    }
                    break;
                default:
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: 'result:' + xml.Event + xml.EventKey
                    });
                    break;
            }
            break;
        default:
            res.success({
                ToUserName: openId,
                MsgType: 'text',
                Content: 'result: default'
            });
            break;
    }
});

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
