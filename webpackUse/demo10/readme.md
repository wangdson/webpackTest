图片处理 和 Base64编码
图片压缩
合成雪碧图
在处理图片和进行base64编码的时候，需要使用url-loader。
在压缩图片的时候，要使用img-loader插件，并且针对不同的图片类型启用不同的子插件。
而postcss-loader和postcss-sprites则用来合成雪碧图，减少网络请求。
图片压缩需要使用img-loader，除此之外，针对不同的图片类型，还要引用不同的插件。比如，我们项目中使用的是 png 图片，因此，需要引入imagemin-pngquant，并且指定压缩率。
png:imagemin-pngquant
gif:imagemin-gifsicle
jepg:imagemin-mozjpeg
svg:imagemin-svgo
