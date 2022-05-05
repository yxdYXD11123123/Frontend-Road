import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "@/pages/Home/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login/Login";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Article from "./pages/Article/Article";
import Publish from "./pages/Publish/Publish";
import Edit from "./pages/Edit/Edit";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "moment/locale/zh-cn";

function App() {
  return (
    <AuthProvider>
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/article" element={<Article />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/publish/:id" element={<Edit />} />
            </Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </HashRouter>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
