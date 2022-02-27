const express = require('express');
const cors = require('cors');
const { GetReconsAPI, GetNetworksAPI } = require('./database');
const app = express();

app.use(cors());
app.use((req, res, next) => {
   console.log(`>> ${req.path} -- (${new Date()})`);
   next();
});

app.get('/ReconStatus', (req, res) => {
   GetReconsAPI().then(json => res.json(json));
});

app.get('/Networks', (req, res) => {
   GetNetworksAPI().then(json => res.json(json));
});

const port = 5000;
app.listen(port, () => {
   console.log(`>> API listening on http://localhost:${port}`);
});
