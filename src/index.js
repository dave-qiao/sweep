import './index.html';
import './index.css';
import dva from 'dva';

/*
*项目入口
* 获得所有组件的Model
* */
// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/Login_Model'));
app.model(require('./models/Merchant_Model'));
app.model(require('./models/Contract_Model'));
app.model(require('./models/BulkImport_Modle'));
app.model(require('./models/BulkImportDetail_Modle'));
app.model(require('./models/OrderList_Modle'));
app.model(require('./models/ContractDetail_Model'));
app.model(require('./models/OrderDetailInfo_Model'));
app.model(require('./models/OrderListLog_Model'));
app.model(require('./models/OrderDetailDownload_Model'));
// 4. Router
app.router(require('./router'));
// 5. Start
app.start('#root');
