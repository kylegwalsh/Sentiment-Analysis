'use strict';

const { Client } = require('pg')

const bigQuery = `SELECT company, SUM(positive)/COUNT(positive) AS positive, SUM(negative)/COUNT(negative) As negative, SUM(mixed)/COUNT(mixed) AS mixed, SUM(neutral) AS neutral, time, Gender, race, marital, COUNT(*) FROM
(SELECT * FROM \"Company\" Inner Join \"Sentiment\"
ON \"Company\".email = \"Sentiment\".Email) AS ASD
GROUP BY company, time, Gender, race, marital;`;

const diversityQuery = `SELECT company, COUNT(*) AS diversitycount,time FROM
(SELECT * FROM "Company" Inner Join "Sentiment"
  ON "Company".email = "Sentiment".Email) AS ASD
  GROUP BY company, time, Gender, race;`;

exports.getData = async function(req, res) {
  const client = new Client();
  const today = new Date();
  const diverseCompanies = {
    companies: {},
  };
  client.connect()
    .then(() => {
      return client.query(diversityQuery)
    })
    .then((diversityResult) => {
      diversityResult.rows.forEach((row) => {
        const rowCompanyName = row.company.trim();

        if (!diverseCompanies.companies[rowCompanyName]) {
          if (parseInt(row.time) - 1 === today.getMonth()) {
            diverseCompanies.companies[rowCompanyName] = {};
            diverseCompanies.companies[rowCompanyName].diversityFactor = parseInt(row.diversitycount) * (parseInt(row.diversitycount) - 1);
          }
        } else {
          if (parseInt(row.time) - 1 === today.getMonth()) {
            diverseCompanies.companies[rowCompanyName].diversityFactor += parseInt(row.diversitycount) * (parseInt(row.diversitycount) - 1);
          }
        }
      });
      return client.query(bigQuery)
    })
    .then((result) => {
      client.end();
      const responsePayload = {
        companies: {}
      };

      result.rows.forEach((row) => {

        const { positive, negative, mixed, neutral, count } = row;
        const sum = (0.5 * parseFloat(neutral)) + parseFloat(positive) * 3 - parseFloat(negative )- 0.1 * parseFloat(mixed);

        const rowCompanyName = row.company.trim();

        if (!responsePayload.companies[rowCompanyName]) {
          responsePayload.companies[rowCompanyName] = {};
          responsePayload.companies[rowCompanyName].data = [row];
          responsePayload.companies[rowCompanyName].sentiment = 0;
          responsePayload.companies[rowCompanyName].totalCount = 0;

          if (parseInt(row.time) - 1 === today.getMonth()) {
            responsePayload.companies[rowCompanyName].sentiment = parseFloat(sum);
            responsePayload.companies[rowCompanyName].totalCount = parseInt(count);
          }
        } else {
          responsePayload.companies[rowCompanyName].data.push(row);
          if (parseInt(row.time) - 1 === today.getMonth()) {
            responsePayload.companies[rowCompanyName].sentiment += parseFloat(sum);
            responsePayload.companies[rowCompanyName].totalCount += parseInt(count);
          }
        }

      });

      Object.keys(responsePayload.companies).forEach((key) => {
        responsePayload.companies[key].name = key;
        responsePayload.companies[key].sentiment = 100 * (responsePayload.companies[key].sentiment / responsePayload.companies[key].totalCount);
        responsePayload.companies[key].diversityFactor = 100 * (1 -
          (diverseCompanies.companies[key].diversityFactor / (responsePayload.companies[key].totalCount * (responsePayload.companies[key].totalCount - 1))))
      });

      console.log(responsePayload);

      client.end();
      res.send(responsePayload);
    });
  };
