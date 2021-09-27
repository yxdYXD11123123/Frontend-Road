const jwt = require('jsonwebtoken');

module.exports = {
    // 设置token
    getToken(payload = {}) {
        return jwt.sign(payload, 'xffBBD', {expiresIn: '4h'});
    },

// 解析token
    setToken(token = "") {
        token = token.split(" ").length === 2 ? token.split(" ")[1] : token.replace(' ', '');
        jwt.verify(token, 'xffBBD', (err, decoded) => {
            // console.log(err , decoded);
            if (err) token = false;
            else token = decoded;
        });
        // 验证并解析JWT
        return token;
    },

    /**
     * @return {string}
     */
    GUID(name = "") {
        /**
         * @return {string}
         */
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (name + S4() + S4() + "-" + S4() + "-" + S4());
    }
};
