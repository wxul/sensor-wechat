const { he_key } = require('../../app_config');
const { he_api } = require('../../config');
const axios = require('axios');

module.exports = {
    // 获取天气
    getWeather(location) {
        console.log(`${he_api}/s6/weather`);
        return axios.get(`${he_api}/s6/weather`, {
            params: {
                key: he_key,
                location
            }
        });
    },
    // 获取实时空气质量
    getAir(location) {
        return axios.get(`https://api.heweather.com/s6/air/now`, {
            params: {
                key: he_key,
                location
            }
        });
    },
    // 转换实时天气
    parseNow(obj) {
        return `实时: ${obj.cond_txt}, 温度 ${obj.tmp}℃, 体感温度 ${
            obj.fl
        }℃, 风向 ${obj.wind_dir}, 风力 ${obj.wind_sc}, 湿度 ${
            obj.hum
        }%, 能见度 ${obj.vis}km\r\n`;
    },
    // 转换天气预报
    parseForecast(basic, update, arr) {
        var str = '';
        str += `查询城市: ${basic.cnty} ${basic.admin_area} ${
            basic.parent_city
        } ${basic.location}\r\n`;
        str += `更新时间: ${update.loc}\r\n`;
        str += `未来 ${arr.length} 天的天气预报: \r\n`;
        arr.forEach(a => {
            str += `${a.date.substr(5)}: 白天 ${a.cond_txt_d}, 夜间 ${
                a.cond_txt_n
            }, ${a.tmp_max}℃ - ${a.tmp_min}℃, 风向 ${a.wind_dir}, 风力 ${
                a.wind_sc
            }, 湿度 ${a.hum}%, 日出 ${a.sr}-${a.ss}\r\n`;
        });
        return str;
    },
    // 生活指数
    parseLifestyle(arr) {
        var str = '生活指数: \r\n';
        arr.forEach(a => {
            var s = '';
            switch (a.type) {
                case 'comf': // 舒适度指数
                    s += '舒适度指数: ';
                    break;
                case 'drsg': // 穿衣指数
                    s += '穿衣指数: ';
                    break;
                case 'flu': // 感冒指数
                    s += '感冒指数: ';
                    break;
                case 'air': // 空气污染扩散条件指数
                    s += '空气污染扩散条件指数: ';
                    break;
                case 'cw': // 洗车指数
                case 'sport': // 运动指数
                case 'trav': // 旅游指数
                case 'uv': // 紫外线指数
                default:
                    break;
            }
            if (s) {
                s += a.brf + ',' + a.txt + '\r\n';
                str += s;
            }
        });
        return str;
    },
    parseWeather(obj) {
        var s = this.parseForecast(obj.basic, obj.update, obj.daily_forecast);
        s += this.parseNow(obj.now);
        s += this.parseLifestyle(obj.lifestyle);
        s += '\r\n';
        return s;
    },
    parseAir(HeWeather6) {
        var str = '';
        HeWeather6.forEach(e => {
            str += `查询城市: ${e.basic.cnty} ${e.basic.admin_area} ${
                e.basic.parent_city
            } ${e.basic.location}\r\n`;
            var air = e.air_now_city;
            str += `更新时间: ${e.update.loc.substr(
                5
            )}, 发布时间: ${air.pub_time.substr(5)}\r\n`;
            str += `空气质量 ${air.qlty}, 空气质量指数 ${air.aqi}, 主要污染物 ${
                air.main
            }, pm10 ${air.pm10}, pm2.5 ${air.pm25}, 二氧化氮 ${
                air.no2
            }, 二氧化硫 ${air.so2}, 一氧化碳 ${air.co}, 臭氧 ${air.o3}\r\n`;
        });
        return str;
    }
};
