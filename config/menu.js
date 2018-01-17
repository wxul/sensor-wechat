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
                    name: '深圳空气',
                    url: 'http://aqicn.org/city/shenzhen/'
                },
                {
                    type: 'click',
                    name: '天气预报',
                    key: '天气:CN101280604'
                },
                {
                    type: 'click',
                    name: '空气质量',
                    key: '空气:CN101280604'
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
            name: '看看直播',
            url: 'http://sensor.home.amayading.com/live'
        },
        {
            name: '浇水',
            sub_button: [
                {
                    type: 'click',
                    name: '确定浇水',
                    key: 'take_water'
                }
            ]
        }
    ]
};
