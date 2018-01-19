module.exports = {
    button: [
        {
            name: '环境数据',
            sub_button: [
                {
                    type: 'view',
                    name: 'HOME',
                    url: 'http://sensor.home.amayading.com'
                },
                {
                    type: 'view',
                    name: 'Outside',
                    url: 'http://aqicn.org/city/shenzhen/'
                },
                {
                    type: 'view',
                    name: '天气预报',
                    url: 'http://wechat.amayading.com/weather'
                },
                {
                    type: 'view',
                    name: '卫星云图',
                    url: 'http://wechat.amayading.com/cloud-picture2'
                }
            ]
        },
        {
            type: 'view',
            name: '生活书吧',
            url: 'http://dwz.cn/77XGWL'
        },
        {
            name: '智能家居',
            sub_button: [
                {
                    type: 'click',
                    name: '确定浇水',
                    key: 'take_water'
                },
                {
                    type: 'view',
                    name: '看看直播',
                    url: 'http://sensor.home.amayading.com/live'
                }
            ]
        }
    ]
};
