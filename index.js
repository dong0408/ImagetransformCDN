const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

// 配置Multer中间件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 指定上传文件保存的目录
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 使用原始文件名保存上传文件
  }
});

const upload = multer({ storage });

// 配置Cloudinary
cloudinary.config({ 
    cloud_name: 'dz8ztjjyn', 
    api_key: '713276734926736', 
    api_secret: 'kbTQMuVlHRFF_inOlGHioRVzWnM' 
  });

// 处理文件上传
app.post('/upload', upload.array('images', 10), (req, res) => {
  const files = req.files;
  const uploadPromises = [];

  // 遍历所有上传的文件
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    uploadPromises.push(uploadPromise);
  }

  // 等待所有文件上传完成
  Promise.all(uploadPromises)
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).json({ error: '文件上传失败' });
    });
});

// 启动应用程序
app.listen(3000, () => {
  console.log('应用程序已启动，监听端口3000');
});
