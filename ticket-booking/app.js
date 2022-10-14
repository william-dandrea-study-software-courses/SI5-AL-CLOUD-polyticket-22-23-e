const PROD_MODE = true;

require('dotenv').config();
const express = require('express')
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const {dateWithIncrement} = require("./utils");
const { Client } = require("pg");
const cors = require('cors');

const app = express()
const port = process.env.PORT || 8090;

app.use(express.json());
app.use(cors());

const mongoDBUri = "mongodb+srv://admin:admin@cloud-ticket.874mo1m.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoDBUri, { useNewUrlParser: true,  useUnifiedTopology: true,  serverApi: ServerApiVersion.v1});
const SQLClientConfig = {
  user: 'postgres',
  host: PROD_MODE ? '/cloudsql/cloud-tickets:us-central1:event-db' : '34.172.33.192',
  database: 'events',
  password: 'postgres'
};




app.get('/', (req, res) => {
  res.send({status: 'Hello World!'})
})



app.post('/create-eticket/:eventId', async (req, res, next) => {

  const eventId = req.params.eventId;

  // Now we create a new official ticket
  const officialETicketItem = {
    buy_date: (new Date()).toISOString(),
    event_id: Number(eventId),
    type: "ETICKET"
  }

  const newTicketPromise = new Promise(async (resolve) => {
    await mongoClient.connect(async err => {
      const collection = await mongoClient.db("tickets").collection("tickets");
      const newTemporaryTicketStatus = await collection.insertOne(officialETicketItem)
      await mongoClient.close();
      resolve(newTemporaryTicketStatus)
    });
  })

  newTicketPromise.then(newTicket => {
    if (newTicket.acknowledged === true) {
      res.status(200).send(officialETicketItem)
    } else {
      res.status(500).send({status: 'Cannot write the new ticket in the DB'})
    }
  })
});

app.post('/create-ticket/:eventId', async (req, res, next) => {
  const eventId = req.params.eventId;
  // const my_event = await getEventById(req.params.eventId);

  // Watch if enough places for this event
  const SQLClient = new Client(SQLClientConfig);
  await SQLClient.connect();
  const query = `SELECT available_seats FROM events WHERE id_event=${eventId}`;
  const numberOfAvailableSeatsResult = await SQLClient.query(query).then(async payload => {
    return payload.rows;
  }).catch(() => {
    return null;
  });


  if (numberOfAvailableSeatsResult == null || numberOfAvailableSeatsResult.length === 0 ) {
    res.send({status: `Cannot find an event with the ID ${eventId}`}).status(204);
  } else {
    const numberOfAvailableSeats = numberOfAvailableSeatsResult[0].available_seats
    if (numberOfAvailableSeats != null) {
      if (numberOfAvailableSeats > 0) {


        // Now watch if the temporary carts is not full
        const countTemporaryCart = new Promise(async (resolve, reject) => {
          await mongoClient.connect(async err => {
            const collection = await mongoClient.db("cart-tickets").collection("cart-tickets");
            const filterCount = {'event_id': Number(eventId)}
            const count = await collection.countDocuments(filterCount);
            mongoClient.close();
            resolve(count)
          });
        });

        countTemporaryCart.then(async numberOfTemporaryTicketsTook => {
          if (numberOfAvailableSeats - numberOfTemporaryTicketsTook > 0) {

            const ticketItem = {
              id_cart: uuidv4(),
              expirationDate: dateWithIncrement(5),
              event_id: Number(eventId),
            }


            const newTemporaryTicketPromise = new Promise(async (resolve) => {
              await mongoClient.connect(async err => {
                const collection = await mongoClient.db("cart-tickets").collection("cart-tickets");
                const newTemporaryTicketStatus = await collection.insertOne(ticketItem)
                await mongoClient.close();
                resolve(newTemporaryTicketStatus)
              });
            })

            newTemporaryTicketPromise.then(newTemporaryTicketStatus => {
              if (newTemporaryTicketStatus.acknowledged === true) {
                res.status(200).send(ticketItem)
              } else {
                res.status(500).send({status: 'Cannot write the new ticket in the DB'})
              }
            })
          } else {
            res.send({status: `Currently, all the places are in the cart of other persons, please retry in few minutes`,}).status(204);
          }
        })
      } else {
        res.send({status: `No places left`,}).status(204);
      }
    } else {
      res.status(500).send(`Cannot find the field available_seats in the events database`);
    }
  }
});


