const PROD_MODE = true;

const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const cors = require('cors');
const { Client } = require("pg");

app.use(express.json());
app.use(cors());

const mongoDBUri = process.env.MONGODB_URI || "mongodb+srv://admin:admin@cloud-ticket.874mo1m.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoDBUri, { useNewUrlParser: true,  useUnifiedTopology: true,  serverApi: ServerApiVersion.v1});
const SQLClientConfig = {
    user: 'postgres',
    host: PROD_MODE ? (process.env.DATABASE_URL || '/cloudsql/cloud-tickets:us-central1:event-db') : '34.172.33.192',
    database: process.env.DATABASE_NAME || 'events',
    password: process.env.DATABASE_PASSWORD || 'postgres'
};

app.get('/:idTicket', async (req, res) => {
    const idTicket = req.params.idTicket;


    const ticketPromise = new Promise(async (resolve) => {
        await mongoClient.connect(async err => {
            const collection = await mongoClient.db("tickets").collection("tickets");
            const ticket= await collection.findOne({"_id" : ObjectId(String(idTicket))})
            await mongoClient.close();
            resolve(ticket)
        });
    })

    ticketPromise.then(async ticket => {
        if (ticket) {


            const SQLClient = new Client(SQLClientConfig);
            await SQLClient.connect();
            const query = `SELECT * FROM events WHERE id_event=${ticket.event_id} LIMIT 1`;
            let infosEvent = await SQLClient.query(query).then(async payload => {
                return payload.rows;
            }).catch(() => {
                return null;
            });

            if (infosEvent === null || infosEvent.length === 0) {
                res.status(400).send({status: 'Any event found'})
            } else {
                infosEvent = infosEvent[0]
                res.status(200).send({infosEvent, ticket})
            }

        } else {
            res.status(400).send({status: 'Any ticket found'})
        }
    })
})

exports.main = app;

