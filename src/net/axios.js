const axios = require('axios');

const { prefix } = require('../../config');

var instance = axios.create({
    baseURL: prefix,
    timeout: 8000
});

instance.interceptors.response.use(
    function(response) {
        // Do something with response data
        // console.log(response);
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
