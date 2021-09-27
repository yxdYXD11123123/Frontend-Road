import { defineConfig, loadEnv } from 'vite';
// 按需加载
import vitePluginImport from 'vite-plugin-babel-import'
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from "path"

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      reactRefresh(),
      vitePluginImport([
        // 按需加载 antd-mobile 组件
        {
          libraryName: 'antd-mobile',
          libraryDirectory: 'es',
          style(name) {
            return `antd-mobile/lib/${name}/style/index.css`
          },
        },
      ])
    ],
    // 解决无法使用import.meta.env.*
    base: loadEnv(mode, process.cwd()).VITE_APP_NAME,
    // 路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src")
      }
    }
  })

}