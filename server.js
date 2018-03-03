const express = require('express');
const routes = require('./server/routes/server.routes.js');

const app = express();
const port = process.env.PORT || 5000;

// Set up routes
routes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
