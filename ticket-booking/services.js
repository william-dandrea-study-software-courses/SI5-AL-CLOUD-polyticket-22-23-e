import http from "http";


exports.getEventById = (id) => {
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
