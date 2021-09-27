const router = require('koa-router')();
const configTem = require('../controllers/config');
router
    .get('/init', configTem.init);

module.exports = router;