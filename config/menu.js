module.exports = {
    button: [
        {
            type: 'view',
            name: '监控数据',
            url: 'http://sensor.home.amayading.com'
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
