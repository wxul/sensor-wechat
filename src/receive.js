const weather = require('./utils/weather');

function parseWeather(location, openId, res) {
    weather
        .getWeather(location)
        .then(result => {
            console.log(result.data);
            var data = result.data;
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
};
