'use strict';

const express = require('express');
const cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const mime = require('mime-types');

const app = express();
const mult = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', mult.single('upfile'), (req, res, next) => {
    let {originalname, size} = req.file;
    let ext = originalname.split('.')[1];
    let mimeType = mime.lookup(ext);
    res.json({originalname, type: mimeType, size});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});
