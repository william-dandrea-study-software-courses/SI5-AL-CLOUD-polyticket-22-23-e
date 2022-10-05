const functions = require('@google-cloud/functions-framework');

functions.http('main', (req, res) => {
    // Use the url http://localhost:8080/?message=process1
    if (req.query.message === "process1") {
        res.send("You launched the process 1")
        return;
    }

    // Use the url http://localhost:8080/?message=process2
    if (req.query.message === "process2") {
        res.send("You launched the process 2")
        return;
    }

    // Use the url http://localhost:8080/?message=error
    if (req.query.message === "error") {
        res.send("error append")
        return;
    }
    res.send(`${req.query.message || req.body.name || 'Welcome'}!`);
});
