'use strict';

exports.getData =  function(req, res) {
  res.send([
    {
      name: 'google',
      sentiment: 50,
      diversity: 50,
    },
    {
      name: 'apple',
      sentiment: 55,
      diversity: 55,
    },
    {
      name: 'amazon',
      sentiment: 60,
      diversity: 60,
    }
  ]);
};
