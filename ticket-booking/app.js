require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;

const {v4: uuidv4} = require('uuid');

app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cloud-ticket.874mo1m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dateWithIncrement = (minutesToAdd) => {
  let date = new Date();
  let expirationDate = new Date(date.getTime() + minutesToAdd*60000);

  return expirationDate.toISOString();
}

/*
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/new-ticket', async (req, res) => {
  const ticketItem = {
    id_cart: uuidv4(),
    expirationDate: dateWithIncrement(5),
  }

  await client.connect(async err => {
    const collection = await client.db("cart-tickets").collection("cart-tickets");
    await collection.insertOne(ticketItem)
    client.close();
  });

  res.send(ticketItem)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







