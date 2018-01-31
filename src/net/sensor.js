const axios = require('./sensor_axios');
const { pump_key } = require('../../app_config');

module.exports = {
    pump() {
        return axios.get('/sensor/s/pump', { params: { k: pump_key } });
    }
};
