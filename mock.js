'use strict';

const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

//模拟数据 注意 这里不能导出 否则 proxy.config会报错
const seller_info = mockjs.mock({
  "apply_info": {
    "audit_log_id": "57ebbaa2414434b05733a5cf",
    "id_card_sn": "110110199908241124",
    "images": {
      "1": {
        "thumb_large": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/1/57ebbaa2998269124c6662b2-large.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:u30wsjG1TOL-OWU2UmoHjxR-7_g=",
        "thumb_medium": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/1/57ebbaa2998269124c6662b2-medium.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:Th4ICXFjRul3o60rG_TwWEE6Fc8=",
        "thumb_small": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/1/57ebbaa2998269124c6662b2-small.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:7S5jeET7t4TsoGE_iaQMn11Dyi4="
      },
      "3": {
        "thumb_large": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/3/57ebbaa3998269124c6662bb-large.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:9Z6EDMrPVRTPQzTn8loeimNjwA4=",
        "thumb_medium": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/3/57ebbaa3998269124c6662bb-medium.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:pbIyCAYhJ94iLPX1UjNgaiG33V4=",
        "thumb_small": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/3/57ebbaa3998269124c6662bb-small.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:sNAFE1cIYtKD-ChgLXLM0IgbCKQ="
      },
      "5": {
        "thumb_large": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/5/57ebbaa3998269124c6662c2-large.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:5bqwNikxG_b-9CmWEzcYlr_2HXA=",
        "thumb_medium": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/5/57ebbaa3998269124c6662c2-medium.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:hboy8XZfS0FJ6Q-d4rdaAL-tlkQ=",
        "thumb_small": "http://7xvcpi.com1.z0.glb.clouddn.com/ids/57ebb0f4998269120fbcbde5/5/57ebbaa3998269124c6662c2-small.jpg?e=1477999416&token=NmYHY9METZ8DMuxSuJv_u8xE5EuESKtcbAmhN1b4:j2_-hUSRMm-rDWJx1GViDIuGfSk="
      }
    },
    "note": "",
    "state": 100
  },
  "biz_profile": {
    "legal_name": "慕男"
  },
  "city_code": "110000",
  "created_at": "2016-09-28T12:00:52.960000+00:00",
  "id": "57ebb0f4998269120fbcbde5",
  "name": "慕111",
  "order_count": 6,
  "seller_no": "31116",
  "seller_type": 3,
  "service": {
    "contract_id": "57ee3fd6998269199a365203",
    "service_id": "57ebbf5399826916c44fb1e0",
    "vendor_id": "57ebbe9e99826916c44fb0d2"
  },
  "shop": {
    "address": "运河西大街",
    "address_detail": "2020",
    "bd_poi": [
      116.329699,
      40.014584
    ],
    "city_code": "110000",
    "city_name": "",
    "created_at": "2016-09-28T12:02:32.534000+00:00",
    "mobile": "18518509477",
    "name": "慕111",
    "seller_id": "57ebb0f4998269120fbcbde5",
    "shop_id": "57ebb158998269124c665710",
    "state": 100,
    "tel": "18518509477"
  },
  "state": -100,
  "verify_state": 100,
  "wallet_id": "57ebb0f4998269120fbcbdeb"
});

module.exports = {
  'GET /sellers' (req, res) {

    res.json({
      success: true,
      baseInfo: seller_info,
    });
  },
};
