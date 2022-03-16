// node backend server
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const itemsApi = require('./apis/items_api');

let app = express();
app.use(cors());
let server = http.createServer(app);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// api back-end routing
app.use('/api/items', itemsApi);

// listening
server.listen(8888, () => {
    console.log(' success!! port:8888')
})