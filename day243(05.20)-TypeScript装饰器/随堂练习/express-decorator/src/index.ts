import { router } from "./controllers/decorators/controller";
import express from "express";
import "./controllers/LoginController";

const app = express();

app.use(router);

app.listen(3000, () => console.log("服务器启动成功，监听3000"));
