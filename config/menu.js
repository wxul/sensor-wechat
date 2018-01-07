module.exports = {
    button: [
        {
            type: 'view',
            name: '监控数据',
            url: 'http://sensor.home.amayading.com'
        },
        {
            type: 'click',
            name: '查看图片',
            key: 'take_photo'
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