app.post('/:cart_id/pay', async (req, res) => {
  const cartId = req.params.cart_id;
  console.log(cartId)

  // Firstlty, we search this temporary cart

  const newTemporaryTicketPromise = new Promise(async (resolve) => {
    await mongoClient.connect(async () => {
      const collection = await mongoClient.db("cart-tickets").collection("cart-tickets");
      const temporaryCart = await collection.findOne({id_cart: String(cartId)})
      await mongoClient.close();
      resolve(temporaryCart)
    });
  })

  newTemporaryTicketPromise.then(async temporaryCart => {
    if (temporaryCart != null) {
      const eventId = temporaryCart.event_id;

      // We verify that the temporary cart is not expired
      const expirationDate = new Date(temporaryCart.expirationDate);
      if (expirationDate.getTime() < (new Date()).getTime()) {
        res.send({status: `Your cart is expired, please try to book again`,}).status(204);
      } else {
        // We VERIFY that we have left places in the concert
        const SQLClient = new Client(SQLClientConfig);
        await SQLClient.connect();
        const query = `SELECT available_seats FROM events WHERE id_event=${eventId}`;
        const numberOfAvailableSeatsResult = await SQLClient.query(query).then(async payload => {
          return payload.rows;
        }).catch(() => {
          return null;
        });

        if (numberOfAvailableSeatsResult == null || numberOfAvailableSeatsResult.length === 0 ) {
          res.send({status: `Cannot find an event with the ID ${eventId}`}).status(204);
        } else {
          const numberOfAvailableSeats = numberOfAvailableSeatsResult[0].available_seats
          if (numberOfAvailableSeats != null) {

            await createNewOfficialTicket(req, res, cartId, eventId);

          }
        }
      }
    } else {
      res.send({status: `Any carts found, maybe your cart is expired, please try to book again`,}).status(204);
    }
  })
});






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


const createNewOfficialTicket = async (req, res, cartId, eventId) => {
  // Delete the temporary cart

  const deletingTicketPromise = new Promise(async (resolve) => {
    await mongoClient.connect(async () => {
      const collection = await mongoClient.db("cart-tickets").collection("cart-tickets");
      const deletingResult = await collection.deleteOne({id_cart: String(cartId)})
      await mongoClient.close();
      resolve(deletingResult)
    });
  });


  deletingTicketPromise.then(async deletingResult => {
    if (deletingResult.acknowledged === true) {

      // We decrease the available seats
      const SQLClient = new Client(SQLClientConfig);
      await SQLClient.connect();
      const query = `UPDATE public.events SET available_seats = available_seats - 1 WHERE id_event=${eventId};`;
      await SQLClient.query(query).then(async payload => {
        return payload.rows;
      }).catch(() => {
        return null;
      });



      // Now we create a new official ticket
      const officialTicketItem = {
        buy_date: (new Date()).toISOString(),
        event_id: Number(eventId),
        type: "OFFICIAL"
      }

      const newTicketPromise = new Promise(async (resolve) => {
        await mongoClient.connect(async err => {
          const collection = await mongoClient.db("tickets").collection("tickets");
          const newTemporaryTicketStatus = await collection.insertOne(officialTicketItem)
          await mongoClient.close();
          resolve(newTemporaryTicketStatus)
        });
      })

      newTicketPromise.then(newTicket => {
        if (newTicket.acknowledged === true) {
          res.status(200).send(officialTicketItem)
        } else {
          res.status(500).send({status: 'Cannot write the new ticket in the DB'})
        }
      })
    } else {
      res.status(500).send(`Error when deleting the temporary cart id ${cartId}`);
    }
  })
}
