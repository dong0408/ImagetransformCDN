基于node实现picture转CDN格式，加快图片加载速度，提供更好的用户体验效果

主要使用node.js + express + multer + cloudinary 启动本地服务，在 postman 上调用 uploads接口

核心为cloudinary的配置，cloud_name api_key api_secret需要去cloudinary官网注册
 cloudinary.config({ 
    cloud_name: '*********', 
    api_key: '*********', 
    api_secret: '*********' 
  });
