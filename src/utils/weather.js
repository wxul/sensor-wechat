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
        return axios
            .get(`${he_api}/s6/air/now`, {
                params: {
                    key: he_key,
                    location
                }
            })
            .then(result => {
                return result.data;
            });
    },
    // 转换实时天气
    parseNow(obj) {
        return `实时天气:${obj.cond_txt},温度:${obj.tmp}℃,体感温度:${
            obj.fl
        }℃,风向:${obj.wind_dir},风力:${obj.wind_sc},相对湿度:${
            obj.hum
        }%,能见度:${obj.vis}km`;
    }
};
