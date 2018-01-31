const weather = require('./utils/weather');
const w_api = require('./net/he_weather');
const whiteList = require('../config/white');
const fm = require('./utils/fm');
const sensor = require('./net/sensor');

function parseWeather(location, openId, res) {
    w_api
        .getWeather(location)
        .then(data => {
            console.log(data);
            // var data = result.data;
            if (data && data.HeWeather6 && data.HeWeather6.length) {
                let w = data.HeWeather6;
                if (w.length == 1 && w[0].status != 'ok') {
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: w[0].status
                    });
                } else {
                    w = w.filter(e => e.status == 'ok');
                    var s = '';
                    if (w.length == 1) {
                        s = weather.parseWeather(w[0]);
                    } else {
                        s += `查询返回多个结果, 请使用cid区分地区: \r\n`;
                        w.forEach(e => {
                            var basic = e.basic;
                            s += `cid:${basic.cid} : ${basic.cnty} ${
                                basic.admin_area
                            } ${basic.parent_city} ${basic.location}\r\n`;
                        });
                    }
                    // w.forEach(e => {
                    //     s += weather.parseWeather(e);
                    // });
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: s
                    });
                }
            } else {
                res.success({
                    ToUserName: openId,
                    MsgType: 'text',
                    Content: '没有获取到数据！'
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
}

function parseAir(location, openId, res) {
    w_api
        .getAir(location)
        .then(data => {
            console.log(data);
            // var data = result.data;
            if (data && data.HeWeather6 && data.HeWeather6.length) {
                let w = data.HeWeather6;
                if (w.length == 1 && w[0].status != 'ok') {
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: w[0].status
                    });
                } else {
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: weather.parseAir(w)
                    });
                }
            } else {
                res.success({
                    ToUserName: openId,
                    MsgType: 'text',
                    Content: '没有获取到数据！'
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
}

module.exports = (req, res) => {
    console.log(req.body.xml);
    var xml = req.body.xml;
    var openId = xml.FromUserName;
    switch (xml.MsgType) {
        case 'text':
            if (xml.Content.indexOf('天气:') >= 0) {
                let location = xml.Content.replace('天气:', '');
                console.log('location:', location);
                parseWeather(location, openId, res);
            } else if (xml.Content.indexOf('空气:') >= 0) {
                let location = xml.Content.replace('空气:', '');
                console.log('location:', location);
                parseAir(location, openId, res);
            } else {
                res.success({
                    ToUserName: openId,
                    MsgType: 'text',
                    Content:
                        '可使用命令:\r\n1: 天气:深圳 (查看天气)\r\n2: 空气:深圳 (查看空气质量)'
                });
            }
            break;
        case 'event':
            switch (xml.Event) {
                case 'CLICK':
                    if (xml.EventKey.indexOf('天气:') >= 0) {
                        let location = xml.EventKey.replace('天气:', '');
                        console.log('location:', location);
                        parseWeather(location, openId, res);
                    } else if (xml.EventKey.indexOf('空气:') >= 0) {
                        let location = xml.EventKey.replace('空气:', '');
                        console.log('location:', location);
                        parseAir(location, openId, res);
                    } else {
                        if (xml.EventKey == 'take_water') {
                            if (whiteList.indexOf(openId) >= 0) {
                                sensor.pump();
                                res.success({
                                    ToUserName: openId,
                                    MsgType: 'text',
                                    Content: `已浇水`
                                });
                            } else {
                                res.success({
                                    ToUserName: openId,
                                    MsgType: 'text',
                                    Content: `当前用户:${openId} 木有权限`
                                });
                            }
                        } else if (xml.EventKey == 'fm_list') {
                            res.success({
                                ToUserName: openId,
                                MsgType: 'text',
                                Content: fm.format(openId)
                            });
                        }
                    }
                    break;
                case 'subscribe':
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: '欢迎关注 AmayaのAQI '
                    });
                    break;
                case 'unsubscribe':
                    res.success({
                        ToUserName: openId,
                        MsgType: 'text',
                        Content: 'Good bye!'
                    });
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
};
