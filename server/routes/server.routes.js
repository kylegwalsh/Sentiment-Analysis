'use strict';

// Session Routes
const server = require('../controllers/server.controller.js');

module.exports = function(app) {
  app.route('/api/companies').get(server.getData);
};
