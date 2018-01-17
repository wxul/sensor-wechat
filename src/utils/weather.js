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
    }
};
