'use strict';
import PROVINCE from "./province";

function checkIsBiger10(num) {
  return num >= 10 ? num : ('0' + num);
}

const appTools = {
  numberDateToStr: function (num) {
    var _date = num + '';
    return _date.substr(0, 4) + '-' + _date.substr(4, 2) + '-' + _date.substr(6, 2);
  },
  sqlit: function (arr, type) {
    var s = arr[0];
    for (var i = 1; i < arr.length; i++) {
      s = s + type + arr[i];
    }
    return s;
  },
  utcToDate: function (dateStr) {
    var _date = new Date(dateStr);
    var _ref = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds()],
      _y = _ref[0],
      _m = _ref[1],
      _d = _ref[2],
      _h = _ref[3],
      _min = _ref[4],
      _sec = _ref[5];

    var dateObj = {
      date: [_y, checkIsBiger10(_m), checkIsBiger10(_d)],
      time: [checkIsBiger10(_h), checkIsBiger10(_min), checkIsBiger10(_sec)]
    };
    return `${dateObj.date[0] + '-' + dateObj.date[1] + '-' + dateObj.date[2]} ${dateObj.time[0] + ':' + dateObj.time[1]}`
  },
  utcToDateIntDay: function (dateStr) {
    var _date = new Date(dateStr);
    var _ref = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds()],
      _y = _ref[0],
      _m = _ref[1],
      _d = _ref[2],
      _h = _ref[3],
      _min = _ref[4],
      _sec = _ref[5];

    var dateObj = {
      date: [_y, checkIsBiger10(_m), checkIsBiger10(_d)],
      time: [checkIsBiger10(_h), checkIsBiger10(_min), checkIsBiger10(_sec)]
    };
    return `${dateObj.date[0]}${dateObj.date[1]}${dateObj.date[2]}`;
  },
  //年月日2017-03-16
  utcToDateStrDay: function (dateStr) {
    var _date = new Date(dateStr);
    var _ref = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds()],
      _y = _ref[0],
      _m = _ref[1],
      _d = _ref[2],
      _h = _ref[3],
      _min = _ref[4],
      _sec = _ref[5];

    var dateObj = {
      date: [_y, checkIsBiger10(_m), checkIsBiger10(_d)],
      time: [checkIsBiger10(_h), checkIsBiger10(_min), checkIsBiger10(_sec)]
    };
    return `${dateObj.date[0]}-${dateObj.date[1]}-${dateObj.date[2]}`;
  },
  //年月日:20170316
  getDateInt: function (AddDayCount) {
    // -1 昨天 0今天 1明天
    let dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = (dd.getMonth() + 1) > 9 ? dd.getMonth() + 1 : '0'+ (dd.getMonth() + 1);//获取当前月份的日期
    let d = dd.getDate() > 9 ? dd.getDate() : '0' + dd.getDate();
    let h = dd.getHours();
    let min = dd.getMinutes();
    let ss = dd.getSeconds();
    return `${y}${m}${d}`;
  },
  getMonthDays: function (month) {
    var _demo = new Date();
    var _ref2 = [_demo.getFullYear(), _demo.getMonth() + 1, _demo.getDate()],
      _y = _ref2[0],
      _m = _ref2[1],
      _d = _ref2[2];

    var _month = month ? month * 1 : _m;
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(_month) !== -1) {
      return 31;
    }
    ;
    if ([4, 6, 9, 11].indexOf(_month) !== -1) {
      return 30;
    }
    var temp = new Date(_y + '/3/0');
    return temp.getDate();
  },

  dateFormat: function (stamp) {
    if (stamp) {
      var _date = stamp ? new Date(stamp) : new Date();
      var _ref3 = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate()],
        _y = _ref3[0],
        _m = _ref3[1],
        _d = _ref3[2];
      return [_y, _m >= 10 ? _m : '0' + _m, _d >= 10 ? _d : '0' + _d];
    }
    return "";
  },
  err_codeTransform: function (code) {
    var codeDict = {
      "401001": "参数缺失或错误",
      "401002": "该名称已存在",
      "401003": "该账号已存在",
      "401004": "该电话号码已存在",
      "401005": "该工号已存在",
      "401006": "手机号没有找到",
      "401007": "商户订单编号已存在",
      "401008": "验证码错误",
      "402001": "服务商创建失败",
      "402002": "服务商更新错误",
      "402003": "服务商没有找到",
      "402004": "服务商被禁用",
      "402005": "服务商未审核通过",
      "402006": "不在配送时间内",
      "403001": "商户创建失败",
      "403002": "商户更新失败",
      "403003": "商户没有找到",
      "403004": "商户被禁用",
      "403006": "商户签约失败",
      "404001": "商圈创建失败",
      "404002": "商圈更新失败",
      "404003": "商圈没有找到",
      "404004": "区域创建失败",
      "404005": "区域更新失败",
      "404006": "区域没有找到",
      "405001": "产品创建失败",
      "405002": "产品更新失败",
      "405003": "产品没有找到",
      "405004": "产品不可用",
      "405005": "产品启用失败",
      "405006": "产品状态错误",
      "405007": "产品已起用",
      "407001": "账号创建失败",
      "407002": "账号更新失败",
      "407003": "账号没有找到",
      "407004": "账号不可用",
      "408001": "登录失败",
      "408002": "注册失败",
      "409001": "骑士创建失败",
      "409002": "骑士更新失败",
      "409003": "骑士没有找到",
      "409004": "骑士状态错误",
      "409005": "骑士审核状态错误",
      "412001": "角色创建",
      "412002": "角色更新失败",
      "412003": "角色没有找到",
      "413001": "权限创建失败",
      "413002": "权限更新失败",
      "413003": "权限没有找到",
      "414001": "店铺创建失败",
      "414002": "店铺更新失败",
      "414003": "店铺没有找到",
      "415001": "无效token或token已过期",
      "416001": "发送验证码失败",
      "416002": "创建七牛Token失败",
      "417001": "审核失败",
      "417002": "提交审核失败",
      "417003": "审核记录没有找到",
      "418001": "没有权限",
      "403005": "商户未审核通过,或商户审核状态错误"
    };
    return codeDict[code] ? codeDict[code] : '错误';
  },
  statusCodeTransform: function (field, state) {
    var state_dict = {
      sex: {
        '1': '男',
        '2': '女'
      },
      error_flags: {
        "1": "配送费计算错误",
        "2": "商家取消",
        "3": "货损",
        "4": "顾客失联",
        "5": "顾客拒签",
        "6": "商家出餐太慢",
        "7": "商家地址错误",
        "8": "商家其他原因",
        "20": "骑士车坏了",
        "21": "货损",
        "22": "骑士其他原因"
      },
      work_state: {
        '100': '在职',
        '-100': '离职'
      },
      duty_state: {
        '100': '在岗',
        '-100': '离岗'
      },
      verify_state: {
        '0': '待提交',
        '1': '待审核',
        '100': '通过',
        '-100': '驳回'
      },
      seller_state: {
        '100': '启用',
        '-100': '禁用'
      },
      contract_state: {
        "100": "签约",
        "-100": "解约"
      },
      seller_type: {
        1: "美食餐饮",
        2: "生鲜蔬菜",
        3: "超市商品",
        4: "鲜花蛋糕",
        5: "其他"
      },
      delivery_state: {
        '5': '已创建',
        '10': '待分配',
        '15': '已分配',
        '20': '已接单',
        '22': '已到店',
        '24': '已取货',
        '50': '配送中',
        '-50': '异常',
        '100': '已完成',
        '-100': '已关闭'
      },
      pay_type: {
        '1': '现金支付',
        '2': '余额支付'
      },
      event_state: {
        'created': '已创建',
        'closed': '已关闭',
        'accepted': '已接单',
        'arrived': '已到店',
        'pickup': '已取货',
        'reassigned': '已改派',
        'recover_state': '恢复状态',
        'done': '已完成',
        'error': '异常'
      },
      operation_state: {
        'created': '商家已下单，等待调度',
        'closed': '运单已关闭',
        'accepted': '骑士抢单',
        'arrived': '骑士确认到店',
        'pickup': '骑士已取货',
        'reassigned': '运单已被改派',
        'recover_state': '状态已恢复',
        'done': '派单已完成',
        'error': '骑士标记异常'
      },
      //业务模式
      biz_model: {
        10: "本地生活圈",
        20: "预约送"
      },
      //定价模式
      price_model: {
        1: "一口价",
        2: "阶梯定价"
      },
      //定价方案描述
      price_plan_description: {
        1: "固定价格",
        2: "距离＋时间阶梯价"
      },
      //订单状态
      order_state: {
        0: "已创建",
        1: "待发布",
        25: "待调度",
        20: "已发布",
        50: "配送中",
        100: "完成",
        "-100": "关闭",
        "-50": "异常"
      },
      //关闭原因
      closed_type: {
        1: "配送费计算错误",
        2: "商家取消",
        3: "货损",
        4: "顾客失联",
        5: "顾客拒签",
        6: "商家出餐太慢",
        7: "商家地址错误",
        8: "商家其他原因",
        20: "骑士车坏了",
        21: "货损",
        22: "骑士其他原因",
      },
      //异常原因
      error_type: {
        1: "配送费计算错误",
        2: "商家取消",
        3: "货损",
        4: "顾客失联",
        5: "顾客拒签",
        6: "商家出餐太慢",
        7: "商家地址错误",
        8: "商家其他原因",
        20: "骑士车坏了",
        21: "货损",
        22: "骑士其他原因",
      },
      //订单来源
      source_channel: {
        1: "ios",
        2: "安卓",
        3: "微信",
        4: "web",
        5: "web导入",
        6: "IOS导入",
        7: "安卓导入"
      }
    };
    return state_dict[field] ? state_dict[field][state] : '没有找到';
  },
  getProvinceName: function (provinceCode) {
    let provinceName = '省份未知';
    if (provinceCode) {
      let index = PROVINCE.index.indexOf(provinceCode);
      if (index != -1) {
        provinceName = PROVINCE.data[index].name;
      }
    }
    return provinceName;
  },
  getMinInList: function (arr) {
    var min = arr[0];
    arr.forEach(function (ele, index, arr) {
      if (ele < min) {
        min = ele;
      }
    });
    return min;
  },
  //年月日时分秒
  getDateStr: function (AddDayCount) {
    // -1 昨天 0今天 1明天
    let dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;//获取当前月份的日期
    let d = dd.getDate();
    let h = dd.getHours();
    let min = dd.getMinutes();
    let ss = dd.getSeconds();
    return `${y + '-' + m + '-' + d} ${h + ':' + min + ':' + ss}`
  },
  downloadURI: function (uri, name) {
    //dynamic download file
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link = null;
  }
};

export default appTools;
