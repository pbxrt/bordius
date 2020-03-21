This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 项目简介及技术栈

本项目以 React 全家桶（包含 hooks）以及 immutable 数据流为基础打造的一款高质量的移动端音乐类 WebApp。

介绍下项目的技术栈：

前端部分：

- `react 全家桶 (react，react-router)` : 用于构建用户界面的 MVVM 框架
- `redux`: 著名 JavaScript 状态管理容器
- `redux-thunk`: 处理异步逻辑的 redux 中间件
- `immutable`: Facebook 历时三年开发出的进行持久性数据结构处理的库
- `react-lazyload`: react 懒加载库
- `better-scroll`: 提升移动端滑动体验的知名库
- `styled-components`: 处理样式，体现 css in js 的前端工程化神器
- `axios`: 用来请求后端 api 的数据

TODO:
- 音符陨落性能需要优化
- CD 和歌词的切换不够顺畅，暂停时，歌词还是会滚动
- CD 和歌词的切换需要用 useState 而不是 useRef，因为 useRef 不是引发UI 重新渲染

学到了哪些之前不知道的东西：
1. 不改变元素大小，仅仅通过css就可以扩大元素点击范围
2. better-scroll的封装
3. react-lazyload 图片拉加载
4. axios 可以设置 interceptor 主要是响应做统一处理
5. css 动画库
6. 组件的嵌套，组件的分割，往往一个组件太大，但是如果拆分成独立的组件，可能有需要传递太多的props，这是我们干脆把组件函数声明在父函数内，参数直接从父函数中取即可
7. 子路由的嵌套，可以避免自己设置state，来控制子组件的显示和隐藏了
8. 组件分割
9. audio 元素的使用
10. css animation 有一个 属性，可以无缝切换动画的播放和暂停
11. 学到了 useRef, useCallback, useMemo 的用法