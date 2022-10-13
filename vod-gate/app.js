require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

const Multer = require('multer');
const gcsMiddlewares = require("./middlewares/google-cloud-storage");


const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Maximum file size is 10MB
  },
});

app.post('/upload', multer.single('file'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
  if (req.file) {
    // req.file.gcsUrl
    res.status(200).send(req.file.cloudStorageObject);
  } else {
    res.status(500).send('Unable to upload');
  }


});


app.get('/video', (req, res) => {
  res.send('http://35.186.236.211/test_vdo.mp4')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

