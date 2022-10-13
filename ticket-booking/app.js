require('dotenv').config();
const express = require('express')
const https = require('https');
const http = require('http');
const app = express()
const port = process.env.PORT || 8080;

const { v4: uuidv4 } = require('uuid');

app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cloud-ticket.874mo1m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dateWithIncrement = (minutesToAdd) => {
  let date = new Date();
  let expirationDate = new Date(date.getTime() + minutesToAdd * 60000);

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
});

function getEventById(id) {
  return new Promise((resolve, reject) => {

    const url = "http://localhost:4560/event/" + id;
    //const url = "https://event-manager-idnoihwhaq-uc.a.run.app/event/" + id;

    // récupération de l'event
    http.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve(JSON.parse(data)[0]);
      });

      resp.on('error', (err) => {
        reject(err);
      });
    });
  });
}

app.get('/create-ticket/:eventId', async (req, res) => {

  const my_event = await getEventById(req.params.eventId);

  const ticketItem = {
    id_ticket: uuidv4(),
    artist: my_event.artist,
    name_event: my_event.name_event,
    date_event: my_event.date_event,
  }

  try {
    const collection = client.db("tickets").collection("tickets");
    await collection.insertOne(ticketItem)
    client.close();

    res.send(ticketItem)
  } catch (err) {
    res.json({ status: "400", message: "Error when paring the request body" }).status(400);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});







