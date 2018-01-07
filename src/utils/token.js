const { appID, appsecret } = require('../../app_config');
const net = require('../net');

var token = '';
var time = null;

module.exports = {
    getToken: () => {
        return new Promise((resolve, reject) => {
            if (!token || (time && new Date() - time >= 1000 * 60 * 60)) {
                net.getAccessToken().then(result => {
                    console.log(result);
                    token = result.access_token;
                    time = new Date();
                    resolve(result.access_token);
                });
            } else {
                resolve(token);
            }
        });
    }
};
