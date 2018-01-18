/***
 * @auth topoadmin
 * @description 中国省市信息联动插件
 * @time 2016-09-25 20:42:54
 * options 参数说明
 * ------------------
 * @param title				String		头部提示
 * @param prov				String 		默认省份
 * @param city				String 		默认城市
 * @param district			String 		默认区/县
 * @param selectNumber		Int			设置省市县可选择个数 1-2,默认为3个都可选
 * @param scrollToCenter	Boolean 	true:已选位置滚动到中央 ,默认为顶部
 * @param autoOpen			Boolean 	自动打开
 * @param customOutput		Function	自定义选择完毕输出，不执行内部填充函数
 * @param selectEnd			Function 	选择完毕回调事件 return {prov,city,district},address
 * ------------------
 * @version 1.0.0
 */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'amazeui'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'), require('amazeui'));
    } else {
        factory(jQuery, jQuery.AMUI);
    }
})(function($) {
    'use strict';
    var addressJson = [
        {
            name: '北京',
            cities: [
                {
                    name: '北京',
                    areas: [
                        { name: '北京', code: 'CN101010100' },
                        { name: '海淀', code: 'CN101010200' },
                        { name: '朝阳', code: 'CN101010300' },
                        { name: '顺义', code: 'CN101010400' },
                        { name: '怀柔', code: 'CN101010500' },
                        { name: '通州', code: 'CN101010600' },
                        { name: '昌平', code: 'CN101010700' },
                        { name: '延庆', code: 'CN101010800' },
                        { name: '丰台', code: 'CN101010900' },
                        { name: '石景山', code: 'CN101011000' },
                        { name: '大兴', code: 'CN101011100' },
                        { name: '房山', code: 'CN101011200' },
                        { name: '密云', code: 'CN101011300' },
                        { name: '门头沟', code: 'CN101011400' },
                        { name: '平谷', code: 'CN101011500' }
                    ]
                },
                {
                    name: '东城',
                    areas: [{ name: '东城', code: 'CN101011600' }]
                },
                {
                    name: '西城',
                    areas: [{ name: '西城', code: 'CN101011700' }]
                }
            ]
        },
        {
            name: '上海',
            cities: [
                {
                    name: '上海',
                    areas: [
                        { name: '上海', code: 'CN101020100' },
                        { name: '闵行', code: 'CN101020200' },
                        { name: '宝山', code: 'CN101020300' },
                        { name: '嘉定', code: 'CN101020500' },
                        { name: '浦东新区', code: 'CN101020600' },
                        { name: '金山', code: 'CN101020700' },
                        { name: '青浦', code: 'CN101020800' },
                        { name: '松江', code: 'CN101020900' },
                        { name: '奉贤', code: 'CN101021000' },
                        { name: '崇明', code: 'CN101021100' },
                        { name: '徐汇', code: 'CN101021200' }
                    ]
                },
                {
                    name: '黄浦',
                    areas: [{ name: '黄浦', code: 'CN101020400' }]
                },
                {
                    name: '长宁',
                    areas: [{ name: '长宁', code: 'CN101021300' }]
                },
                {
                    name: '静安',
                    areas: [{ name: '静安', code: 'CN101021400' }]
                },
                {
                    name: '普陀',
                    areas: [{ name: '普陀', code: 'CN101021500' }]
                },
                {
                    name: '虹口',
                    areas: [{ name: '虹口', code: 'CN101021600' }]
                },
                {
                    name: '杨浦',
                    areas: [{ name: '杨浦', code: 'CN101021700' }]
                }
            ]
        },
        {
            name: '天津',
            cities: [
                {
                    name: '天津',
                    areas: [
                        { name: '天津', code: 'CN101030100' },
                        { name: '武清', code: 'CN101030200' },
                        { name: '宝坻', code: 'CN101030300' },
                        { name: '东丽', code: 'CN101030400' },
                        { name: '西青', code: 'CN101030500' },
                        { name: '北辰', code: 'CN101030600' },
                        { name: '宁河', code: 'CN101030700' },
                        { name: '静海', code: 'CN101030900' },
                        { name: '津南', code: 'CN101031000' },
                        { name: '滨海新区', code: 'CN101031100' },
                        { name: '蓟州', code: 'CN101031400' }
                    ]
                },
                {
                    name: '和平',
                    areas: [{ name: '和平', code: 'CN101030800' }]
                },
                {
                    name: '河东',
                    areas: [{ name: '河东', code: 'CN101031200' }]
                },
                {
                    name: '河西',
                    areas: [{ name: '河西', code: 'CN101031300' }]
                },
                {
                    name: '南开',
                    areas: [{ name: '南开', code: 'CN101031500' }]
                },
                {
                    name: '河北',
                    areas: [{ name: '河北', code: 'CN101031600' }]
                },
                {
                    name: '红桥',
                    areas: [{ name: '红桥', code: 'CN101031700' }]
                }
            ]
        },
        {
            name: '重庆',
            cities: [
                {
                    name: '重庆',
                    areas: [
                        { name: '重庆', code: 'CN101040100' },
                        { name: '永川', code: 'CN101040200' },
                        { name: '合川', code: 'CN101040300' },
                        { name: '南川', code: 'CN101040400' },
                        { name: '江津', code: 'CN101040500' },
                        { name: '渝北', code: 'CN101040700' },
                        { name: '北碚', code: 'CN101040800' },
                        { name: '巴南', code: 'CN101040900' },
                        { name: '长寿', code: 'CN101041000' },
                        { name: '黔江', code: 'CN101041100' },
                        { name: '万州', code: 'CN101041300' },
                        { name: '涪陵', code: 'CN101041400' },
                        { name: '开县', code: 'CN101041500' },
                        { name: '城口', code: 'CN101041600' },
                        { name: '云阳', code: 'CN101041700' },
                        { name: '巫溪', code: 'CN101041800' },
                        { name: '奉节', code: 'CN101041900' },
                        { name: '巫山', code: 'CN101042000' },
                        { name: '潼南', code: 'CN101042100' },
                        { name: '垫江', code: 'CN101042200' },
                        { name: '梁平', code: 'CN101042300' },
                        { name: '忠县', code: 'CN101042400' },
                        { name: '石柱', code: 'CN101042500' },
                        { name: '大足', code: 'CN101042600' },
                        { name: '荣昌', code: 'CN101042700' },
                        { name: '铜梁', code: 'CN101042800' },
                        { name: '璧山', code: 'CN101042900' },
                        { name: '丰都', code: 'CN101043000' },
                        { name: '武隆', code: 'CN101043100' },
                        { name: '彭水', code: 'CN101043200' },
                        { name: '綦江', code: 'CN101043300' },
                        { name: '酉阳', code: 'CN101043400' },
                        { name: '秀山', code: 'CN101043600' }
                    ]
                },
                {
                    name: '渝中',
                    areas: [{ name: '渝中', code: 'CN101041200' }]
                },
                {
                    name: '大渡口',
                    areas: [{ name: '大渡口', code: 'CN101043500' }]
                },
                {
                    name: '江北',
                    areas: [{ name: '江北', code: 'CN101043700' }]
                },
                {
                    name: '沙坪坝',
                    areas: [{ name: '沙坪坝', code: 'CN101043800' }]
                },
                {
                    name: '九龙坡',
                    areas: [{ name: '九龙坡', code: 'CN101043900' }]
                },
                {
                    name: '南岸',
                    areas: [{ name: '南岸', code: 'CN101044000' }]
                },
                {
                    name: '开州',
                    areas: [{ name: '开州', code: 'CN101044100' }]
                }
            ]
        },
        {
            name: '黑龙江',
            cities: [
                {
                    name: '哈尔滨',
                    areas: [
                        { name: '哈尔滨', code: 'CN101050101' },
                        { name: '双城', code: 'CN101050102' },
                        { name: '呼兰', code: 'CN101050103' },
                        { name: '阿城', code: 'CN101050104' },
                        { name: '宾县', code: 'CN101050105' },
                        { name: '依兰', code: 'CN101050106' },
                        { name: '巴彦', code: 'CN101050107' },
                        { name: '通河', code: 'CN101050108' },
                        { name: '方正', code: 'CN101050109' },
                        { name: '延寿', code: 'CN101050110' },
                        { name: '尚志', code: 'CN101050111' },
                        { name: '五常', code: 'CN101050112' },
                        { name: '木兰', code: 'CN101050113' },
                        { name: '道里', code: 'CN101050114' },
                        { name: '南岗', code: 'CN101050115' },
                        { name: '道外', code: 'CN101050116' },
                        { name: '平房', code: 'CN101050117' },
                        { name: '松北', code: 'CN101050118' },
                        { name: '香坊', code: 'CN101050119' }
                    ]
                },
                {
                    name: '齐齐哈尔',
                    areas: [
                        { name: '齐齐哈尔', code: 'CN101050201' },
                        { name: '讷河', code: 'CN101050202' },
                        { name: '龙江', code: 'CN101050203' },
                        { name: '甘南', code: 'CN101050204' },
                        { name: '富裕', code: 'CN101050205' },
                        { name: '依安', code: 'CN101050206' },
                        { name: '拜泉', code: 'CN101050207' },
                        { name: '克山', code: 'CN101050208' },
                        { name: '克东', code: 'CN101050209' },
                        { name: '泰来', code: 'CN101050210' },
                        { name: '龙沙', code: 'CN101050211' },
                        { name: '建华', code: 'CN101050212' },
                        { name: '铁锋', code: 'CN101050213' },
                        { name: '昂昂溪', code: 'CN101050214' },
                        { name: '富拉尔基', code: 'CN101050215' },
                        { name: '碾子山', code: 'CN101050216' },
                        { name: '梅里斯', code: 'CN101050217' }
                    ]
                },
                {
                    name: '牡丹江',
                    areas: [
                        { name: '牡丹江', code: 'CN101050301' },
                        { name: '海林', code: 'CN101050302' },
                        { name: '穆棱', code: 'CN101050303' },
                        { name: '林口', code: 'CN101050304' },
                        { name: '绥芬河', code: 'CN101050305' },
                        { name: '宁安', code: 'CN101050306' },
                        { name: '东宁', code: 'CN101050307' },
                        { name: '东安', code: 'CN101050308' },
                        { name: '阳明', code: 'CN101050309' },
                        { name: '爱民', code: 'CN101050310' },
                        { name: '西安', code: 'CN101050311' }
                    ]
                },
                {
                    name: '佳木斯',
                    areas: [
                        { name: '佳木斯', code: 'CN101050401' },
                        { name: '汤原', code: 'CN101050402' },
                        { name: '抚远', code: 'CN101050403' },
                        { name: '桦川', code: 'CN101050404' },
                        { name: '桦南', code: 'CN101050405' },
                        { name: '同江', code: 'CN101050406' },
                        { name: '富锦', code: 'CN101050407' },
                        { name: '向阳', code: 'CN101050408' },
                        { name: '前进', code: 'CN101050409' },
                        { name: '东风', code: 'CN101050410' },
                        { name: '郊区', code: 'CN101050411' }
                    ]
                },
                {
                    name: '绥化',
                    areas: [
                        { name: '绥化', code: 'CN101050501' },
                        { name: '肇东', code: 'CN101050502' },
                        { name: '安达', code: 'CN101050503' },
                        { name: '海伦', code: 'CN101050504' },
                        { name: '明水', code: 'CN101050505' },
                        { name: '望奎', code: 'CN101050506' },
                        { name: '兰西', code: 'CN101050507' },
                        { name: '青冈', code: 'CN101050508' },
                        { name: '庆安', code: 'CN101050509' },
                        { name: '绥棱', code: 'CN101050510' },
                        { name: '北林', code: 'CN101050511' }
                    ]
                },
                {
                    name: '黑河',
                    areas: [
                        { name: '黑河', code: 'CN101050601' },
                        { name: '嫩江', code: 'CN101050602' },
                        { name: '孙吴', code: 'CN101050603' },
                        { name: '逊克', code: 'CN101050604' },
                        { name: '五大连池', code: 'CN101050605' },
                        { name: '北安', code: 'CN101050606' },
                        { name: '爱辉', code: 'CN101050607' }
                    ]
                },
                {
                    name: '大兴安岭',
                    areas: [
                        { name: '大兴安岭', code: 'CN101050701' },
                        { name: '塔河', code: 'CN101050702' },
                        { name: '漠河', code: 'CN101050703' },
                        { name: '呼玛', code: 'CN101050704' }
                    ]
                },
                {
                    name: '伊春',
                    areas: [
                        { name: '伊春', code: 'CN101050801' },
                        { name: '乌伊岭', code: 'CN101050802' },
                        { name: '五营', code: 'CN101050803' },
                        { name: '铁力', code: 'CN101050804' },
                        { name: '嘉荫', code: 'CN101050805' },
                        { name: '南岔', code: 'CN101050806' },
                        { name: '友好', code: 'CN101050807' },
                        { name: '西林', code: 'CN101050808' },
                        { name: '翠峦', code: 'CN101050809' },
                        { name: '新青', code: 'CN101050810' },
                        { name: '美溪', code: 'CN101050811' },
                        { name: '金山屯', code: 'CN101050812' },
                        { name: '乌马河', code: 'CN101050813' },
                        { name: '汤旺河', code: 'CN101050814' },
                        { name: '带岭', code: 'CN101050815' },
                        { name: '红星', code: 'CN101050816' },
                        { name: '上甘岭', code: 'CN101050817' }
                    ]
                },
                {
                    name: '大庆',
                    areas: [
                        { name: '大庆', code: 'CN101050901' },
                        { name: '林甸', code: 'CN101050902' },
                        { name: '肇州', code: 'CN101050903' },
                        { name: '肇源', code: 'CN101050904' },
                        { name: '杜尔伯特', code: 'CN101050905' },
                        { name: '萨尔图', code: 'CN101050906' },
                        { name: '龙凤', code: 'CN101050907' },
                        { name: '让胡路', code: 'CN101050908' },
                        { name: '红岗', code: 'CN101050909' },
                        { name: '大同', code: 'CN101050910' }
                    ]
                },
                {
                    name: '七台河',
                    areas: [
                        { name: '新兴', code: 'CN101051001' },
                        { name: '七台河', code: 'CN101051002' },
                        { name: '勃利', code: 'CN101051003' },
                        { name: '桃山', code: 'CN101051004' },
                        { name: '茄子河', code: 'CN101051005' }
                    ]
                },
                {
                    name: '鸡西',
                    areas: [
                        { name: '鸡西', code: 'CN101051101' },
                        { name: '虎林', code: 'CN101051102' },
                        { name: '密山', code: 'CN101051103' },
                        { name: '鸡东', code: 'CN101051104' },
                        { name: '鸡冠', code: 'CN101051105' },
                        { name: '恒山', code: 'CN101051106' },
                        { name: '滴道', code: 'CN101051107' },
                        { name: '梨树', code: 'CN101051108' },
                        { name: '城子河', code: 'CN101051109' },
                        { name: '麻山', code: 'CN101051110' }
                    ]
                },
                {
                    name: '鹤岗',
                    areas: [
                        { name: '鹤岗', code: 'CN101051201' },
                        { name: '绥滨', code: 'CN101051202' },
                        { name: '萝北', code: 'CN101051203' },
                        { name: '向阳', code: 'CN101051204' },
                        { name: '工农', code: 'CN101051205' },
                        { name: '南山', code: 'CN101051206' },
                        { name: '兴安', code: 'CN101051207' },
                        { name: '东山', code: 'CN101051208' },
                        { name: '兴山', code: 'CN101051209' }
                    ]
                },
                {
                    name: '双鸭山',
                    areas: [
                        { name: '双鸭山', code: 'CN101051301' },
                        { name: '集贤', code: 'CN101051302' },
                        { name: '宝清', code: 'CN101051303' },
                        { name: '饶河', code: 'CN101051304' },
                        { name: '友谊', code: 'CN101051305' },
                        { name: '尖山', code: 'CN101051306' },
                        { name: '岭东', code: 'CN101051307' },
                        { name: '四方台', code: 'CN101051308' },
                        { name: '宝山', code: 'CN101051309' }
                    ]
                }
            ]
        },
        {
            name: '吉林',
            cities: [
                {
                    name: '长春',
                    areas: [
                        { name: '长春', code: 'CN101060101' },
                        { name: '农安', code: 'CN101060102' },
                        { name: '德惠', code: 'CN101060103' },
                        { name: '九台', code: 'CN101060104' },
                        { name: '榆树', code: 'CN101060105' },
                        { name: '双阳', code: 'CN101060106' },
                        { name: '二道', code: 'CN101060107' },
                        { name: '南关', code: 'CN101060108' },
                        { name: '宽城', code: 'CN101060109' },
                        { name: '朝阳', code: 'CN101060110' },
                        { name: '绿园', code: 'CN101060111' }
                    ]
                },
                {
                    name: '吉林',
                    areas: [
                        { name: '吉林', code: 'CN101060201' },
                        { name: '舒兰', code: 'CN101060202' },
                        { name: '永吉', code: 'CN101060203' },
                        { name: '蛟河', code: 'CN101060204' },
                        { name: '磐石', code: 'CN101060205' },
                        { name: '桦甸', code: 'CN101060206' },
                        { name: '昌邑', code: 'CN101060207' },
                        { name: '龙潭', code: 'CN101060208' },
                        { name: '船营', code: 'CN101060209' },
                        { name: '丰满', code: 'CN101060210' }
                    ]
                },
                {
                    name: '延边',
                    areas: [
                        { name: '延吉', code: 'CN101060301' },
                        { name: '敦化', code: 'CN101060302' },
                        { name: '安图', code: 'CN101060303' },
                        { name: '汪清', code: 'CN101060304' },
                        { name: '和龙', code: 'CN101060305' },
                        { name: '延边', code: 'CN101060306' },
                        { name: '龙井', code: 'CN101060307' },
                        { name: '珲春', code: 'CN101060308' },
                        { name: '图们', code: 'CN101060309' }
                    ]
                },
                {
                    name: '四平',
                    areas: [
                        { name: '四平', code: 'CN101060401' },
                        { name: '双辽', code: 'CN101060402' },
                        { name: '梨树', code: 'CN101060403' },
                        { name: '公主岭', code: 'CN101060404' },
                        { name: '伊通', code: 'CN101060405' },
                        { name: '铁西', code: 'CN101060406' },
                        { name: '铁东', code: 'CN101060407' }
                    ]
                },
                {
                    name: '通化',
                    areas: [
                        { name: '通化', code: 'CN101060501' },
                        { name: '梅河口', code: 'CN101060502' },
                        { name: '柳河', code: 'CN101060503' },
                        { name: '辉南', code: 'CN101060504' },
                        { name: '集安', code: 'CN101060505' },
                        { name: '通化县', code: 'CN101060506' },
                        { name: '东昌', code: 'CN101060507' },
                        { name: '二道江', code: 'CN101060508' }
                    ]
                },
                {
                    name: '白城',
                    areas: [
                        { name: '白城', code: 'CN101060601' },
                        { name: '洮南', code: 'CN101060602' },
                        { name: '大安', code: 'CN101060603' },
                        { name: '镇赉', code: 'CN101060604' },
                        { name: '通榆', code: 'CN101060605' },
                        { name: '洮北', code: 'CN101060606' }
                    ]
                },
                {
                    name: '辽源',
                    areas: [
                        { name: '辽源', code: 'CN101060701' },
                        { name: '东丰', code: 'CN101060702' },
                        { name: '东辽', code: 'CN101060703' },
                        { name: '龙山', code: 'CN101060704' },
                        { name: '西安', code: 'CN101060705' }
                    ]
                },
                {
                    name: '松原',
                    areas: [
                        { name: '松原', code: 'CN101060801' },
                        { name: '乾安', code: 'CN101060802' },
                        { name: '前郭', code: 'CN101060803' },
                        { name: '长岭', code: 'CN101060804' },
                        { name: '扶余', code: 'CN101060805' },
                        { name: '宁江', code: 'CN101060806' }
                    ]
                },
                {
                    name: '白山',
                    areas: [
                        { name: '白山', code: 'CN101060901' },
                        { name: '靖宇', code: 'CN101060902' },
                        { name: '临江', code: 'CN101060903' },
                        { name: '长白', code: 'CN101060905' },
                        { name: '抚松', code: 'CN101060906' },
                        { name: '江源', code: 'CN101060907' },
                        { name: '浑江', code: 'CN101060908' }
                    ]
                }
            ]
        },
        {
            name: '辽宁',
            cities: [
                {
                    name: '沈阳',
                    areas: [
                        { name: '沈阳', code: 'CN101070101' },
                        { name: '浑南', code: 'CN101070102' },
                        { name: '辽中', code: 'CN101070103' },
                        { name: '康平', code: 'CN101070104' },
                        { name: '法库', code: 'CN101070105' },
                        { name: '新民', code: 'CN101070106' },
                        { name: '和平', code: 'CN101070107' },
                        { name: '沈河', code: 'CN101070108' },
                        { name: '大东', code: 'CN101070109' },
                        { name: '皇姑', code: 'CN101070110' },
                        { name: '铁西', code: 'CN101070111' },
                        { name: '苏家屯', code: 'CN101070112' },
                        { name: '沈北新区', code: 'CN101070113' },
                        { name: '于洪', code: 'CN101070114' },
                        { name: '东陵', code: 'CN101070115' }
                    ]
                },
                {
                    name: '大连',
                    areas: [
                        { name: '大连', code: 'CN101070201' },
                        { name: '瓦房店', code: 'CN101070202' },
                        { name: '金州', code: 'CN101070203' },
                        { name: '普兰店', code: 'CN101070204' },
                        { name: '旅顺', code: 'CN101070205' },
                        { name: '长海', code: 'CN101070206' },
                        { name: '庄河', code: 'CN101070207' },
                        { name: '中山', code: 'CN101070208' },
                        { name: '西岗', code: 'CN101070209' },
                        { name: '沙河口', code: 'CN101070210' },
                        { name: '甘井子', code: 'CN101070211' }
                    ]
                },
                {
                    name: '鞍山',
                    areas: [
                        { name: '鞍山', code: 'CN101070301' },
                        { name: '台安', code: 'CN101070302' },
                        { name: '岫岩', code: 'CN101070303' },
                        { name: '海城', code: 'CN101070304' },
                        { name: '铁东', code: 'CN101070305' },
                        { name: '铁西', code: 'CN101070306' },
                        { name: '立山', code: 'CN101070307' },
                        { name: '千山', code: 'CN101070308' }
                    ]
                },
                {
                    name: '抚顺',
                    areas: [
                        { name: '抚顺', code: 'CN101070401' },
                        { name: '新宾', code: 'CN101070402' },
                        { name: '清原', code: 'CN101070403' },
                        { name: '新抚', code: 'CN101070405' },
                        { name: '东洲', code: 'CN101070406' },
                        { name: '望花', code: 'CN101070407' },
                        { name: '顺城', code: 'CN101070408' }
                    ]
                },
                {
                    name: '本溪',
                    areas: [
                        { name: '本溪', code: 'CN101070501' },
                        { name: '本溪县', code: 'CN101070502' },
                        { name: '平山', code: 'CN101070503' },
                        { name: '桓仁', code: 'CN101070504' },
                        { name: '溪湖', code: 'CN101070505' },
                        { name: '明山', code: 'CN101070506' },
                        { name: '南芬', code: 'CN101070507' }
                    ]
                },
                {
                    name: '丹东',
                    areas: [
                        { name: '丹东', code: 'CN101070601' },
                        { name: '凤城', code: 'CN101070602' },
                        { name: '宽甸', code: 'CN101070603' },
                        { name: '东港', code: 'CN101070604' },
                        { name: '元宝', code: 'CN101070605' },
                        { name: '振兴', code: 'CN101070606' },
                        { name: '振安', code: 'CN101070607' }
                    ]
                },
                {
                    name: '锦州',
                    areas: [
                        { name: '锦州', code: 'CN101070701' },
                        { name: '凌海', code: 'CN101070702' },
                        { name: '古塔', code: 'CN101070703' },
                        { name: '义县', code: 'CN101070704' },
                        { name: '黑山', code: 'CN101070705' },
                        { name: '北镇', code: 'CN101070706' },
                        { name: '凌河', code: 'CN101070707' },
                        { name: '太和', code: 'CN101070708' }
                    ]
                },
                {
                    name: '营口',
                    areas: [
                        { name: '营口', code: 'CN101070801' },
                        { name: '大石桥', code: 'CN101070802' },
                        { name: '盖州', code: 'CN101070803' },
                        { name: '站前', code: 'CN101070804' },
                        { name: '西市', code: 'CN101070805' },
                        { name: '鲅鱼圈', code: 'CN101070806' },
                        { name: '老边', code: 'CN101070807' }
                    ]
                },
                {
                    name: '阜新',
                    areas: [
                        { name: '阜新', code: 'CN101070901' },
                        { name: '彰武', code: 'CN101070902' },
                        { name: '海州', code: 'CN101070903' },
                        { name: '新邱', code: 'CN101070904' },
                        { name: '太平', code: 'CN101070905' },
                        { name: '清河门', code: 'CN101070906' },
                        { name: '细河', code: 'CN101070907' }
                    ]
                },
                {
                    name: '辽阳',
                    areas: [
                        { name: '辽阳', code: 'CN101071001' },
                        { name: '辽阳县', code: 'CN101071002' },
                        { name: '灯塔', code: 'CN101071003' },
                        { name: '弓长岭', code: 'CN101071004' },
                        { name: '白塔', code: 'CN101071005' },
                        { name: '文圣', code: 'CN101071006' },
                        { name: '宏伟', code: 'CN101071007' },
                        { name: '太子河', code: 'CN101071008' }
                    ]
                },
                {
                    name: '铁岭',
                    areas: [
                        { name: '铁岭', code: 'CN101071101' },
                        { name: '开原', code: 'CN101071102' },
                        { name: '昌图', code: 'CN101071103' },
                        { name: '西丰', code: 'CN101071104' },
                        { name: '调兵山', code: 'CN101071105' },
                        { name: '银州', code: 'CN101071106' },
                        { name: '清河', code: 'CN101071107' }
                    ]
                },
                {
                    name: '朝阳',
                    areas: [
                        { name: '朝阳', code: 'CN101071201' },
                        { name: '双塔', code: 'CN101071202' },
                        { name: '凌源', code: 'CN101071203' },
                        { name: '喀左', code: 'CN101071204' },
                        { name: '北票', code: 'CN101071205' },
                        { name: '龙城', code: 'CN101071206' },
                        { name: '建平县', code: 'CN101071207' }
                    ]
                },
                {
                    name: '盘锦',
                    areas: [
                        { name: '盘锦', code: 'CN101071301' },
                        { name: '大洼', code: 'CN101071302' },
                        { name: '盘山', code: 'CN101071303' },
                        { name: '双台子', code: 'CN101071304' },
                        { name: '兴隆台', code: 'CN101071305' }
                    ]
                },
                {
                    name: '葫芦岛',
                    areas: [
                        { name: '葫芦岛', code: 'CN101071401' },
                        { name: '建昌', code: 'CN101071402' },
                        { name: '绥中', code: 'CN101071403' },
                        { name: '兴城', code: 'CN101071404' },
                        { name: '连山', code: 'CN101071405' },
                        { name: '龙港', code: 'CN101071406' },
                        { name: '南票', code: 'CN101071407' }
                    ]
                }
            ]
        },
        {
            name: '内蒙古',
            cities: [
                {
                    name: '呼和浩特',
                    areas: [
                        { name: '呼和浩特', code: 'CN101080101' },
                        { name: '土左旗', code: 'CN101080102' },
                        { name: '托县', code: 'CN101080103' },
                        { name: '和林', code: 'CN101080104' },
                        { name: '清水河', code: 'CN101080105' },
                        { name: '赛罕', code: 'CN101080106' },
                        { name: '武川', code: 'CN101080107' },
                        { name: '新城', code: 'CN101080108' },
                        { name: '回民', code: 'CN101080109' },
                        { name: '玉泉', code: 'CN101080110' }
                    ]
                },
                {
                    name: '包头',
                    areas: [
                        { name: '包头', code: 'CN101080201' },
                        { name: '白云鄂博', code: 'CN101080202' },
                        { name: '土右旗', code: 'CN101080204' },
                        { name: '固阳', code: 'CN101080205' },
                        { name: '达茂旗', code: 'CN101080206' },
                        { name: '东河', code: 'CN101080208' },
                        { name: '昆都仑', code: 'CN101080209' },
                        { name: '青山', code: 'CN101080210' },
                        { name: '石拐', code: 'CN101080211' },
                        { name: '九原', code: 'CN101080212' }
                    ]
                },
                {
                    name: '乌海',
                    areas: [
                        { name: '乌海', code: 'CN101080301' },
                        { name: '海勃湾', code: 'CN101080302' },
                        { name: '海南', code: 'CN101080303' },
                        { name: '乌达', code: 'CN101080304' }
                    ]
                },
                {
                    name: '乌兰察布',
                    areas: [
                        { name: '集宁', code: 'CN101080401' },
                        { name: '卓资', code: 'CN101080402' },
                        { name: '化德', code: 'CN101080403' },
                        { name: '商都', code: 'CN101080404' },
                        { name: '乌兰察布', code: 'CN101080405' },
                        { name: '兴和', code: 'CN101080406' },
                        { name: '凉城', code: 'CN101080407' },
                        { name: '察右前旗', code: 'CN101080408' },
                        { name: '察右中旗', code: 'CN101080409' },
                        { name: '察右后旗', code: 'CN101080410' },
                        { name: '四子王旗', code: 'CN101080411' },
                        { name: '丰镇', code: 'CN101080412' }
                    ]
                },
                {
                    name: '通辽',
                    areas: [
                        { name: '通辽', code: 'CN101080501' },
                        { name: '科左中旗', code: 'CN101080503' },
                        { name: '科左后旗', code: 'CN101080504' },
                        { name: '开鲁', code: 'CN101080506' },
                        { name: '库伦', code: 'CN101080507' },
                        { name: '奈曼', code: 'CN101080508' },
                        { name: '扎鲁特', code: 'CN101080509' },
                        { name: '科尔沁', code: 'CN101080510' },
                        { name: '霍林郭勒', code: 'CN101080512' }
                    ]
                },
                {
                    name: '赤峰',
                    areas: [
                        { name: '赤峰', code: 'CN101080601' },
                        { name: '红山', code: 'CN101080602' },
                        { name: '阿鲁旗', code: 'CN101080603' },
                        { name: '巴林左旗', code: 'CN101080605' },
                        { name: '巴林右旗', code: 'CN101080606' },
                        { name: '林西', code: 'CN101080607' },
                        { name: '克什克腾', code: 'CN101080608' },
                        { name: '翁牛特', code: 'CN101080609' },
                        { name: '喀喇沁', code: 'CN101080611' },
                        { name: '宁城', code: 'CN101080613' },
                        { name: '敖汉', code: 'CN101080614' },
                        { name: '元宝山', code: 'CN101080616' },
                        { name: '松山', code: 'CN101080617' }
                    ]
                },
                {
                    name: '鄂尔多斯',
                    areas: [
                        { name: '鄂尔多斯', code: 'CN101080701' },
                        { name: '达拉特', code: 'CN101080703' },
                        { name: '准格尔', code: 'CN101080704' },
                        { name: '鄂前旗', code: 'CN101080705' },
                        { name: '鄂托克', code: 'CN101080708' },
                        { name: '杭锦旗', code: 'CN101080709' },
                        { name: '乌审旗', code: 'CN101080710' },
                        { name: '伊金霍洛', code: 'CN101080711' },
                        { name: '东胜', code: 'CN101080713' }
                    ]
                },
                {
                    name: '巴彦淖尔',
                    areas: [
                        { name: '临河', code: 'CN101080801' },
                        { name: '五原', code: 'CN101080802' },
                        { name: '磴口', code: 'CN101080803' },
                        { name: '乌前旗', code: 'CN101080804' },
                        { name: '乌中旗', code: 'CN101080806' },
                        { name: '乌后旗', code: 'CN101080807' },
                        { name: '杭锦后旗', code: 'CN101080810' },
                        { name: '巴彦淖尔', code: 'CN101080811' }
                    ]
                },
                {
                    name: '锡林郭勒',
                    areas: [
                        { name: '锡林浩特', code: 'CN101080901' },
                        { name: '锡林郭勒', code: 'CN101080902' },
                        { name: '二连浩特', code: 'CN101080903' },
                        { name: '阿巴嘎', code: 'CN101080904' },
                        { name: '苏左旗', code: 'CN101080906' },
                        { name: '苏右旗', code: 'CN101080907' },
                        { name: '东乌旗', code: 'CN101080909' },
                        { name: '西乌旗', code: 'CN101080910' },
                        { name: '太仆寺', code: 'CN101080911' },
                        { name: '镶黄旗', code: 'CN101080912' },
                        { name: '正镶白旗', code: 'CN101080913' },
                        { name: '正蓝旗', code: 'CN101080914' },
                        { name: '多伦', code: 'CN101080915' }
                    ]
                },
                {
                    name: '呼伦贝尔',
                    areas: [
                        { name: '海拉尔', code: 'CN101081001' },
                        { name: '阿荣旗', code: 'CN101081003' },
                        { name: '莫力达瓦', code: 'CN101081004' },
                        { name: '鄂伦春旗', code: 'CN101081005' },
                        { name: '鄂温克旗', code: 'CN101081006' },
                        { name: '陈旗', code: 'CN101081007' },
                        { name: '新左旗', code: 'CN101081008' },
                        { name: '新右旗', code: 'CN101081009' },
                        { name: '满洲里', code: 'CN101081010' },
                        { name: '牙克石', code: 'CN101081011' },
                        { name: '扎兰屯', code: 'CN101081012' },
                        { name: '呼伦贝尔', code: 'CN101081013' },
                        { name: '额尔古纳', code: 'CN101081014' },
                        { name: '根河', code: 'CN101081015' },
                        { name: '扎赉诺尔', code: 'CN101081017' }
                    ]
                },
                {
                    name: '兴安盟',
                    areas: [
                        { name: '乌兰浩特', code: 'CN101081101' },
                        { name: '阿尔山', code: 'CN101081102' },
                        { name: '科右中旗', code: 'CN101081103' },
                        { name: '扎赉特', code: 'CN101081105' },
                        { name: '突泉', code: 'CN101081107' },
                        { name: '兴安盟', code: 'CN101081108' },
                        { name: '科右前旗', code: 'CN101081109' }
                    ]
                },
                {
                    name: '阿拉善盟',
                    areas: [
                        { name: '阿左旗', code: 'CN101081201' },
                        { name: '阿右旗', code: 'CN101081202' },
                        { name: '额济纳', code: 'CN101081203' },
                        { name: '阿拉善盟', code: 'CN101081213' }
                    ]
                }
            ]
        },
        {
            name: '河北',
            cities: [
                {
                    name: '石家庄',
                    areas: [
                        { name: '石家庄', code: 'CN101090101' },
                        { name: '井陉', code: 'CN101090102' },
                        { name: '正定', code: 'CN101090103' },
                        { name: '栾城', code: 'CN101090104' },
                        { name: '行唐', code: 'CN101090105' },
                        { name: '灵寿', code: 'CN101090106' },
                        { name: '高邑', code: 'CN101090107' },
                        { name: '深泽', code: 'CN101090108' },
                        { name: '赞皇', code: 'CN101090109' },
                        { name: '无极', code: 'CN101090110' },
                        { name: '平山', code: 'CN101090111' },
                        { name: '元氏', code: 'CN101090112' },
                        { name: '赵县', code: 'CN101090113' },
                        { name: '辛集', code: 'CN101090114' },
                        { name: '藁城', code: 'CN101090115' },
                        { name: '晋州', code: 'CN101090116' },
                        { name: '新乐', code: 'CN101090117' },
                        { name: '鹿泉', code: 'CN101090118' },
                        { name: '长安', code: 'CN101090119' },
                        { name: '桥西', code: 'CN101090120' },
                        { name: '新华', code: 'CN101090121' },
                        { name: '井陉矿区', code: 'CN101090122' },
                        { name: '裕华', code: 'CN101090123' }
                    ]
                },
                {
                    name: '保定',
                    areas: [
                        { name: '保定', code: 'CN101090201' },
                        { name: '满城', code: 'CN101090202' },
                        { name: '阜平', code: 'CN101090203' },
                        { name: '徐水', code: 'CN101090204' },
                        { name: '唐县', code: 'CN101090205' },
                        { name: '高阳', code: 'CN101090206' },
                        { name: '容城', code: 'CN101090207' },
                        { name: '竞秀', code: 'CN101090208' },
                        { name: '涞源', code: 'CN101090209' },
                        { name: '望都', code: 'CN101090210' },
                        { name: '安新', code: 'CN101090211' },
                        { name: '易县', code: 'CN101090212' },
                        { name: '莲池', code: 'CN101090213' },
                        { name: '曲阳', code: 'CN101090214' },
                        { name: '蠡县', code: 'CN101090215' },
                        { name: '顺平', code: 'CN101090216' },
                        { name: '雄县', code: 'CN101090217' },
                        { name: '涿州', code: 'CN101090218' },
                        { name: '定州', code: 'CN101090219' },
                        { name: '安国', code: 'CN101090220' },
                        { name: '高碑店', code: 'CN101090221' },
                        { name: '涞水', code: 'CN101090222' },
                        { name: '定兴', code: 'CN101090223' },
                        { name: '清苑', code: 'CN101090224' },
                        { name: '博野', code: 'CN101090225' },
                        { name: '南市', code: 'CN101090226' }
                    ]
                },
                {
                    name: '张家口',
                    areas: [
                        { name: '张家口', code: 'CN101090301' },
                        { name: '宣化', code: 'CN101090302' },
                        { name: '张北', code: 'CN101090303' },
                        { name: '康保', code: 'CN101090304' },
                        { name: '沽源', code: 'CN101090305' },
                        { name: '尚义', code: 'CN101090306' },
                        { name: '蔚县', code: 'CN101090307' },
                        { name: '阳原', code: 'CN101090308' },
                        { name: '怀安', code: 'CN101090309' },
                        { name: '万全', code: 'CN101090310' },
                        { name: '怀来', code: 'CN101090311' },
                        { name: '涿鹿', code: 'CN101090312' },
                        { name: '赤城', code: 'CN101090313' },
                        { name: '崇礼', code: 'CN101090314' },
                        { name: '桥东', code: 'CN101090315' },
                        { name: '桥西', code: 'CN101090316' },
                        { name: '下花园', code: 'CN101090317' }
                    ]
                },
                {
                    name: '承德',
                    areas: [
                        { name: '双桥', code: 'CN101090401' },
                        { name: '承德', code: 'CN101090402' },
                        { name: '承德县', code: 'CN101090403' },
                        { name: '兴隆', code: 'CN101090404' },
                        { name: '平泉', code: 'CN101090405' },
                        { name: '滦平', code: 'CN101090406' },
                        { name: '隆化', code: 'CN101090407' },
                        { name: '丰宁', code: 'CN101090408' },
                        { name: '宽城', code: 'CN101090409' },
                        { name: '围场', code: 'CN101090410' },
                        { name: '双滦', code: 'CN101090411' },
                        { name: '鹰手营子矿', code: 'CN101090412' }
                    ]
                },
                {
                    name: '唐山',
                    areas: [
                        { name: '唐山', code: 'CN101090501' },
                        { name: '丰南', code: 'CN101090502' },
                        { name: '丰润', code: 'CN101090503' },
                        { name: '滦县', code: 'CN101090504' },
                        { name: '滦南', code: 'CN101090505' },
                        { name: '乐亭', code: 'CN101090506' },
                        { name: '迁西', code: 'CN101090507' },
                        { name: '玉田', code: 'CN101090508' },
                        { name: '曹妃甸', code: 'CN101090509' },
                        { name: '遵化', code: 'CN101090510' },
                        { name: '迁安', code: 'CN101090511' },
                        { name: '路南', code: 'CN101090513' },
                        { name: '路北', code: 'CN101090514' },
                        { name: '古冶', code: 'CN101090515' },
                        { name: '开平', code: 'CN101090516' }
                    ]
                },
                {
                    name: '廊坊',
                    areas: [
                        { name: '廊坊', code: 'CN101090601' },
                        { name: '固安', code: 'CN101090602' },
                        { name: '永清', code: 'CN101090603' },
                        { name: '香河', code: 'CN101090604' },
                        { name: '大城', code: 'CN101090605' },
                        { name: '文安', code: 'CN101090606' },
                        { name: '大厂', code: 'CN101090607' },
                        { name: '霸州', code: 'CN101090608' },
                        { name: '三河', code: 'CN101090609' },
                        { name: '安次', code: 'CN101090610' },
                        { name: '广阳', code: 'CN101090611' }
                    ]
                },
                {
                    name: '沧州',
                    areas: [
                        { name: '沧州', code: 'CN101090701' },
                        { name: '青县', code: 'CN101090702' },
                        { name: '东光', code: 'CN101090703' },
                        { name: '海兴', code: 'CN101090704' },
                        { name: '盐山', code: 'CN101090705' },
                        { name: '肃宁', code: 'CN101090706' },
                        { name: '南皮', code: 'CN101090707' },
                        { name: '吴桥', code: 'CN101090708' },
                        { name: '献县', code: 'CN101090709' },
                        { name: '孟村', code: 'CN101090710' },
                        { name: '泊头', code: 'CN101090711' },
                        { name: '任丘', code: 'CN101090712' },
                        { name: '黄骅', code: 'CN101090713' },
                        { name: '河间', code: 'CN101090714' },
                        { name: '新华', code: 'CN101090715' },
                        { name: '沧县', code: 'CN101090716' },
                        { name: '运河', code: 'CN101090717' }
                    ]
                },
                {
                    name: '衡水',
                    areas: [
                        { name: '衡水', code: 'CN101090801' },
                        { name: '枣强', code: 'CN101090802' },
                        { name: '武邑', code: 'CN101090803' },
                        { name: '武强', code: 'CN101090804' },
                        { name: '饶阳', code: 'CN101090805' },
                        { name: '安平', code: 'CN101090806' },
                        { name: '故城', code: 'CN101090807' },
                        { name: '景县', code: 'CN101090808' },
                        { name: '阜城', code: 'CN101090809' },
                        { name: '冀州', code: 'CN101090810' },
                        { name: '深州', code: 'CN101090811' },
                        { name: '桃城', code: 'CN101090812' }
                    ]
                },
                {
                    name: '邢台',
                    areas: [
                        { name: '邢台', code: 'CN101090901' },
                        { name: '临城', code: 'CN101090902' },
                        { name: '桥东', code: 'CN101090903' },
                        { name: '内丘', code: 'CN101090904' },
                        { name: '柏乡', code: 'CN101090905' },
                        { name: '隆尧', code: 'CN101090906' },
                        { name: '南和', code: 'CN101090907' },
                        { name: '宁晋', code: 'CN101090908' },
                        { name: '巨鹿', code: 'CN101090909' },
                        { name: '新河', code: 'CN101090910' },
                        { name: '广宗', code: 'CN101090911' },
                        { name: '平乡', code: 'CN101090912' },
                        { name: '威县', code: 'CN101090913' },
                        { name: '清河', code: 'CN101090914' },
                        { name: '临西', code: 'CN101090915' },
                        { name: '南宫', code: 'CN101090916' },
                        { name: '沙河', code: 'CN101090917' },
                        { name: '任县', code: 'CN101090918' },
                        { name: '桥西', code: 'CN101090919' }
                    ]
                },
                {
                    name: '邯郸',
                    areas: [
                        { name: '邯郸', code: 'CN101091001' },
                        { name: '峰峰', code: 'CN101091002' },
                        { name: '临漳', code: 'CN101091003' },
                        { name: '成安', code: 'CN101091004' },
                        { name: '大名', code: 'CN101091005' },
                        { name: '涉县', code: 'CN101091006' },
                        { name: '磁县', code: 'CN101091007' },
                        { name: '肥乡', code: 'CN101091008' },
                        { name: '永年', code: 'CN101091009' },
                        { name: '邱县', code: 'CN101091010' },
                        { name: '鸡泽', code: 'CN101091011' },
                        { name: '广平', code: 'CN101091012' },
                        { name: '馆陶', code: 'CN101091013' },
                        { name: '魏县', code: 'CN101091014' },
                        { name: '曲周', code: 'CN101091015' },
                        { name: '武安', code: 'CN101091016' },
                        { name: '邯山', code: 'CN101091017' },
                        { name: '丛台', code: 'CN101091018' },
                        { name: '复兴', code: 'CN101091019' }
                    ]
                },
                {
                    name: '秦皇岛',
                    areas: [
                        { name: '秦皇岛', code: 'CN101091101' },
                        { name: '青龙', code: 'CN101091102' },
                        { name: '昌黎', code: 'CN101091103' },
                        { name: '抚宁', code: 'CN101091104' },
                        { name: '卢龙', code: 'CN101091105' },
                        { name: '北戴河', code: 'CN101091106' },
                        { name: '海港', code: 'CN101091107' },
                        { name: '山海关', code: 'CN101091108' }
                    ]
                }
            ]
        },
        {
            name: '山西',
            cities: [
                {
                    name: '太原',
                    areas: [
                        { name: '太原', code: 'CN101100101' },
                        { name: '清徐', code: 'CN101100102' },
                        { name: '阳曲', code: 'CN101100103' },
                        { name: '娄烦', code: 'CN101100104' },
                        { name: '古交', code: 'CN101100105' },
                        { name: '尖草坪区', code: 'CN101100106' },
                        { name: '小店区', code: 'CN101100107' },
                        { name: '迎泽', code: 'CN101100108' },
                        { name: '杏花岭', code: 'CN101100109' },
                        { name: '万柏林', code: 'CN101100110' },
                        { name: '晋源', code: 'CN101100111' }
                    ]
                },
                {
                    name: '大同',
                    areas: [
                        { name: '大同', code: 'CN101100201' },
                        { name: '阳高', code: 'CN101100202' },
                        { name: '大同县', code: 'CN101100203' },
                        { name: '天镇', code: 'CN101100204' },
                        { name: '广灵', code: 'CN101100205' },
                        { name: '灵丘', code: 'CN101100206' },
                        { name: '浑源', code: 'CN101100207' },
                        { name: '左云', code: 'CN101100208' },
                        { name: '矿区', code: 'CN101100209' },
                        { name: '南郊', code: 'CN101100210' },
                        { name: '新荣', code: 'CN101100211' }
                    ]
                },
                {
                    name: '阳泉',
                    areas: [
                        { name: '阳泉', code: 'CN101100301' },
                        { name: '盂县', code: 'CN101100302' },
                        { name: '平定', code: 'CN101100303' },
                        { name: '矿区', code: 'CN101100304' },
                        { name: '郊区', code: 'CN101100305' }
                    ]
                },
                {
                    name: '晋中',
                    areas: [
                        { name: '晋中', code: 'CN101100401' },
                        { name: '榆次', code: 'CN101100402' },
                        { name: '榆社', code: 'CN101100403' },
                        { name: '左权', code: 'CN101100404' },
                        { name: '和顺', code: 'CN101100405' },
                        { name: '昔阳', code: 'CN101100406' },
                        { name: '寿阳', code: 'CN101100407' },
                        { name: '太谷', code: 'CN101100408' },
                        { name: '祁县', code: 'CN101100409' },
                        { name: '平遥', code: 'CN101100410' },
                        { name: '灵石', code: 'CN101100411' },
                        { name: '介休', code: 'CN101100412' }
                    ]
                },
                {
                    name: '长治',
                    areas: [
                        { name: '长治', code: 'CN101100501' },
                        { name: '黎城', code: 'CN101100502' },
                        { name: '屯留', code: 'CN101100503' },
                        { name: '潞城', code: 'CN101100504' },
                        { name: '襄垣', code: 'CN101100505' },
                        { name: '平顺', code: 'CN101100506' },
                        { name: '武乡', code: 'CN101100507' },
                        { name: '沁县', code: 'CN101100508' },
                        { name: '长子', code: 'CN101100509' },
                        { name: '沁源', code: 'CN101100510' },
                        { name: '壶关', code: 'CN101100511' },
                        { name: '郊区', code: 'CN101100512' }
                    ]
                },
                {
                    name: '晋城',
                    areas: [
                        { name: '晋城', code: 'CN101100601' },
                        { name: '沁水', code: 'CN101100602' },
                        { name: '阳城', code: 'CN101100603' },
                        { name: '陵川', code: 'CN101100604' },
                        { name: '高平', code: 'CN101100605' },
                        { name: '泽州', code: 'CN101100606' }
                    ]
                },
                {
                    name: '临汾',
                    areas: [
                        { name: '临汾', code: 'CN101100701' },
                        { name: '曲沃', code: 'CN101100702' },
                        { name: '永和', code: 'CN101100703' },
                        { name: '隰县', code: 'CN101100704' },
                        { name: '大宁', code: 'CN101100705' },
                        { name: '吉县', code: 'CN101100706' },
                        { name: '襄汾', code: 'CN101100707' },
                        { name: '蒲县', code: 'CN101100708' },
                        { name: '汾西', code: 'CN101100709' },
                        { name: '洪洞', code: 'CN101100710' },
                        { name: '霍州', code: 'CN101100711' },
                        { name: '乡宁', code: 'CN101100712' },
                        { name: '翼城', code: 'CN101100713' },
                        { name: '侯马', code: 'CN101100714' },
                        { name: '浮山', code: 'CN101100715' },
                        { name: '安泽', code: 'CN101100716' },
                        { name: '古县', code: 'CN101100717' },
                        { name: '尧都', code: 'CN101100718' }
                    ]
                },
                {
                    name: '运城',
                    areas: [
                        { name: '运城', code: 'CN101100801' },
                        { name: '临猗', code: 'CN101100802' },
                        { name: '稷山', code: 'CN101100803' },
                        { name: '万荣', code: 'CN101100804' },
                        { name: '河津', code: 'CN101100805' },
                        { name: '新绛', code: 'CN101100806' },
                        { name: '绛县', code: 'CN101100807' },
                        { name: '闻喜', code: 'CN101100808' },
                        { name: '垣曲', code: 'CN101100809' },
                        { name: '永济', code: 'CN101100810' },
                        { name: '芮城', code: 'CN101100811' },
                        { name: '夏县', code: 'CN101100812' },
                        { name: '平陆', code: 'CN101100813' },
                        { name: '盐湖', code: 'CN101100814' }
                    ]
                },
                {
                    name: '朔州',
                    areas: [
                        { name: '朔州', code: 'CN101100901' },
                        { name: '平鲁', code: 'CN101100902' },
                        { name: '山阴', code: 'CN101100903' },
                        { name: '右玉', code: 'CN101100904' },
                        { name: '应县', code: 'CN101100905' },
                        { name: '怀仁', code: 'CN101100906' },
                        { name: '朔城', code: 'CN101100907' }
                    ]
                },
                {
                    name: '忻州',
                    areas: [
                        { name: '忻州', code: 'CN101101001' },
                        { name: '定襄', code: 'CN101101002' },
                        { name: '五台县', code: 'CN101101003' },
                        { name: '河曲', code: 'CN101101004' },
                        { name: '偏关', code: 'CN101101005' },
                        { name: '神池', code: 'CN101101006' },
                        { name: '宁武', code: 'CN101101007' },
                        { name: '代县', code: 'CN101101008' },
                        { name: '繁峙', code: 'CN101101009' },
                        { name: '保德', code: 'CN101101011' },
                        { name: '静乐', code: 'CN101101012' },
                        { name: '岢岚', code: 'CN101101013' },
                        { name: '五寨', code: 'CN101101014' },
                        { name: '原平', code: 'CN101101015' },
                        { name: '忻府', code: 'CN101101016' }
                    ]
                },
                {
                    name: '吕梁',
                    areas: [
                        { name: '吕梁', code: 'CN101101100' },
                        { name: '离石', code: 'CN101101101' },
                        { name: '临县', code: 'CN101101102' },
                        { name: '兴县', code: 'CN101101103' },
                        { name: '岚县', code: 'CN101101104' },
                        { name: '柳林', code: 'CN101101105' },
                        { name: '石楼', code: 'CN101101106' },
                        { name: '方山', code: 'CN101101107' },
                        { name: '交口', code: 'CN101101108' },
                        { name: '中阳', code: 'CN101101109' },
                        { name: '孝义', code: 'CN101101110' },
                        { name: '汾阳', code: 'CN101101111' },
                        { name: '文水', code: 'CN101101112' },
                        { name: '交城', code: 'CN101101113' }
                    ]
                }
            ]
        },
        {
            name: '陕西',
            cities: [
                {
                    name: '西安',
                    areas: [
                        { name: '西安', code: 'CN101110101' },
                        { name: '长安', code: 'CN101110102' },
                        { name: '临潼', code: 'CN101110103' },
                        { name: '蓝田', code: 'CN101110104' },
                        { name: '周至', code: 'CN101110105' },
                        { name: '户县', code: 'CN101110106' },
                        { name: '高陵', code: 'CN101110107' },
                        { name: '新城', code: 'CN101110108' },
                        { name: '碑林', code: 'CN101110109' },
                        { name: '莲湖', code: 'CN101110110' },
                        { name: '灞桥', code: 'CN101110111' },
                        { name: '未央', code: 'CN101110112' },
                        { name: '雁塔', code: 'CN101110113' },
                        { name: '阎良', code: 'CN101110114' }
                    ]
                },
                {
                    name: '咸阳',
                    areas: [
                        { name: '咸阳', code: 'CN101110200' },
                        { name: '三原', code: 'CN101110201' },
                        { name: '礼泉', code: 'CN101110202' },
                        { name: '永寿', code: 'CN101110203' },
                        { name: '淳化', code: 'CN101110204' },
                        { name: '泾阳', code: 'CN101110205' },
                        { name: '武功', code: 'CN101110206' },
                        { name: '乾县', code: 'CN101110207' },
                        { name: '彬县', code: 'CN101110208' },
                        { name: '长武', code: 'CN101110209' },
                        { name: '旬邑', code: 'CN101110210' },
                        { name: '兴平', code: 'CN101110211' },
                        { name: '秦都', code: 'CN101110212' },
                        { name: '渭城', code: 'CN101110213' }
                    ]
                },
                {
                    name: '延安',
                    areas: [
                        { name: '延安', code: 'CN101110300' },
                        { name: '延长', code: 'CN101110301' },
                        { name: '延川', code: 'CN101110302' },
                        { name: '子长', code: 'CN101110303' },
                        { name: '宜川', code: 'CN101110304' },
                        { name: '富县', code: 'CN101110305' },
                        { name: '志丹', code: 'CN101110306' },
                        { name: '安塞', code: 'CN101110307' },
                        { name: '甘泉', code: 'CN101110308' },
                        { name: '洛川', code: 'CN101110309' },
                        { name: '黄陵', code: 'CN101110310' },
                        { name: '黄龙', code: 'CN101110311' },
                        { name: '吴起', code: 'CN101110312' },
                        { name: '宝塔', code: 'CN101110313' }
                    ]
                },
                {
                    name: '榆林',
                    areas: [
                        { name: '榆林', code: 'CN101110401' },
                        { name: '府谷', code: 'CN101110402' },
                        { name: '神木', code: 'CN101110403' },
                        { name: '佳县', code: 'CN101110404' },
                        { name: '定边', code: 'CN101110405' },
                        { name: '靖边', code: 'CN101110406' },
                        { name: '横山', code: 'CN101110407' },
                        { name: '米脂', code: 'CN101110408' },
                        { name: '子洲', code: 'CN101110409' },
                        { name: '绥德', code: 'CN101110410' },
                        { name: '吴堡', code: 'CN101110411' },
                        { name: '清涧', code: 'CN101110412' },
                        { name: '榆阳', code: 'CN101110413' }
                    ]
                },
                {
                    name: '渭南',
                    areas: [
                        { name: '渭南', code: 'CN101110501' },
                        { name: '华县', code: 'CN101110502' },
                        { name: '潼关', code: 'CN101110503' },
                        { name: '大荔', code: 'CN101110504' },
                        { name: '白水', code: 'CN101110505' },
                        { name: '富平', code: 'CN101110506' },
                        { name: '蒲城', code: 'CN101110507' },
                        { name: '澄城', code: 'CN101110508' },
                        { name: '合阳', code: 'CN101110509' },
                        { name: '韩城', code: 'CN101110510' },
                        { name: '华阴', code: 'CN101110511' },
                        { name: '临渭', code: 'CN101110512' },
                        { name: '华州', code: 'CN101110513' }
                    ]
                },
                {
                    name: '商洛',
                    areas: [
                        { name: '商洛', code: 'CN101110601' },
                        { name: '洛南', code: 'CN101110602' },
                        { name: '柞水', code: 'CN101110603' },
                        { name: '商州', code: 'CN101110604' },
                        { name: '镇安', code: 'CN101110605' },
                        { name: '丹凤', code: 'CN101110606' },
                        { name: '商南', code: 'CN101110607' },
                        { name: '山阳', code: 'CN101110608' }
                    ]
                },
                {
                    name: '安康',
                    areas: [
                        { name: '安康', code: 'CN101110701' },
                        { name: '紫阳', code: 'CN101110702' },
                        { name: '石泉', code: 'CN101110703' },
                        { name: '汉阴', code: 'CN101110704' },
                        { name: '旬阳', code: 'CN101110705' },
                        { name: '岚皋', code: 'CN101110706' },
                        { name: '平利', code: 'CN101110707' },
                        { name: '白河', code: 'CN101110708' },
                        { name: '镇坪', code: 'CN101110709' },
                        { name: '宁陕', code: 'CN101110710' },
                        { name: '汉滨', code: 'CN101110711' }
                    ]
                },
                {
                    name: '汉中',
                    areas: [
                        { name: '汉中', code: 'CN101110801' },
                        { name: '略阳', code: 'CN101110802' },
                        { name: '勉县', code: 'CN101110803' },
                        { name: '留坝', code: 'CN101110804' },
                        { name: '洋县', code: 'CN101110805' },
                        { name: '城固', code: 'CN101110806' },
                        { name: '西乡', code: 'CN101110807' },
                        { name: '佛坪', code: 'CN101110808' },
                        { name: '宁强', code: 'CN101110809' },
                        { name: '南郑', code: 'CN101110810' },
                        { name: '镇巴', code: 'CN101110811' },
                        { name: '汉台', code: 'CN101110812' }
                    ]
                },
                {
                    name: '宝鸡',
                    areas: [
                        { name: '宝鸡', code: 'CN101110901' },
                        { name: '渭滨', code: 'CN101110902' },
                        { name: '千阳', code: 'CN101110903' },
                        { name: '麟游', code: 'CN101110904' },
                        { name: '岐山', code: 'CN101110905' },
                        { name: '凤翔', code: 'CN101110906' },
                        { name: '扶风', code: 'CN101110907' },
                        { name: '眉县', code: 'CN101110908' },
                        { name: '太白', code: 'CN101110909' },
                        { name: '凤县', code: 'CN101110910' },
                        { name: '陇县', code: 'CN101110911' },
                        { name: '陈仓', code: 'CN101110912' },
                        { name: '金台', code: 'CN101110913' }
                    ]
                },
                {
                    name: '铜川',
                    areas: [
                        { name: '铜川', code: 'CN101111001' },
                        { name: '宜君', code: 'CN101111003' },
                        { name: '耀州', code: 'CN101111004' },
                        { name: '王益', code: 'CN101111005' },
                        { name: '印台', code: 'CN101111006' }
                    ]
                },
                {
                    name: '杨凌',
                    areas: [
                        { name: '杨凌', code: 'CN101111101' },
                        { name: '杨陵', code: 'CN101111102' }
                    ]
                }
            ]
        },
        {
            name: '山东',
            cities: [
                {
                    name: '济南',
                    areas: [
                        { name: '济南', code: 'CN101120101' },
                        { name: '长清', code: 'CN101120102' },
                        { name: '商河', code: 'CN101120103' },
                        { name: '章丘', code: 'CN101120104' },
                        { name: '平阴', code: 'CN101120105' },
                        { name: '济阳', code: 'CN101120106' },
                        { name: '历下', code: 'CN101120107' },
                        { name: '市中', code: 'CN101120108' },
                        { name: '槐荫', code: 'CN101120109' },
                        { name: '天桥', code: 'CN101120110' },
                        { name: '历城', code: 'CN101120111' }
                    ]
                },
                {
                    name: '青岛',
                    areas: [
                        { name: '青岛', code: 'CN101120201' },
                        { name: '崂山', code: 'CN101120202' },
                        { name: '市南', code: 'CN101120203' },
                        { name: '即墨', code: 'CN101120204' },
                        { name: '胶州', code: 'CN101120205' },
                        { name: '黄岛', code: 'CN101120206' },
                        { name: '莱西', code: 'CN101120207' },
                        { name: '平度', code: 'CN101120208' },
                        { name: '市北', code: 'CN101120209' },
                        { name: '李沧', code: 'CN101120210' },
                        { name: '城阳', code: 'CN101120211' }
                    ]
                },
                {
                    name: '淄博',
                    areas: [
                        { name: '淄博', code: 'CN101120301' },
                        { name: '淄川', code: 'CN101120302' },
                        { name: '博山', code: 'CN101120303' },
                        { name: '高青', code: 'CN101120304' },
                        { name: '周村', code: 'CN101120305' },
                        { name: '沂源', code: 'CN101120306' },
                        { name: '桓台', code: 'CN101120307' },
                        { name: '临淄', code: 'CN101120308' },
                        { name: '张店', code: 'CN101120309' }
                    ]
                },
                {
                    name: '德州',
                    areas: [
                        { name: '德州', code: 'CN101120401' },
                        { name: '武城', code: 'CN101120402' },
                        { name: '临邑', code: 'CN101120403' },
                        { name: '齐河', code: 'CN101120405' },
                        { name: '乐陵', code: 'CN101120406' },
                        { name: '庆云', code: 'CN101120407' },
                        { name: '平原', code: 'CN101120408' },
                        { name: '宁津', code: 'CN101120409' },
                        { name: '夏津', code: 'CN101120410' },
                        { name: '禹城', code: 'CN101120411' },
                        { name: '德城', code: 'CN101120412' },
                        { name: '陵城', code: 'CN101120413' }
                    ]
                },
                {
                    name: '烟台',
                    areas: [
                        { name: '烟台', code: 'CN101120501' },
                        { name: '莱州', code: 'CN101120502' },
                        { name: '长岛', code: 'CN101120503' },
                        { name: '蓬莱', code: 'CN101120504' },
                        { name: '龙口', code: 'CN101120505' },
                        { name: '招远', code: 'CN101120506' },
                        { name: '栖霞', code: 'CN101120507' },
                        { name: '福山', code: 'CN101120508' },
                        { name: '牟平', code: 'CN101120509' },
                        { name: '莱阳', code: 'CN101120510' },
                        { name: '海阳', code: 'CN101120511' },
                        { name: '芝罘', code: 'CN101120512' },
                        { name: '莱山', code: 'CN101120513' }
                    ]
                },
                {
                    name: '潍坊',
                    areas: [
                        { name: '潍坊', code: 'CN101120601' },
                        { name: '青州', code: 'CN101120602' },
                        { name: '寿光', code: 'CN101120603' },
                        { name: '临朐', code: 'CN101120604' },
                        { name: '昌乐', code: 'CN101120605' },
                        { name: '昌邑', code: 'CN101120606' },
                        { name: '安丘', code: 'CN101120607' },
                        { name: '高密', code: 'CN101120608' },
                        { name: '诸城', code: 'CN101120609' },
                        { name: '潍城', code: 'CN101120610' },
                        { name: '寒亭', code: 'CN101120611' },
                        { name: '坊子', code: 'CN101120612' },
                        { name: '奎文', code: 'CN101120613' }
                    ]
                },
                {
                    name: '济宁',
                    areas: [
                        { name: '济宁', code: 'CN101120701' },
                        { name: '嘉祥', code: 'CN101120702' },
                        { name: '微山', code: 'CN101120703' },
                        { name: '鱼台', code: 'CN101120704' },
                        { name: '兖州', code: 'CN101120705' },
                        { name: '金乡', code: 'CN101120706' },
                        { name: '汶上', code: 'CN101120707' },
                        { name: '泗水', code: 'CN101120708' },
                        { name: '梁山', code: 'CN101120709' },
                        { name: '曲阜', code: 'CN101120710' },
                        { name: '邹城', code: 'CN101120711' },
                        { name: '任城', code: 'CN101120712' }
                    ]
                },
                {
                    name: '泰安',
                    areas: [
                        { name: '泰安', code: 'CN101120801' },
                        { name: '新泰', code: 'CN101120802' },
                        { name: '泰山', code: 'CN101120803' },
                        { name: '肥城', code: 'CN101120804' },
                        { name: '东平', code: 'CN101120805' },
                        { name: '宁阳', code: 'CN101120806' },
                        { name: '岱岳', code: 'CN101120807' }
                    ]
                },
                {
                    name: '临沂',
                    areas: [
                        { name: '临沂', code: 'CN101120901' },
                        { name: '莒南', code: 'CN101120902' },
                        { name: '沂南', code: 'CN101120903' },
                        { name: '兰陵', code: 'CN101120904' },
                        { name: '临沭', code: 'CN101120905' },
                        { name: '郯城', code: 'CN101120906' },
                        { name: '蒙阴', code: 'CN101120907' },
                        { name: '平邑', code: 'CN101120908' },
                        { name: '费县', code: 'CN101120909' },
                        { name: '沂水', code: 'CN101120910' },
                        { name: '兰山', code: 'CN101120911' },
                        { name: '罗庄', code: 'CN101120912' },
                        { name: '河东', code: 'CN101120913' }
                    ]
                },
                {
                    name: '菏泽',
                    areas: [
                        { name: '菏泽', code: 'CN101121001' },
                        { name: '鄄城', code: 'CN101121002' },
                        { name: '郓城', code: 'CN101121003' },
                        { name: '东明', code: 'CN101121004' },
                        { name: '定陶', code: 'CN101121005' },
                        { name: '巨野', code: 'CN101121006' },
                        { name: '曹县', code: 'CN101121007' },
                        { name: '成武', code: 'CN101121008' },
                        { name: '单县', code: 'CN101121009' },
                        { name: '牡丹', code: 'CN101121010' }
                    ]
                },
                {
                    name: '滨州',
                    areas: [
                        { name: '滨州', code: 'CN101121101' },
                        { name: '博兴', code: 'CN101121102' },
                        { name: '无棣', code: 'CN101121103' },
                        { name: '阳信', code: 'CN101121104' },
                        { name: '惠民', code: 'CN101121105' },
                        { name: '沾化', code: 'CN101121106' },
                        { name: '邹平', code: 'CN101121107' },
                        { name: '滨城', code: 'CN101121108' }
                    ]
                },
                {
                    name: '东营',
                    areas: [
                        { name: '东营', code: 'CN101121201' },
                        { name: '河口', code: 'CN101121202' },
                        { name: '垦利', code: 'CN101121203' },
                        { name: '利津', code: 'CN101121204' },
                        { name: '广饶', code: 'CN101121205' }
                    ]
                },
                {
                    name: '威海',
                    areas: [
                        { name: '威海', code: 'CN101121301' },
                        { name: '文登', code: 'CN101121302' },
                        { name: '荣成', code: 'CN101121303' },
                        { name: '乳山', code: 'CN101121304' },
                        { name: '环翠', code: 'CN101121307' }
                    ]
                },
                {
                    name: '枣庄',
                    areas: [
                        { name: '枣庄', code: 'CN101121401' },
                        { name: '薛城', code: 'CN101121402' },
                        { name: '峄城', code: 'CN101121403' },
                        { name: '台儿庄', code: 'CN101121404' },
                        { name: '滕州', code: 'CN101121405' },
                        { name: '市中', code: 'CN101121406' },
                        { name: '山亭', code: 'CN101121407' }
                    ]
                },
                {
                    name: '日照',
                    areas: [
                        { name: '日照', code: 'CN101121501' },
                        { name: '五莲', code: 'CN101121502' },
                        { name: '莒县', code: 'CN101121503' },
                        { name: '东港', code: 'CN101121504' },
                        { name: '岚山', code: 'CN101121505' }
                    ]
                },
                {
                    name: '莱芜',
                    areas: [
                        { name: '莱芜', code: 'CN101121601' },
                        { name: '莱城', code: 'CN101121602' },
                        { name: '钢城', code: 'CN101121603' }
                    ]
                },
                {
                    name: '聊城',
                    areas: [
                        { name: '聊城', code: 'CN101121701' },
                        { name: '冠县', code: 'CN101121702' },
                        { name: '阳谷', code: 'CN101121703' },
                        { name: '高唐', code: 'CN101121704' },
                        { name: '茌平', code: 'CN101121705' },
                        { name: '东阿', code: 'CN101121706' },
                        { name: '临清', code: 'CN101121707' },
                        { name: '东昌府', code: 'CN101121708' },
                        { name: '莘县', code: 'CN101121709' }
                    ]
                }
            ]
        },
        {
            name: '新疆',
            cities: [
                {
                    name: '乌鲁木齐',
                    areas: [
                        { name: '乌鲁木齐', code: 'CN101130101' },
                        { name: '天山', code: 'CN101130102' },
                        { name: '沙依巴克', code: 'CN101130104' },
                        { name: '达坂城', code: 'CN101130105' },
                        { name: '新市', code: 'CN101130106' },
                        { name: '水磨沟', code: 'CN101130107' },
                        { name: '头屯河', code: 'CN101130111' },
                        { name: '米东', code: 'CN101130112' },
                        { name: '乌鲁木齐县', code: 'CN101130113' }
                    ]
                },
                {
                    name: '克拉玛依',
                    areas: [
                        { name: '克拉玛依', code: 'CN101130201' },
                        { name: '乌尔禾', code: 'CN101130202' },
                        { name: '白碱滩', code: 'CN101130203' },
                        { name: '独山子', code: 'CN101130204' }
                    ]
                },
                {
                    name: '石河子',
                    areas: [{ name: '石河子', code: 'CN101130301' }]
                },
                {
                    name: '昌吉',
                    areas: [
                        { name: '昌吉', code: 'CN101130401' },
                        { name: '呼图壁', code: 'CN101130402' },
                        { name: '阜康', code: 'CN101130404' },
                        { name: '吉木萨尔', code: 'CN101130405' },
                        { name: '奇台', code: 'CN101130406' },
                        { name: '玛纳斯', code: 'CN101130407' },
                        { name: '木垒', code: 'CN101130408' }
                    ]
                },
                {
                    name: '吐鲁番',
                    areas: [
                        { name: '吐鲁番', code: 'CN101130501' },
                        { name: '托克逊', code: 'CN101130502' },
                        { name: '高昌', code: 'CN101130503' },
                        { name: '鄯善', code: 'CN101130504' }
                    ]
                },
                {
                    name: '巴音郭楞',
                    areas: [
                        { name: '库尔勒', code: 'CN101130601' },
                        { name: '轮台', code: 'CN101130602' },
                        { name: '尉犁', code: 'CN101130603' },
                        { name: '若羌', code: 'CN101130604' },
                        { name: '且末', code: 'CN101130605' },
                        { name: '和静', code: 'CN101130606' },
                        { name: '焉耆', code: 'CN101130607' },
                        { name: '和硕', code: 'CN101130608' },
                        { name: '巴音郭楞', code: 'CN101130609' },
                        { name: '博湖', code: 'CN101130612' }
                    ]
                },
                {
                    name: '阿拉尔',
                    areas: [{ name: '阿拉尔', code: 'CN101130701' }]
                },
                {
                    name: '阿克苏',
                    areas: [
                        { name: '阿克苏', code: 'CN101130801' },
                        { name: '乌什', code: 'CN101130802' },
                        { name: '温宿', code: 'CN101130803' },
                        { name: '拜城', code: 'CN101130804' },
                        { name: '新和', code: 'CN101130805' },
                        { name: '沙雅', code: 'CN101130806' },
                        { name: '库车', code: 'CN101130807' },
                        { name: '柯坪', code: 'CN101130808' },
                        { name: '阿瓦提', code: 'CN101130809' }
                    ]
                },
                {
                    name: '喀什',
                    areas: [
                        { name: '喀什', code: 'CN101130901' },
                        { name: '英吉沙', code: 'CN101130902' },
                        { name: '塔什库尔干', code: 'CN101130903' },
                        { name: '麦盖提', code: 'CN101130904' },
                        { name: '莎车', code: 'CN101130905' },
                        { name: '叶城', code: 'CN101130906' },
                        { name: '泽普', code: 'CN101130907' },
                        { name: '巴楚', code: 'CN101130908' },
                        { name: '岳普湖', code: 'CN101130909' },
                        { name: '伽师', code: 'CN101130910' },
                        { name: '疏附', code: 'CN101130911' },
                        { name: '疏勒', code: 'CN101130912' }
                    ]
                },
                {
                    name: '伊犁',
                    areas: [
                        { name: '伊宁', code: 'CN101131001' },
                        { name: '察布查尔', code: 'CN101131002' },
                        { name: '尼勒克', code: 'CN101131003' },
                        { name: '伊宁县', code: 'CN101131004' },
                        { name: '巩留', code: 'CN101131005' },
                        { name: '新源', code: 'CN101131006' },
                        { name: '昭苏', code: 'CN101131007' },
                        { name: '特克斯', code: 'CN101131008' },
                        { name: '霍城', code: 'CN101131009' },
                        { name: '霍尔果斯', code: 'CN101131010' },
                        { name: '奎屯', code: 'CN101131011' },
                        { name: '伊犁', code: 'CN101131012' }
                    ]
                },
                {
                    name: '塔城',
                    areas: [
                        { name: '塔城', code: 'CN101131101' },
                        { name: '裕民', code: 'CN101131102' },
                        { name: '额敏', code: 'CN101131103' },
                        { name: '和布克赛尔', code: 'CN101131104' },
                        { name: '托里', code: 'CN101131105' },
                        { name: '乌苏', code: 'CN101131106' },
                        { name: '沙湾', code: 'CN101131107' }
                    ]
                },
                {
                    name: '哈密',
                    areas: [
                        { name: '哈密', code: 'CN101131201' },
                        { name: '伊州', code: 'CN101131202' },
                        { name: '巴里坤', code: 'CN101131203' },
                        { name: '伊吾', code: 'CN101131204' }
                    ]
                },
                {
                    name: '和田',
                    areas: [
                        { name: '和田', code: 'CN101131301' },
                        { name: '皮山', code: 'CN101131302' },
                        { name: '策勒', code: 'CN101131303' },
                        { name: '墨玉', code: 'CN101131304' },
                        { name: '洛浦', code: 'CN101131305' },
                        { name: '民丰', code: 'CN101131306' },
                        { name: '于田', code: 'CN101131307' }
                    ]
                },
                {
                    name: '阿勒泰',
                    areas: [
                        { name: '阿勒泰', code: 'CN101131401' },
                        { name: '哈巴河', code: 'CN101131402' },
                        { name: '吉木乃', code: 'CN101131405' },
                        { name: '布尔津', code: 'CN101131406' },
                        { name: '福海', code: 'CN101131407' },
                        { name: '富蕴', code: 'CN101131408' },
                        { name: '青河', code: 'CN101131409' },
                        { name: '北屯', code: 'CN101131410' },
                        { name: '双河', code: 'CN101131412' },
                        { name: '可克达拉', code: 'CN101131413' }
                    ]
                },
                {
                    name: '克州',
                    areas: [
                        { name: '阿图什', code: 'CN101131501' },
                        { name: '乌恰', code: 'CN101131502' },
                        { name: '阿克陶', code: 'CN101131503' },
                        { name: '阿合奇', code: 'CN101131504' },
                        { name: '克州', code: 'CN101131505' }
                    ]
                },
                {
                    name: '博尔塔拉',
                    areas: [
                        { name: '博乐', code: 'CN101131601' },
                        { name: '温泉', code: 'CN101131602' },
                        { name: '精河', code: 'CN101131603' },
                        { name: '博尔塔拉', code: 'CN101131604' },
                        { name: '阿拉山口', code: 'CN101131606' }
                    ]
                },
                {
                    name: '图木舒克',
                    areas: [{ name: '图木舒克', code: 'CN101131701' }]
                },
                {
                    name: '五家渠',
                    areas: [{ name: '五家渠', code: 'CN101131801' }]
                },
                {
                    name: '铁门关',
                    areas: [{ name: '铁门关', code: 'CN101131901' }]
                }
            ]
        },
        {
            name: '西藏',
            cities: [
                {
                    name: '拉萨',
                    areas: [
                        { name: '拉萨', code: 'CN101140101' },
                        { name: '当雄', code: 'CN101140102' },
                        { name: '尼木', code: 'CN101140103' },
                        { name: '林周', code: 'CN101140104' },
                        { name: '堆龙德庆', code: 'CN101140105' },
                        { name: '曲水', code: 'CN101140106' },
                        { name: '达孜', code: 'CN101140107' },
                        { name: '墨竹工卡', code: 'CN101140108' },
                        { name: '城关', code: 'CN101140109' }
                    ]
                },
                {
                    name: '日喀则',
                    areas: [
                        { name: '日喀则', code: 'CN101140201' },
                        { name: '拉孜', code: 'CN101140202' },
                        { name: '南木林', code: 'CN101140203' },
                        { name: '聂拉木', code: 'CN101140204' },
                        { name: '定日', code: 'CN101140205' },
                        { name: '江孜', code: 'CN101140206' },
                        { name: '仲巴', code: 'CN101140208' },
                        { name: '萨嘎', code: 'CN101140209' },
                        { name: '吉隆', code: 'CN101140210' },
                        { name: '昂仁', code: 'CN101140211' },
                        { name: '定结', code: 'CN101140212' },
                        { name: '萨迦', code: 'CN101140213' },
                        { name: '谢通门', code: 'CN101140214' },
                        { name: '桑珠孜', code: 'CN101140215' },
                        { name: '岗巴', code: 'CN101140216' },
                        { name: '白朗', code: 'CN101140217' },
                        { name: '亚东', code: 'CN101140218' },
                        { name: '康马', code: 'CN101140219' },
                        { name: '仁布', code: 'CN101140220' }
                    ]
                },
                {
                    name: '山南',
                    areas: [
                        { name: '山南', code: 'CN101140301' },
                        { name: '贡嘎', code: 'CN101140302' },
                        { name: '扎囊', code: 'CN101140303' },
                        { name: '加查', code: 'CN101140304' },
                        { name: '浪卡子', code: 'CN101140305' },
                        { name: '错那', code: 'CN101140306' },
                        { name: '隆子', code: 'CN101140307' },
                        { name: '乃东', code: 'CN101140309' },
                        { name: '桑日', code: 'CN101140310' },
                        { name: '洛扎', code: 'CN101140311' },
                        { name: '措美', code: 'CN101140312' },
                        { name: '琼结', code: 'CN101140313' },
                        { name: '曲松', code: 'CN101140314' }
                    ]
                },
                {
                    name: '林芝',
                    areas: [
                        { name: '林芝', code: 'CN101140401' },
                        { name: '波密', code: 'CN101140402' },
                        { name: '米林', code: 'CN101140403' },
                        { name: '察隅', code: 'CN101140404' },
                        { name: '工布江达', code: 'CN101140405' },
                        { name: '朗县', code: 'CN101140406' },
                        { name: '墨脱', code: 'CN101140407' },
                        { name: '巴宜', code: 'CN101140408' }
                    ]
                },
                {
                    name: '昌都',
                    areas: [
                        { name: '昌都', code: 'CN101140501' },
                        { name: '丁青', code: 'CN101140502' },
                        { name: '边坝', code: 'CN101140503' },
                        { name: '洛隆', code: 'CN101140504' },
                        { name: '左贡', code: 'CN101140505' },
                        { name: '芒康', code: 'CN101140506' },
                        { name: '类乌齐', code: 'CN101140507' },
                        { name: '八宿', code: 'CN101140508' },
                        { name: '江达', code: 'CN101140509' },
                        { name: '察雅', code: 'CN101140510' },
                        { name: '贡觉', code: 'CN101140511' },
                        { name: '卡若', code: 'CN101140512' }
                    ]
                },
                {
                    name: '那曲',
                    areas: [
                        { name: '那曲', code: 'CN101140601' },
                        { name: '尼玛', code: 'CN101140602' },
                        { name: '嘉黎', code: 'CN101140603' },
                        { name: '班戈', code: 'CN101140604' },
                        { name: '安多', code: 'CN101140605' },
                        { name: '索县', code: 'CN101140606' },
                        { name: '聂荣', code: 'CN101140607' },
                        { name: '巴青', code: 'CN101140608' },
                        { name: '比如', code: 'CN101140609' },
                        { name: '双湖', code: 'CN101140610' },
                        { name: '申扎', code: 'CN101140611' }
                    ]
                },
                {
                    name: '阿里',
                    areas: [
                        { name: '阿里', code: 'CN101140701' },
                        { name: '改则', code: 'CN101140702' },
                        { name: '普兰', code: 'CN101140705' },
                        { name: '札达', code: 'CN101140706' },
                        { name: '噶尔', code: 'CN101140707' },
                        { name: '日土', code: 'CN101140708' },
                        { name: '革吉', code: 'CN101140709' },
                        { name: '措勤', code: 'CN101140710' }
                    ]
                }
            ]
        },
        {
            name: '青海',
            cities: [
                {
                    name: '西宁',
                    areas: [
                        { name: '西宁', code: 'CN101150101' },
                        { name: '大通', code: 'CN101150102' },
                        { name: '湟源', code: 'CN101150103' },
                        { name: '湟中', code: 'CN101150104' },
                        { name: '城东', code: 'CN101150105' },
                        { name: '城中', code: 'CN101150106' },
                        { name: '城西', code: 'CN101150107' },
                        { name: '城北', code: 'CN101150108' }
                    ]
                },
                {
                    name: '海东',
                    areas: [
                        { name: '平安', code: 'CN101150201' },
                        { name: '乐都', code: 'CN101150202' },
                        { name: '民和', code: 'CN101150203' },
                        { name: '互助', code: 'CN101150204' },
                        { name: '化隆', code: 'CN101150205' },
                        { name: '循化', code: 'CN101150206' },
                        { name: '海东', code: 'CN101150207' }
                    ]
                },
                {
                    name: '黄南',
                    areas: [
                        { name: '同仁', code: 'CN101150301' },
                        { name: '尖扎', code: 'CN101150302' },
                        { name: '泽库', code: 'CN101150303' },
                        { name: '河南', code: 'CN101150304' },
                        { name: '黄南', code: 'CN101150305' }
                    ]
                },
                {
                    name: '海南',
                    areas: [
                        { name: '共和', code: 'CN101150401' },
                        { name: '海南', code: 'CN101150402' },
                        { name: '贵德', code: 'CN101150404' },
                        { name: '兴海', code: 'CN101150406' },
                        { name: '贵南', code: 'CN101150407' },
                        { name: '同德', code: 'CN101150408' }
                    ]
                },
                {
                    name: '果洛',
                    areas: [
                        { name: '玛沁', code: 'CN101150501' },
                        { name: '班玛', code: 'CN101150502' },
                        { name: '甘德', code: 'CN101150503' },
                        { name: '达日', code: 'CN101150504' },
                        { name: '久治', code: 'CN101150505' },
                        { name: '玛多', code: 'CN101150506' },
                        { name: '果洛', code: 'CN101150507' }
                    ]
                },
                {
                    name: '玉树',
                    areas: [
                        { name: '玉树', code: 'CN101150601' },
                        { name: '称多', code: 'CN101150602' },
                        { name: '治多', code: 'CN101150603' },
                        { name: '杂多', code: 'CN101150604' },
                        { name: '囊谦', code: 'CN101150605' },
                        { name: '曲麻莱', code: 'CN101150606' }
                    ]
                },
                {
                    name: '海西',
                    areas: [
                        { name: '德令哈', code: 'CN101150701' },
                        { name: '海西', code: 'CN101150702' },
                        { name: '天峻', code: 'CN101150708' },
                        { name: '乌兰', code: 'CN101150709' },
                        { name: '茫崖', code: 'CN101150712' },
                        { name: '大柴旦', code: 'CN101150713' },
                        { name: '格尔木', code: 'CN101150714' },
                        { name: '都兰', code: 'CN101150715' },
                        { name: '冷湖', code: 'CN101150716' }
                    ]
                },
                {
                    name: '海北',
                    areas: [
                        { name: '海晏', code: 'CN101150801' },
                        { name: '门源', code: 'CN101150802' },
                        { name: '祁连', code: 'CN101150803' },
                        { name: '海北', code: 'CN101150804' },
                        { name: '刚察', code: 'CN101150806' }
                    ]
                }
            ]
        },
        {
            name: '甘肃',
            cities: [
                {
                    name: '兰州',
                    areas: [
                        { name: '兰州', code: 'CN101160101' },
                        { name: '皋兰', code: 'CN101160102' },
                        { name: '永登', code: 'CN101160103' },
                        { name: '榆中', code: 'CN101160104' },
                        { name: '城关', code: 'CN101160105' },
                        { name: '七里河', code: 'CN101160106' },
                        { name: '西固', code: 'CN101160107' },
                        { name: '安宁', code: 'CN101160108' },
                        { name: '红古', code: 'CN101160109' }
                    ]
                },
                {
                    name: '定西',
                    areas: [
                        { name: '定西', code: 'CN101160201' },
                        { name: '通渭', code: 'CN101160202' },
                        { name: '陇西', code: 'CN101160203' },
                        { name: '渭源', code: 'CN101160204' },
                        { name: '临洮', code: 'CN101160205' },
                        { name: '漳县', code: 'CN101160206' },
                        { name: '岷县', code: 'CN101160207' },
                        { name: '安定', code: 'CN101160208' }
                    ]
                },
                {
                    name: '平凉',
                    areas: [
                        { name: '平凉', code: 'CN101160301' },
                        { name: '泾川', code: 'CN101160302' },
                        { name: '灵台', code: 'CN101160303' },
                        { name: '崇信', code: 'CN101160304' },
                        { name: '华亭', code: 'CN101160305' },
                        { name: '庄浪', code: 'CN101160306' },
                        { name: '静宁', code: 'CN101160307' },
                        { name: '崆峒', code: 'CN101160308' }
                    ]
                },
                {
                    name: '庆阳',
                    areas: [
                        { name: '庆阳', code: 'CN101160401' },
                        { name: '西峰', code: 'CN101160402' },
                        { name: '环县', code: 'CN101160403' },
                        { name: '华池', code: 'CN101160404' },
                        { name: '合水', code: 'CN101160405' },
                        { name: '正宁', code: 'CN101160406' },
                        { name: '宁县', code: 'CN101160407' },
                        { name: '镇原', code: 'CN101160408' },
                        { name: '庆城', code: 'CN101160409' }
                    ]
                },
                {
                    name: '武威',
                    areas: [
                        { name: '武威', code: 'CN101160501' },
                        { name: '民勤', code: 'CN101160502' },
                        { name: '古浪', code: 'CN101160503' },
                        { name: '凉州', code: 'CN101160504' },
                        { name: '天祝', code: 'CN101160505' }
                    ]
                },
                {
                    name: '金昌',
                    areas: [
                        { name: '金昌', code: 'CN101160601' },
                        { name: '永昌', code: 'CN101160602' },
                        { name: '金川', code: 'CN101160603' }
                    ]
                },
                {
                    name: '张掖',
                    areas: [
                        { name: '张掖', code: 'CN101160701' },
                        { name: '肃南', code: 'CN101160702' },
                        { name: '民乐', code: 'CN101160703' },
                        { name: '临泽', code: 'CN101160704' },
                        { name: '高台', code: 'CN101160705' },
                        { name: '山丹', code: 'CN101160706' },
                        { name: '甘州', code: 'CN101160707' }
                    ]
                },
                {
                    name: '酒泉',
                    areas: [
                        { name: '酒泉', code: 'CN101160801' },
                        { name: '肃州', code: 'CN101160802' },
                        { name: '金塔', code: 'CN101160803' },
                        { name: '阿克塞', code: 'CN101160804' },
                        { name: '瓜州', code: 'CN101160805' },
                        { name: '肃北', code: 'CN101160806' },
                        { name: '玉门', code: 'CN101160807' },
                        { name: '敦煌', code: 'CN101160808' }
                    ]
                },
                {
                    name: '天水',
                    areas: [
                        { name: '天水', code: 'CN101160901' },
                        { name: '秦州', code: 'CN101160902' },
                        { name: '清水', code: 'CN101160903' },
                        { name: '秦安', code: 'CN101160904' },
                        { name: '甘谷', code: 'CN101160905' },
                        { name: '武山', code: 'CN101160906' },
                        { name: '张家川', code: 'CN101160907' },
                        { name: '麦积', code: 'CN101160908' }
                    ]
                },
                {
                    name: '陇南',
                    areas: [
                        { name: '武都', code: 'CN101161001' },
                        { name: '成县', code: 'CN101161002' },
                        { name: '文县', code: 'CN101161003' },
                        { name: '宕昌', code: 'CN101161004' },
                        { name: '康县', code: 'CN101161005' },
                        { name: '西和', code: 'CN101161006' },
                        { name: '礼县', code: 'CN101161007' },
                        { name: '徽县', code: 'CN101161008' },
                        { name: '两当', code: 'CN101161009' },
                        { name: '陇南', code: 'CN101161010' }
                    ]
                },
                {
                    name: '临夏',
                    areas: [
                        { name: '临夏', code: 'CN101161101' },
                        { name: '康乐', code: 'CN101161102' },
                        { name: '永靖', code: 'CN101161103' },
                        { name: '广河', code: 'CN101161104' },
                        { name: '和政', code: 'CN101161105' },
                        { name: '东乡', code: 'CN101161106' },
                        { name: '积石山', code: 'CN101161107' }
                    ]
                },
                {
                    name: '甘南',
                    areas: [
                        { name: '合作', code: 'CN101161201' },
                        { name: '临潭', code: 'CN101161202' },
                        { name: '卓尼', code: 'CN101161203' },
                        { name: '舟曲', code: 'CN101161204' },
                        { name: '迭部', code: 'CN101161205' },
                        { name: '玛曲', code: 'CN101161206' },
                        { name: '碌曲', code: 'CN101161207' },
                        { name: '夏河', code: 'CN101161208' },
                        { name: '甘南', code: 'CN101161209' }
                    ]
                },
                {
                    name: '白银',
                    areas: [
                        { name: '白银', code: 'CN101161301' },
                        { name: '靖远', code: 'CN101161302' },
                        { name: '会宁', code: 'CN101161303' },
                        { name: '平川', code: 'CN101161304' },
                        { name: '景泰', code: 'CN101161305' }
                    ]
                },
                {
                    name: '嘉峪关',
                    areas: [{ name: '嘉峪关', code: 'CN101161401' }]
                }
            ]
        },
        {
            name: '宁夏',
            cities: [
                {
                    name: '银川',
                    areas: [
                        { name: '银川', code: 'CN101170101' },
                        { name: '永宁', code: 'CN101170102' },
                        { name: '灵武', code: 'CN101170103' },
                        { name: '贺兰', code: 'CN101170104' },
                        { name: '兴庆', code: 'CN101170105' },
                        { name: '西夏', code: 'CN101170106' },
                        { name: '金凤', code: 'CN101170107' }
                    ]
                },
                {
                    name: '石嘴山',
                    areas: [
                        { name: '石嘴山', code: 'CN101170201' },
                        { name: '惠农', code: 'CN101170202' },
                        { name: '平罗', code: 'CN101170203' },
                        { name: '大武口', code: 'CN101170205' }
                    ]
                },
                {
                    name: '吴忠',
                    areas: [
                        { name: '吴忠', code: 'CN101170301' },
                        { name: '同心', code: 'CN101170302' },
                        { name: '盐池', code: 'CN101170303' },
                        { name: '利通', code: 'CN101170304' },
                        { name: '红寺堡', code: 'CN101170305' },
                        { name: '青铜峡', code: 'CN101170306' }
                    ]
                },
                {
                    name: '固原',
                    areas: [
                        { name: '固原', code: 'CN101170401' },
                        { name: '西吉', code: 'CN101170402' },
                        { name: '隆德', code: 'CN101170403' },
                        { name: '泾源', code: 'CN101170404' },
                        { name: '原州', code: 'CN101170405' },
                        { name: '彭阳', code: 'CN101170406' }
                    ]
                },
                {
                    name: '中卫',
                    areas: [
                        { name: '中卫', code: 'CN101170501' },
                        { name: '中宁', code: 'CN101170502' },
                        { name: '沙坡头', code: 'CN101170503' },
                        { name: '海原', code: 'CN101170504' }
                    ]
                }
            ]
        },
        {
            name: '河南',
            cities: [
                {
                    name: '郑州',
                    areas: [
                        { name: '郑州', code: 'CN101180101' },
                        { name: '巩义', code: 'CN101180102' },
                        { name: '荥阳', code: 'CN101180103' },
                        { name: '登封', code: 'CN101180104' },
                        { name: '新密', code: 'CN101180105' },
                        { name: '新郑', code: 'CN101180106' },
                        { name: '中牟', code: 'CN101180107' },
                        { name: '上街', code: 'CN101180108' },
                        { name: '中原', code: 'CN101180109' },
                        { name: '二七', code: 'CN101180110' },
                        { name: '管城', code: 'CN101180111' },
                        { name: '金水', code: 'CN101180112' },
                        { name: '惠济', code: 'CN101180113' }
                    ]
                },
                {
                    name: '安阳',
                    areas: [
                        { name: '安阳', code: 'CN101180201' },
                        { name: '汤阴', code: 'CN101180202' },
                        { name: '滑县', code: 'CN101180203' },
                        { name: '内黄', code: 'CN101180204' },
                        { name: '林州', code: 'CN101180205' },
                        { name: '文峰', code: 'CN101180206' },
                        { name: '北关', code: 'CN101180207' },
                        { name: '殷都', code: 'CN101180208' },
                        { name: '龙安', code: 'CN101180209' }
                    ]
                },
                {
                    name: '新乡',
                    areas: [
                        { name: '新乡', code: 'CN101180301' },
                        { name: '获嘉', code: 'CN101180302' },
                        { name: '原阳', code: 'CN101180303' },
                        { name: '辉县', code: 'CN101180304' },
                        { name: '卫辉', code: 'CN101180305' },
                        { name: '延津', code: 'CN101180306' },
                        { name: '封丘', code: 'CN101180307' },
                        { name: '长垣', code: 'CN101180308' },
                        { name: '红旗', code: 'CN101180309' },
                        { name: '卫滨', code: 'CN101180310' },
                        { name: '凤泉', code: 'CN101180311' },
                        { name: '牧野', code: 'CN101180312' }
                    ]
                },
                {
                    name: '许昌',
                    areas: [
                        { name: '许昌', code: 'CN101180401' },
                        { name: '鄢陵', code: 'CN101180402' },
                        { name: '襄城', code: 'CN101180403' },
                        { name: '长葛', code: 'CN101180404' },
                        { name: '禹州', code: 'CN101180405' },
                        { name: '魏都', code: 'CN101180406' }
                    ]
                },
                {
                    name: '平顶山',
                    areas: [
                        { name: '平顶山', code: 'CN101180501' },
                        { name: '郏县', code: 'CN101180502' },
                        { name: '宝丰', code: 'CN101180503' },
                        { name: '汝州', code: 'CN101180504' },
                        { name: '叶县', code: 'CN101180505' },
                        { name: '舞钢', code: 'CN101180506' },
                        { name: '鲁山', code: 'CN101180507' },
                        { name: '石龙', code: 'CN101180508' },
                        { name: '新华', code: 'CN101180509' },
                        { name: '卫东', code: 'CN101180510' },
                        { name: '湛河', code: 'CN101180511' }
                    ]
                },
                {
                    name: '信阳',
                    areas: [
                        { name: '信阳', code: 'CN101180601' },
                        { name: '息县', code: 'CN101180602' },
                        { name: '罗山', code: 'CN101180603' },
                        { name: '光山', code: 'CN101180604' },
                        { name: '新县', code: 'CN101180605' },
                        { name: '淮滨', code: 'CN101180606' },
                        { name: '潢川', code: 'CN101180607' },
                        { name: '固始', code: 'CN101180608' },
                        { name: '商城', code: 'CN101180609' },
                        { name: '浉河', code: 'CN101180610' },
                        { name: '平桥', code: 'CN101180611' }
                    ]
                },
                {
                    name: '南阳',
                    areas: [
                        { name: '南阳', code: 'CN101180701' },
                        { name: '南召', code: 'CN101180702' },
                        { name: '方城', code: 'CN101180703' },
                        { name: '社旗', code: 'CN101180704' },
                        { name: '西峡', code: 'CN101180705' },
                        { name: '内乡', code: 'CN101180706' },
                        { name: '镇平', code: 'CN101180707' },
                        { name: '淅川', code: 'CN101180708' },
                        { name: '新野', code: 'CN101180709' },
                        { name: '唐河', code: 'CN101180710' },
                        { name: '邓州', code: 'CN101180711' },
                        { name: '桐柏', code: 'CN101180712' },
                        { name: '宛城', code: 'CN101180713' },
                        { name: '卧龙', code: 'CN101180714' }
                    ]
                },
                {
                    name: '开封',
                    areas: [
                        { name: '开封', code: 'CN101180801' },
                        { name: '杞县', code: 'CN101180802' },
                        { name: '尉氏', code: 'CN101180803' },
                        { name: '通许', code: 'CN101180804' },
                        { name: '兰考', code: 'CN101180805' },
                        { name: '龙亭', code: 'CN101180806' },
                        { name: '顺河', code: 'CN101180807' },
                        { name: '鼓楼', code: 'CN101180808' },
                        { name: '禹王台', code: 'CN101180809' },
                        { name: '祥符', code: 'CN101180810' }
                    ]
                },
                {
                    name: '洛阳',
                    areas: [
                        { name: '洛阳', code: 'CN101180901' },
                        { name: '新安', code: 'CN101180902' },
                        { name: '孟津', code: 'CN101180903' },
                        { name: '宜阳', code: 'CN101180904' },
                        { name: '洛宁', code: 'CN101180905' },
                        { name: '伊川', code: 'CN101180906' },
                        { name: '嵩县', code: 'CN101180907' },
                        { name: '偃师', code: 'CN101180908' },
                        { name: '栾川', code: 'CN101180909' },
                        { name: '汝阳', code: 'CN101180910' },
                        { name: '吉利', code: 'CN101180911' },
                        { name: '老城', code: 'CN101180912' },
                        { name: '西工', code: 'CN101180913' },
                        { name: '瀍河', code: 'CN101180914' },
                        { name: '涧西', code: 'CN101180915' },
                        { name: '洛龙', code: 'CN101180916' }
                    ]
                },
                {
                    name: '商丘',
                    areas: [
                        { name: '商丘', code: 'CN101181001' },
                        { name: '梁园', code: 'CN101181002' },
                        { name: '睢县', code: 'CN101181003' },
                        { name: '民权', code: 'CN101181004' },
                        { name: '虞城', code: 'CN101181005' },
                        { name: '柘城', code: 'CN101181006' },
                        { name: '宁陵', code: 'CN101181007' },
                        { name: '夏邑', code: 'CN101181008' },
                        { name: '永城', code: 'CN101181009' },
                        { name: '睢阳', code: 'CN101181010' }
                    ]
                },
                {
                    name: '焦作',
                    areas: [
                        { name: '焦作', code: 'CN101181101' },
                        { name: '修武', code: 'CN101181102' },
                        { name: '武陟', code: 'CN101181103' },
                        { name: '沁阳', code: 'CN101181104' },
                        { name: '解放', code: 'CN101181105' },
                        { name: '博爱', code: 'CN101181106' },
                        { name: '温县', code: 'CN101181107' },
                        { name: '孟州', code: 'CN101181108' },
                        { name: '中站', code: 'CN101181109' },
                        { name: '马村', code: 'CN101181110' },
                        { name: '山阳', code: 'CN101181111' }
                    ]
                },
                {
                    name: '鹤壁',
                    areas: [
                        { name: '鹤壁', code: 'CN101181201' },
                        { name: '浚县', code: 'CN101181202' },
                        { name: '淇县', code: 'CN101181203' },
                        { name: '鹤山', code: 'CN101181204' },
                        { name: '山城', code: 'CN101181205' },
                        { name: '淇滨', code: 'CN101181206' }
                    ]
                },
                {
                    name: '濮阳',
                    areas: [
                        { name: '濮阳', code: 'CN101181301' },
                        { name: '台前', code: 'CN101181302' },
                        { name: '南乐', code: 'CN101181303' },
                        { name: '清丰', code: 'CN101181304' },
                        { name: '范县', code: 'CN101181305' },
                        { name: '华龙', code: 'CN101181306' }
                    ]
                },
                {
                    name: '周口',
                    areas: [
                        { name: '周口', code: 'CN101181401' },
                        { name: '扶沟', code: 'CN101181402' },
                        { name: '太康', code: 'CN101181403' },
                        { name: '淮阳', code: 'CN101181404' },
                        { name: '西华', code: 'CN101181405' },
                        { name: '商水', code: 'CN101181406' },
                        { name: '项城', code: 'CN101181407' },
                        { name: '郸城', code: 'CN101181408' },
                        { name: '鹿邑', code: 'CN101181409' },
                        { name: '沈丘', code: 'CN101181410' },
                        { name: '川汇', code: 'CN101181411' }
                    ]
                },
                {
                    name: '漯河',
                    areas: [
                        { name: '漯河', code: 'CN101181501' },
                        { name: '临颍', code: 'CN101181502' },
                        { name: '舞阳', code: 'CN101181503' },
                        { name: '源汇', code: 'CN101181504' },
                        { name: '郾城', code: 'CN101181505' },
                        { name: '召陵', code: 'CN101181506' }
                    ]
                },
                {
                    name: '驻马店',
                    areas: [
                        { name: '驻马店', code: 'CN101181601' },
                        { name: '西平', code: 'CN101181602' },
                        { name: '遂平', code: 'CN101181603' },
                        { name: '上蔡', code: 'CN101181604' },
                        { name: '汝南', code: 'CN101181605' },
                        { name: '泌阳', code: 'CN101181606' },
                        { name: '平舆', code: 'CN101181607' },
                        { name: '新蔡', code: 'CN101181608' },
                        { name: '确山', code: 'CN101181609' },
                        { name: '正阳', code: 'CN101181610' },
                        { name: '驿城', code: 'CN101181611' }
                    ]
                },
                {
                    name: '三门峡',
                    areas: [
                        { name: '三门峡', code: 'CN101181701' },
                        { name: '灵宝', code: 'CN101181702' },
                        { name: '渑池', code: 'CN101181703' },
                        { name: '卢氏', code: 'CN101181704' },
                        { name: '义马', code: 'CN101181705' },
                        { name: '陕县', code: 'CN101181706' },
                        { name: '湖滨', code: 'CN101181707' },
                        { name: '陕州', code: 'CN101181708' }
                    ]
                },
                {
                    name: '济源',
                    areas: [{ name: '济源', code: 'CN101181801' }]
                }
            ]
        },
        {
            name: '江苏',
            cities: [
                {
                    name: '南京',
                    areas: [
                        { name: '南京', code: 'CN101190101' },
                        { name: '溧水', code: 'CN101190102' },
                        { name: '高淳', code: 'CN101190103' },
                        { name: '江宁', code: 'CN101190104' },
                        { name: '六合', code: 'CN101190105' },
                        { name: '浦口', code: 'CN101190107' },
                        { name: '玄武', code: 'CN101190108' },
                        { name: '秦淮', code: 'CN101190109' },
                        { name: '建邺', code: 'CN101190110' },
                        { name: '鼓楼', code: 'CN101190111' },
                        { name: '栖霞', code: 'CN101190112' },
                        { name: '雨花台', code: 'CN101190113' }
                    ]
                },
                {
                    name: '无锡',
                    areas: [
                        { name: '无锡', code: 'CN101190201' },
                        { name: '江阴', code: 'CN101190202' },
                        { name: '宜兴', code: 'CN101190203' },
                        { name: '锡山', code: 'CN101190204' },
                        { name: '惠山', code: 'CN101190205' },
                        { name: '滨湖', code: 'CN101190206' },
                        { name: '梁溪', code: 'CN101190207' },
                        { name: '新吴', code: 'CN101190208' }
                    ]
                },
                {
                    name: '镇江',
                    areas: [
                        { name: '镇江', code: 'CN101190301' },
                        { name: '丹阳', code: 'CN101190302' },
                        { name: '扬中', code: 'CN101190303' },
                        { name: '句容', code: 'CN101190304' },
                        { name: '丹徒', code: 'CN101190305' },
                        { name: '京口', code: 'CN101190306' },
                        { name: '润州', code: 'CN101190307' }
                    ]
                },
                {
                    name: '苏州',
                    areas: [
                        { name: '苏州', code: 'CN101190401' },
                        { name: '常熟', code: 'CN101190402' },
                        { name: '张家港', code: 'CN101190403' },
                        { name: '昆山', code: 'CN101190404' },
                        { name: '吴中', code: 'CN101190405' },
                        { name: '虎丘', code: 'CN101190406' },
                        { name: '吴江', code: 'CN101190407' },
                        { name: '太仓', code: 'CN101190408' },
                        { name: '相城', code: 'CN101190409' },
                        { name: '姑苏', code: 'CN101190410' }
                    ]
                },
                {
                    name: '南通',
                    areas: [
                        { name: '南通', code: 'CN101190501' },
                        { name: '海安', code: 'CN101190502' },
                        { name: '如皋', code: 'CN101190503' },
                        { name: '如东', code: 'CN101190504' },
                        { name: '崇川', code: 'CN101190505' },
                        { name: '港闸', code: 'CN101190506' },
                        { name: '启东', code: 'CN101190507' },
                        { name: '海门', code: 'CN101190508' },
                        { name: '通州', code: 'CN101190509' }
                    ]
                },
                {
                    name: '扬州',
                    areas: [
                        { name: '扬州', code: 'CN101190601' },
                        { name: '宝应', code: 'CN101190602' },
                        { name: '仪征', code: 'CN101190603' },
                        { name: '高邮', code: 'CN101190604' },
                        { name: '江都', code: 'CN101190605' },
                        { name: '邗江', code: 'CN101190606' },
                        { name: '广陵', code: 'CN101190607' }
                    ]
                },
                {
                    name: '盐城',
                    areas: [
                        { name: '盐城', code: 'CN101190701' },
                        { name: '响水', code: 'CN101190702' },
                        { name: '滨海', code: 'CN101190703' },
                        { name: '阜宁', code: 'CN101190704' },
                        { name: '射阳', code: 'CN101190705' },
                        { name: '建湖', code: 'CN101190706' },
                        { name: '东台', code: 'CN101190707' },
                        { name: '大丰', code: 'CN101190708' },
                        { name: '盐都', code: 'CN101190709' },
                        { name: '亭湖', code: 'CN101190710' }
                    ]
                },
                {
                    name: '徐州',
                    areas: [
                        { name: '徐州', code: 'CN101190801' },
                        { name: '铜山', code: 'CN101190802' },
                        { name: '丰县', code: 'CN101190803' },
                        { name: '沛县', code: 'CN101190804' },
                        { name: '邳州', code: 'CN101190805' },
                        { name: '睢宁', code: 'CN101190806' },
                        { name: '新沂', code: 'CN101190807' },
                        { name: '鼓楼', code: 'CN101190808' },
                        { name: '云龙', code: 'CN101190809' },
                        { name: '贾汪', code: 'CN101190810' },
                        { name: '泉山', code: 'CN101190811' }
                    ]
                },
                {
                    name: '淮安',
                    areas: [
                        { name: '淮安', code: 'CN101190901' },
                        { name: '金湖', code: 'CN101190902' },
                        { name: '盱眙', code: 'CN101190903' },
                        { name: '洪泽', code: 'CN101190904' },
                        { name: '涟水', code: 'CN101190905' },
                        { name: '淮阴区', code: 'CN101190906' },
                        { name: '清河', code: 'CN101190907' },
                        { name: '淮安区', code: 'CN101190908' },
                        { name: '清浦', code: 'CN101190909' }
                    ]
                },
                {
                    name: '连云港',
                    areas: [
                        { name: '连云港', code: 'CN101191001' },
                        { name: '东海', code: 'CN101191002' },
                        { name: '赣榆', code: 'CN101191003' },
                        { name: '灌云', code: 'CN101191004' },
                        { name: '灌南', code: 'CN101191005' },
                        { name: '海州', code: 'CN101191006' }
                    ]
                },
                {
                    name: '常州',
                    areas: [
                        { name: '常州', code: 'CN101191101' },
                        { name: '溧阳', code: 'CN101191102' },
                        { name: '金坛', code: 'CN101191103' },
                        { name: '武进', code: 'CN101191104' },
                        { name: '天宁', code: 'CN101191105' },
                        { name: '钟楼', code: 'CN101191106' },
                        { name: '新北', code: 'CN101191107' }
                    ]
                },
                {
                    name: '泰州',
                    areas: [
                        { name: '泰州', code: 'CN101191201' },
                        { name: '兴化', code: 'CN101191202' },
                        { name: '泰兴', code: 'CN101191203' },
                        { name: '姜堰', code: 'CN101191204' },
                        { name: '靖江', code: 'CN101191205' },
                        { name: '海陵', code: 'CN101191206' },
                        { name: '高港', code: 'CN101191207' }
                    ]
                },
                {
                    name: '宿迁',
                    areas: [
                        { name: '宿迁', code: 'CN101191301' },
                        { name: '沭阳', code: 'CN101191302' },
                        { name: '泗阳', code: 'CN101191303' },
                        { name: '泗洪', code: 'CN101191304' },
                        { name: '宿豫', code: 'CN101191305' },
                        { name: '宿城', code: 'CN101191306' }
                    ]
                }
            ]
        },
        {
            name: '湖北',
            cities: [
                {
                    name: '武汉',
                    areas: [
                        { name: '武汉', code: 'CN101200101' },
                        { name: '蔡甸', code: 'CN101200102' },
                        { name: '黄陂', code: 'CN101200103' },
                        { name: '新洲', code: 'CN101200104' },
                        { name: '江夏', code: 'CN101200105' },
                        { name: '东西湖', code: 'CN101200106' },
                        { name: '江岸', code: 'CN101200107' },
                        { name: '江汉', code: 'CN101200108' },
                        { name: '硚口', code: 'CN101200109' },
                        { name: '汉阳', code: 'CN101200110' },
                        { name: '武昌', code: 'CN101200111' },
                        { name: '青山', code: 'CN101200112' },
                        { name: '洪山', code: 'CN101200113' },
                        { name: '汉南', code: 'CN101200114' }
                    ]
                },
                {
                    name: '襄阳',
                    areas: [
                        { name: '襄阳', code: 'CN101200201' },
                        { name: '襄州', code: 'CN101200202' },
                        { name: '保康', code: 'CN101200203' },
                        { name: '南漳', code: 'CN101200204' },
                        { name: '宜城', code: 'CN101200205' },
                        { name: '老河口', code: 'CN101200206' },
                        { name: '谷城', code: 'CN101200207' },
                        { name: '枣阳', code: 'CN101200208' },
                        { name: '襄城', code: 'CN101200209' },
                        { name: '樊城', code: 'CN101200210' }
                    ]
                },
                {
                    name: '鄂州',
                    areas: [
                        { name: '鄂州', code: 'CN101200301' },
                        { name: '梁子湖', code: 'CN101200302' },
                        { name: '华容', code: 'CN101200303' },
                        { name: '鄂城', code: 'CN101200304' }
                    ]
                },
                {
                    name: '孝感',
                    areas: [
                        { name: '孝感', code: 'CN101200401' },
                        { name: '安陆', code: 'CN101200402' },
                        { name: '云梦', code: 'CN101200403' },
                        { name: '大悟', code: 'CN101200404' },
                        { name: '应城', code: 'CN101200405' },
                        { name: '汉川', code: 'CN101200406' },
                        { name: '孝昌', code: 'CN101200407' },
                        { name: '孝南', code: 'CN101200408' }
                    ]
                },
                {
                    name: '黄冈',
                    areas: [
                        { name: '黄冈', code: 'CN101200501' },
                        { name: '红安', code: 'CN101200502' },
                        { name: '麻城', code: 'CN101200503' },
                        { name: '罗田', code: 'CN101200504' },
                        { name: '英山', code: 'CN101200505' },
                        { name: '浠水', code: 'CN101200506' },
                        { name: '蕲春', code: 'CN101200507' },
                        { name: '黄梅', code: 'CN101200508' },
                        { name: '武穴', code: 'CN101200509' },
                        { name: '团风', code: 'CN101200510' },
                        { name: '黄州', code: 'CN101200511' }
                    ]
                },
                {
                    name: '黄石',
                    areas: [
                        { name: '黄石', code: 'CN101200601' },
                        { name: '大冶', code: 'CN101200602' },
                        { name: '阳新', code: 'CN101200603' },
                        { name: '铁山', code: 'CN101200604' },
                        { name: '下陆', code: 'CN101200605' },
                        { name: '西塞山', code: 'CN101200606' },
                        { name: '黄石港', code: 'CN101200607' }
                    ]
                },
                {
                    name: '咸宁',
                    areas: [
                        { name: '咸宁', code: 'CN101200701' },
                        { name: '赤壁', code: 'CN101200702' },
                        { name: '嘉鱼', code: 'CN101200703' },
                        { name: '崇阳', code: 'CN101200704' },
                        { name: '通城', code: 'CN101200705' },
                        { name: '通山', code: 'CN101200706' },
                        { name: '咸安', code: 'CN101200707' }
                    ]
                },
                {
                    name: '荆州',
                    areas: [
                        { name: '荆州', code: 'CN101200801' },
                        { name: '江陵', code: 'CN101200802' },
                        { name: '公安', code: 'CN101200803' },
                        { name: '石首', code: 'CN101200804' },
                        { name: '监利', code: 'CN101200805' },
                        { name: '洪湖', code: 'CN101200806' },
                        { name: '松滋', code: 'CN101200807' },
                        { name: '沙市', code: 'CN101200808' }
                    ]
                },
                {
                    name: '宜昌',
                    areas: [
                        { name: '宜昌', code: 'CN101200901' },
                        { name: '远安', code: 'CN101200902' },
                        { name: '秭归', code: 'CN101200903' },
                        { name: '兴山', code: 'CN101200904' },
                        { name: '西陵', code: 'CN101200905' },
                        { name: '五峰', code: 'CN101200906' },
                        { name: '当阳', code: 'CN101200907' },
                        { name: '长阳', code: 'CN101200908' },
                        { name: '宜都', code: 'CN101200909' },
                        { name: '枝江', code: 'CN101200910' },
                        { name: '夷陵', code: 'CN101200912' },
                        { name: '伍家岗', code: 'CN101200913' },
                        { name: '点军', code: 'CN101200914' },
                        { name: '猇亭', code: 'CN101200915' }
                    ]
                },
                {
                    name: '恩施',
                    areas: [
                        { name: '恩施', code: 'CN101201001' },
                        { name: '利川', code: 'CN101201002' },
                        { name: '建始', code: 'CN101201003' },
                        { name: '咸丰', code: 'CN101201004' },
                        { name: '宣恩', code: 'CN101201005' },
                        { name: '鹤峰', code: 'CN101201006' },
                        { name: '来凤', code: 'CN101201007' },
                        { name: '巴东', code: 'CN101201008' }
                    ]
                },
                {
                    name: '十堰',
                    areas: [
                        { name: '十堰', code: 'CN101201101' },
                        { name: '竹溪', code: 'CN101201102' },
                        { name: '郧西', code: 'CN101201103' },
                        { name: '郧阳', code: 'CN101201104' },
                        { name: '竹山', code: 'CN101201105' },
                        { name: '房县', code: 'CN101201106' },
                        { name: '丹江口', code: 'CN101201107' },
                        { name: '茅箭', code: 'CN101201108' },
                        { name: '张湾', code: 'CN101201109' }
                    ]
                },
                {
                    name: '神农架',
                    areas: [{ name: '神农架', code: 'CN101201201' }]
                },
                {
                    name: '随州',
                    areas: [
                        { name: '随州', code: 'CN101201301' },
                        { name: '广水', code: 'CN101201302' },
                        { name: '曾都', code: 'CN101201303' },
                        { name: '随县', code: 'CN101201304' }
                    ]
                },
                {
                    name: '荆门',
                    areas: [
                        { name: '荆门', code: 'CN101201401' },
                        { name: '钟祥', code: 'CN101201402' },
                        { name: '京山', code: 'CN101201403' },
                        { name: '掇刀', code: 'CN101201404' },
                        { name: '沙洋', code: 'CN101201405' },
                        { name: '东宝', code: 'CN101201406' }
                    ]
                },
                {
                    name: '天门',
                    areas: [{ name: '天门', code: 'CN101201501' }]
                },
                {
                    name: '仙桃',
                    areas: [{ name: '仙桃', code: 'CN101201601' }]
                },
                {
                    name: '潜江',
                    areas: [{ name: '潜江', code: 'CN101201701' }]
                }
            ]
        },
        {
            name: '浙江',
            cities: [
                {
                    name: '杭州',
                    areas: [
                        { name: '杭州', code: 'CN101210101' },
                        { name: '萧山', code: 'CN101210102' },
                        { name: '桐庐', code: 'CN101210103' },
                        { name: '淳安', code: 'CN101210104' },
                        { name: '建德', code: 'CN101210105' },
                        { name: '余杭', code: 'CN101210106' },
                        { name: '临安', code: 'CN101210107' },
                        { name: '富阳', code: 'CN101210108' },
                        { name: '上城', code: 'CN101210109' },
                        { name: '下城', code: 'CN101210110' },
                        { name: '江干', code: 'CN101210111' },
                        { name: '拱墅', code: 'CN101210112' },
                        { name: '西湖', code: 'CN101210113' },
                        { name: '滨江', code: 'CN101210114' }
                    ]
                },
                {
                    name: '湖州',
                    areas: [
                        { name: '湖州', code: 'CN101210201' },
                        { name: '长兴', code: 'CN101210202' },
                        { name: '安吉', code: 'CN101210203' },
                        { name: '德清', code: 'CN101210204' },
                        { name: '吴兴', code: 'CN101210205' },
                        { name: '南浔', code: 'CN101210206' }
                    ]
                },
                {
                    name: '嘉兴',
                    areas: [
                        { name: '嘉兴', code: 'CN101210301' },
                        { name: '嘉善', code: 'CN101210302' },
                        { name: '海宁', code: 'CN101210303' },
                        { name: '桐乡', code: 'CN101210304' },
                        { name: '平湖', code: 'CN101210305' },
                        { name: '海盐', code: 'CN101210306' },
                        { name: '南湖', code: 'CN101210307' },
                        { name: '秀洲', code: 'CN101210308' }
                    ]
                },
                {
                    name: '宁波',
                    areas: [
                        { name: '宁波', code: 'CN101210401' },
                        { name: '海曙', code: 'CN101210402' },
                        { name: '慈溪', code: 'CN101210403' },
                        { name: '余姚', code: 'CN101210404' },
                        { name: '奉化', code: 'CN101210405' },
                        { name: '象山', code: 'CN101210406' },
                        { name: '江东', code: 'CN101210407' },
                        { name: '宁海', code: 'CN101210408' },
                        { name: '江北', code: 'CN101210409' },
                        { name: '北仑', code: 'CN101210410' },
                        { name: '鄞州', code: 'CN101210411' },
                        { name: '镇海', code: 'CN101210412' }
                    ]
                },
                {
                    name: '绍兴',
                    areas: [
                        { name: '越城', code: 'CN101210501' },
                        { name: '诸暨', code: 'CN101210502' },
                        { name: '上虞', code: 'CN101210503' },
                        { name: '新昌', code: 'CN101210504' },
                        { name: '嵊州', code: 'CN101210505' },
                        { name: '柯桥', code: 'CN101210506' },
                        { name: '绍兴', code: 'CN101210507' }
                    ]
                },
                {
                    name: '台州',
                    areas: [
                        { name: '台州', code: 'CN101210601' },
                        { name: '玉环', code: 'CN101210603' },
                        { name: '三门', code: 'CN101210604' },
                        { name: '天台', code: 'CN101210605' },
                        { name: '仙居', code: 'CN101210606' },
                        { name: '温岭', code: 'CN101210607' },
                        { name: '临海', code: 'CN101210610' },
                        { name: '椒江', code: 'CN101210611' },
                        { name: '黄岩', code: 'CN101210612' },
                        { name: '路桥', code: 'CN101210613' }
                    ]
                },
                {
                    name: '温州',
                    areas: [
                        { name: '温州', code: 'CN101210701' },
                        { name: '泰顺', code: 'CN101210702' },
                        { name: '文成', code: 'CN101210703' },
                        { name: '平阳', code: 'CN101210704' },
                        { name: '瑞安', code: 'CN101210705' },
                        { name: '洞头', code: 'CN101210706' },
                        { name: '乐清', code: 'CN101210707' },
                        { name: '永嘉', code: 'CN101210708' },
                        { name: '苍南', code: 'CN101210709' },
                        { name: '鹿城', code: 'CN101210710' },
                        { name: '龙湾', code: 'CN101210711' },
                        { name: '瓯海', code: 'CN101210712' }
                    ]
                },
                {
                    name: '丽水',
                    areas: [
                        { name: '丽水', code: 'CN101210801' },
                        { name: '遂昌', code: 'CN101210802' },
                        { name: '龙泉', code: 'CN101210803' },
                        { name: '缙云', code: 'CN101210804' },
                        { name: '青田', code: 'CN101210805' },
                        { name: '云和', code: 'CN101210806' },
                        { name: '庆元', code: 'CN101210807' },
                        { name: '松阳', code: 'CN101210808' },
                        { name: '景宁', code: 'CN101210809' },
                        { name: '莲都', code: 'CN101210810' }
                    ]
                },
                {
                    name: '金华',
                    areas: [
                        { name: '金华', code: 'CN101210901' },
                        { name: '浦江', code: 'CN101210902' },
                        { name: '兰溪', code: 'CN101210903' },
                        { name: '义乌', code: 'CN101210904' },
                        { name: '东阳', code: 'CN101210905' },
                        { name: '武义', code: 'CN101210906' },
                        { name: '永康', code: 'CN101210907' },
                        { name: '磐安', code: 'CN101210908' },
                        { name: '婺城', code: 'CN101210909' },
                        { name: '金东', code: 'CN101210910' }
                    ]
                },
                {
                    name: '衢州',
                    areas: [
                        { name: '衢州', code: 'CN101211001' },
                        { name: '常山', code: 'CN101211002' },
                        { name: '开化', code: 'CN101211003' },
                        { name: '龙游', code: 'CN101211004' },
                        { name: '江山', code: 'CN101211005' },
                        { name: '衢江', code: 'CN101211006' },
                        { name: '柯城', code: 'CN101211007' }
                    ]
                },
                {
                    name: '舟山',
                    areas: [
                        { name: '舟山', code: 'CN101211101' },
                        { name: '嵊泗', code: 'CN101211102' },
                        { name: '岱山', code: 'CN101211104' },
                        { name: '普陀', code: 'CN101211105' },
                        { name: '定海', code: 'CN101211106' }
                    ]
                }
            ]
        },
        {
            name: '安徽',
            cities: [
                {
                    name: '合肥',
                    areas: [
                        { name: '合肥', code: 'CN101220101' },
                        { name: '长丰', code: 'CN101220102' },
                        { name: '肥东', code: 'CN101220103' },
                        { name: '肥西', code: 'CN101220104' },
                        { name: '巢湖', code: 'CN101220105' },
                        { name: '庐江', code: 'CN101220106' },
                        { name: '瑶海', code: 'CN101220107' },
                        { name: '庐阳', code: 'CN101220108' },
                        { name: '蜀山', code: 'CN101220109' },
                        { name: '包河', code: 'CN101220110' }
                    ]
                },
                {
                    name: '蚌埠',
                    areas: [
                        { name: '蚌埠', code: 'CN101220201' },
                        { name: '怀远', code: 'CN101220202' },
                        { name: '固镇', code: 'CN101220203' },
                        { name: '五河', code: 'CN101220204' },
                        { name: '龙子湖', code: 'CN101220205' },
                        { name: '蚌山', code: 'CN101220206' },
                        { name: '禹会', code: 'CN101220207' },
                        { name: '淮上', code: 'CN101220208' }
                    ]
                },
                {
                    name: '芜湖',
                    areas: [
                        { name: '芜湖', code: 'CN101220301' },
                        { name: '繁昌', code: 'CN101220302' },
                        { name: '芜湖县', code: 'CN101220303' },
                        { name: '南陵', code: 'CN101220304' },
                        { name: '无为', code: 'CN101220305' },
                        { name: '镜湖', code: 'CN101220306' },
                        { name: '弋江', code: 'CN101220307' },
                        { name: '鸠江', code: 'CN101220308' },
                        { name: '三山', code: 'CN101220309' }
                    ]
                },
                {
                    name: '淮南',
                    areas: [
                        { name: '淮南', code: 'CN101220401' },
                        { name: '凤台', code: 'CN101220402' },
                        { name: '潘集', code: 'CN101220403' },
                        { name: '大通', code: 'CN101220404' },
                        { name: '田家庵', code: 'CN101220405' },
                        { name: '谢家集', code: 'CN101220406' },
                        { name: '八公山', code: 'CN101220407' },
                        { name: '寿县', code: 'CN101220408' }
                    ]
                },
                {
                    name: '马鞍山',
                    areas: [
                        { name: '马鞍山', code: 'CN101220501' },
                        { name: '当涂', code: 'CN101220502' },
                        { name: '含山', code: 'CN101220503' },
                        { name: '和县', code: 'CN101220504' },
                        { name: '花山', code: 'CN101220505' },
                        { name: '雨山', code: 'CN101220506' },
                        { name: '博望', code: 'CN101220507' }
                    ]
                },
                {
                    name: '安庆',
                    areas: [
                        { name: '安庆', code: 'CN101220601' },
                        { name: '太湖', code: 'CN101220603' },
                        { name: '潜山', code: 'CN101220604' },
                        { name: '怀宁', code: 'CN101220605' },
                        { name: '宿松', code: 'CN101220606' },
                        { name: '望江', code: 'CN101220607' },
                        { name: '岳西', code: 'CN101220608' },
                        { name: '桐城', code: 'CN101220609' },
                        { name: '迎江', code: 'CN101220610' },
                        { name: '大观', code: 'CN101220611' },
                        { name: '宜秀', code: 'CN101220612' }
                    ]
                },
                {
                    name: '宿州',
                    areas: [
                        { name: '宿州', code: 'CN101220701' },
                        { name: '砀山', code: 'CN101220702' },
                        { name: '灵璧', code: 'CN101220703' },
                        { name: '泗县', code: 'CN101220704' },
                        { name: '萧县', code: 'CN101220705' },
                        { name: '埇桥', code: 'CN101220706' }
                    ]
                },
                {
                    name: '阜阳',
                    areas: [
                        { name: '阜阳', code: 'CN101220801' },
                        { name: '阜南', code: 'CN101220802' },
                        { name: '颍上', code: 'CN101220803' },
                        { name: '临泉', code: 'CN101220804' },
                        { name: '界首', code: 'CN101220805' },
                        { name: '太和', code: 'CN101220806' },
                        { name: '颍州', code: 'CN101220807' },
                        { name: '颍东', code: 'CN101220808' },
                        { name: '颍泉', code: 'CN101220809' }
                    ]
                },
                {
                    name: '亳州',
                    areas: [
                        { name: '亳州', code: 'CN101220901' },
                        { name: '涡阳', code: 'CN101220902' },
                        { name: '利辛', code: 'CN101220903' },
                        { name: '蒙城', code: 'CN101220904' },
                        { name: '谯城', code: 'CN101220905' }
                    ]
                },
                {
                    name: '黄山',
                    areas: [
                        { name: '黄山', code: 'CN101221001' },
                        { name: '黄山区', code: 'CN101221002' },
                        { name: '屯溪', code: 'CN101221003' },
                        { name: '祁门', code: 'CN101221004' },
                        { name: '黟县', code: 'CN101221005' },
                        { name: '歙县', code: 'CN101221006' },
                        { name: '休宁', code: 'CN101221007' },
                        { name: '徽州', code: 'CN101221009' }
                    ]
                },
                {
                    name: '滁州',
                    areas: [
                        { name: '滁州', code: 'CN101221101' },
                        { name: '凤阳', code: 'CN101221102' },
                        { name: '明光', code: 'CN101221103' },
                        { name: '定远', code: 'CN101221104' },
                        { name: '全椒', code: 'CN101221105' },
                        { name: '来安', code: 'CN101221106' },
                        { name: '天长', code: 'CN101221107' },
                        { name: '琅琊', code: 'CN101221108' },
                        { name: '南谯', code: 'CN101221109' }
                    ]
                },
                {
                    name: '淮北',
                    areas: [
                        { name: '淮北', code: 'CN101221201' },
                        { name: '濉溪', code: 'CN101221202' },
                        { name: '杜集', code: 'CN101221203' },
                        { name: '相山', code: 'CN101221204' },
                        { name: '烈山', code: 'CN101221205' }
                    ]
                },
                {
                    name: '铜陵',
                    areas: [
                        { name: '铜陵', code: 'CN101221301' },
                        { name: '铜官', code: 'CN101221302' },
                        { name: '义安', code: 'CN101221303' },
                        { name: '郊区', code: 'CN101221304' },
                        { name: '枞阳', code: 'CN101221305' }
                    ]
                },
                {
                    name: '宣城',
                    areas: [
                        { name: '宣城', code: 'CN101221401' },
                        { name: '泾县', code: 'CN101221402' },
                        { name: '旌德', code: 'CN101221403' },
                        { name: '宁国', code: 'CN101221404' },
                        { name: '绩溪', code: 'CN101221405' },
                        { name: '广德', code: 'CN101221406' },
                        { name: '郎溪', code: 'CN101221407' },
                        { name: '宣州', code: 'CN101221408' }
                    ]
                },
                {
                    name: '六安',
                    areas: [
                        { name: '六安', code: 'CN101221501' },
                        { name: '霍邱', code: 'CN101221502' },
                        { name: '金安', code: 'CN101221504' },
                        { name: '金寨', code: 'CN101221505' },
                        { name: '霍山', code: 'CN101221506' },
                        { name: '舒城', code: 'CN101221507' },
                        { name: '裕安', code: 'CN101221508' },
                        { name: '叶集', code: 'CN101221509' }
                    ]
                },
                {
                    name: '池州',
                    areas: [
                        { name: '池州', code: 'CN101221701' },
                        { name: '东至', code: 'CN101221702' },
                        { name: '青阳', code: 'CN101221703' },
                        { name: '九华山', code: 'CN101221704' },
                        { name: '石台', code: 'CN101221705' },
                        { name: '贵池', code: 'CN101221706' }
                    ]
                }
            ]
        },
        {
            name: '福建',
            cities: [
                {
                    name: '福州',
                    areas: [
                        { name: '福州', code: 'CN101230101' },
                        { name: '闽清', code: 'CN101230102' },
                        { name: '闽侯', code: 'CN101230103' },
                        { name: '罗源', code: 'CN101230104' },
                        { name: '连江', code: 'CN101230105' },
                        { name: '鼓楼', code: 'CN101230106' },
                        { name: '永泰', code: 'CN101230107' },
                        { name: '平潭', code: 'CN101230108' },
                        { name: '台江', code: 'CN101230109' },
                        { name: '长乐', code: 'CN101230110' },
                        { name: '福清', code: 'CN101230111' },
                        { name: '仓山', code: 'CN101230112' },
                        { name: '马尾', code: 'CN101230113' },
                        { name: '晋安', code: 'CN101230114' }
                    ]
                },
                {
                    name: '厦门',
                    areas: [
                        { name: '厦门', code: 'CN101230201' },
                        { name: '同安', code: 'CN101230202' },
                        { name: '思明', code: 'CN101230203' },
                        { name: '海沧', code: 'CN101230204' },
                        { name: '湖里', code: 'CN101230205' },
                        { name: '集美', code: 'CN101230206' },
                        { name: '翔安', code: 'CN101230207' }
                    ]
                },
                {
                    name: '宁德',
                    areas: [
                        { name: '宁德', code: 'CN101230301' },
                        { name: '古田', code: 'CN101230302' },
                        { name: '霞浦', code: 'CN101230303' },
                        { name: '寿宁', code: 'CN101230304' },
                        { name: '周宁', code: 'CN101230305' },
                        { name: '福安', code: 'CN101230306' },
                        { name: '柘荣', code: 'CN101230307' },
                        { name: '福鼎', code: 'CN101230308' },
                        { name: '屏南', code: 'CN101230309' },
                        { name: '蕉城', code: 'CN101230310' }
                    ]
                },
                {
                    name: '莆田',
                    areas: [
                        { name: '莆田', code: 'CN101230401' },
                        { name: '仙游', code: 'CN101230402' },
                        { name: '涵江', code: 'CN101230404' },
                        { name: '秀屿', code: 'CN101230405' },
                        { name: '荔城', code: 'CN101230406' },
                        { name: '城厢', code: 'CN101230407' }
                    ]
                },
                {
                    name: '泉州',
                    areas: [
                        { name: '泉州', code: 'CN101230501' },
                        { name: '安溪', code: 'CN101230502' },
                        { name: '金门', code: 'CN101230503' },
                        { name: '永春', code: 'CN101230504' },
                        { name: '德化', code: 'CN101230505' },
                        { name: '南安', code: 'CN101230506' },
                        { name: '惠安', code: 'CN101230508' },
                        { name: '晋江', code: 'CN101230509' },
                        { name: '石狮', code: 'CN101230510' },
                        { name: '鲤城', code: 'CN101230511' },
                        { name: '丰泽', code: 'CN101230512' },
                        { name: '洛江', code: 'CN101230513' },
                        { name: '泉港', code: 'CN101230514' }
                    ]
                },
                {
                    name: '漳州',
                    areas: [
                        { name: '漳州', code: 'CN101230601' },
                        { name: '长泰', code: 'CN101230602' },
                        { name: '南靖', code: 'CN101230603' },
                        { name: '平和', code: 'CN101230604' },
                        { name: '龙海', code: 'CN101230605' },
                        { name: '漳浦', code: 'CN101230606' },
                        { name: '诏安', code: 'CN101230607' },
                        { name: '东山', code: 'CN101230608' },
                        { name: '云霄', code: 'CN101230609' },
                        { name: '华安', code: 'CN101230610' },
                        { name: '芗城', code: 'CN101230611' },
                        { name: '龙文', code: 'CN101230612' }
                    ]
                },
                {
                    name: '龙岩',
                    areas: [
                        { name: '龙岩', code: 'CN101230701' },
                        { name: '长汀', code: 'CN101230702' },
                        { name: '连城', code: 'CN101230703' },
                        { name: '武平', code: 'CN101230704' },
                        { name: '上杭', code: 'CN101230705' },
                        { name: '永定', code: 'CN101230706' },
                        { name: '漳平', code: 'CN101230707' },
                        { name: '新罗', code: 'CN101230708' }
                    ]
                },
                {
                    name: '三明',
                    areas: [
                        { name: '三明', code: 'CN101230801' },
                        { name: '宁化', code: 'CN101230802' },
                        { name: '清流', code: 'CN101230803' },
                        { name: '泰宁', code: 'CN101230804' },
                        { name: '将乐', code: 'CN101230805' },
                        { name: '建宁', code: 'CN101230806' },
                        { name: '明溪', code: 'CN101230807' },
                        { name: '沙县', code: 'CN101230808' },
                        { name: '尤溪', code: 'CN101230809' },
                        { name: '永安', code: 'CN101230810' },
                        { name: '大田', code: 'CN101230811' },
                        { name: '梅列', code: 'CN101230812' },
                        { name: '三元', code: 'CN101230813' }
                    ]
                },
                {
                    name: '南平',
                    areas: [
                        { name: '南平', code: 'CN101230901' },
                        { name: '顺昌', code: 'CN101230902' },
                        { name: '光泽', code: 'CN101230903' },
                        { name: '邵武', code: 'CN101230904' },
                        { name: '武夷山', code: 'CN101230905' },
                        { name: '浦城', code: 'CN101230906' },
                        { name: '建阳', code: 'CN101230907' },
                        { name: '松溪', code: 'CN101230908' },
                        { name: '政和', code: 'CN101230909' },
                        { name: '建瓯', code: 'CN101230910' },
                        { name: '延平', code: 'CN101230911' }
                    ]
                },
                {
                    name: '钓鱼岛',
                    areas: [{ name: '钓鱼岛', code: 'CN101231001' }]
                }
            ]
        },
        {
            name: '江西',
            cities: [
                {
                    name: '南昌',
                    areas: [
                        { name: '南昌', code: 'CN101240101' },
                        { name: '新建', code: 'CN101240102' },
                        { name: '南昌县', code: 'CN101240103' },
                        { name: '安义', code: 'CN101240104' },
                        { name: '进贤', code: 'CN101240105' },
                        { name: '东湖', code: 'CN101240106' },
                        { name: '西湖', code: 'CN101240107' },
                        { name: '青云谱', code: 'CN101240108' },
                        { name: '湾里', code: 'CN101240109' },
                        { name: '青山湖', code: 'CN101240110' }
                    ]
                },
                {
                    name: '九江',
                    areas: [
                        { name: '九江', code: 'CN101240201' },
                        { name: '瑞昌', code: 'CN101240202' },
                        { name: '庐山', code: 'CN101240203' },
                        { name: '武宁', code: 'CN101240204' },
                        { name: '德安', code: 'CN101240205' },
                        { name: '永修', code: 'CN101240206' },
                        { name: '湖口', code: 'CN101240207' },
                        { name: '彭泽', code: 'CN101240208' },
                        { name: '星子', code: 'CN101240209' },
                        { name: '都昌', code: 'CN101240210' },
                        { name: '浔阳', code: 'CN101240211' },
                        { name: '修水', code: 'CN101240212' },
                        { name: '共青城', code: 'CN101240213' }
                    ]
                },
                {
                    name: '上饶',
                    areas: [
                        { name: '上饶', code: 'CN101240301' },
                        { name: '鄱阳', code: 'CN101240302' },
                        { name: '婺源', code: 'CN101240303' },
                        { name: '信州', code: 'CN101240304' },
                        { name: '余干', code: 'CN101240305' },
                        { name: '万年', code: 'CN101240306' },
                        { name: '德兴', code: 'CN101240307' },
                        { name: '上饶县', code: 'CN101240308' },
                        { name: '弋阳', code: 'CN101240309' },
                        { name: '横峰', code: 'CN101240310' },
                        { name: '铅山', code: 'CN101240311' },
                        { name: '玉山', code: 'CN101240312' },
                        { name: '广丰', code: 'CN101240313' }
                    ]
                },
                {
                    name: '抚州',
                    areas: [
                        { name: '抚州', code: 'CN101240401' },
                        { name: '广昌', code: 'CN101240402' },
                        { name: '乐安', code: 'CN101240403' },
                        { name: '崇仁', code: 'CN101240404' },
                        { name: '金溪', code: 'CN101240405' },
                        { name: '资溪', code: 'CN101240406' },
                        { name: '宜黄', code: 'CN101240407' },
                        { name: '南城', code: 'CN101240408' },
                        { name: '南丰', code: 'CN101240409' },
                        { name: '黎川', code: 'CN101240410' },
                        { name: '东乡', code: 'CN101240411' },
                        { name: '临川', code: 'CN101240412' }
                    ]
                },
                {
                    name: '宜春',
                    areas: [
                        { name: '宜春', code: 'CN101240501' },
                        { name: '铜鼓', code: 'CN101240502' },
                        { name: '宜丰', code: 'CN101240503' },
                        { name: '万载', code: 'CN101240504' },
                        { name: '上高', code: 'CN101240505' },
                        { name: '靖安', code: 'CN101240506' },
                        { name: '奉新', code: 'CN101240507' },
                        { name: '高安', code: 'CN101240508' },
                        { name: '樟树', code: 'CN101240509' },
                        { name: '丰城', code: 'CN101240510' },
                        { name: '袁州', code: 'CN101240511' }
                    ]
                },
                {
                    name: '吉安',
                    areas: [
                        { name: '吉安', code: 'CN101240601' },
                        { name: '吉安县', code: 'CN101240602' },
                        { name: '吉水', code: 'CN101240603' },
                        { name: '新干', code: 'CN101240604' },
                        { name: '峡江', code: 'CN101240605' },
                        { name: '永丰', code: 'CN101240606' },
                        { name: '永新', code: 'CN101240607' },
                        { name: '井冈山', code: 'CN101240608' },
                        { name: '万安', code: 'CN101240609' },
                        { name: '遂川', code: 'CN101240610' },
                        { name: '泰和', code: 'CN101240611' },
                        { name: '安福', code: 'CN101240612' },
                        { name: '吉州', code: 'CN101240614' },
                        { name: '青原', code: 'CN101240615' }
                    ]
                },
                {
                    name: '赣州',
                    areas: [
                        { name: '赣州', code: 'CN101240701' },
                        { name: '崇义', code: 'CN101240702' },
                        { name: '上犹', code: 'CN101240703' },
                        { name: '南康', code: 'CN101240704' },
                        { name: '大余', code: 'CN101240705' },
                        { name: '信丰', code: 'CN101240706' },
                        { name: '宁都', code: 'CN101240707' },
                        { name: '石城', code: 'CN101240708' },
                        { name: '瑞金', code: 'CN101240709' },
                        { name: '于都', code: 'CN101240710' },
                        { name: '会昌', code: 'CN101240711' },
                        { name: '安远', code: 'CN101240712' },
                        { name: '全南', code: 'CN101240713' },
                        { name: '龙南', code: 'CN101240714' },
                        { name: '定南', code: 'CN101240715' },
                        { name: '寻乌', code: 'CN101240716' },
                        { name: '兴国', code: 'CN101240717' },
                        { name: '赣县', code: 'CN101240718' },
                        { name: '章贡', code: 'CN101240719' }
                    ]
                },
                {
                    name: '景德镇',
                    areas: [
                        { name: '景德镇', code: 'CN101240801' },
                        { name: '乐平', code: 'CN101240802' },
                        { name: '浮梁', code: 'CN101240803' },
                        { name: '昌江', code: 'CN101240804' },
                        { name: '珠山', code: 'CN101240805' }
                    ]
                },
                {
                    name: '萍乡',
                    areas: [
                        { name: '萍乡', code: 'CN101240901' },
                        { name: '莲花', code: 'CN101240902' },
                        { name: '上栗', code: 'CN101240903' },
                        { name: '安源', code: 'CN101240904' },
                        { name: '芦溪', code: 'CN101240905' },
                        { name: '湘东', code: 'CN101240906' }
                    ]
                },
                {
                    name: '新余',
                    areas: [
                        { name: '新余', code: 'CN101241001' },
                        { name: '分宜', code: 'CN101241002' },
                        { name: '渝水', code: 'CN101241003' }
                    ]
                },
                {
                    name: '鹰潭',
                    areas: [
                        { name: '鹰潭', code: 'CN101241101' },
                        { name: '余江', code: 'CN101241102' },
                        { name: '贵溪', code: 'CN101241103' },
                        { name: '月湖', code: 'CN101241104' }
                    ]
                }
            ]
        },
        {
            name: '湖南',
            cities: [
                {
                    name: '长沙',
                    areas: [
                        { name: '长沙', code: 'CN101250101' },
                        { name: '宁乡', code: 'CN101250102' },
                        { name: '浏阳', code: 'CN101250103' },
                        { name: '湘江新区', code: 'CN101250104' },
                        { name: '望城', code: 'CN101250105' },
                        { name: '长沙县', code: 'CN101250106' },
                        { name: '芙蓉', code: 'CN101250107' },
                        { name: '天心', code: 'CN101250108' },
                        { name: '岳麓', code: 'CN101250109' },
                        { name: '开福', code: 'CN101250110' },
                        { name: '雨花', code: 'CN101250111' }
                    ]
                },
                {
                    name: '湘潭',
                    areas: [
                        { name: '湘潭', code: 'CN101250201' },
                        { name: '韶山', code: 'CN101250202' },
                        { name: '湘乡', code: 'CN101250203' },
                        { name: '雨湖', code: 'CN101250204' },
                        { name: '岳塘', code: 'CN101250205' }
                    ]
                },
                {
                    name: '株洲',
                    areas: [
                        { name: '株洲', code: 'CN101250301' },
                        { name: '攸县', code: 'CN101250302' },
                        { name: '醴陵', code: 'CN101250303' },
                        { name: '荷塘', code: 'CN101250304' },
                        { name: '茶陵', code: 'CN101250305' },
                        { name: '炎陵', code: 'CN101250306' },
                        { name: '芦淞', code: 'CN101250307' },
                        { name: '石峰', code: 'CN101250308' },
                        { name: '天元', code: 'CN101250309' }
                    ]
                },
                {
                    name: '衡阳',
                    areas: [
                        { name: '衡阳', code: 'CN101250401' },
                        { name: '衡山', code: 'CN101250402' },
                        { name: '衡东', code: 'CN101250403' },
                        { name: '祁东', code: 'CN101250404' },
                        { name: '衡阳县', code: 'CN101250405' },
                        { name: '常宁', code: 'CN101250406' },
                        { name: '衡南', code: 'CN101250407' },
                        { name: '耒阳', code: 'CN101250408' },
                        { name: '南岳', code: 'CN101250409' },
                        { name: '珠晖', code: 'CN101250410' },
                        { name: '雁峰', code: 'CN101250411' },
                        { name: '石鼓', code: 'CN101250412' },
                        { name: '蒸湘', code: 'CN101250413' }
                    ]
                },
                {
                    name: '郴州',
                    areas: [
                        { name: '郴州', code: 'CN101250501' },
                        { name: '桂阳', code: 'CN101250502' },
                        { name: '嘉禾', code: 'CN101250503' },
                        { name: '宜章', code: 'CN101250504' },
                        { name: '临武', code: 'CN101250505' },
                        { name: '北湖', code: 'CN101250506' },
                        { name: '资兴', code: 'CN101250507' },
                        { name: '汝城', code: 'CN101250508' },
                        { name: '安仁', code: 'CN101250509' },
                        { name: '永兴', code: 'CN101250510' },
                        { name: '桂东', code: 'CN101250511' },
                        { name: '苏仙', code: 'CN101250512' }
                    ]
                },
                {
                    name: '常德',
                    areas: [
                        { name: '常德', code: 'CN101250601' },
                        { name: '安乡', code: 'CN101250602' },
                        { name: '桃源', code: 'CN101250603' },
                        { name: '汉寿', code: 'CN101250604' },
                        { name: '澧县', code: 'CN101250605' },
                        { name: '临澧', code: 'CN101250606' },
                        { name: '石门', code: 'CN101250607' },
                        { name: '津市', code: 'CN101250608' },
                        { name: '武陵', code: 'CN101250609' },
                        { name: '鼎城', code: 'CN101250610' }
                    ]
                },
                {
                    name: '益阳',
                    areas: [
                        { name: '益阳', code: 'CN101250700' },
                        { name: '赫山区', code: 'CN101250701' },
                        { name: '南县', code: 'CN101250702' },
                        { name: '桃江', code: 'CN101250703' },
                        { name: '安化', code: 'CN101250704' },
                        { name: '沅江', code: 'CN101250705' },
                        { name: '资阳', code: 'CN101250706' }
                    ]
                },
                {
                    name: '娄底',
                    areas: [
                        { name: '娄底', code: 'CN101250801' },
                        { name: '双峰', code: 'CN101250802' },
                        { name: '冷水江', code: 'CN101250803' },
                        { name: '娄星', code: 'CN101250804' },
                        { name: '新化', code: 'CN101250805' },
                        { name: '涟源', code: 'CN101250806' }
                    ]
                },
                {
                    name: '邵阳',
                    areas: [
                        { name: '邵阳', code: 'CN101250901' },
                        { name: '隆回', code: 'CN101250902' },
                        { name: '洞口', code: 'CN101250903' },
                        { name: '新邵', code: 'CN101250904' },
                        { name: '邵东', code: 'CN101250905' },
                        { name: '绥宁', code: 'CN101250906' },
                        { name: '新宁', code: 'CN101250907' },
                        { name: '武冈', code: 'CN101250908' },
                        { name: '城步', code: 'CN101250909' },
                        { name: '邵阳县', code: 'CN101250910' },
                        { name: '双清', code: 'CN101250911' },
                        { name: '大祥', code: 'CN101250912' },
                        { name: '北塔', code: 'CN101250913' }
                    ]
                },
                {
                    name: '岳阳',
                    areas: [
                        { name: '岳阳', code: 'CN101251001' },
                        { name: '华容', code: 'CN101251002' },
                        { name: '湘阴', code: 'CN101251003' },
                        { name: '汨罗', code: 'CN101251004' },
                        { name: '平江', code: 'CN101251005' },
                        { name: '临湘', code: 'CN101251006' },
                        { name: '岳阳楼区', code: 'CN101251007' },
                        { name: '云溪', code: 'CN101251008' },
                        { name: '君山', code: 'CN101251009' }
                    ]
                },
                {
                    name: '张家界',
                    areas: [
                        { name: '张家界', code: 'CN101251101' },
                        { name: '桑植', code: 'CN101251102' },
                        { name: '慈利', code: 'CN101251103' },
                        { name: '武陵源', code: 'CN101251104' },
                        { name: '永定', code: 'CN101251105' }
                    ]
                },
                {
                    name: '怀化',
                    areas: [
                        { name: '怀化', code: 'CN101251201' },
                        { name: '鹤城', code: 'CN101251202' },
                        { name: '沅陵', code: 'CN101251203' },
                        { name: '辰溪', code: 'CN101251204' },
                        { name: '靖州', code: 'CN101251205' },
                        { name: '会同', code: 'CN101251206' },
                        { name: '通道', code: 'CN101251207' },
                        { name: '麻阳', code: 'CN101251208' },
                        { name: '新晃', code: 'CN101251209' },
                        { name: '芷江', code: 'CN101251210' },
                        { name: '溆浦', code: 'CN101251211' },
                        { name: '中方', code: 'CN101251212' },
                        { name: '洪江', code: 'CN101251213' }
                    ]
                },
                {
                    name: '永州',
                    areas: [
                        { name: '永州', code: 'CN101251401' },
                        { name: '祁阳', code: 'CN101251402' },
                        { name: '东安', code: 'CN101251403' },
                        { name: '双牌', code: 'CN101251404' },
                        { name: '道县', code: 'CN101251405' },
                        { name: '宁远', code: 'CN101251406' },
                        { name: '江永', code: 'CN101251407' },
                        { name: '蓝山', code: 'CN101251408' },
                        { name: '新田', code: 'CN101251409' },
                        { name: '江华', code: 'CN101251410' },
                        { name: '冷水滩', code: 'CN101251411' },
                        { name: '零陵', code: 'CN101251412' }
                    ]
                },
                {
                    name: '湘西',
                    areas: [
                        { name: '吉首', code: 'CN101251501' },
                        { name: '保靖', code: 'CN101251502' },
                        { name: '永顺', code: 'CN101251503' },
                        { name: '古丈', code: 'CN101251504' },
                        { name: '凤凰', code: 'CN101251505' },
                        { name: '泸溪', code: 'CN101251506' },
                        { name: '龙山', code: 'CN101251507' },
                        { name: '花垣', code: 'CN101251508' },
                        { name: '湘西', code: 'CN101251509' }
                    ]
                }
            ]
        },
        {
            name: '贵州',
            cities: [
                {
                    name: '贵阳',
                    areas: [
                        { name: '贵阳', code: 'CN101260101' },
                        { name: '白云', code: 'CN101260102' },
                        { name: '花溪', code: 'CN101260103' },
                        { name: '乌当', code: 'CN101260104' },
                        { name: '息烽', code: 'CN101260105' },
                        { name: '开阳', code: 'CN101260106' },
                        { name: '修文', code: 'CN101260107' },
                        { name: '清镇', code: 'CN101260108' },
                        { name: '云岩', code: 'CN101260110' },
                        { name: '南明', code: 'CN101260111' },
                        { name: '观山湖', code: 'CN101260112' }
                    ]
                },
                {
                    name: '遵义',
                    areas: [
                        { name: '遵义', code: 'CN101260201' },
                        { name: '遵义县', code: 'CN101260202' },
                        { name: '仁怀', code: 'CN101260203' },
                        { name: '绥阳', code: 'CN101260204' },
                        { name: '湄潭', code: 'CN101260205' },
                        { name: '凤冈', code: 'CN101260206' },
                        { name: '桐梓', code: 'CN101260207' },
                        { name: '赤水', code: 'CN101260208' },
                        { name: '习水', code: 'CN101260209' },
                        { name: '道真', code: 'CN101260210' },
                        { name: '正安', code: 'CN101260211' },
                        { name: '务川', code: 'CN101260212' },
                        { name: '余庆', code: 'CN101260213' },
                        { name: '汇川', code: 'CN101260214' },
                        { name: '红花岗', code: 'CN101260215' },
                        { name: '播州', code: 'CN101260216' }
                    ]
                },
                {
                    name: '安顺',
                    areas: [
                        { name: '安顺', code: 'CN101260301' },
                        { name: '普定', code: 'CN101260302' },
                        { name: '镇宁', code: 'CN101260303' },
                        { name: '平坝', code: 'CN101260304' },
                        { name: '紫云', code: 'CN101260305' },
                        { name: '关岭', code: 'CN101260306' },
                        { name: '西秀', code: 'CN101260307' }
                    ]
                },
                {
                    name: '黔南',
                    areas: [
                        { name: '都匀', code: 'CN101260401' },
                        { name: '贵定', code: 'CN101260402' },
                        { name: '瓮安', code: 'CN101260403' },
                        { name: '长顺', code: 'CN101260404' },
                        { name: '福泉', code: 'CN101260405' },
                        { name: '惠水', code: 'CN101260406' },
                        { name: '龙里', code: 'CN101260407' },
                        { name: '罗甸', code: 'CN101260408' },
                        { name: '平塘', code: 'CN101260409' },
                        { name: '独山', code: 'CN101260410' },
                        { name: '三都', code: 'CN101260411' },
                        { name: '荔波', code: 'CN101260412' },
                        { name: '黔南', code: 'CN101260413' }
                    ]
                },
                {
                    name: '黔东南',
                    areas: [
                        { name: '凯里', code: 'CN101260501' },
                        { name: '岑巩', code: 'CN101260502' },
                        { name: '施秉', code: 'CN101260503' },
                        { name: '镇远', code: 'CN101260504' },
                        { name: '黄平', code: 'CN101260505' },
                        { name: '黔东南', code: 'CN101260506' },
                        { name: '麻江', code: 'CN101260507' },
                        { name: '丹寨', code: 'CN101260508' },
                        { name: '三穗', code: 'CN101260509' },
                        { name: '台江', code: 'CN101260510' },
                        { name: '剑河', code: 'CN101260511' },
                        { name: '雷山', code: 'CN101260512' },
                        { name: '黎平', code: 'CN101260513' },
                        { name: '天柱', code: 'CN101260514' },
                        { name: '锦屏', code: 'CN101260515' },
                        { name: '榕江', code: 'CN101260516' },
                        { name: '从江', code: 'CN101260517' }
                    ]
                },
                {
                    name: '铜仁',
                    areas: [
                        { name: '铜仁', code: 'CN101260601' },
                        { name: '江口', code: 'CN101260602' },
                        { name: '玉屏', code: 'CN101260603' },
                        { name: '万山', code: 'CN101260604' },
                        { name: '思南', code: 'CN101260605' },
                        { name: '碧江', code: 'CN101260606' },
                        { name: '印江', code: 'CN101260607' },
                        { name: '石阡', code: 'CN101260608' },
                        { name: '沿河', code: 'CN101260609' },
                        { name: '德江', code: 'CN101260610' },
                        { name: '松桃', code: 'CN101260611' }
                    ]
                },
                {
                    name: '毕节',
                    areas: [
                        { name: '毕节', code: 'CN101260701' },
                        { name: '赫章', code: 'CN101260702' },
                        { name: '金沙', code: 'CN101260703' },
                        { name: '威宁', code: 'CN101260704' },
                        { name: '大方', code: 'CN101260705' },
                        { name: '纳雍', code: 'CN101260706' },
                        { name: '织金', code: 'CN101260707' },
                        { name: '黔西', code: 'CN101260708' },
                        { name: '七星关', code: 'CN101260709' }
                    ]
                },
                {
                    name: '六盘水',
                    areas: [
                        { name: '水城', code: 'CN101260801' },
                        { name: '六枝', code: 'CN101260802' },
                        { name: '六盘水', code: 'CN101260803' },
                        { name: '盘县', code: 'CN101260804' },
                        { name: '钟山', code: 'CN101260805' }
                    ]
                },
                {
                    name: '黔西南',
                    areas: [
                        { name: '兴义', code: 'CN101260901' },
                        { name: '晴隆', code: 'CN101260902' },
                        { name: '兴仁', code: 'CN101260903' },
                        { name: '贞丰', code: 'CN101260904' },
                        { name: '望谟', code: 'CN101260905' },
                        { name: '黔西南', code: 'CN101260906' },
                        { name: '安龙', code: 'CN101260907' },
                        { name: '册亨', code: 'CN101260908' },
                        { name: '普安', code: 'CN101260909' }
                    ]
                }
            ]
        },
        {
            name: '四川',
            cities: [
                {
                    name: '成都',
                    areas: [
                        { name: '成都', code: 'CN101270101' },
                        { name: '龙泉驿', code: 'CN101270102' },
                        { name: '新都', code: 'CN101270103' },
                        { name: '温江', code: 'CN101270104' },
                        { name: '金堂', code: 'CN101270105' },
                        { name: '双流', code: 'CN101270106' },
                        { name: '郫县', code: 'CN101270107' },
                        { name: '大邑', code: 'CN101270108' },
                        { name: '蒲江', code: 'CN101270109' },
                        { name: '新津', code: 'CN101270110' },
                        { name: '都江堰', code: 'CN101270111' },
                        { name: '彭州', code: 'CN101270112' },
                        { name: '邛崃', code: 'CN101270113' },
                        { name: '崇州', code: 'CN101270114' },
                        { name: '青白江', code: 'CN101270115' },
                        { name: '锦江', code: 'CN101270116' },
                        { name: '青羊', code: 'CN101270117' },
                        { name: '金牛', code: 'CN101270118' },
                        { name: '武侯', code: 'CN101270119' },
                        { name: '成华', code: 'CN101270120' },
                        { name: '简阳', code: 'CN101270121' }
                    ]
                },
                {
                    name: '攀枝花',
                    areas: [
                        { name: '攀枝花', code: 'CN101270201' },
                        { name: '仁和', code: 'CN101270202' },
                        { name: '米易', code: 'CN101270203' },
                        { name: '盐边', code: 'CN101270204' },
                        { name: '东区', code: 'CN101270205' },
                        { name: '西区', code: 'CN101270206' }
                    ]
                },
                {
                    name: '自贡',
                    areas: [
                        { name: '自贡', code: 'CN101270301' },
                        { name: '富顺', code: 'CN101270302' },
                        { name: '荣县', code: 'CN101270303' },
                        { name: '自流井', code: 'CN101270304' },
                        { name: '贡井', code: 'CN101270305' },
                        { name: '大安', code: 'CN101270306' },
                        { name: '沿滩', code: 'CN101270307' }
                    ]
                },
                {
                    name: '绵阳',
                    areas: [
                        { name: '绵阳', code: 'CN101270401' },
                        { name: '三台', code: 'CN101270402' },
                        { name: '盐亭', code: 'CN101270403' },
                        { name: '安县', code: 'CN101270404' },
                        { name: '梓潼', code: 'CN101270405' },
                        { name: '北川', code: 'CN101270406' },
                        { name: '平武', code: 'CN101270407' },
                        { name: '江油', code: 'CN101270408' },
                        { name: '涪城', code: 'CN101270409' },
                        { name: '游仙', code: 'CN101270410' },
                        { name: '安州', code: 'CN101270411' }
                    ]
                },
                {
                    name: '南充',
                    areas: [
                        { name: '南充', code: 'CN101270501' },
                        { name: '南部', code: 'CN101270502' },
                        { name: '营山', code: 'CN101270503' },
                        { name: '蓬安', code: 'CN101270504' },
                        { name: '仪陇', code: 'CN101270505' },
                        { name: '西充', code: 'CN101270506' },
                        { name: '阆中', code: 'CN101270507' },
                        { name: '顺庆', code: 'CN101270508' },
                        { name: '高坪', code: 'CN101270509' },
                        { name: '嘉陵', code: 'CN101270510' }
                    ]
                },
                {
                    name: '达州',
                    areas: [
                        { name: '达州', code: 'CN101270601' },
                        { name: '宣汉', code: 'CN101270602' },
                        { name: '开江', code: 'CN101270603' },
                        { name: '大竹', code: 'CN101270604' },
                        { name: '渠县', code: 'CN101270605' },
                        { name: '万源', code: 'CN101270606' },
                        { name: '通川', code: 'CN101270607' },
                        { name: '达川', code: 'CN101270608' }
                    ]
                },
                {
                    name: '遂宁',
                    areas: [
                        { name: '遂宁', code: 'CN101270701' },
                        { name: '蓬溪', code: 'CN101270702' },
                        { name: '射洪', code: 'CN101270703' },
                        { name: '船山', code: 'CN101270704' },
                        { name: '安居', code: 'CN101270705' },
                        { name: '大英', code: 'CN101270706' }
                    ]
                },
                {
                    name: '广安',
                    areas: [
                        { name: '广安', code: 'CN101270801' },
                        { name: '岳池', code: 'CN101270802' },
                        { name: '武胜', code: 'CN101270803' },
                        { name: '邻水', code: 'CN101270804' },
                        { name: '华蓥', code: 'CN101270805' },
                        { name: '前锋', code: 'CN101270806' }
                    ]
                },
                {
                    name: '巴中',
                    areas: [
                        { name: '巴中', code: 'CN101270901' },
                        { name: '通江', code: 'CN101270902' },
                        { name: '南江', code: 'CN101270903' },
                        { name: '平昌', code: 'CN101270904' },
                        { name: '巴州', code: 'CN101270905' },
                        { name: '恩阳', code: 'CN101270906' }
                    ]
                },
                {
                    name: '泸州',
                    areas: [
                        { name: '泸州', code: 'CN101271001' },
                        { name: '江阳', code: 'CN101271002' },
                        { name: '泸县', code: 'CN101271003' },
                        { name: '合江', code: 'CN101271004' },
                        { name: '叙永', code: 'CN101271005' },
                        { name: '古蔺', code: 'CN101271006' },
                        { name: '纳溪', code: 'CN101271007' },
                        { name: '龙马潭', code: 'CN101271008' }
                    ]
                },
                {
                    name: '宜宾',
                    areas: [
                        { name: '宜宾', code: 'CN101271101' },
                        { name: '翠屏', code: 'CN101271102' },
                        { name: '宜宾县', code: 'CN101271103' },
                        { name: '南溪', code: 'CN101271104' },
                        { name: '江安', code: 'CN101271105' },
                        { name: '长宁', code: 'CN101271106' },
                        { name: '高县', code: 'CN101271107' },
                        { name: '珙县', code: 'CN101271108' },
                        { name: '筠连', code: 'CN101271109' },
                        { name: '兴文', code: 'CN101271110' },
                        { name: '屏山', code: 'CN101271111' }
                    ]
                },
                {
                    name: '内江',
                    areas: [
                        { name: '内江', code: 'CN101271201' },
                        { name: '东兴', code: 'CN101271202' },
                        { name: '威远', code: 'CN101271203' },
                        { name: '资中', code: 'CN101271204' },
                        { name: '隆昌', code: 'CN101271205' },
                        { name: '市中', code: 'CN101271206' }
                    ]
                },
                {
                    name: '资阳',
                    areas: [
                        { name: '资阳', code: 'CN101271301' },
                        { name: '安岳', code: 'CN101271302' },
                        { name: '乐至', code: 'CN101271303' },
                        { name: '雁江', code: 'CN101271305' }
                    ]
                },
                {
                    name: '乐山',
                    areas: [
                        { name: '乐山', code: 'CN101271401' },
                        { name: '犍为', code: 'CN101271402' },
                        { name: '井研', code: 'CN101271403' },
                        { name: '夹江', code: 'CN101271404' },
                        { name: '沐川', code: 'CN101271405' },
                        { name: '峨边', code: 'CN101271406' },
                        { name: '马边', code: 'CN101271407' },
                        { name: '峨眉山', code: 'CN101271409' },
                        { name: '市中', code: 'CN101271410' },
                        { name: '沙湾', code: 'CN101271411' },
                        { name: '五通桥', code: 'CN101271412' },
                        { name: '金口河', code: 'CN101271413' }
                    ]
                },
                {
                    name: '眉山',
                    areas: [
                        { name: '眉山', code: 'CN101271501' },
                        { name: '仁寿', code: 'CN101271502' },
                        { name: '彭山', code: 'CN101271503' },
                        { name: '洪雅', code: 'CN101271504' },
                        { name: '丹棱', code: 'CN101271505' },
                        { name: '青神', code: 'CN101271506' },
                        { name: '东坡', code: 'CN101271507' }
                    ]
                },
                {
                    name: '凉山',
                    areas: [
                        { name: '凉山', code: 'CN101271601' },
                        { name: '木里', code: 'CN101271603' },
                        { name: '盐源', code: 'CN101271604' },
                        { name: '德昌', code: 'CN101271605' },
                        { name: '会理', code: 'CN101271606' },
                        { name: '会东', code: 'CN101271607' },
                        { name: '宁南', code: 'CN101271608' },
                        { name: '普格', code: 'CN101271609' },
                        { name: '西昌', code: 'CN101271610' },
                        { name: '金阳', code: 'CN101271611' },
                        { name: '昭觉', code: 'CN101271612' },
                        { name: '喜德', code: 'CN101271613' },
                        { name: '冕宁', code: 'CN101271614' },
                        { name: '越西', code: 'CN101271615' },
                        { name: '甘洛', code: 'CN101271616' },
                        { name: '雷波', code: 'CN101271617' },
                        { name: '美姑', code: 'CN101271618' },
                        { name: '布拖', code: 'CN101271619' }
                    ]
                },
                {
                    name: '雅安',
                    areas: [
                        { name: '雅安', code: 'CN101271701' },
                        { name: '名山', code: 'CN101271702' },
                        { name: '荥经', code: 'CN101271703' },
                        { name: '汉源', code: 'CN101271704' },
                        { name: '石棉', code: 'CN101271705' },
                        { name: '天全', code: 'CN101271706' },
                        { name: '芦山', code: 'CN101271707' },
                        { name: '宝兴', code: 'CN101271708' },
                        { name: '雨城', code: 'CN101271709' }
                    ]
                },
                {
                    name: '甘孜',
                    areas: [
                        { name: '甘孜', code: 'CN101271801' },
                        { name: '康定', code: 'CN101271802' },
                        { name: '泸定', code: 'CN101271803' },
                        { name: '丹巴', code: 'CN101271804' },
                        { name: '九龙', code: 'CN101271805' },
                        { name: '雅江', code: 'CN101271806' },
                        { name: '道孚', code: 'CN101271807' },
                        { name: '炉霍', code: 'CN101271808' },
                        { name: '新龙', code: 'CN101271809' },
                        { name: '德格', code: 'CN101271810' },
                        { name: '白玉', code: 'CN101271811' },
                        { name: '石渠', code: 'CN101271812' },
                        { name: '色达', code: 'CN101271813' },
                        { name: '理塘', code: 'CN101271814' },
                        { name: '巴塘', code: 'CN101271815' },
                        { name: '乡城', code: 'CN101271816' },
                        { name: '稻城', code: 'CN101271817' },
                        { name: '得荣', code: 'CN101271818' }
                    ]
                },
                {
                    name: '阿坝',
                    areas: [
                        { name: '阿坝', code: 'CN101271901' },
                        { name: '汶川', code: 'CN101271902' },
                        { name: '理县', code: 'CN101271903' },
                        { name: '茂县', code: 'CN101271904' },
                        { name: '松潘', code: 'CN101271905' },
                        { name: '九寨沟', code: 'CN101271906' },
                        { name: '金川', code: 'CN101271907' },
                        { name: '小金', code: 'CN101271908' },
                        { name: '黑水', code: 'CN101271909' },
                        { name: '马尔康', code: 'CN101271910' },
                        { name: '壤塘', code: 'CN101271911' },
                        { name: '若尔盖', code: 'CN101271912' },
                        { name: '红原', code: 'CN101271913' }
                    ]
                },
                {
                    name: '德阳',
                    areas: [
                        { name: '德阳', code: 'CN101272001' },
                        { name: '中江', code: 'CN101272002' },
                        { name: '广汉', code: 'CN101272003' },
                        { name: '什邡', code: 'CN101272004' },
                        { name: '绵竹', code: 'CN101272005' },
                        { name: '罗江', code: 'CN101272006' },
                        { name: '旌阳', code: 'CN101272007' }
                    ]
                },
                {
                    name: '广元',
                    areas: [
                        { name: '广元', code: 'CN101272101' },
                        { name: '旺苍', code: 'CN101272102' },
                        { name: '青川', code: 'CN101272103' },
                        { name: '剑阁', code: 'CN101272104' },
                        { name: '苍溪', code: 'CN101272105' },
                        { name: '利州', code: 'CN101272106' },
                        { name: '昭化', code: 'CN101272107' },
                        { name: '朝天', code: 'CN101272108' }
                    ]
                }
            ]
        },
        {
            name: '广东',
            cities: [
                {
                    name: '广州',
                    areas: [
                        { name: '广州', code: 'CN101280101' },
                        { name: '番禺', code: 'CN101280102' },
                        { name: '从化', code: 'CN101280103' },
                        { name: '增城', code: 'CN101280104' },
                        { name: '花都', code: 'CN101280105' },
                        { name: '荔湾', code: 'CN101280106' },
                        { name: '越秀', code: 'CN101280107' },
                        { name: '海珠', code: 'CN101280108' },
                        { name: '天河', code: 'CN101280109' },
                        { name: '白云', code: 'CN101280110' },
                        { name: '黄埔', code: 'CN101280111' },
                        { name: '南沙', code: 'CN101280112' }
                    ]
                },
                {
                    name: '韶关',
                    areas: [
                        { name: '韶关', code: 'CN101280201' },
                        { name: '乳源', code: 'CN101280202' },
                        { name: '始兴', code: 'CN101280203' },
                        { name: '翁源', code: 'CN101280204' },
                        { name: '乐昌', code: 'CN101280205' },
                        { name: '仁化', code: 'CN101280206' },
                        { name: '南雄', code: 'CN101280207' },
                        { name: '新丰', code: 'CN101280208' },
                        { name: '曲江', code: 'CN101280209' },
                        { name: '浈江', code: 'CN101280210' },
                        { name: '武江', code: 'CN101280211' }
                    ]
                },
                {
                    name: '惠州',
                    areas: [
                        { name: '惠州', code: 'CN101280301' },
                        { name: '博罗', code: 'CN101280302' },
                        { name: '惠阳', code: 'CN101280303' },
                        { name: '惠东', code: 'CN101280304' },
                        { name: '龙门', code: 'CN101280305' },
                        { name: '惠城', code: 'CN101280306' }
                    ]
                },
                {
                    name: '梅州',
                    areas: [
                        { name: '梅州', code: 'CN101280401' },
                        { name: '兴宁', code: 'CN101280402' },
                        { name: '蕉岭', code: 'CN101280403' },
                        { name: '大埔', code: 'CN101280404' },
                        { name: '梅江', code: 'CN101280405' },
                        { name: '丰顺', code: 'CN101280406' },
                        { name: '平远', code: 'CN101280407' },
                        { name: '五华', code: 'CN101280408' },
                        { name: '梅县', code: 'CN101280409' }
                    ]
                },
                {
                    name: '汕头',
                    areas: [
                        { name: '汕头', code: 'CN101280501' },
                        { name: '潮阳', code: 'CN101280502' },
                        { name: '澄海', code: 'CN101280503' },
                        { name: '南澳', code: 'CN101280504' },
                        { name: '龙湖', code: 'CN101280505' },
                        { name: '金平', code: 'CN101280506' },
                        { name: '濠江', code: 'CN101280507' },
                        { name: '潮南', code: 'CN101280508' }
                    ]
                },
                {
                    name: '深圳',
                    areas: [
                        { name: '深圳', code: 'CN101280601' },
                        { name: '罗湖', code: 'CN101280602' },
                        { name: '福田', code: 'CN101280603' },
                        { name: '南山', code: 'CN101280604' },
                        { name: '宝安', code: 'CN101280605' },
                        { name: '龙岗', code: 'CN101280606' },
                        { name: '盐田', code: 'CN101280607' }
                    ]
                },
                {
                    name: '珠海',
                    areas: [
                        { name: '珠海', code: 'CN101280701' },
                        { name: '斗门', code: 'CN101280702' },
                        { name: '金湾', code: 'CN101280703' },
                        { name: '香洲', code: 'CN101280704' }
                    ]
                },
                {
                    name: '佛山',
                    areas: [
                        { name: '佛山', code: 'CN101280800' },
                        { name: '顺德', code: 'CN101280801' },
                        { name: '三水', code: 'CN101280802' },
                        { name: '南海', code: 'CN101280803' },
                        { name: '高明', code: 'CN101280804' },
                        { name: '禅城', code: 'CN101280805' }
                    ]
                },
                {
                    name: '肇庆',
                    areas: [
                        { name: '肇庆', code: 'CN101280901' },
                        { name: '广宁', code: 'CN101280902' },
                        { name: '四会', code: 'CN101280903' },
                        { name: '端州', code: 'CN101280904' },
                        { name: '德庆', code: 'CN101280905' },
                        { name: '怀集', code: 'CN101280906' },
                        { name: '封开', code: 'CN101280907' },
                        { name: '高要', code: 'CN101280908' },
                        { name: '鼎湖', code: 'CN101280909' }
                    ]
                },
                {
                    name: '湛江',
                    areas: [
                        { name: '湛江', code: 'CN101281001' },
                        { name: '吴川', code: 'CN101281002' },
                        { name: '雷州', code: 'CN101281003' },
                        { name: '徐闻', code: 'CN101281004' },
                        { name: '廉江', code: 'CN101281005' },
                        { name: '赤坎', code: 'CN101281006' },
                        { name: '遂溪', code: 'CN101281007' },
                        { name: '坡头', code: 'CN101281008' },
                        { name: '霞山', code: 'CN101281009' },
                        { name: '麻章', code: 'CN101281010' }
                    ]
                },
                {
                    name: '江门',
                    areas: [
                        { name: '江门', code: 'CN101281101' },
                        { name: '开平', code: 'CN101281103' },
                        { name: '新会', code: 'CN101281104' },
                        { name: '恩平', code: 'CN101281105' },
                        { name: '台山', code: 'CN101281106' },
                        { name: '蓬江', code: 'CN101281107' },
                        { name: '鹤山', code: 'CN101281108' },
                        { name: '江海', code: 'CN101281109' }
                    ]
                },
                {
                    name: '河源',
                    areas: [
                        { name: '河源', code: 'CN101281201' },
                        { name: '紫金', code: 'CN101281202' },
                        { name: '连平', code: 'CN101281203' },
                        { name: '和平', code: 'CN101281204' },
                        { name: '龙川', code: 'CN101281205' },
                        { name: '东源', code: 'CN101281206' },
                        { name: '源城', code: 'CN101281207' }
                    ]
                },
                {
                    name: '清远',
                    areas: [
                        { name: '清远', code: 'CN101281301' },
                        { name: '连南', code: 'CN101281302' },
                        { name: '连州', code: 'CN101281303' },
                        { name: '连山', code: 'CN101281304' },
                        { name: '阳山', code: 'CN101281305' },
                        { name: '佛冈', code: 'CN101281306' },
                        { name: '英德', code: 'CN101281307' },
                        { name: '清新', code: 'CN101281308' },
                        { name: '清城', code: 'CN101281309' }
                    ]
                },
                {
                    name: '云浮',
                    areas: [
                        { name: '云浮', code: 'CN101281401' },
                        { name: '罗定', code: 'CN101281402' },
                        { name: '新兴', code: 'CN101281403' },
                        { name: '郁南', code: 'CN101281404' },
                        { name: '云城', code: 'CN101281405' },
                        { name: '云安', code: 'CN101281406' }
                    ]
                },
                {
                    name: '潮州',
                    areas: [
                        { name: '潮州', code: 'CN101281501' },
                        { name: '饶平', code: 'CN101281502' },
                        { name: '潮安', code: 'CN101281503' },
                        { name: '湘桥', code: 'CN101281504' }
                    ]
                },
                {
                    name: '东莞',
                    areas: [{ name: '东莞', code: 'CN101281601' }]
                },
                {
                    name: '中山',
                    areas: [{ name: '中山', code: 'CN101281701' }]
                },
                {
                    name: '阳江',
                    areas: [
                        { name: '阳江', code: 'CN101281801' },
                        { name: '阳春', code: 'CN101281802' },
                        { name: '阳东', code: 'CN101281803' },
                        { name: '阳西', code: 'CN101281804' },
                        { name: '江城', code: 'CN101281805' }
                    ]
                },
                {
                    name: '揭阳',
                    areas: [
                        { name: '揭阳', code: 'CN101281901' },
                        { name: '揭西', code: 'CN101281902' },
                        { name: '普宁', code: 'CN101281903' },
                        { name: '惠来', code: 'CN101281904' },
                        { name: '揭东', code: 'CN101281905' },
                        { name: '榕城', code: 'CN101281906' }
                    ]
                },
                {
                    name: '茂名',
                    areas: [
                        { name: '茂名', code: 'CN101282001' },
                        { name: '高州', code: 'CN101282002' },
                        { name: '化州', code: 'CN101282003' },
                        { name: '电白', code: 'CN101282004' },
                        { name: '信宜', code: 'CN101282005' },
                        { name: '茂南', code: 'CN101282007' }
                    ]
                },
                {
                    name: '汕尾',
                    areas: [
                        { name: '汕尾', code: 'CN101282101' },
                        { name: '海丰', code: 'CN101282102' },
                        { name: '陆丰', code: 'CN101282103' },
                        { name: '陆河', code: 'CN101282104' }
                    ]
                }
            ]
        },
        {
            name: '云南',
            cities: [
                {
                    name: '昆明',
                    areas: [
                        { name: '昆明', code: 'CN101290101' },
                        { name: '五华', code: 'CN101290102' },
                        { name: '东川', code: 'CN101290103' },
                        { name: '寻甸', code: 'CN101290104' },
                        { name: '晋宁', code: 'CN101290105' },
                        { name: '宜良', code: 'CN101290106' },
                        { name: '石林', code: 'CN101290107' },
                        { name: '呈贡', code: 'CN101290108' },
                        { name: '富民', code: 'CN101290109' },
                        { name: '嵩明', code: 'CN101290110' },
                        { name: '禄劝', code: 'CN101290111' },
                        { name: '安宁', code: 'CN101290112' },
                        { name: '盘龙', code: 'CN101290114' },
                        { name: '官渡', code: 'CN101290115' },
                        { name: '西山', code: 'CN101290116' }
                    ]
                },
                {
                    name: '大理',
                    areas: [
                        { name: '大理', code: 'CN101290201' },
                        { name: '云龙', code: 'CN101290202' },
                        { name: '漾濞', code: 'CN101290203' },
                        { name: '永平', code: 'CN101290204' },
                        { name: '宾川', code: 'CN101290205' },
                        { name: '弥渡', code: 'CN101290206' },
                        { name: '祥云', code: 'CN101290207' },
                        { name: '巍山', code: 'CN101290208' },
                        { name: '剑川', code: 'CN101290209' },
                        { name: '洱源', code: 'CN101290210' },
                        { name: '鹤庆', code: 'CN101290211' },
                        { name: '南涧', code: 'CN101290212' }
                    ]
                },
                {
                    name: '红河',
                    areas: [
                        { name: '红河', code: 'CN101290301' },
                        { name: '石屏', code: 'CN101290302' },
                        { name: '建水', code: 'CN101290303' },
                        { name: '弥勒', code: 'CN101290304' },
                        { name: '元阳', code: 'CN101290305' },
                        { name: '绿春', code: 'CN101290306' },
                        { name: '开远', code: 'CN101290307' },
                        { name: '个旧', code: 'CN101290308' },
                        { name: '蒙自', code: 'CN101290309' },
                        { name: '屏边', code: 'CN101290310' },
                        { name: '泸西', code: 'CN101290311' },
                        { name: '金平', code: 'CN101290312' },
                        { name: '河口', code: 'CN101290313' }
                    ]
                },
                {
                    name: '曲靖',
                    areas: [
                        { name: '曲靖', code: 'CN101290401' },
                        { name: '沾益', code: 'CN101290402' },
                        { name: '陆良', code: 'CN101290403' },
                        { name: '富源', code: 'CN101290404' },
                        { name: '马龙', code: 'CN101290405' },
                        { name: '师宗', code: 'CN101290406' },
                        { name: '罗平', code: 'CN101290407' },
                        { name: '会泽', code: 'CN101290408' },
                        { name: '宣威', code: 'CN101290409' },
                        { name: '麒麟', code: 'CN101290410' }
                    ]
                },
                {
                    name: '保山',
                    areas: [
                        { name: '保山', code: 'CN101290501' },
                        { name: '隆阳', code: 'CN101290502' },
                        { name: '龙陵', code: 'CN101290503' },
                        { name: '施甸', code: 'CN101290504' },
                        { name: '昌宁', code: 'CN101290505' },
                        { name: '腾冲', code: 'CN101290506' }
                    ]
                },
                {
                    name: '文山',
                    areas: [
                        { name: '文山', code: 'CN101290601' },
                        { name: '西畴', code: 'CN101290602' },
                        { name: '马关', code: 'CN101290603' },
                        { name: '麻栗坡', code: 'CN101290604' },
                        { name: '砚山', code: 'CN101290605' },
                        { name: '丘北', code: 'CN101290606' },
                        { name: '广南', code: 'CN101290607' },
                        { name: '富宁', code: 'CN101290608' }
                    ]
                },
                {
                    name: '玉溪',
                    areas: [
                        { name: '玉溪', code: 'CN101290701' },
                        { name: '澄江', code: 'CN101290702' },
                        { name: '江川', code: 'CN101290703' },
                        { name: '通海', code: 'CN101290704' },
                        { name: '华宁', code: 'CN101290705' },
                        { name: '新平', code: 'CN101290706' },
                        { name: '易门', code: 'CN101290707' },
                        { name: '峨山', code: 'CN101290708' },
                        { name: '元江', code: 'CN101290709' },
                        { name: '红塔', code: 'CN101290710' }
                    ]
                },
                {
                    name: '楚雄',
                    areas: [
                        { name: '楚雄', code: 'CN101290801' },
                        { name: '大姚', code: 'CN101290802' },
                        { name: '元谋', code: 'CN101290803' },
                        { name: '姚安', code: 'CN101290804' },
                        { name: '牟定', code: 'CN101290805' },
                        { name: '南华', code: 'CN101290806' },
                        { name: '武定', code: 'CN101290807' },
                        { name: '禄丰', code: 'CN101290808' },
                        { name: '双柏', code: 'CN101290809' },
                        { name: '永仁', code: 'CN101290810' }
                    ]
                },
                {
                    name: '普洱',
                    areas: [
                        { name: '普洱', code: 'CN101290901' },
                        { name: '景谷', code: 'CN101290902' },
                        { name: '景东', code: 'CN101290903' },
                        { name: '澜沧', code: 'CN101290904' },
                        { name: '思茅', code: 'CN101290905' },
                        { name: '墨江', code: 'CN101290906' },
                        { name: '江城', code: 'CN101290907' },
                        { name: '孟连', code: 'CN101290908' },
                        { name: '西盟', code: 'CN101290909' },
                        { name: '镇沅', code: 'CN101290911' },
                        { name: '宁洱', code: 'CN101290912' }
                    ]
                },
                {
                    name: '昭通',
                    areas: [
                        { name: '昭通', code: 'CN101291001' },
                        { name: '鲁甸', code: 'CN101291002' },
                        { name: '彝良', code: 'CN101291003' },
                        { name: '镇雄', code: 'CN101291004' },
                        { name: '威信', code: 'CN101291005' },
                        { name: '巧家', code: 'CN101291006' },
                        { name: '绥江', code: 'CN101291007' },
                        { name: '永善', code: 'CN101291008' },
                        { name: '盐津', code: 'CN101291009' },
                        { name: '大关', code: 'CN101291010' },
                        { name: '水富', code: 'CN101291011' },
                        { name: '昭阳', code: 'CN101291012' }
                    ]
                },
                {
                    name: '临沧',
                    areas: [
                        { name: '临沧', code: 'CN101291101' },
                        { name: '沧源', code: 'CN101291102' },
                        { name: '耿马', code: 'CN101291103' },
                        { name: '双江', code: 'CN101291104' },
                        { name: '凤庆', code: 'CN101291105' },
                        { name: '永德', code: 'CN101291106' },
                        { name: '云县', code: 'CN101291107' },
                        { name: '镇康', code: 'CN101291108' },
                        { name: '临翔', code: 'CN101291109' }
                    ]
                },
                {
                    name: '怒江',
                    areas: [
                        { name: '怒江', code: 'CN101291201' },
                        { name: '福贡', code: 'CN101291203' },
                        { name: '兰坪', code: 'CN101291204' },
                        { name: '泸水', code: 'CN101291205' },
                        { name: '贡山', code: 'CN101291207' }
                    ]
                },
                {
                    name: '迪庆',
                    areas: [
                        { name: '香格里拉', code: 'CN101291301' },
                        { name: '德钦', code: 'CN101291302' },
                        { name: '维西', code: 'CN101291303' },
                        { name: '迪庆', code: 'CN101291305' }
                    ]
                },
                {
                    name: '丽江',
                    areas: [
                        { name: '丽江', code: 'CN101291401' },
                        { name: '永胜', code: 'CN101291402' },
                        { name: '华坪', code: 'CN101291403' },
                        { name: '宁蒗', code: 'CN101291404' },
                        { name: '古城', code: 'CN101291405' },
                        { name: '玉龙', code: 'CN101291406' }
                    ]
                },
                {
                    name: '德宏',
                    areas: [
                        { name: '德宏', code: 'CN101291501' },
                        { name: '陇川', code: 'CN101291503' },
                        { name: '盈江', code: 'CN101291504' },
                        { name: '瑞丽', code: 'CN101291506' },
                        { name: '梁河', code: 'CN101291507' },
                        { name: '芒市', code: 'CN101291508' }
                    ]
                },
                {
                    name: '西双版纳',
                    areas: [
                        { name: '景洪', code: 'CN101291601' },
                        { name: '西双版纳', code: 'CN101291602' },
                        { name: '勐海', code: 'CN101291603' },
                        { name: '勐腊', code: 'CN101291605' }
                    ]
                }
            ]
        },
        {
            name: '广西',
            cities: [
                {
                    name: '南宁',
                    areas: [
                        { name: '南宁', code: 'CN101300101' },
                        { name: '兴宁', code: 'CN101300102' },
                        { name: '邕宁', code: 'CN101300103' },
                        { name: '横县', code: 'CN101300104' },
                        { name: '隆安', code: 'CN101300105' },
                        { name: '马山', code: 'CN101300106' },
                        { name: '上林', code: 'CN101300107' },
                        { name: '武鸣', code: 'CN101300108' },
                        { name: '宾阳', code: 'CN101300109' },
                        { name: '青秀', code: 'CN101300110' },
                        { name: '江南', code: 'CN101300111' },
                        { name: '西乡塘', code: 'CN101300112' },
                        { name: '良庆', code: 'CN101300113' }
                    ]
                },
                {
                    name: '崇左',
                    areas: [
                        { name: '崇左', code: 'CN101300201' },
                        { name: '天等', code: 'CN101300202' },
                        { name: '龙州', code: 'CN101300203' },
                        { name: '凭祥', code: 'CN101300204' },
                        { name: '大新', code: 'CN101300205' },
                        { name: '扶绥', code: 'CN101300206' },
                        { name: '宁明', code: 'CN101300207' },
                        { name: '江州', code: 'CN101300208' }
                    ]
                },
                {
                    name: '柳州',
                    areas: [
                        { name: '柳州', code: 'CN101300301' },
                        { name: '柳城', code: 'CN101300302' },
                        { name: '城中', code: 'CN101300303' },
                        { name: '鹿寨', code: 'CN101300304' },
                        { name: '柳江', code: 'CN101300305' },
                        { name: '融安', code: 'CN101300306' },
                        { name: '融水', code: 'CN101300307' },
                        { name: '三江', code: 'CN101300308' },
                        { name: '鱼峰', code: 'CN101300309' },
                        { name: '柳南', code: 'CN101300310' },
                        { name: '柳北', code: 'CN101300311' }
                    ]
                },
                {
                    name: '来宾',
                    areas: [
                        { name: '来宾', code: 'CN101300401' },
                        { name: '忻城', code: 'CN101300402' },
                        { name: '金秀', code: 'CN101300403' },
                        { name: '象州', code: 'CN101300404' },
                        { name: '武宣', code: 'CN101300405' },
                        { name: '合山', code: 'CN101300406' },
                        { name: '兴宾', code: 'CN101300407' }
                    ]
                },
                {
                    name: '桂林',
                    areas: [
                        { name: '桂林', code: 'CN101300501' },
                        { name: '秀峰', code: 'CN101300502' },
                        { name: '龙胜', code: 'CN101300503' },
                        { name: '永福', code: 'CN101300504' },
                        { name: '临桂', code: 'CN101300505' },
                        { name: '兴安', code: 'CN101300506' },
                        { name: '灵川', code: 'CN101300507' },
                        { name: '全州', code: 'CN101300508' },
                        { name: '灌阳', code: 'CN101300509' },
                        { name: '阳朔', code: 'CN101300510' },
                        { name: '恭城', code: 'CN101300511' },
                        { name: '平乐', code: 'CN101300512' },
                        { name: '荔浦', code: 'CN101300513' },
                        { name: '资源', code: 'CN101300514' },
                        { name: '叠彩', code: 'CN101300515' },
                        { name: '象山', code: 'CN101300516' },
                        { name: '七星', code: 'CN101300517' },
                        { name: '雁山', code: 'CN101300518' }
                    ]
                },
                {
                    name: '梧州',
                    areas: [
                        { name: '梧州', code: 'CN101300601' },
                        { name: '藤县', code: 'CN101300602' },
                        { name: '万秀', code: 'CN101300603' },
                        { name: '苍梧', code: 'CN101300604' },
                        { name: '蒙山', code: 'CN101300605' },
                        { name: '岑溪', code: 'CN101300606' },
                        { name: '长洲', code: 'CN101300607' },
                        { name: '龙圩', code: 'CN101300608' }
                    ]
                },
                {
                    name: '贺州',
                    areas: [
                        { name: '贺州', code: 'CN101300701' },
                        { name: '昭平', code: 'CN101300702' },
                        { name: '富川', code: 'CN101300703' },
                        { name: '钟山', code: 'CN101300704' },
                        { name: '八步', code: 'CN101300705' },
                        { name: '平桂', code: 'CN101300706' }
                    ]
                },
                {
                    name: '贵港',
                    areas: [
                        { name: '贵港', code: 'CN101300801' },
                        { name: '桂平', code: 'CN101300802' },
                        { name: '平南', code: 'CN101300803' },
                        { name: '港北', code: 'CN101300804' },
                        { name: '港南', code: 'CN101300805' },
                        { name: '覃塘', code: 'CN101300806' }
                    ]
                },
                {
                    name: '玉林',
                    areas: [
                        { name: '玉林', code: 'CN101300901' },
                        { name: '博白', code: 'CN101300902' },
                        { name: '北流', code: 'CN101300903' },
                        { name: '容县', code: 'CN101300904' },
                        { name: '陆川', code: 'CN101300905' },
                        { name: '兴业', code: 'CN101300906' },
                        { name: '玉州', code: 'CN101300907' },
                        { name: '福绵', code: 'CN101300908' }
                    ]
                },
                {
                    name: '百色',
                    areas: [
                        { name: '百色', code: 'CN101301001' },
                        { name: '那坡', code: 'CN101301002' },
                        { name: '田阳', code: 'CN101301003' },
                        { name: '德保', code: 'CN101301004' },
                        { name: '靖西', code: 'CN101301005' },
                        { name: '田东', code: 'CN101301006' },
                        { name: '平果', code: 'CN101301007' },
                        { name: '隆林', code: 'CN101301008' },
                        { name: '西林', code: 'CN101301009' },
                        { name: '乐业', code: 'CN101301010' },
                        { name: '凌云', code: 'CN101301011' },
                        { name: '田林', code: 'CN101301012' },
                        { name: '右江', code: 'CN101301013' }
                    ]
                },
                {
                    name: '钦州',
                    areas: [
                        { name: '钦州', code: 'CN101301101' },
                        { name: '浦北', code: 'CN101301102' },
                        { name: '灵山', code: 'CN101301103' },
                        { name: '钦南', code: 'CN101301104' },
                        { name: '钦北', code: 'CN101301105' }
                    ]
                },
                {
                    name: '河池',
                    areas: [
                        { name: '河池', code: 'CN101301201' },
                        { name: '天峨', code: 'CN101301202' },
                        { name: '东兰', code: 'CN101301203' },
                        { name: '巴马', code: 'CN101301204' },
                        { name: '环江', code: 'CN101301205' },
                        { name: '罗城', code: 'CN101301206' },
                        { name: '宜州', code: 'CN101301207' },
                        { name: '凤山', code: 'CN101301208' },
                        { name: '南丹', code: 'CN101301209' },
                        { name: '都安', code: 'CN101301210' },
                        { name: '大化', code: 'CN101301211' },
                        { name: '金城江', code: 'CN101301212' }
                    ]
                },
                {
                    name: '北海',
                    areas: [
                        { name: '北海', code: 'CN101301301' },
                        { name: '合浦', code: 'CN101301302' },
                        { name: '海城', code: 'CN101301304' },
                        { name: '银海', code: 'CN101301305' },
                        { name: '铁山港', code: 'CN101301306' }
                    ]
                },
                {
                    name: '防城港',
                    areas: [
                        { name: '防城港', code: 'CN101301401' },
                        { name: '上思', code: 'CN101301402' },
                        { name: '东兴', code: 'CN101301403' },
                        { name: '港口', code: 'CN101301404' },
                        { name: '防城', code: 'CN101301405' }
                    ]
                }
            ]
        },
        {
            name: '海南',
            cities: [
                {
                    name: '海口',
                    areas: [
                        { name: '海口', code: 'CN101310101' },
                        { name: '秀英', code: 'CN101310102' },
                        { name: '龙华', code: 'CN101310103' },
                        { name: '琼山', code: 'CN101310104' },
                        { name: '美兰', code: 'CN101310105' }
                    ]
                },
                {
                    name: '三亚',
                    areas: [
                        { name: '三亚', code: 'CN101310201' },
                        { name: '海棠', code: 'CN101310213' },
                        { name: '吉阳', code: 'CN101310218' },
                        { name: '天涯', code: 'CN101310219' },
                        { name: '崖州', code: 'CN101310223' }
                    ]
                },
                {
                    name: '东方',
                    areas: [{ name: '东方', code: 'CN101310202' }]
                },
                {
                    name: '临高',
                    areas: [{ name: '临高', code: 'CN101310203' }]
                },
                {
                    name: '澄迈',
                    areas: [{ name: '澄迈', code: 'CN101310204' }]
                },
                {
                    name: '儋州',
                    areas: [{ name: '儋州', code: 'CN101310205' }]
                },
                {
                    name: '昌江',
                    areas: [{ name: '昌江', code: 'CN101310206' }]
                },
                {
                    name: '白沙',
                    areas: [{ name: '白沙', code: 'CN101310207' }]
                },
                {
                    name: '琼中',
                    areas: [{ name: '琼中', code: 'CN101310208' }]
                },
                {
                    name: '定安',
                    areas: [{ name: '定安', code: 'CN101310209' }]
                },
                {
                    name: '屯昌',
                    areas: [{ name: '屯昌', code: 'CN101310210' }]
                },
                {
                    name: '琼海',
                    areas: [{ name: '琼海', code: 'CN101310211' }]
                },
                {
                    name: '文昌',
                    areas: [{ name: '文昌', code: 'CN101310212' }]
                },
                {
                    name: '保亭',
                    areas: [{ name: '保亭', code: 'CN101310214' }]
                },
                {
                    name: '万宁',
                    areas: [{ name: '万宁', code: 'CN101310215' }]
                },
                {
                    name: '陵水',
                    areas: [{ name: '陵水', code: 'CN101310216' }]
                },
                {
                    name: '乐东',
                    areas: [{ name: '乐东', code: 'CN101310221' }]
                },
                {
                    name: '五指山',
                    areas: [{ name: '五指山', code: 'CN101310222' }]
                },
                {
                    name: '三沙',
                    areas: [
                        { name: '三沙', code: 'CN101310301' },
                        { name: '西沙', code: 'CN101310302' },
                        { name: '中沙', code: 'CN101310303' },
                        { name: '南沙', code: 'CN101310304' }
                    ]
                }
            ]
        },
        {
            name: '香港',
            cities: [
                {
                    name: '香港',
                    areas: [
                        { name: '香港', code: 'CN101320101' },
                        { name: '九龙', code: 'CN101320102' },
                        { name: '新界', code: 'CN101320103' }
                    ]
                }
            ]
        },
        {
            name: '澳门',
            cities: [
                {
                    name: '澳门',
                    areas: [
                        { name: '澳门', code: 'CN101330101' },
                        { name: '氹仔岛', code: 'CN101330102' },
                        { name: '路环岛', code: 'CN101330103' }
                    ]
                }
            ]
        },
        {
            name: '台湾',
            cities: [
                {
                    name: '台北',
                    areas: [
                        { name: '台北', code: 'CN101340101' },
                        { name: '桃园', code: 'CN101340102' },
                        { name: '新竹', code: 'CN101340103' },
                        { name: '宜兰', code: 'CN101340104' }
                    ]
                },
                {
                    name: '高雄',
                    areas: [
                        { name: '高雄', code: 'CN101340201' },
                        { name: '嘉义', code: 'CN101340202' },
                        { name: '台南', code: 'CN101340203' },
                        { name: '台东', code: 'CN101340204' },
                        { name: '屏东', code: 'CN101340205' }
                    ]
                },
                {
                    name: '台中',
                    areas: [
                        { name: '台中', code: 'CN101340401' },
                        { name: '苗栗', code: 'CN101340402' },
                        { name: '彰化', code: 'CN101340403' },
                        { name: '南投', code: 'CN101340404' },
                        { name: '花莲', code: 'CN101340405' },
                        { name: '云林', code: 'CN101340406' }
                    ]
                }
            ]
        }
    ];

    var iScroll;
    if (typeof IScroll == 'undefined') {
        // 检测 iScroll 是否存在
        iScroll = $.AMUI.iScroll;
    } else {
        iScroll = IScroll;
    }

    // 构造函数
    function address(elm, options) {
        var self = this;
        self.$element = elm;
        self.options = options;

        // 初始化
        self._ready();

        // 带底部参数
        if (self.options.footer) {
            var $cancelBtn = self.$popup.find('.am-address-cancel');
            var $confirmBtn = self.$popup.find('.am-address-confirm');
            $confirmBtn.on('click', function() {
                self._selectEnd();
                return false;
            });
            $cancelBtn.on('click', function() {
                self.$popup.modal('close');
                return false;
            });
        }

        // 窗口被打开
        self.$popup.on('open.modal.amui', function() {
            self._readyProv();
        });

        // 窗口关闭
        self.$popup.on('close.modal.amui', function() {
            var selectProv = self.$prov.find('li.am-active').text();
            if (selectProv != self.options.prov) {
                self.$prov
                    .find('li:contains(' + self.options.prov + ')')
                    .addClass('am-active')
                    .siblings()
                    .removeClass('am-active');
            }
        });

        // 是否自动打开
        if (self.options.autoOpen) {
            self.$popup.modal('open');
        }

        self.$element.on('click', function() {
            self.$popup.modal('open');
        });

        // 给 element 对象绑定选择窗口的id
        self.$element.data('address-popup', self.$popup.attr('id'));
    }

    // 渲染选项列表
    address._readyList = function(json, selectedAddress) {
        var index = 0;
        var html = [];
        $.each(json, function(i, v) {
            // 循环第一个值时，如果没有默认选择值就添加 active
            if (i == 0 && !selectedAddress) {
                html.push('<li class="am-active">' + v.name + '</li>');
                index = i;
                return;
            }
            if (selectedAddress && v.name === selectedAddress) {
                html.push('<li class="am-active">' + v.name + '</li>');
                index = i;
            } else {
                html.push('<li>' + v.name + '</li>');
            }
        });
        return {
            list: html.join(''),
            index: index
        };
    };

    // 渲染选择窗口
    address.prototype._ready = function() {
        var self = this;
        var html = [];
        html.push(
            '<div class="am-popup am-address-popup" id="' +
                Math.ceil(Math.random() * new Date().getTime()) +
                '">'
        );
        html.push('<div class="am-popup-inner">');
        html.push('<div class="am-popup-hd">');
        html.push('<h4 class="am-popup-title">' + self.options.title + '</h4>');
        html.push('<span data-am-modal-close class="am-close">&times;</span>');
        html.push('</div>');
        html.push('<div class="am-popup-bd">');
        if (self.options.footer) {
            html.push('<div class="am-address-list am-address-list-footer">');
        } else {
            html.push('<div class="am-address-list">');
        }
        html.push(
            '<div class="am-u-sm-4 am-address-prov"><ul class="am-list am-list-static"></div>'
        );
        html.push(
            '<div class="am-u-sm-4 am-address-city"><ul class="am-list am-list-static"></div>'
        );
        html.push(
            '<div class="am-u-sm-4 am-address-district"><ul class="am-list am-list-static"></div>'
        );
        html.push('</div>');

        if (self.options.footer) {
            html.push('<div class="am-modal-footer am-address-footer">');
            html.push(
                '<span class="am-modal-btn am-address-cancel">取消</span>'
            );
            html.push(
                '<span class="am-modal-btn am-address-confirm">确定</span>'
            );
            html.push('</div>');
        }
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
        self.$popup = $(html.join('')).appendTo('body');

        self.$prov = self.$popup.find('div.am-address-prov');
        self.$city = self.$popup.find('div.am-address-city');
        self.$district = self.$popup.find('div.am-address-district');

        // 初始化数据
        self._readyProv('create');

        // 判断是否需要添加市级或县级栏
        if (self.options.selectNumber == 1) {
            self.$popup
                .find('div.am-address-list>div')
                .removeClass('am-u-sm-4')
                .addClass('am-u-sm-12');
        } else {
            self._readyCity('create');
        }
        if (self.options.selectNumber == 2) {
            self.$popup
                .find('div.am-address-list>div')
                .removeClass('am-u-sm-4')
                .addClass('am-u-sm-6');
        } else {
            self._readyDistrict('create');
        }
    };

    // 函数 _readyxxx 的参数 methods="create" 表示新建 否则负责刷新 IScroll
    // {渲染,刷新} 省级数据
    address.prototype._readyProv = function(methods) {
        var self = this;
        if (methods == 'create') {
            var prov = address._readyList(addressJson, self.options.prov);
            self.$prov
                .children('ul')
                .html(prov.list)
                .data('address-active', prov.index);
            if (!prov.index) {
                self.$prov
                    .find('li:eq(0)')
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
            }

            self.provIscroll = new iScroll(self.$prov[0], {
                tap: 'addressTap',
                mouseWheel: true
            });

            // 点击事件
            self.$prov.on('addressTap', 'li', function() {
                var $this = $(this);
                if ($this.hasClass('am-active')) {
                    return false;
                }
                $this
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
                if (self.options.selectNumber != 1) {
                    self._readyCity(null, 'tap');
                } else {
                    self._selectEnd();
                }
                self.$element.trigger('provTap', [$this]);
            });
        } else {
            if (self.options.selectNumber != 1) {
                self._readyCity();
            }
            self.provIscroll.refresh();
            self.provIscroll.scrollToElement(
                self.$prov.find('li.am-active')[0],
                null,
                null,
                self.options.scrollToCenter
            );
        }
    };

    // {渲染,刷新} 市级数据
    address.prototype._readyCity = function(methods, onEvent) {
        var self = this;
        if (methods == 'create') {
            self.cityIscroll = new iScroll(self.$city[0], {
                tap: 'addressTap',
                mouseWheel: true
            });
            self.$city.on('addressTap', 'li', function() {
                var $this = $(this);
                if ($this.hasClass('am-active')) {
                    return false;
                }
                $this
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
                if (self.options.selectNumber != 2) {
                    self._readyDistrict(null, 'tap');
                } else {
                    self._selectEnd();
                }
                self.$element.trigger('cityTap', [$this]);
            });
        } else {
            var provIndex = self.$prov.find('.am-active').index();
            var city = address._readyList(
                addressJson[provIndex].cities,
                self.options.cities
            );
            self.$city
                .children('ul')
                .html(city.list)
                .data('address-active', city.index);
            if (!city.index) {
                // 没有默认选中项
                self.$city
                    .find('li:eq(0)')
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
            }
            // 触发省级 tap 事件时，如果市级只要一个并且是省市级联时，触发选择完毕函数
            if (
                onEvent === 'tap' &&
                addressJson[provIndex].cities.length <= 1 &&
                self.options.selectNumber == 2
            ) {
                self._selectEnd();
            }

            self.cityIscroll.refresh();
            self.cityIscroll.scrollToElement(
                self.$city.find('li.am-active')[0],
                null,
                null,
                self.options.scrollToCenter
            );

            if (self.options.selectNumber != 2) {
                self._readyDistrict();
            }
        }
    };

    // {渲染,刷新} 县级 数据
    address.prototype._readyDistrict = function(methods, onEvent) {
        var self = this;
        if (methods == 'create') {
            self.districtIscroll = new iScroll(self.$district[0], {
                tap: 'addressTap',
                mouseWheel: true
            });

            // 点击事件
            self.$district.on('addressTap', 'li', function() {
                var $this = $(this);
                $this
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
                self._selectEnd();
            });
        } else {
            var provIndex = self.$prov.find('.am-active').index();
            var cityIndex = self.$city.find('.am-active').index();
            var districtJson = addressJson[provIndex].cities[cityIndex].areas;
            if (districtJson.length <= 0) {
                // 如果县级数据不存在，设置为空
                self.$district.children('ul').html('');
                if (onEvent == 'tap') {
                    self._selectEnd();
                }
                return;
            }

            var district = address._readyList(
                districtJson,
                self.options.areas
            );

            self.$district
                .children('ul')
                .html(district.list)
                .data('address-active', district.index);
            if (!district.index) {
                self.$district
                    .find('li:eq(0)')
                    .addClass('am-active')
                    .siblings('li')
                    .removeClass('am-active');
            }
            self.districtIscroll.refresh();
            self.districtIscroll.scrollToElement(
                self.$district.find('li.am-active')[0],
                null,
                null,
                self.options.scrollToCenter
            );
        }
    };

    // 选择完毕
    address.prototype._selectEnd = function() {
        var self = this;
        // 获取已选省级数据
        var provIndex = self.$prov.find('li.am-active').index();
        var provJson = addressJson[provIndex];

        var sJson = {
            prov: provJson.name,
            city: '',
            district: ''
        };

        if (self.options.selectNumber != 1) {
            // selectNumber = 1 表示只选省级
            var cityIndex = self.$city.find('li.am-active').index();
            var cityJson = addressJson[provIndex].cities[cityIndex];
            sJson.cities = cityJson.name;
            // 判断是否有 县区 级数据
            if (cityJson.areas.length && self.options.selectNumber != 2) {
                // selectNumber = 2 表示只选省市级
                var districtIndex = self.$district.find('li.am-active').index();
                var districtJson =
                    addressJson[provIndex].cities[cityIndex].areas[
                        districtIndex
                    ];
				sJson.areas = districtJson.name;
				sJson.code = districtJson.code;
            }
        }

        self.options = $.extend(true, self.options, sJson); // 合并参数,下次打开选择窗口时，需读取 options 数据进行定位

        // 自动填充
        if (!self.options.customOutput) {
            self.$element
                .find('input')
                .val(sJson.prov + sJson.cities + sJson.areas);
        }

        // 选取完毕回调
        if ($.isFunction(self.options.selectEnd)) {
            self.options.selectEnd(sJson, self);
        }
        this.$popup.modal('close');
    };

    $.fn.address = function(options) {
        var opt = $.extend(
            true,
            {
                title: '请选择地址',
                prov: '北京',
                city: '北京市',
                district: '东城区',
                selectNumber: 0,
                scrollToCenter: false,
                autoOpen: false,
                customOutput: false,
                selectEnd: false
            },
            options
        );
        new address(this, opt);
        return this;
    };

    $.AMUI.ready(function(doc) {
        $('[data-am-address]', doc).each(function() {
            var $this = $(this);
            var options = $.AMUI.utils.parseOptions(
                $this.attr('data-am-address') || $this.data('am-address')
            );
            $this.address(options);
        });
    });

    return $;
});
