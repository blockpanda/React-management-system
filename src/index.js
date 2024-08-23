import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import store from './store';
import './api/mock'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/* 当你在 React 项目中运行 npm start 命令时，系统会执行一系列步骤来启动开发服务器并运行你的应用。以下是主要的执行步骤：

1.读取 package.json：
系统首先会读取项目根目录下的 package.json 文件。
在这个文件中，它会查找 "scripts" 部分下的 "start" 命令。

2.执行 start 脚本：

通常，"start" 脚本会指向 "react-scripts start"。
react-scripts 是 Create React App 提供的一个包，包含了运行和构建 React 应用的脚本。

3.初始化开发服务器：

react-scripts 会启动一个开发服务器，通常使用 webpack-dev-server。

4..编译代码：

webpack 开始编译你的 JavaScript 和 CSS 代码。
它会从入口文件（通常是 src/index.js）开始，解析所有的导入语句，构建依赖图。

5.应用 Babel 转换：

使用 Babel 将 ES6+ 和 JSX 语法转换为浏览器可以理解的 JavaScript。

6.处理其他资源：

处理图片、字体等其他资源文件。
应用 CSS 预处理器（如果配置了的话）。

7.生成开发构建：

webpack 将所有处理过的文件打包成一个或多个 bundle 文件。

8.启动开发服务器：

webpack-dev-server 启动，通常在 localhost:3000 上运行。

9.启用热模块替换（HMR）：

配置热模块替换，允许在不刷新整个页面的情况下更新修改的模块。

10.打开浏览器：

如果没有禁用此功能，会自动在默认浏览器中打开应用。

11.监听文件变化：

开发服务器开始监听文件变化，当检测到变化时，会重新编译受影响的模块。

12.控制台输出：

在终端中显示编译状态、错误信息和应用运行的URL。 */