require('dotenv').config()
const express = require('express');


const { Client } = require("pg");
const client = new Client({
    user: process.env.USER_DB,
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB
});


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())



/**
 * Structure POST :
 * {
 *     "name": "Concert Name",
 *     "available_seats": 100,
 *     "date": '2023-06-22 19:10:25-07',
 *     "artist": "Mimi Maxi",
 *     "creator_email": "william@event.com"
 * }
 * CREATE TABLE events (
 *    id_event serial PRIMARY KEY,
 *    name_event VARCHAR ( 100 ) UNIQUE NOT NULL,
 *    email_owner VARCHAR ( 255 ) UNIQUE NOT NULL,
 *    date_event TIMESTAMP NOT NULL,
 *    available_seats INT4 NOT NULL,
 *    artist VARCHAR ( 100 ) UNIQUE NOT NULL
 * );
 *
 * INSERT INTO events(name_event, email_owner, date_event, available_seats, artist)
 * VALUES ('Event 1', 'owner@gmail.com', '2023-06-22 19:10:25-07', 100, 'Mimi Maxi');
 *
 */
app.post('/new-event', async (req, res, next) => {

    const nameBody = req.body["name"];
    const availableSeatsBody = req.body["available_seats"];
    const dateBody = req.body["date"];
    const artistBody = req.body["artist"];
    const creatorEmailBody = req.body["creator_email"];

    if (nameBody && availableSeatsBody && dateBody && artistBody && creatorEmailBody) {

        const query = `
        INSERT INTO events(name_event, email_owner, date_event, available_seats, artist)
        VALUES ('${nameBody}', '${creatorEmailBody}', '${dateBody}', ${availableSeatsBody}, '${artistBody}');
    `;


        const result = await client.query(query).then(async payload => {
            return await client
                .query(`SELECT * FROM events`)
                .then((payload2) => {
                    return payload2.rows;
                }).catch(error => res.status(400).json({"error": error.detail}))
        }).catch(error => {
            res.status(400).json({"error": error.detail})
        })

        if (result) {
            res.status(200).json(result)
        }

    } else {
        res.json({status: "400", message: "Error when paring the request body"}).status(400)
    }
});


async function createTable() {}
(async () => {
    await client.connect();

    await createTable();

    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
})();
