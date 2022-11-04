const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors());


const mongoDBUri = process.env.MONGODB_URI || "";
const mongoClient = new MongoClient(mongoDBUri, { useNewUrlParser: true,  useUnifiedTopology: true,  serverApi: ServerApiVersion.v1});

app.delete('/clean-temporary-tickets', async (req, res) => {

   const newCollectionPromise = new Promise(async (resolve) => {
      await mongoClient.connect(async err => {
         const collection = await mongoClient.db("cart-tickets").collection("cart-tickets");
         const newCollectionStatus = await collection.deleteMany({
            expirationDate: {
               $lt: (new Date()).toISOString(),
            }
         })
         await mongoClient.close();
         resolve(newCollectionStatus)
      });
   })

   await newCollectionPromise.then(newCollectionStatus => {
      console.log(newCollectionStatus)
      if (newCollectionStatus.acknowledged === true) {
         res.status(200).send(newCollectionStatus)
      } else {
         res.status(500).send({status: 'Cannot delete the elements in the cart'})
      }
   })
})

exports.main = app;

