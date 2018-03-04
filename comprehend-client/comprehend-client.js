const AWS = require('aws-sdk');
const fs = require('fs');
const { Client } = require('pg');
const comprehend = new AWS.Comprehend({region:'us-east-1'});
const RateLimiter = require('limiter').RateLimiter;
const client = new Client();

const sendComprehendRequest = (company, email, date, text) => {
  const params = {
    LanguageCode: 'en',
    TextList: [text]
  };
  comprehend.batchDetectSentiment(params, async (err, data) => {
    if (err) {
      console.log(err, err.stack);
      return;
    } // an error occurred

    const { Positive, Negative, Neutral, Mixed } = data.ResultList[0].SentimentScore;

    const res = await client.query(`INSERT INTO comprehend(company, email, negative, positive, neutral, mixed, date) 
      VALUES(\'${company}\', \'${email}\', ${Negative}, ${Positive}, ${Neutral}, ${Mixed}, \'${date}\') RETURNING *;`);

    console.log(res);
  });
};

const getEntries = () => {
  const rows = fs.readFileSync('./emails.csv', 'utf8').split('\n');
  return rows.map((row) => row.substring(0, rows.length - 2).split(','));
};

const connectPostgres = async () => {
  await client.connect();
};

const start = () => {

  connectPostgres()
    .then(() => {
      const entries = getEntries();

      const limiter = new RateLimiter(1, 250);

      entries.forEach((entry) => {
        const [company, email, date, text] = entry;
        limiter.removeTokens(1, function() {
          sendComprehendRequest(company, email, date, text);
        });
      });
    })
};

start();