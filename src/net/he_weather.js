const axios = require('./he_axios');
const { he_key } = require('../../app_config');

module.exports = {
    getWeather(location) {
        return axios.get(`/s6/weather`, { params: { location, key: he_key } });
    },
    getAir(location) {
        return axios.get(`https://free-api.heweather.com/s6/air/now`, { params: { location, key: he_key } });
    },
    search(location){
        return axios.get(`/s6/search`, { params: { location, key: he_key } });
    }
};
