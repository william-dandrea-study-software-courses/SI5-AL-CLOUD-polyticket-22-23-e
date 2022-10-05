# How to configure the Gcloud CLI

1. Login to your GCP account
```shell
gcloud auth login
```
2. Set the current project
```shell
gcloud config set project cloud-tickets
```

# How to write a Gcloud function

1. Init a npm project
```shell
npm init
```
2. Install the google-cloud dependencies
```shell
npm install --save-dev @google-cloud/functions-framework
```

3. SetUp the main function in the file index.js (you hate to create it)
```javascript
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
```

4. Add the `package.json` entrypoint `start`
```json
"scripts": {
    "start": "npx functions-framework --target=main",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

4. BIS : you can run in local the function with `npm start`
5. 
