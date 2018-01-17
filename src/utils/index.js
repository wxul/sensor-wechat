const config = require('../../config');

module.exports = {
    dateFormat(date, formatStr) {
        if (!(date instanceof Date)) throw new Error('Need Date Type');
        var o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
        var week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(formatStr)) {
            formatStr = formatStr.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        if (/(E+)/.test(formatStr)) {
            formatStr = formatStr.replace(
                RegExp.$1,
                (RegExp.$1.length > 1
                    ? RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468'
                    : '') + week[date.getDay() + '']
            );
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(formatStr)) {
                formatStr = formatStr.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return formatStr;
    },
    getCurrentCloudPicture() {
        var time = new Date();
        time.setMilliseconds(0);
        time.setSeconds(0);
        time.setMinutes(time.getMinutes() - 30);
        var m = time.getMinutes();
        if (m < 15) {
            m = 45;
            time.setHours(time.getHours() - 1);
        } else {
            m = m > 45 ? 45 : 15;
        }
        time.setMinutes(m);
        time.setHours(time.getHours() - 8);
        var t = this.dateFormat(time, 'yyyyMMddHHmm') + '00000';
        return config.weather_imgurl.replace('{time}', t);
    }
};
