import { promisifyAll, promisify } from "miniprogram-api-promise";

// promisifyAll 是用来将wx对象里的所有方法都promise化交给一个新对象
const wxp = {};
promisifyAll(wx, wxp);

// promisify 是 单一的 Promise化API
module.exports = {
  promisify,
  wxp
};