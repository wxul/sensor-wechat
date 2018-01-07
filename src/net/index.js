const axios = require('./axios');
// const { appID, appsecret } = require('../../app_config');
const config = require('../../app_config');

var { appID, appsecret } = config[
    process.env.NODE_ENV === 'production' ? 'production' : 'dev'
];

module.exports = {
    // 获取 access_token
    // refs: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
    getAccessToken() {
        return axios.get('/token', {
            params: {
                grant_type: 'client_credential',
                appid: appID,
                secret: appsecret
            }
        });
    },
    // 创建菜单
    createMenu(params, token) {
        return axios.post(`/menu/create?access_token=${token}`, params);
    }
};
