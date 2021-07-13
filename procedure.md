### 遇到的问题
#### 找不到模块“path”或其相应的类型声明
npm install @types/node --save-dev
https://blog.csdn.net/gaoxiaoba/article/details/117818662

#### 配置src别名@不起效
除在 vite.config.js 中配置外,还需要在 tsconfig 中配置
compilerOptions.paths:　{
  "@/*": ["./src/*"]
}