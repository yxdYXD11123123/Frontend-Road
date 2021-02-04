const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db_blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("数据库连接成功");
});

