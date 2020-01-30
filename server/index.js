/**********************************************************************************/
const express = require('express');
const app = express();
const PORT = 5050;
app.listen(PORT, () => console.log(`Party on (${PORT}), Wayne!`));
/**********************************************************************************/
app.use(express.json())
const apiPath = '/api/collections';
const controller = require('./controller/controller');

var { getAll, getSingle, updateChecked, createSingle, deleteSingle } = controller;

app.get(apiPath, getAll);
app.get(`${apiPath}/:id`, getSingle);
app.post(`${apiPath}`, createSingle);
app.put(`${apiPath}/:id`, updateChecked);
app.delete(`${apiPath}/:id`, deleteSingle);
