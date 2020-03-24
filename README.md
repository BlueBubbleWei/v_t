# wym_v3_t

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
配置教程 https://www.cnblogs.com/it-xiong/p/11759807.html  
### I write this just for myself. vue3 + ts
#### first init project
1. // npm install --save-dev cross-env 在config中兼容 process.env.NODE_ENV ，，没起作用  
2. 适配插件postcss安装  
  参考： a: https://www.jianshu.com/p/f0167608c72f   
        b: https://blog.csdn.net/k250119101/article/details/104253268  
  1.命令安装：npm i --save-dev postcss  
  2.命令安装：npm isntall postcss-import  
  3.命令安装：npm i postcss-px-to-viewport  
  4.命令安装：npm i postcss-aspect-ratio-mini  
  5.命令安装：npm i postcss-cssnext  
  6.命令安装：npm i postcss-write-svg  
  7.命令安装：npm i postcss-viewport-units  
  8.命令安装：npm i cssnano-preset-advanced --save-dev  
  9.命令安装：npm install  
  10.打开项根目录下找到postcss.conf.js  没找到，但是在package中可以配置 postcss，配置完成会报错，于是新建文件postcss.config.js
3.配置dev环境创建vue.config.js Invalid options in vue.config.js: "baseUrl" is not allowed. "vueLoader" is not allowed. "dll" is not allowed 报错 在vue.config。js中对比 part部分 (这部分的代码已经删除，原因是：代码老旧，采用本次新提交的代码)_ 
4. webpack配置参考资料   
  https://blog.csdn.net/u014440483/article/details/87267160 
5. 配置wpa  
参考资料   
  1. https://www.jianshu.com/p/917e3e160030  创建maninfest.json
  2. https://blog.csdn.net/wangzl1163/article/details/99633770 安装插件
  3. https://blog.csdn.net/qq_40128367/article/details/82890811 sw.js配置
6. eslint配置 https://segmentfault.com/a/1190000015315545?utm_source=tag-newest  

