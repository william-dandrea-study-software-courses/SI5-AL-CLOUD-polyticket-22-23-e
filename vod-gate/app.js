const PROD_MODE = true;

require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const { Client } = require("pg");

const port = process.env.PORT || 8080;
app.use(cors());

const Multer = require('multer');
const gcsMiddlewares = require("./middlewares/google-cloud-storage");

const SQLClientConfig = {
  user: 'postgres',
  host: PROD_MODE ? '/cloudsql/cloud-tickets:us-central1:event-db' : '34.172.33.192',
  database: 'events',
  password: 'postgres'
};


const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 200 * 1024 * 1024, // Maximum file size is 10MB
  },
});

app.post('/upload/:idEvent', multer.single('file'), gcsMiddlewares.sendUploadToGCS, async (req, res, next) => {

  const idEvent = Number(req.params.idEvent);

  if (req.file && idEvent != null) {
    // req.file.gcsUrl
    const urlVideo = await req.file.cloudStorageObject;
    console.log(urlVideo)

    const SQLClient = new Client(SQLClientConfig);
    await SQLClient.connect();
    const query = `UPDATE events SET vod_link='${urlVideo}' WHERE id_event=${idEvent};`;
    let updateEventQuery = await SQLClient.query(query).then(async payload => {
      console.log(payload)
      return payload.rows;
    }).catch((e) => {
      console.log(e)
      return null;
    });

    if (updateEventQuery != null) {
      const SQLClient = new Client(SQLClientConfig);
      await SQLClient.connect();
      const query = `SELECT * FROM events WHERE id_event=${idEvent};`;
      let updatedEvent = await SQLClient.query(query).then(async payload => {
        console.log(payload)
        return payload.rows;
      }).catch((e) => {
        console.log(e)
        return null;
      });

      if (updatedEvent != null && updatedEvent.length !== 0) {
        res.send(updatedEvent[0]).status(200);
      } else {
        res.send({status: "Error when reading the event database"}).status(500);
      }
    } else {
      res.send({status: "Error when updating the event database"}).status(500);
    }
  } else {
    res.send('Unable to upload').status(500);
  }
});


app.get('/video', (req, res) => {
  res.send('http://35.186.236.211/test_vdo.mp4')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

