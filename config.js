const config = {
  "AccessKey": "1b5ffeee2017c86377e39adf6855e07b",
  "SecretKey": "9571304a90eee6ce4487c49ca7c3c87b",
  "accessToken": function (accessToken) {
    const _accessToken = localStorage.getItem("access_token");
    return _accessToken;
  },
  "prod": "https://seaguard-dev.o3cloud.cn/1.0",
  "mock": "/",
  "env": "prod"
};
export  default config;
//"access_key" : "9b08b25d807c13ab89d84bfcdd67d3f1", "secret_key" : "ceb7a5478be62d5ffb733d5703c6332a" 正式版
// AccessKey: '1b5ffeee2017c86377e39adf6855e07b', SecretKey: '9571304a90eee6ce4487c49ca7c3c87b', 测试版
//"prod": "https://seaguard-dev.o3cloud.cn/1.0", 测试地址
// "prod": "https://seaguard.o3cloud.cn/1.0", 正式地址
