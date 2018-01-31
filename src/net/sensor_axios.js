const axios = require('axios');

var instance = axios.create({
    baseURL: 'http://sensor.home.amayading.com/api/v1',
    timeout: 8000
});

instance.interceptors.response.use(
    function(response) {
        // Do something with response data
        // console.log(response.config, JSON.stringify(response.data));
        if (response.status === 200 && !response.data.errcode) {
            return response.data;
        } else {
            return false;
        }
    },
    function(error) {
        // Do something with response error
        return Promise.resolve(false);
    }
);

module.exports = instance;
