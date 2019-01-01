/**
 * 第三方JS库
 * 1. CDN: '<script></script>'标签引入即可
 * 2. npm包管理: ProvidePlugin, 键是变量名, 值是第三方库名称
 * 3. 本地Js文件: alias别名, 将本地库解析到对应的文件中. 例如示例中的 'jQuery'被解析到'src/vendor/jquery.min.js'
 *
 * 配置之后, 在项目的文件中不再需要import或者require相关的库!!!
 *
 * 被注册后的变量请看 'src/app.js'
 */
